# Arquitectura de información

## Navegación principal propuesta

- Inicio
- Eventos
- Servicios
- Blog
- Acerca de NODNAL
- Contacto
- Toggle ES/EN
- Toggle Light/Dark
- CTA destacado: Ver eventos / Explorar eventos

## Rutas candidatas

Usar prefijos de idioma para que cada página pueda compartirse e indexarse por separado.

- `/es/` y `/en/`
- `/es/eventos` y `/en/events`
- `/es/eventos/:slug` y `/en/events/:slug`
- `/es/servicios` y `/en/services`
- `/es/servicios/coaching-individual` y `/en/services/one-to-one-coaching`
- `/es/acerca-de` y `/en/about`
- `/es/blog` y `/en/blog`
- `/es/blog/:slug` y `/en/blog/:slug`
- `/es/contacto` y `/en/contact`

Las rutas definitivas pueden adaptarse al stack y a las URLs existentes que deban conservarse mediante redirecciones.

## Inicio

1. Hero con propuesta de valor y CTA.
2. Próximos eventos.
3. Servicios destacados.
4. Presentación breve de NODNAL/biografía.
5. Artículos recientes.
6. CTA de contacto o exploración de eventos.
7. Footer completo con navegación, contacto y enlaces legales que el cliente valide.

## Eventos

- Controles de filtro básicos si hay suficientes eventos: tipo, fecha o ubicación.
- Vista principal de tarjetas.
- Alternativa de calendario mensual/listado por fecha.
- Cada tarjeta: flyer, título, fecha, ubicación, resumen y More Info.
- La interacción flip revela detalles resumidos y CTA.
- La ruta individual contiene la información completa y es accesible sin depender del flip.
- El modal de inscripción recibe el ID del evento; nunca confía en un precio o estado enviado desde el cliente.

## Detalle de evento

Debe soportar:
- Flyer y galería opcional.
- Título, categoría, descripción.
- Fecha, hora, zona horaria y ubicación.
- Precio y moneda.
- Cupo/estado de disponibilidad cuando sea pertinente.
- Requisitos, edad objetivo y qué llevar, solo si el cliente proporciona la información.
- Política de pago/cancelación aprobada.
- CTA según modalidad: Inscribirse, Solicitar inscripción, Pagar o Lista de espera.
- Contenido equivalente en ES/EN.

## Servicios

Presentar yoga, coaching y experiencias de naturaleza según el inventario validado. Evitar prometer resultados médicos o terapéuticos no aprobados.

## Professional One-to-One Coaching

Página de servicio independiente, con descripción, público, modalidad, CTA de consulta/contacto y precios solo si el cliente los confirma.

## Blog

- Índice con título, fecha, resumen, imagen opcional y categoría.
- Artículo con título, autor si está confirmado, fecha, cuerpo, imagen y enlaces relacionados.
- Metadatos por idioma.
- No publicar contenido generado sin revisión editorial.

## Contacto

- Teléfono, formulario y correo cuando el cliente confirme los datos.
- Mensaje de éxito/error y protección contra spam.
- No mostrar datos de contacto ficticios en producción.

## Footer

Recuperar una estructura completa y consistente en todas las páginas:
- Navegación secundaria.
- Contacto.
- Idioma/tema si encaja visualmente.
- Redes sociales solo si se proporcionan URLs.
- Avisos legales/políticas solo cuando existan textos aprobados.

## Comportamiento responsive

- En móvil, tarjetas apiladas y controles grandes.
- Flip activable con botón; nunca depender de hover.
- Modal con scroll interno y cierre visible.
- Calendario utilizable con alternativas de lista.
- Navegación accesible con teclado.
