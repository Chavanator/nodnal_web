import type { APIRoute } from 'astro';
import { listRegistrations } from '../../../lib/admin.js';
import { isAdmin } from '../../../lib/admin-guard.js';
import { events } from '../../../lib/events.js';
import { loadDb } from '../../../lib/store.js';

export const prerender = false;

export const GET: APIRoute = async (context) => {
  if (!isAdmin(context)) {
    return Response.json({ ok: false }, { status: 401 });
  }
  const eventId = context.url.searchParams.get('event') || null;
  const status = context.url.searchParams.get('status') || null;
  const rows = listRegistrations(eventId, status);
  const db = loadDb();
  const payments = new Map(db.payments.map((p) => [p.registrationId, p]));
  const titles = new Map(events.map((e) => [e.id, { slug: e.slug, es: e.text.es.title, en: e.text.en.title }]));
  return Response.json({
    ok: true,
    registrations: rows.map((r) => ({
      ...r,
      eventTitle: titles.get(r.eventId) ?? { slug: r.eventId, es: r.eventId, en: r.eventId },
      payment: payments.get(r.id) ?? null,
    })),
  });
};
