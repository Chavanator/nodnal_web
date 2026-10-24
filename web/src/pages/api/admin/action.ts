import type { APIRoute } from 'astro';
import { applyAction, type AdminAction } from '../../../lib/admin.js';
import { isAdmin, sameOrigin } from '../../../lib/admin-guard.js';

export const prerender = false;

const ACTIONS: AdminAction[] = ['approve', 'reject', 'cancel', 'verifyPayment'];

export const POST: APIRoute = async (context) => {
  if (!isAdmin(context) || !sameOrigin(context)) {
    return Response.json({ ok: false }, { status: 401 });
  }
  let body: unknown;
  try {
    body = await context.request.json();
  } catch {
    return Response.json({ ok: false }, { status: 400 });
  }
  const b = (body ?? {}) as { registrationId?: unknown; action?: unknown };
  const registrationId = typeof b.registrationId === 'string' ? b.registrationId : '';
  const action = ACTIONS.includes(b.action as AdminAction) ? (b.action as AdminAction) : null;
  if (!registrationId || !action) {
    return Response.json({ ok: false }, { status: 400 });
  }
  const result = applyAction(registrationId, action, 'admin');
  if (!result.ok) {
    return Response.json({ ok: false, error: result.error }, { status: 422 });
  }
  return Response.json({ ok: true, registration: result.registration });
};
