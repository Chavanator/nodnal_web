import { defineConfig } from 'astro/config';
import node from '@astrojs/node';
import netlify from '@astrojs/netlify';
import vercel from '@astrojs/vercel';

// Rutas bilingües explícitas: /es/... y /en/... (SITE_ARCHITECTURE.md).
// Híbrido: páginas prerenderizadas + API routes en servidor para
// inscripciones y panel admin (Etapas 2-3). El adaptador se auto-detecta
// en el build de la plataforma (D-023):
//   - local (sin variable): Node standalone — flujo actual de demo local
//   - Netlify (NETLIFY=true) o Vercel (VERCEL=1): funciones serverless
//     con la BD demo en /tmp (efímera; ver src/lib/store.ts)
// Las API routes no dependen del adaptador.
const isNetlify = process.env.NETLIFY === 'true' || process.env.NETLIFY === '1';
const isVercel = Boolean(process.env.VERCEL);
const adapter = isNetlify
  ? netlify()
  : isVercel
    ? vercel()
    : node({ mode: 'standalone' });

export default defineConfig({
  adapter,
  security: {
    // Desactivado a propósito: el chequeo interno compara Origin contra una
    // URL derivada sin Host real (devuelve http://localhost sin
    // X-Forwarded-*, verificado empíricamente) y bloquea formularios
    // legítimos del mismo origen. La protección CSRF se aplica en
    // src/lib/admin-guard.ts contra la cabecera Host real.
    checkOrigin: false,
  },
  // Redirecciones 301 del mapa auditado (URLs Squarespace → nuevas rutas).
  // El sitio antiguo era solo inglés: todo redirige a equivalentes EN.
  redirects: {
    '/home': '/en/',
    '/about': '/en/about',
    '/bio': '/en/about',
    '/coaching': '/en/services/one-to-one-coaching',
    '/blog': '/en/blog',
    '/blog/french-direct': '/en/blog/french-direct',
    '/blog/montana-mens-initiation': '/en/blog/montana-mens-initiation',
    '/blog/no-mans-land': '/en/blog/no-mans-land',
    '/hikes-and-backpacks': '/en/events',
    '/cart': '/en/events',
  },
});
