import type { APIRoute } from 'astro';
import { getEvent } from '../../lib/events.js';
import { confirmedSeats, loadDb } from '../../lib/store.js';

export const prerender = false;

// Disponibilidad en vivo: la única fuente válida es el servidor.
export const GET: APIRoute = async ({ url }) => {
  const slug = url.searchParams.get('slug') ?? '';
  const event = getEvent(slug);
  if (!event) {
    return Response.json({ ok: false }, { status: 404 });
  }
  const db = loadDb();
  const seatsLeft = event.capacity === null ? null : event.capacity - confirmedSeats(db, event.id);
  return Response.json({
    ok: true,
    slug: event.slug,
    status: event.status,
    capacity: event.capacity,
    seatsLeft,
  });
};
