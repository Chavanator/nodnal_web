import type { APIRoute } from 'astro';
import { sameOrigin } from '../../../lib/admin-guard.js';
import { COOKIE_NAME } from '../../../lib/auth.js';

export const prerender = false;

export const POST: APIRoute = async (context) => {
  if (!sameOrigin(context)) {
    return Response.json({ ok: false }, { status: 403 });
  }
  context.cookies.delete(COOKIE_NAME, { path: '/' });
  return Response.json({ ok: true });
};
