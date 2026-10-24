# Seguridad y privacidad

## Datos personales

- Recopilar solo los datos necesarios para gestionar una inscripción.
- Definir finalidad, acceso, retención y eliminación de datos antes de producción.
- No utilizar datos reales de participantes en el entorno de demo.
- No registrar emails, teléfonos, respuestas de formularios ni tokens en logs innecesarios.
- Proteger exportaciones CSV y evitar exponerlas a usuarios públicos.

## Actividades con menores

Wilderness Coaching incluye jóvenes. Antes de producción, el cliente debe confirmar:
- Qué datos de menor y tutor son estrictamente necesarios.
- Consentimiento del responsable legal y autorizaciones de participación.
- Políticas de privacidad y retención aplicables.
- Procedimiento para necesidades médicas, alergias y emergencias, redactado y aprobado por el cliente.
- Quién puede acceder a esa información y durante cuánto tiempo.

No implementar un agente de IA para decidir si una actividad es segura para una persona. Ese agente no forma parte del MVP.

## Pagos

- No almacenar datos de tarjetas.
- No incluir secretos del proveedor en el bundle del frontend.
- Verificar firmas y estados de webhooks.
- Validar importe, moneda, referencia y orden.
- Procesar webhooks idempotentemente.
- Separar el estado de pago del estado de inscripción.
- No confiar en parámetros de URL para declarar un pago como exitoso.

## Formularios

- Validación de entrada del lado cliente y servidor.
- Protección contra spam/rate limiting.
- Escape/normalización de contenido para evitar XSS.
- Protección frente a CSRF cuando corresponda al modelo de autenticación.
- Mensajes de error sin información interna.
- No aceptar campos arbitrarios que se escriban directamente a la base de datos.

## Panel administrativo

- Autenticación y autorización del lado servidor.
- Mínimo privilegio.
- Registro de acciones administrativas sensibles.
- Sesiones y cookies seguras según el framework.
- No incluir credenciales por defecto.
- No dejar rutas administrativas accesibles sin autenticación.

## Producción

- Revisar textos legales y consentimiento con el cliente.
- Configurar HTTPS, backups, gestión de secretos y política de incidentes.
- Verificar cumplimiento aplicable en jurisdicciones de operación; no asumir que una plantilla genérica es suficiente.
