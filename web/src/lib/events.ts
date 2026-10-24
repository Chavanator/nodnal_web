// Modelo Event (EVENT_SYSTEM.md, subconjunto MVP) + eventos de demostración.
// Fechas ficticias futuras, marcadas como demo (FR-025). Precios USD (D-016).

import type { Locale } from '../i18n/dict';

export type ApprovalMode = 'automatic' | 'manual';
export type PaymentTiming = 'at_registration' | 'after_approval' | 'later';
export type PaymentMethod = 'paypal' | 'venmo' | 'transfer';
export type EventStatus = 'draft' | 'published' | 'cancelled' | 'archived';
export type EventCategory = 'hike' | 'yoga' | 'wilderness' | 'coaching';

export interface CustomField {
  id: string;
  type: 'text' | 'number' | 'tel';
  required: boolean;
  label: Record<Locale, string>;
}

export interface EventText {
  title: string;
  summary: string;
  description: string;
  locationName: string;
  requirements: string[];
  includes: string[];
}

export interface EventItem {
  id: string;
  slug: string;
  category: EventCategory;
  flyer: string;
  flyerAlt: Record<Locale, string>;
  startAt: string; // ISO con offset
  endAt: string;
  timezone: string;
  locationAddress: string;
  capacity: number | null;
  waitlistEnabled: boolean;
  approvalMode: ApprovalMode;
  paymentTiming: PaymentTiming;
  paymentMethods: PaymentMethod[];
  priceAmount: number;
  currency: string;
  customFields: CustomField[];
  terms: Record<Locale, string>;
  manualInstructions: Record<Locale, string>;
  status: EventStatus;
  demo: boolean;
  text: Record<Locale, EventText>;
}

export const PAYPAL_ENABLED = false; // Integración pendiente (TECHNICAL_SPEC). No ofrecer hasta sandbox probado.

export const events: EventItem[] = [
  {
    id: 'evt_cajas_dayhike',
    slug: 'day-hike-cajas',
    category: 'hike',
    flyer: '/img/flyers/day-hike-cajas.jpg',
    flyerAlt: {
      es: 'Flyer de la caminata de un día en Cajas con Landon, guía certificado',
      en: 'Day hike in Cajas flyer with Landon, certified guide',
    },
    startAt: '2026-11-15T08:30:00-05:00',
    endAt: '2026-11-15T18:00:00-05:00',
    timezone: 'America/Guayaquil',
    locationAddress: 'Parque Nacional Cajas, Cuenca, Ecuador',
    capacity: 12,
    waitlistEnabled: false,
    approvalMode: 'automatic',
    paymentTiming: 'at_registration',
    paymentMethods: ['transfer'],
    priceAmount: 25,
    currency: 'USD',
    customFields: [],
    terms: {
      es: 'Acepto participar bajo mi responsabilidad y seguir las indicaciones del guía durante la caminata.',
      en: 'I agree to take part under my own responsibility and to follow the guide instructions during the hike.',
    },
    manualInstructions: {
      es: 'DEMO: transfiere 25 USD a la cuenta que el cliente confirme antes de producción y conserva el comprobante.',
      en: 'DEMO: transfer 25 USD to the account the client confirms before production and keep the receipt.',
    },
    status: 'published',
    demo: true,
    text: {
      es: {
        title: 'Caminata de un día en Cajas',
        summary: 'Caminata social para disfrutar y aprender habilidades en el Parque Nacional Cajas.',
        description:
          'Salimos de Cuenca por la mañana, caminamos entre lagunas y páramo, almorzamos en ruta con un ejercicio de orientación y regresamos por la tarde. Nivel: caminantes con condición básica.',
        locationName: 'Parque Nacional Cajas',
        requirements: ['Condición física básica', 'Calzado de caminata', 'Impermeable', 'Almuerzo propio'],
        includes: ['Guía certificado', 'Ejercicio de orientación', 'Grupo pequeño (máx. 12)'],
      },
      en: {
        title: 'Day Hike in Cajas',
        summary: 'A social hike to enjoy and learn skills in Cajas National Park.',
        description:
          'We leave Cuenca in the morning, hike among lakes and paramo, have lunch on the trail with an orientation exercise and return in the afternoon. Level: hikers with basic fitness.',
        locationName: 'Cajas National Park',
        requirements: ['Basic fitness', 'Hiking footwear', 'Rain jacket', 'Own lunch'],
        includes: ['Certified guide', 'Orientation exercise', 'Small group (max 12)'],
      },
    },
  },
  {
    id: 'evt_sunrise_yoga',
    slug: 'sunrise-yoga',
    category: 'yoga',
    flyer: '/img/flyers/sunrise-yoga.jpg',
    flyerAlt: {
      es: 'Flyer del yoga al amanecer en Cuenca',
      en: 'Sunrise yoga in Cuenca flyer',
    },
    startAt: '2026-11-22T06:00:00-05:00',
    endAt: '2026-11-22T07:30:00-05:00',
    timezone: 'America/Guayaquil',
    locationAddress: 'Mirador de Turi, Cuenca, Ecuador',
    capacity: 20,
    waitlistEnabled: false,
    approvalMode: 'automatic',
    paymentTiming: 'later',
    paymentMethods: ['transfer', 'venmo'],
    priceAmount: 15,
    currency: 'USD',
    customFields: [],
    terms: {
      es: 'Acepto practicar a mi ritmo e informar al instructor de cualquier lesión antes de empezar.',
      en: 'I agree to practice at my own pace and to inform the instructor of any injury before starting.',
    },
    manualInstructions: {
      es: 'DEMO: el pago se realiza el día del evento. Conserva esta confirmación.',
      en: 'DEMO: payment happens on the event day. Keep this confirmation.',
    },
    status: 'published',
    demo: true,
    text: {
      es: {
        title: 'Yoga al amanecer',
        summary: 'Práctica suave al amanecer con vista a la ciudad de Cuenca.',
        description:
          'Sesión de 90 minutos para todos los niveles: respiración, posturas suaves y relajación final mientras sale el sol.',
        locationName: 'Mirador de Turi',
        requirements: ['Mat o manta', 'Ropa cómoda', 'Agua'],
        includes: ['Instructor', 'Práctica para todos los niveles'],
      },
      en: {
        title: 'Sunrise Yoga',
        summary: 'Gentle sunrise practice overlooking the city of Cuenca.',
        description:
          'A 90 minute all-levels session: breath, gentle postures and final relaxation as the sun rises.',
        locationName: 'Turi viewpoint',
        requirements: ['Mat or blanket', 'Comfortable clothes', 'Water'],
        includes: ['Instructor', 'All-levels practice'],
      },
    },
  },
  {
    id: 'evt_montana_youth',
    slug: 'montana-youth-intensive',
    category: 'wilderness',
    flyer: '/img/flyers/montana-youth.jpg',
    flyerAlt: {
      es: 'Flyer del intensivo de naturaleza para jóvenes en Montana',
      en: 'Montana youth wilderness intensive flyer',
    },
    startAt: '2027-05-03T09:00:00-06:00',
    endAt: '2027-05-12T17:00:00-06:00',
    timezone: 'America/Denver',
    locationAddress: 'Montana, Estados Unidos (punto exacto al confirmar)',
    capacity: 8,
    waitlistEnabled: true,
    approvalMode: 'manual',
    paymentTiming: 'after_approval',
    paymentMethods: ['transfer'],
    priceAmount: 450,
    currency: 'USD',
    customFields: [
      {
        id: 'guardianName',
        type: 'text',
        required: true,
        label: { es: 'Nombre del tutor legal', en: 'Legal guardian name' },
      },
      {
        id: 'minorAge',
        type: 'number',
        required: true,
        label: { es: 'Edad del participante joven', en: 'Young participant age' },
      },
    ],
    terms: {
      es: 'Acepto que esta solicitud requiere aprobación y que el cliente definirá los consentimientos del tutor legal antes de producción.',
      en: 'I accept that this request needs approval and that the client will define legal guardian consents before production.',
    },
    manualInstructions: {
      es: 'DEMO: recibirás las instrucciones de pago solo si la solicitud es aprobada.',
      en: 'DEMO: you will receive payment instructions only if the request is approved.',
    },
    status: 'published',
    demo: true,
    text: {
      es: {
        title: 'Intensivo de naturaleza para jóvenes (Montana)',
        summary: 'Programa de 10 días de coaching en naturaleza para jóvenes, con aprobación previa.',
        description:
          'Experiencia intensa al aire libre con preparación previa por videollamada. Solo para participantes con experiencia en montaña. La solicitud pasa por revisión del guía.',
        locationName: 'Montana, EE. UU.',
        requirements: ['Experiencia previa en montaña', 'Entrevista de preparación', 'Consentimiento del tutor legal (pendiente de validación)'],
        includes: ['Guía de apoyo', 'Llamadas de preparación', 'Grupo máximo de 8'],
      },
      en: {
        title: 'Youth Wilderness Intensive (Montana)',
        summary: 'A 10 day youth wilderness coaching program with prior approval.',
        description:
          'An intense outdoor experience with preparation over video calls. Only for participants with backcountry experience. Requests go through guide review.',
        locationName: 'Montana, USA',
        requirements: ['Prior backcountry experience', 'Preparation interview', 'Legal guardian consent (pending validation)'],
        includes: ['Support guide', 'Preparation calls', 'Max group of 8'],
      },
    },
  },
];

export function getEvent(slug: string): EventItem | undefined {
  return events.find((e) => e.slug === slug);
}

export function getEventById(id: string): EventItem | undefined {
  return events.find((e) => e.id === id);
}

export function publishedEvents(): EventItem[] {
  return events.filter((e) => e.status === 'published');
}

/** Solo eventos futuros por fecha real del evento (no por mes mostrado). */
export function upcomingEvents(now: Date = new Date()): EventItem[] {
  return publishedEvents().filter((e) => new Date(e.startAt).getTime() >= now.getTime());
}

/** Fecha del evento formateada en su zona horaria e idioma. */
export function formatEventDate(iso: string, timezone: string, locale: Locale): string {
  return new Intl.DateTimeFormat(locale === 'es' ? 'es-EC' : 'en-US', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    timeZone: timezone,
  }).format(new Date(iso));
}
