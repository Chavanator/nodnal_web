import type { APIRoute } from 'astro';
import { listRegistrations } from '../../../lib/admin.js';
import { isAdmin } from '../../../lib/admin-guard.js';
import { getEventById } from '../../../lib/events.js';
import { loadDb } from '../../../lib/store.js';

export const prerender = false;

function cell(value: string | number | null | undefined): string {
  const s = String(value ?? '');
  return `"${s.replace(/"/g, '""')}"`;
}

export const GET: APIRoute = async (context) => {
  if (!isAdmin(context)) {
    return new Response('unauthorized', { status: 401 });
  }
  const eventId = context.url.searchParams.get('event') || null;
  const rows = listRegistrations(eventId, null);
  const db = loadDb();
  const payments = new Map(db.payments.map((p) => [p.registrationId, p]));
  const header = [
    'id',
    'event',
    'fullName',
    'email',
    'phone',
    'participantCount',
    'status',
    'paymentStatus',
    'paymentMethod',
    'amount',
    'currency',
    'createdAt',
  ].join(',');
  const lines = rows.map((r) => {
    const p = payments.get(r.id);
    const ev = getEventById(r.eventId);
    return [
      cell(r.id),
      cell(ev ? ev.text.en.title : r.eventId),
      cell(r.fullName),
      cell(r.email),
      cell(r.phone),
      cell(r.participantCount),
      cell(r.status),
      cell(r.paymentStatus),
      cell(r.paymentMethod),
      cell(p ? p.amount : ''),
      cell(p ? p.currency : ''),
      cell(r.createdAt),
    ].join(',');
  });
  return new Response([header, ...lines].join('\n'), {
    headers: {
      'Content-Type': 'text/csv; charset=utf-8',
      'Content-Disposition': `attachment; filename="registrations${eventId ? `-${eventId}` : ''}.csv"`,
    },
  });
};
