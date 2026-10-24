import type { APIContext } from 'astro';
import { COOKIE_NAME, verifySession } from './auth.js';

export function isAdmin(context: APIContext): boolean {
  return verifySession(context.cookies.get(COOKIE_NAME)?.value);
}

/** Rechaza POST cross-origin cuando el navegador envía Origin/Referer.
 * Compara contra la cabecera Host real: request.url no es fiable aquí
 * porque el adaptador deriva el host sin Host cuando no hay X-Forwarded-*. */
export function sameOrigin(context: APIContext): boolean {
  const req = context.request;
  const host = (req.headers.get('host') ?? '').split(',')[0]?.trim().toLowerCase() ?? '';
  const origin = req.headers.get('origin');
  if (origin) {
    try {
      return new URL(origin).host.toLowerCase() === host;
    } catch {
      return false;
    }
  }
  const referer = req.headers.get('referer');
  if (referer) {
    try {
      return new URL(referer).host.toLowerCase() === host;
    } catch {
      return false;
    }
  }
  return true;
}
