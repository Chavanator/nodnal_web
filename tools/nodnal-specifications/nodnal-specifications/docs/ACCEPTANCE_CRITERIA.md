# Criterios de aceptación del MVP

## Sitio y navegación

- [ ] Todas las páginas definidas tienen una ruta accesible.
- [ ] No hay enlaces internos rotos.
- [ ] El footer aparece consistentemente.
- [ ] Las páginas se ven correctamente en móvil, tablet y escritorio.
- [ ] El contenido de demostración está claramente identificado.

## Idioma y tema

- [ ] La primera visita considera la preferencia de idioma del navegador.
- [ ] El usuario puede cambiar entre ES y EN.
- [ ] La preferencia manual persiste entre páginas y visitas.
- [ ] El cambio de idioma no reinicia el tema.
- [ ] Light/Dark funciona independientemente y persiste.
- [ ] No quedan textos esenciales en el idioma incorrecto.
- [ ] Fechas, errores, formularios y emails tienen traducción.

## Eventos

- [ ] Las tarjetas muestran flyer, título, fecha, ubicación y resumen.
- [ ] More Info activa el flip horizontal en eje X.
- [ ] La interacción funciona con teclado y pantalla táctil.
- [ ] Existe una ruta de detalle individual para cada evento de demo.
- [ ] La vista de tarjetas y la vista calendario/lista alternativa muestran datos consistentes.
- [ ] Un evento cancelado no acepta nuevas inscripciones.
- [ ] Un evento con cupo no permite excederlo por solicitudes concurrentes.

## Inscripciones

- [ ] Los campos obligatorios se validan en cliente y servidor.
- [ ] Los errores son comprensibles y se asocian a los campos.
- [ ] La inscripción queda asociada al evento correcto.
- [ ] El estado inicial respeta aprobación y modalidad de pago.
- [ ] El usuario recibe confirmación en pantalla.
- [ ] La UI distingue solicitud recibida de inscripción confirmada.
- [ ] La lista de espera, si está activa, no promete una plaza confirmada.
- [ ] No se recopilan datos no definidos.

## Administración

- [ ] Solo usuarios autorizados acceden al panel.
- [ ] El administrador puede listar y filtrar inscripciones.
- [ ] Puede aprobar o rechazar una solicitud cuando corresponda.
- [ ] Puede verificar pagos manuales y queda registro de quién/cuándo.
- [ ] No puede cambiar estados mediante una llamada pública no autorizada.
- [ ] El constructor avanzado de eventos no se presenta como disponible en el MVP.

## Pagos

- [ ] Los importes y moneda se validan en servidor.
- [ ] PayPal se prueba en sandbox si la integración está habilitada.
- [ ] Un retorno al navegador no marca por sí solo un pago como completado.
- [ ] Webhooks duplicados no producen dobles confirmaciones.
- [ ] Venmo/transferencia se mantienen pendientes hasta verificación manual.
- [ ] No se muestran instrucciones de pago no aprobadas.
- [ ] No se habilitan pagos reales sin credenciales y autorización.

## Correo y recordatorios

- [ ] El correo se envía solo si el proveedor está configurado.
- [ ] Se registra el resultado de cada envío.
- [ ] Los recordatorios corresponden a 7 días y 1 día antes.
- [ ] Se respeta la zona horaria del evento.
- [ ] No se envían recordatorios a inscripciones canceladas o eventos cancelados.
- [ ] Reintentos no generan duplicados.
- [ ] Si no se ha configurado el servicio, la limitación queda visible y documentada.

## Seguridad y calidad

- [ ] No hay secretos en el repositorio ni en el bundle del cliente.
- [ ] No se usan datos personales reales en el demo.
- [ ] Se ejecutan lint, typecheck y tests disponibles.
- [ ] Se prueba al menos un flujo completo con Playwright o pruebas manuales documentadas.
- [ ] Se prueban teclado, modal y movimiento reducido.
- [ ] Se entrega una lista de pendientes y riesgos conocidos.

## Publicación

- [ ] El demo se despliega en una URL de prueba.
- [ ] El dominio de producción no se modifica sin autorización.
- [ ] El cliente revisa el contenido, los flyers y las traducciones antes del lanzamiento.
