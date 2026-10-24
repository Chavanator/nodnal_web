// Almacén JSON para el demo local (Etapa 2).
// Reemplazo previsto: base relacional con transacciones (D1 u otra) al
// cerrar D-023. Lectura/escritura síncrona: atómica en el proceso único de
// Node del demo; NO apta para múltiples instancias (documentado).
//
// Serverless (Netlify/Vercel): el FS es de solo lectura salvo /tmp, que
// arranca vacío en cada cold start → la ruta de la BD vive en DB_PATH
// (por defecto /tmp en esas plataginas) y al cargar sin fichero se usa
// la semilla empaquetada (data/demo-db.json, importada aquí) en vez de
// una BD en blanco. Los datos de /tmp se pierden en cold start: aceptable
// para el preview del cliente; para persistencia real, KV/D1 (D-023).

import { existsSync, mkdirSync, readFileSync, renameSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import seedJson from '../../data/demo-db.json';
import type { PaymentMethod } from './events.js';
import type { PaymentStatus, RegistrationStatus } from './registration.js';

export interface RegistrationRow {
  id: string;
  eventId: string;
  fullName: string;
  email: string;
  phone: string | null;
  participantCount: number;
  customAnswers: Record<string, string>;
  termsAccepted: boolean;
  status: RegistrationStatus;
  paymentStatus: PaymentStatus;
  paymentMethod: PaymentMethod | null;
  createdAt: string;
  updatedAt: string;
  approvedAt: string | null;
  approvedBy: string | null;
  locale: 'es' | 'en';
}

export interface PaymentRow {
  id: string;
  registrationId: string;
  provider: PaymentMethod;
  amount: number;
  currency: string;
  status: PaymentStatus;
  providerReference: string | null;
  createdAt: string;
  verifiedAt: string | null;
  verifiedBy: string | null;
}

export interface EmailJobRow {
  id: string;
  registrationId: string;
  kind: string;
  status: 'pending_provider' | 'sent' | 'failed';
  detail: string;
  createdAt: string;
}

export interface AdminLogRow {
  at: string;
  actor: string;
  action: string;
  registrationId: string | null;
  detail: string;
}

export interface Db {
  seq: number;
  registrations: RegistrationRow[];
  payments: PaymentRow[];
  emailJobs: EmailJobRow[];
  adminLog: AdminLogRow[];
}

// Serverless (Netlify/Vercel) no permite escribir en el proyecto → /tmp.
const serverless = Boolean(process.env.NETLIFY || process.env.VERCEL);
const DB_PATH =
  process.env.DB_PATH ??
  (serverless ? '/tmp/nodnal-demo-db.json' : join(process.cwd(), 'data', 'demo-db.json'));

function blank(): Db {
  return { seq: 0, registrations: [], payments: [], emailJobs: [], adminLog: [] };
}

export function loadDb(): Db {
  try {
    if (!existsSync(DB_PATH)) {
      // Cold start serverless: /tmp vacío → semilla empaquetada del repo.
      return serverless ? (JSON.parse(JSON.stringify(seedJson)) as Db) : blank();
    }
    const raw = readFileSync(DB_PATH, 'utf-8');
    const parsed = JSON.parse(raw) as Partial<Db>;
    return {
      seq: typeof parsed.seq === 'number' ? parsed.seq : 0,
      registrations: Array.isArray(parsed.registrations) ? parsed.registrations : [],
      payments: Array.isArray(parsed.payments) ? parsed.payments : [],
      emailJobs: Array.isArray(parsed.emailJobs) ? parsed.emailJobs : [],
      adminLog: Array.isArray(parsed.adminLog) ? parsed.adminLog : [],
    };
  } catch {
    return blank();
  }
}

export function saveDb(db: Db): void {
  mkdirSync(dirname(DB_PATH), { recursive: true });
  const tmp = `${DB_PATH}.tmp`;
  writeFileSync(tmp, JSON.stringify(db, null, 2));
  renameSync(tmp, DB_PATH);
}

export function nextId(db: Db, prefix: string): string {
  db.seq += 1;
  return `${prefix}_${String(db.seq).padStart(4, '0')}`;
}

/** Plazas consumidas: solo inscripciones confirmadas (EVENT_SYSTEM). */
export function confirmedSeats(db: Db, eventId: string): number {
  return db.registrations
    .filter((r) => r.eventId === eventId && r.status === 'confirmed')
    .reduce((sum, r) => sum + r.participantCount, 0);
}
