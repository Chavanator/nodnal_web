// Autenticación del panel admin (TECHNICAL_SPEC § Autenticación).
// Sin credenciales por defecto: la contraseña sale de ADMIN_PASSWORD.
// Sesión firmada HMAC-SHA256 vía node:crypto (primitiva mantenida, no
// criptografía propia). En producción: SESSION_SECRET estable + HTTPS.

import { createHash, createHmac, randomBytes, timingSafeEqual } from 'node:crypto';

export const COOKIE_NAME = 'nodnal_admin';
const SESSION_HOURS = 12;

function secret(): string {
  const s = process.env.SESSION_SECRET;
  if (s && s.length >= 16) return s;
  const g = globalThis as { __nodnal_secret?: string };
  let current = g.__nodnal_secret;
  if (!current) {
    current = randomBytes(32).toString('hex');
    g.__nodnal_secret = current;
  }
  return current;
}

export function adminPasswordConfigured(): boolean {
  return !!process.env.ADMIN_PASSWORD;
}

export function verifyPassword(input: string): boolean {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected || !input) return false;
  const a = createHash('sha256').update(input, 'utf8').digest();
  const b = createHash('sha256').update(expected, 'utf8').digest();
  return timingSafeEqual(a, b);
}

export function signSession(): string {
  const exp = Date.now() + SESSION_HOURS * 3_600_000;
  const sig = createHmac('sha256', secret()).update(String(exp), 'utf8').digest('hex');
  return `${exp}.${sig}`;
}

export function verifySession(token: string | undefined | null): boolean {
  if (!token) return false;
  const [expRaw, sig] = token.split('.');
  const exp = Number(expRaw);
  if (!expRaw || !sig || !Number.isFinite(exp) || exp < Date.now()) return false;
  const want = createHmac('sha256', secret()).update(expRaw, 'utf8').digest('hex');
  const a = Buffer.from(sig, 'utf8');
  const b = Buffer.from(want, 'utf8');
  return a.length === b.length && timingSafeEqual(a, b);
}

// Límite de intentos de login por IP (protección contra reintentos).
const attempts = new Map<string, number[]>();
export function loginAllowed(ip: string): boolean {
  const now = Date.now();
  const arr = (attempts.get(ip) ?? []).filter((t) => now - t < 10 * 60_000);
  attempts.set(ip, arr);
  return arr.length < 10;
}
export function registerAttempt(ip: string): void {
  const arr = attempts.get(ip) ?? [];
  arr.push(Date.now());
  attempts.set(ip, arr);
}
