export function GET(): Response {
  const body = [
    'User-agent: *',
    'Allow: /',
    'Disallow: /api/',
    'Disallow: /es/admin/',
    'Disallow: /en/admin/',
    '',
    'Sitemap: https://www.nodnal.com/sitemap.xml',
    '',
  ].join('\n');
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}
