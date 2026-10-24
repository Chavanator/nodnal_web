import type { APIRoute } from 'astro';
import { createRegistration, type RegistrationInput } from '../../lib/registration.js';

export const prerender = false;

// Límite simple en memoria para el demo de instancia única (NFR-003).
// En producción: rate limiting del proveedor/hosting.
const hits = new Map<string, number[]>();
const WINDOW_MS = 60_000;
const MAX_HITS = 20;

function limited(ip: string): boolean {
  const now = Date.now();
  const arr = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  arr.push(now);
  hits.set(ip, arr);
  return arr.length > MAX_HITS;
}

function pickMessage(errors: { field: string; es: string; en: string }[] | undefined, locale: string) {
  return (errors ?? []).map((e) => ({
    field: e.field,
    message: locale === 'en' ? e.en : e.es,
    es: e.es,
    en: e.en,
  }));
}

export const POST: APIRoute = async ({ request, clientAddress }) => {
  const ip = clientAddress ?? 'unknown';
  if (limited(ip)) {
    return Response.json({ ok: false, errors: [] }, { status: 429 });
  }
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false, errors: [] }, { status: 400 });
  }
  const b = (body ?? {}) as Record<string, unknown>;
  // Solo campos definidos (SECURITY_AND_PRIVACY: no aceptar campos arbitrarios).
  const input: RegistrationInput = {
    eventSlug: String(b.eventSlug ?? ''),
    fullName: String(b.fullName ?? ''),
    email: String(b.email ?? ''),
    phone: typeof b.phone === 'string' ? b.phone : '',
    participantCount: Number.isFinite(Number(b.participantCount)) ? Number(b.participantCount) : 1,
    customAnswers:
      b.customAnswers && typeof b.customAnswers === 'object'
        ? (b.customAnswers as Record<string, string>)
        : {},
    termsAccepted: b.termsAccepted === true,
    paymentMethod: b.paymentMethod === 'transfer' || b.paymentMethod === 'venmo' || b.paymentMethod === 'paypal'
      ? b.paymentMethod
      : null,
    paymentDeclared: b.paymentDeclared === true,
    locale: b.locale === 'en' ? 'en' : 'es',
  };
  const result = createRegistration(input);
  if (!result.ok) {
    const status = result.seatsLeft === 0 ? 409 : 422;
    return Response.json(
      { ok: false, errors: pickMessage(result.errors, input.locale ?? 'es'), seatsLeft: result.seatsLeft ?? null },
      { status },
    );
  }
  if (typeof b.providerReference === 'string' && b.providerReference.trim()) {
    // Guarda referencia del comprobante manual (máx. 120, sin secretos).
    const { loadDb, saveDb } = await import('../../lib/store.js');
    const db = loadDb();
    const pay = db.payments.find((p) => p.registrationId === result.registrationId);
    if (pay) {
      pay.providerReference = b.providerReference.trim().slice(0, 120);
      saveDb(db);
    }
  }
  return Response.json(
    {
      ok: true,
      registrationId: result.registrationId,
      status: result.status,
      paymentStatus: result.paymentStatus,
      seatsLeft: result.seatsLeft,
    },
    { status: 201 },
  );
};
