// Acciones administrativas (FUNCTIONAL_SPEC §6).
// Toda transición se valida en servidor y queda en adminLog con quién/cuándo.

import { getEventById } from './events.js';
import { loadDb, nextId, saveDb, type Db, type RegistrationRow } from './store.js';

export type AdminAction = 'approve' | 'reject' | 'cancel' | 'verifyPayment';

export interface AdminResult {
  ok: boolean;
  error?: string;
  registration?: RegistrationRow;
}

function mailJob(db: Db, registrationId: string, kind: string, detail: string): void {
  db.emailJobs.push({
    id: nextId(db, 'mail'),
    registrationId,
    kind,
    status: 'pending_provider',
    detail,
    createdAt: new Date().toISOString(),
  });
}

function log(db: Db, actor: string, action: string, registrationId: string | null, detail: string): void {
  db.adminLog.push({ at: new Date().toISOString(), actor, action, registrationId, detail });
}

export function listRegistrations(eventId: string | null, status: string | null): RegistrationRow[] {
  const db = loadDb();
  return db.registrations
    .filter((r) => (!eventId || r.eventId === eventId) && (!status || r.status === status))
    .sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
}

export function applyAction(
  registrationId: string,
  action: AdminAction,
  actor: string,
): AdminResult {
  const db = loadDb();
  const reg = db.registrations.find((r) => r.id === registrationId);
  if (!reg) return { ok: false, error: 'not_found' };
  const event = getEventById(reg.eventId);
  if (!event) return { ok: false, error: 'event_not_found' };
  const now = new Date().toISOString();
  const payment = db.payments.find((p) => p.registrationId === reg.id);

  if (action === 'approve') {
    if (reg.status !== 'pending_approval') return { ok: false, error: 'bad_transition' };
    reg.approvedAt = now;
    reg.approvedBy = actor;
    if (event.paymentTiming === 'after_approval' && event.priceAmount > 0) {
      reg.status = 'pending_payment';
      reg.paymentStatus = 'pending';
      mailJob(db, reg.id, 'payment_instructions', 'Proveedor de correo no configurado en el demo.');
      log(db, actor, 'approve', reg.id, 'Aprobada; pago pendiente de instrucciones.');
    } else {
      reg.status = 'confirmed';
      if (event.priceAmount === 0) reg.paymentStatus = 'not_required';
      mailJob(db, reg.id, 'registration_confirmed', 'Proveedor de correo no configurado en el demo.');
      log(db, actor, 'approve', reg.id, 'Aprobada y confirmada.');
    }
  } else if (action === 'reject') {
    if (reg.status !== 'pending_approval') return { ok: false, error: 'bad_transition' };
    reg.status = 'rejected';
    reg.approvedBy = actor;
    mailJob(db, reg.id, 'registration_rejected', 'Proveedor de correo no configurado en el demo.');
    log(db, actor, 'reject', reg.id, 'Solicitud rechazada.');
  } else if (action === 'cancel') {
    if (['rejected', 'cancelled'].includes(reg.status)) return { ok: false, error: 'bad_transition' };
    reg.status = 'cancelled';
    if (payment) payment.status = 'cancelled';
    mailJob(db, reg.id, 'registration_cancelled', 'Proveedor de correo no configurado en el demo.');
    log(db, actor, 'cancel', reg.id, 'Inscripción cancelada.');
  } else if (action === 'verifyPayment') {
    if (!payment) return { ok: false, error: 'no_payment' };
    if (!['awaiting_manual_verification', 'pending'].includes(payment.status)) {
      return { ok: false, error: 'bad_transition' };
    }
    if (!['pending_payment_verification', 'pending_payment'].includes(reg.status)) {
      return { ok: false, error: 'bad_transition' };
    }
    payment.status = 'paid';
    payment.verifiedAt = now;
    payment.verifiedBy = actor;
    reg.status = 'confirmed';
    reg.paymentStatus = 'paid';
    reg.updatedAt = now;
    mailJob(db, reg.id, 'payment_confirmed', 'Proveedor de correo no configurado en el demo.');
    log(db, actor, 'verifyPayment', reg.id, `Pago ${payment.provider} ${payment.amount} ${payment.currency} verificado.`);
  } else {
    return { ok: false, error: 'unknown_action' };
  }

  reg.updatedAt = now;
  saveDb(db);
  return { ok: true, registration: reg };
}

export function adminOverview(): {
  events: { id: string; pending: number; confirmed: number; total: number }[];
} {
  const db = loadDb();
  const map = new Map<string, { pending: number; confirmed: number; total: number }>();
  for (const r of db.registrations) {
    const e = map.get(r.eventId) ?? { pending: 0, confirmed: 0, total: 0 };
    e.total += 1;
    if (r.status === 'pending_approval' || r.status === 'pending_payment_verification') e.pending += 1;
    if (r.status === 'confirmed') e.confirmed += 1;
    map.set(r.eventId, e);
  }
  return {
    events: [...map.entries()].map(([id, v]) => ({ id, ...v })),
  };
}
