# Modelo funcional de eventos

## Modelo conceptual

### Event
- `id`
- `slug`
- `title` por idioma
- `summary` por idioma
- `description` por idioma
- `category`
- `flyerAsset`
- `galleryAssets` opcional
- `startAt`
- `endAt`
- `timezone`
- `locationName`
- `locationAddress` opcional
- `capacity` nullable
- `waitlistEnabled`
- `approvalMode`
- `paymentTiming`
- `paymentMethods`
- `priceAmount`
- `currency` (USD por defecto)
- `registrationFields`
- `requirements` por idioma, solo si se validan
- `status`: draft/published/cancelled/archived
- `createdAt`, `updatedAt`

### Registration
- `id`
- `eventId`
- `fullName`
- `email`
- `phone` opcional
- `participantCount`
- `customAnswers`
- `status`
- `paymentStatus`
- `paymentMethod`
- `createdAt`, `updatedAt`
- `approvedAt`, `approvedBy` cuando aplique
- `cancelledAt` cuando aplique

### Payment
- `id`
- `registrationId`
- `provider`
- `amount`
- `currency`
- `status`
- `providerReference` no secreta
- `createdAt`, `verifiedAt`
- `verifiedBy` para pagos manuales
- `idempotencyKey` cuando aplique

### WaitlistEntry
- `id`
- `eventId`
- datos mínimos de contacto
- `position` o criterio de orden
- `status`
- `createdAt`
- no debe considerarse plaza confirmada

## Capacidad y concurrencia

La capacidad se debe validar en el servidor y de forma atómica cuando se confirma una plaza. No basta con ocultar el botón cuando la interfaz cree que no quedan plazas.

Las inscripciones pendientes de aprobación/pago necesitan una política de reserva de plaza:
- Opción recomendada para el MVP: solo las inscripciones confirmadas consumen capacidad, salvo que el evento defina una reserva temporal explícita.
- No mantener plazas bloqueadas indefinidamente por pagos incompletos.
- La política exacta debe quedar clara en la interfaz.

## Plantillas futuras

Las plantillas no serán tablas ni sistemas separados; serán configuraciones predefinidas:
1. Evento abierto.
2. Evento con capacidad limitada.
3. Evento con pago en línea.

Cada plantilla rellenará valores iniciales que el administrador podrá ajustar cuando se implemente el constructor en fase 2.

## Futuras preventas

La preventa con pago anticipado y descuento se modelará por separado de una lista de espera. Requiere condiciones de reembolso, fecha de cierre, cupos, precio y tratamiento de cancelación del evento aprobados por el cliente.
