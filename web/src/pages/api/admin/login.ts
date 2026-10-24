import type { APIRoute } from 'astro';
import { sameOrigin } from '../../../lib/admin-guard.js';
import {
  COOKIE_NAME,
  loginAllowed,
  registerAttempt,
  signSession,
  verifyPassword,
} from '../../../lib/auth.js';

export const prerender = false;

function hostHeader(request: Request): string {
  return (request.headers.get('host') ?? '').split(',')[0]?.trim().toLowerCase() ?? '';
}

export const POST: APIRoute = async (context) => {
  const { request, cookies, clientAddress } = context;
  if (!sameOrigin(context)) {
    return Response.json({ ok: false }, { status: 403 });
  }
  const ip = clientAddress ?? 'unknown';
  if (!loginAllowed(ip)) {
    return Response.json({ ok: false }, { status: 429 });
  }
  let password = '';
  const contentType = request.headers.get('content-type') ?? '';
  try {
    if (contentType.includes('application/json')) {
      const body = (await request.json()) as { password?: unknown };
      password = typeof body.password === 'string' ? body.password : '';
    } else {
      const form = await request.formData();
      password = String(form.get('password') ?? '');
    }
  } catch {
    return Response.json({ ok: false }, { status: 400 });
  }
  registerAttempt(ip);
  // Retraso fijo para frenar fuerza bruta (además del límite por IP).
  await new Promise((r) => setTimeout(r, 800));
  const wantsJson = contentType.includes('application/json');
  // NOTA: no usar Response.redirect aquí: sus cabeceras son inmutables y el
  // adaptador Node rompe al añadir la cookie de sesión. Respuesta manual.
  const redirectTo = (target: string): Response =>
    new Response(null, { status: 303, headers: { Location: target } });
  const backTo = (query: string): Response => {
    const referer = request.headers.get('referer');
    let back = '/';
    if (referer) {
      try {
        const u = new URL(referer);
        if (u.host.toLowerCase() === hostHeader(request)) back = u.pathname;
      } catch {
        back = '/';
      }
    }
    return redirectTo(back + query);
  };
  if (!verifyPassword(password)) {
    if (!wantsJson) return backTo('?login=failed');
    return Response.json({ ok: false }, { status: 401 });
  }
  const secure = new URL(request.url).protocol === 'https:';
  cookies.set(COOKIE_NAME, signSession(), {
    httpOnly: true,
    sameSite: 'lax',
    path: '/',
    maxAge: 12 * 3600,
    secure,
  });
  // Si vino de formulario HTML, volver a la página de origen (mismo origen).
  if (!wantsJson) {
    const referer = request.headers.get('referer');
    let back = '/';
    if (referer) {
      try {
        const u = new URL(referer);
        if (u.host.toLowerCase() === hostHeader(request)) back = u.pathname + u.search;
      } catch {
        back = '/';
      }
    }
    return redirectTo(back);
  }
  return Response.json({ ok: true });
};
