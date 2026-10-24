# Inscripciones y pagos

## Principios

- El estado de inscripción y el estado de pago son entidades relacionadas, pero diferentes.
- Nunca marcar un pago como completado por el mero retorno del navegador desde un proveedor.
- El servidor debe verificar transacciones y webhooks.
- No almacenar datos de tarjeta.
- El usuario debe conocer si su plaza está confirmada, pendiente de aprobación, pendiente de pago o en lista de espera.

## Estados de inscripción

- `pending_approval`: requiere decisión del cliente.
- `pending_payment`: inscripción aprobada/aceptada pero pago pendiente.
- `pending_payment_verification`: usuario declara haber pagado por método manual.
- `confirmed`: cumple las condiciones de confirmación definidas por el evento.
- `rejected`: solicitud rechazada.
- `cancelled`: cancelada.
- `waitlisted`: lista de espera.

## Estados de pago

- `not_required`
- `not_started`
- `pending`
- `awaiting_manual_verification`
- `paid`
- `failed`
- `refunded`
- `cancelled`

## Matriz de flujos

| Aprobación | Momento de pago | Flujo esperado |
|---|---|---|
| Automática | Al registrarse | Crear solicitud; iniciar pago; confirmar solo cuando el servidor valide el pago. |
| Manual | Después de aprobación | Crear solicitud pendiente; notificar decisión; si se aprueba, enviar instrucciones de pago; confirmar tras verificación. |
| Automática | Después | Crear solicitud; enviar instrucciones; confirmar según regla de pago aprobada. |
| Manual | Sin pago inicial | Crear solicitud pendiente; aprobar/rechazar; confirmar según condiciones del evento. |

Para métodos manuales, el cliente puede confirmar una inscripción antes de recibir el pago solo si la política del evento lo permite expresamente.

## PayPal

Objetivo: integración de pago en línea segura.

Requisitos:
- Utilizar entorno sandbox durante desarrollo y demo.
- Crear órdenes y validar capturas desde el servidor.
- Verificar webhooks con el mecanismo oficial del proveedor.
- Validar importe, moneda, referencia y estado.
- Procesar notificaciones de forma idempotente.
- No exponer secretos en el cliente.
- Manejar cancelación, fallo, repetición y retraso del pago.
- No activar pagos reales antes de recibir autorización y credenciales de producción.
- Confirmar disponibilidad, comisiones y condiciones de cuenta para el negocio.

Si la integración completa no cabe en el primer demo o faltan credenciales, entregar el flujo de interfaz y la integración sandbox si es viable; documentar el bloqueo. No sustituirlo por una confirmación ficticia.

## Venmo y transferencia

- Mostrar solo cuando estén habilitados para ese evento.
- Mostrar instrucciones verificadas por el cliente.
- Permitir que el usuario indique que realizó el pago si el flujo lo requiere.
- Mantener `awaiting_manual_verification` hasta que un administrador compruebe el pago.
- Registrar quién verificó el pago y cuándo.
- No publicar datos bancarios o cuentas de pago hasta recibir los datos oficiales y aprobación del cliente.
- Verificar disponibilidad regional y compatibilidad de Venmo para el negocio y los participantes.

## Preventa

Fuera del MVP. Antes de implementarla se debe definir:
- Condiciones de descuento y fechas.
- Cupos de preventa.
- Qué ocurre si no se alcanza el mínimo de participantes.
- Reembolsos, cancelación y cambios de fecha.
- Comunicación al comprador.
- Tratamiento contable y fiscal aplicable.
