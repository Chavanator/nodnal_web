import { events } from '../lib/events.js';
import { posts } from '../lib/blog.js';

// Sitemap para el dominio de producción (CONTENT_AND_I18N § SEO).
// Admin y demo quedan fuera; el demo usa noindex por página.
const SITE = 'https://www.nodnal.com';

const staticPaths: { loc: string; lastmod: string }[] = [
  { loc: '/es/', lastmod: '2026-10-10' },
  { loc: '/en/', lastmod: '2026-10-10' },
  { loc: '/es/eventos/', lastmod: '2026-11-15' },
  { loc: '/en/events/', lastmod: '2026-11-15' },
  { loc: '/es/servicios/', lastmod: '2026-10-10' },
  { loc: '/en/services/', lastmod: '2026-10-10' },
  { loc: '/es/servicios/coaching-individual/', lastmod: '2026-10-10' },
  { loc: '/en/services/one-to-one-coaching/', lastmod: '2026-10-10' },
  { loc: '/es/blog/', lastmod: '2026-09-30' },
  { loc: '/en/blog/', lastmod: '2026-09-30' },
  { loc: '/es/acerca-de/', lastmod: '2026-10-10' },
  { loc: '/en/about/', lastmod: '2026-10-10' },
  { loc: '/es/contacto/', lastmod: '2026-10-10' },
  { loc: '/en/contact/', lastmod: '2026-10-10' },
];

const eventPaths = events.flatMap((e) => [
  { loc: `/es/eventos/${e.slug}/`, lastmod: e.startAt.slice(0, 10) },
  { loc: `/en/events/${e.slug}/`, lastmod: e.startAt.slice(0, 10) },
]);

const postPaths = posts.flatMap((p) => [
  { loc: `/es/blog/${p.slug}/`, lastmod: p.date },
  { loc: `/en/blog/${p.slug}/`, lastmod: p.date },
]);

export function GET(): Response {
  const urls = [...staticPaths, ...eventPaths, ...postPaths]
    .map((u) => `  <url><loc>${SITE}${u.loc}</loc><lastmod>${u.lastmod}</lastmod></url>`)
    .join('\n');
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>`;
  return new Response(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
}
