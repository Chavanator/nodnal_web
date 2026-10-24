# Especificación funcional

## 1. Flyers interactivos

Cada tarjeta de evento muestra:
- Flyer.
- Título.
- Fecha/hora local del evento.
- Ubicación.
- Resumen.
- Botón `More Info`.

Al activar `More Info`, la tarjeta gira horizontalmente alrededor del eje X para mostrar el reverso. El control debe ser explícito, operable con teclado y táctil. No iniciar la interacción exclusivamente mediante hover.

El reverso muestra información resumida y CTA. Debe haber un enlace a la página de detalle completa.

La animación debe respetar `prefers-reduced-motion`. Si el usuario reduce movimiento, usar una transición simple o cambio de cara sin giro.

## 2. Modal de inscripción

- Se abre desde el CTA del evento.
- Ocupa la mayor parte del viewport sin ocultar permanentemente la opción de cerrar.
- Muestra título del evento para evitar confusiones.
- Mantiene el contexto del evento seleccionado.
- Bloquea el foco dentro del modal mientras esté abierto y devuelve el foco al activador al cerrar.
- Permite cerrar mediante botón y tecla Escape, salvo que exista una operación crítica en curso.
- En móvil, permite scroll y evita que el contenido quede fuera de pantalla.
- Muestra validación por campo y resumen de errores.
- Evita pérdida de datos ante errores recuperables.

## 3. Formulario predeterminado

Campos iniciales:
- Nombre completo (obligatorio).
- Correo electrónico (obligatorio).
- Teléfono (opcional).
- Número de participantes (por defecto 1; solo si el evento permite inscribir varias personas).
- Preguntas específicas del evento.
- Aceptación de condiciones de participación aprobadas por el cliente.

Los campos específicos y los consentimientos se configuran por evento. No solicitar datos sensibles innecesarios. Para actividades de menores, el cliente debe aprobar los datos y consentimientos requeridos antes de producción.

## 4. Aprobación y cupo

Configuración por evento:
- `approvalMode`: `automatic` o `manual`.
- `capacity`: número o sin límite.
- `waitlistEnabled`: booleano.
- `paymentTiming`: `at_registration`, `after_approval` o `later`.
- `paymentMethods`: métodos permitidos.
- `status`: borrador, publicado, cancelado o archivado.

Los ejemplos iniciales son:
- Yoga: aprobación automática como valor inicial sugerido.
- Wilderness Coaching para jóvenes: aprobación manual como valor inicial sugerido.

El cliente podrá modificar estos valores en el modelo, aunque el panel avanzado para crear eventos queda para la fase 2.

## 5. Confirmaciones y recordatorios

- Mostrar confirmación en pantalla para la solicitud recibida.
- Enviar correo según el estado: solicitud recibida, aprobación, rechazo, instrucciones de pago, confirmación de pago, cancelación.
- Recordatorios automáticos 7 días y 1 día antes del evento para inscripciones confirmadas.
- Usar fecha/hora y zona horaria del evento.
- Registrar intentos y errores de envío.
- Evitar que una tarea reintentada envíe duplicados.
- Si el proveedor de correo o el scheduler no está configurado, mostrar la funcionalidad como no habilitada en el entorno demo; no simular envío real.

## 6. Panel administrativo MVP

Acceso protegido. Funciones mínimas:
- Ver lista de eventos.
- Ver inscripciones por evento.
- Filtrar por estado.
- Consultar datos necesarios del participante.
- Aprobar o rechazar solicitudes pendientes.
- Marcar pago manual como recibido/verificado, con usuario y fecha.
- Ver estado del correo/recordatorios si está disponible.
- Exportar CSV si el tiempo lo permite (P1).
- No permitir que un usuario público acceda a funciones administrativas.

La creación autónoma de eventos por parte del cliente queda fuera del MVP; el desarrollador cargará los eventos de demostración y los primeros eventos reales.

## 7. Contacto

- Formulario con nombre, correo, asunto opcional y mensaje.
- Validación y protección contra spam.
- Confirmación en pantalla.
- Envío a la dirección designada una vez confirmada.
- Teléfono y correo solo se publican cuando el cliente los proporcione.

## 8. Preventa y lista de espera

Lista de espera:
- Activable por evento.
- No equivale a inscripción confirmada.
- Debe indicar al usuario que está en espera.
- No prometer un lugar ni cobrar automáticamente.
- Si se libera una plaza, la asignación y notificación deberán seguir una política aprobada por el cliente.

Preventa:
- Funcionalidad de fase futura.
- Configuración potencial: evento futuro, plazas de preventa, precio de preventa, fecha límite, condiciones y estado de pago.
- No implementar cobro de preventa en MVP sin política aprobada de cancelación/reembolso y reglas de qué sucede si el evento no se realiza.
