import { defaultLocale, locales, type Locale } from './dict';

// Mapa de páginas equivalentes ES <-> EN (SITE_ARCHITECTURE).
const equivalents = {
  home: { es: '/es/', en: '/en/' },
  events: { es: '/es/eventos/', en: '/en/events/' },
  services: { es: '/es/servicios/', en: '/en/services/' },
  coaching: {
    es: '/es/servicios/coaching-individual/',
    en: '/en/services/one-to-one-coaching/',
  },
  blog: { es: '/es/blog/', en: '/en/blog/' },
  about: { es: '/es/acerca-de/', en: '/en/about/' },
  contact: { es: '/es/contacto/', en: '/en/contact/' },
  admin: { es: '/es/admin/', en: '/en/admin/' },
};

export function getLocaleFromPath(pathname: string): Locale {
  if (pathname.startsWith('/es/') || pathname === '/es') return 'es';
  if (pathname.startsWith('/en/') || pathname === '/en') return 'en';
  return defaultLocale;
}

export function isLocalePath(pathname: string): boolean {
  return locales.some((l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`));
}

/** Devuelve la ruta equivalente en el otro idioma, o el home si no hay equivalencia. */
export function equivalentPath(pathname: string, target: Locale): string {
  for (const pair of Object.values(equivalents)) {
    if (pathname === pair.es || pathname === pair.en) return pair[target];
  }
  return equivalents.home[target];
}

import { dict } from './dict';

/** Rutas de navegación principal para un idioma. */

export function mainNavSync(locale: Locale): { href: string; label: string; key: string }[] {
  const t = dict[locale];
  const p = equivalents;
  return [
    { key: 'home', href: p.home[locale], label: t.nav.home },
    { key: 'events', href: p.events[locale], label: t.nav.events },
    { key: 'services', href: p.services[locale], label: t.nav.services },
    { key: 'blog', href: p.blog[locale], label: t.nav.blog },
    { key: 'about', href: p.about[locale], label: t.nav.about },
    { key: 'contact', href: p.contact[locale], label: t.nav.contact },
  ];
}
