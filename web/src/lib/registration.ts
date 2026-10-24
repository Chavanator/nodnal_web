// Lógica de inscripción (REGISTRATION_AND_PAYMENTS.md).
// El servidor fija importes, moneda y estados. Nunca se confía en el cliente.

import { getEvent, PAYPAL_ENABLED, type EventItem, type PaymentMethod } from './events.js';
import { confirmedSeats, loadDb, nextId, saveDb, type Db } from './store.js';

export type RegistrationStatus =
  | 'pending_approval'
  | 'pending_payment'
  | 'pending_payment_verification'
  | 'confirmed'
  | 'rejected'
  | 'cancelled'
  | 'waitlisted';

export type PaymentStatus =
  | 'not_required'
  | 'not_started'
  | 'pending'
  | 'awaiting_manual_verification'
  | 'paid'
  | 'failed'
  | 'refunded'
  | 'cancelled';

export interface RegistrationInput {
  eventSlug: string;
  fullName: string;
  email: string;
  phone?: string;
  participantCount?: number;
  customAnswers?: Record<string, string>;
  termsAccepted?: boolean;
  paymentMethod?: PaymentMethod | null;
  paymentDeclared?: boolean;
  locale?: 'es' | 'en';
}

export interface FieldError {
  field: string;
  es: string;
  en: string;
}

export interface RegistrationResult {
  ok: boolean;
  errors?: FieldError[];
  registrationId?: string;
  status?: RegistrationStatus;
  paymentStatus?: PaymentStatus;
  seatsLeft?: number | null;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const MAX_GROUP = 10;

function err(field: string, es: string, en: string): FieldError {
  return { field, es, en };
}

export function validateInput(input: RegistrationInput): { errors: FieldError[]; event?: EventItem } {
  const errors: FieldError[] = [];
  const event = getEvent(input.eventSlug);
  if (!event) {
    return { errors: [err('event', 'El evento no está disponible.', 'The event is not available.')] };
  }
  if (event.status === 'cancelled') {
    return {
      errors: [err('event', 'El evento está cancelado y no acepta inscripciones.', 'The event is cancelled.')],
      event,
    };
  }
  if (event.status !== 'published') {
    return { errors: [err('event', 'El evento no está disponible.', 'The event is not available.')] };
  }

  const name = (input.fullName ?? '').trim();
  if (name.length < 2) {
    errors.push(err('fullName', 'Escribe tu nombre completo.', 'Enter your full name.'));
  }
  const email = (input.email ?? '').trim().toLowerCase();
  if (!EMAIL_RE.test(email)) {
    errors.push(err('email', 'Escribe un correo válido.', 'Enter a valid email.'));
  }
  const phone = (input.phone ?? '').trim();
  if (phone && !/^[+\d][\d\s().-]{5,}$/.test(phone)) {
    errors.push(err('phone', 'El teléfono no parece válido.', 'The phone number looks invalid.'));
  }
  const count = input.participantCount ?? 1;
  if (!Number.isInteger(count) || count < 1 || count > MAX_GROUP) {
    errors.push(
      err('participantCount', `Participantes: entre 1 y ${MAX_GROUP}.`, `Participants: between 1 and ${MAX_GROUP}.`),
    );
  }
  for (const field of event.customFields) {
    const value = (input.customAnswers?.[field.id] ?? '').trim();
    if (field.required && !value) {
      const label = field.label;
      errors.push(err(field.id, `Completa: ${label.es}.`, `Complete: ${label.en}.`));
    }
    if (field.type === 'number' && value && !/^\d+$/.test(value)) {
      errors.push(err(field.id, 'Debe ser un número.', 'Must be a number.'));
    }
  }
  if (input.termsAccepted !== true) {
    errors.push(err('terms', 'Debes aceptar las condiciones de participación.', 'You must accept the conditions.'));
  }
  const method = input.paymentMethod ?? null;
  if (method && !event.paymentMethods.includes(method)) {
    errors.push(err('paymentMethod', 'Método de pago no permitido en este evento.', 'Payment method not allowed.'));
  }
  if (method === 'paypal' && !PAYPAL_ENABLED) {
    errors.push(err('paymentMethod', 'PayPal aún no está habilitado.', 'PayPal is not enabled yet.'));
  }
  return { errors, event };
}

export function createRegistration(input: RegistrationInput): RegistrationResult {
  const { errors, event } = validateInput(input);
  if (!event || errors.length > 0) return { ok: false, errors };

  const db: Db = loadDb();
  const now = new Date().toISOString();
  const name = input.fullName.trim();
  const email = input.email.trim().toLowerCase();
  const phone = (input.phone ?? '').trim() || null;
  const count = input.participantCount ?? 1;
  const method = input.paymentMethod ?? null;
  const declared = input.paymentDeclared === true;

  const seatsUsed = confirmedSeats(db, event.id);
  const seatsLeft = event.capacity === null ? null : event.capacity - seatsUsed;
  const fits = seatsLeft === null || count <= seatsLeft;

  let status: RegistrationStatus;
  let paymentStatus: PaymentStatus = 'not_started';

  if (!fits) {
    if (event.waitlistEnabled) {
      status = 'waitlisted';
    } else {
      return {
        ok: false,
        errors: [err('event', 'El evento está lleno.', 'The event is full.')],
        seatsLeft: 0,
      };
    }
  } else if (event.approvalMode === 'manual') {
    status = 'pending_approval';
  } else if (event.paymentTiming === 'at_registration') {
    if (method && declared) {
      status = 'pending_payment_verification';
      paymentStatus = 'awaiting_manual_verification';
    } else {
      status = 'pending_payment';
      paymentStatus = method ? 'pending' : 'not_started';
    }
  } else {
    // Automática + pago posterior: plaza confirmada, pago pendiente de instrucciones.
    status = 'confirmed';
    paymentStatus = event.priceAmount > 0 ? 'pending' : 'not_required';
  }

  const id = nextId(db, 'reg');
  db.registrations.push({
    id,
    eventId: event.id,
    fullName: name,
    email,
    phone,
    participantCount: count,
    customAnswers: Object.fromEntries(
      Object.entries(input.customAnswers ?? {}).map(([k, v]) => [k, String(v).slice(0, 500)]),
    ),
    termsAccepted: true,
    status,
    paymentStatus,
    paymentMethod: method,
    createdAt: now,
    updatedAt: now,
    approvedAt: null,
    approvedBy: null,
    locale: input.locale === 'en' ? 'en' : 'es',
  });

  // Registro de pago con importe fijado por el servidor (nunca del cliente).
  if (method && status !== 'waitlisted') {
    db.payments.push({
      id: nextId(db, 'pay'),
      registrationId: id,
      provider: method,
      amount: event.priceAmount * count,
      currency: event.currency,
      status: paymentStatus,
      providerReference: null,
      createdAt: now,
      verifiedAt: null,
      verifiedBy: null,
    });
  }

  // Cola de correo: sin proveedor configurado queda pendiente visible (TECHNICAL_SPEC).
  db.emailJobs.push({
    id: nextId(db, 'mail'),
    registrationId: id,
    kind: status === 'confirmed' ? 'registration_confirmed' : 'registration_received',
    status: 'pending_provider',
    detail: 'Proveedor de correo no configurado en el demo.',
    createdAt: now,
  });

  saveDb(db);
  const left = event.capacity === null ? null : event.capacity - confirmedSeats(db, event.id);
  return { ok: true, registrationId: id, status, paymentStatus, seatsLeft: left };
}
