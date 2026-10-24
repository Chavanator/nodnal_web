import type { APIRoute } from 'astro';
import { getEvent, PAYPAL_ENABLED } from '../../lib/events.js';

export const prerender = false;

// Configuración pública del formulario de un evento. Nunca expone secretos;
// el importe y la moneda se fijan en el servidor al crear la inscripción.
export const GET: APIRoute = async ({ url }) => {
  const slug = url.searchParams.get('slug') ?? '';
  const event = getEvent(slug);
  if (!event || event.status !== 'published') {
    return Response.json({ ok: false }, { status: 404 });
  }
  const locale = url.searchParams.get('locale') === 'en' ? 'en' : 'es';
  const text = event.text[locale];
  return Response.json({
    ok: true,
    slug: event.slug,
    title: text.title,
    priceText:
      event.priceAmount > 0 ? `${event.priceAmount} ${event.currency}` : locale === 'es' ? 'Gratis' : 'Free',
    paymentMethods: event.paymentMethods,
    paypalNote:
      event.paymentMethods.includes('paypal') && !PAYPAL_ENABLED
        ? locale === 'es'
          ? 'Pago en línea con PayPal: pendiente de habilitación en el demo.'
          : 'Online PayPal payment: pending setup in the demo.'
        : null,
    customFields: event.customFields.map((f) => ({
      id: f.id,
      type: f.type,
      required: f.required,
      label: f.label,
    })),
    terms: event.terms[locale],
    manualInstructions: event.manualInstructions[locale],
  });
};
