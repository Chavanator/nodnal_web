import type { APIRoute } from 'astro';
import { loadDb, nextId, saveDb } from '../../lib/store.js';

export const prerender = false;

// Formulario de contacto (FUNCTIONAL_SPEC §7). Sin proveedor de correo, el
// mensaje queda en cola visible (pending_provider); no se simula envío.
const hits = new Map<string, number[]>();

function limited(ip: string): boolean {
  const now = Date.now();
  const arr = (hits.get(ip) ?? []).filter((t) => now - t < 10 * 60_000);
  arr.push(now);
  hits.set(ip, arr);
  return arr.length > 5;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export const POST: APIRoute = async ({ request, clientAddress }) => {
  const ip = clientAddress ?? 'unknown';
  if (limited(ip)) {
    return Response.json({ ok: false }, { status: 429 });
  }
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false }, { status: 400 });
  }
  const b = (body ?? {}) as Record<string, unknown>;
  // Honeypot: los bots rellenan el campo invisible.
  if (typeof b.website === 'string' && b.website.trim() !== '') {
    return Response.json({ ok: true });
  }
  const name = String(b.name ?? '').trim();
  const email = String(b.email ?? '').trim().toLowerCase();
  const subject = String(b.subject ?? '').trim().slice(0, 120);
  const message = String(b.message ?? '').trim().slice(0, 2000);
  const locale = b.locale === 'en' ? 'en' : 'es';
  const errors: { field: string; es: string; en: string }[] = [];
  if (name.length < 2) {
    errors.push({ field: 'name', es: 'Escribe tu nombre.', en: 'Enter your name.' });
  }
  if (!EMAIL_RE.test(email)) {
    errors.push({ field: 'email', es: 'Escribe un correo válido.', en: 'Enter a valid email.' });
  }
  if (message.length < 10) {
    errors.push({
      field: 'message',
      es: 'El mensaje debe tener al menos 10 caracteres.',
      en: 'The message must be at least 10 characters.',
    });
  }
  if (errors.length > 0) {
    return Response.json({ ok: false, errors }, { status: 422 });
  }
  const db = loadDb();
  const now = new Date().toISOString();
  db.emailJobs.push({
    id: nextId(db, 'mail'),
    registrationId: '',
    kind: 'contact_received',
    status: 'pending_provider',
    detail: `De: ${name} <${email}>${subject ? ` — ${subject}` : ''}\n${message}`,
    createdAt: now,
  });
  saveDb(db);
  return Response.json({ ok: true });
}
