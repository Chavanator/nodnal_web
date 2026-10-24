# Requisitos del producto

## Convenciones

- **P0:** imprescindible para el MVP.
- **P1:** deseable si cabe en el plazo.
- **P2:** fase posterior.
- Criterios concretos de aceptación están en `ACCEPTANCE_CRITERIA.md`.

## Requisitos funcionales

| ID | Prioridad | Requisito |
|---|---|---|
| FR-001 | P0 | Presentar una página de inicio con propuesta de valor, próximos eventos, servicios destacados y CTA. |
| FR-002 | P0 | Mostrar eventos en tarjetas con flyer, título, fecha, ubicación, resumen y botón More Info. |
| FR-003 | P0 | Permitir ver información ampliada mediante flip accesible; ofrecer también una ruta de detalle individual. |
| FR-004 | P0 | Mostrar un modal amplio de inscripción/compra asociado al evento correcto. |
| FR-005 | P0 | Permitir que un usuario envíe una solicitud de inscripción con datos validados. |
| FR-006 | P0 | Permitir configuración por evento de aprobación manual o directa. |
| FR-007 | P0 | Gestionar cupos limitados y evitar sobreinscripción mediante validación del lado servidor. |
| FR-008 | P1 | Lista de espera opcional, activable por evento. |
| FR-009 | P0 | Proporcionar panel administrativo protegido para revisar inscripciones, aprobar/rechazar y registrar verificación de pagos manuales. |
| FR-010 | P0 | Configurar por evento método y momento de pago. |
| FR-011 | P0/P1 | Integrar PayPal de forma segura si las credenciales y pruebas de sandbox están disponibles; de lo contrario, dejar el flujo preparado y documentar el bloqueo. |
| FR-012 | P0 | Mostrar instrucciones de pago manual para Venmo/transferencia cuando el evento lo permita. |
| FR-013 | P0 | Distinguir entre declaración de pago y pago verificado. |
| FR-014 | P0 | Enviar confirmaciones por correo en los estados correspondientes, si el servicio está configurado. |
| FR-015 | P1 | Programar recordatorios automáticos siete días y un día antes del evento a inscripciones confirmadas. |
| FR-016 | P0 | Mostrar tarjetas y una vista alternativa de calendario. |
| FR-017 | P0 | Proporcionar contenido en español e inglés con cambio manual y preferencia persistente. |
| FR-018 | P0 | Detectar idioma preferido del navegador en la primera visita, con fallback definido. |
| FR-019 | P0 | Proporcionar tema claro/oscuro independiente del idioma. |
| FR-020 | P0 | Incluir Inicio, Eventos, Detalle de evento, Servicios, Professional One-to-One Coaching, Acerca de, Blog y Contacto. |
| FR-021 | P0 | Reorganizar y reescribir el contenido existente sin eliminar contenido valioso sin revisión. |
| FR-022 | P0 | Proporcionar formulario web de contacto y mostrar teléfono/correo cuando se confirmen los datos. |
| FR-023 | P0 | Mostrar precios en USD por defecto. |
| FR-024 | P0 | Ser responsive en móviles, tabletas y escritorio. |
| FR-025 | P0 | Utilizar contenido de demostración claramente identificado en el entorno de prueba. |
| FR-026 | P2 | Constructor de eventos para que el cliente publique eventos mediante plantillas. |
| FR-027 | P2 | Preventa de eventos futuros con pago anticipado y descuento, sujeto a política aprobada. |
| FR-028 | P2 | Asistente de IA para preguntas frecuentes. |
| FR-029 | P1 | Metadatos SEO, sitemap, canonical, datos estructurados aplicables y buenas prácticas de indexación. |
| FR-030 | P1 | Medición de eventos clave de conversión, respetando consentimiento y privacidad aplicables. |

## Requisitos no funcionales

- **NFR-001 Rendimiento:** minimizar JavaScript, optimizar imágenes y evitar cargas innecesarias.
- **NFR-002 Responsive:** layouts y formularios usables en pantallas pequeñas.
- **NFR-003 Seguridad:** controles de acceso, validación de servidor, protección de secretos, rate limiting y manejo seguro de webhooks.
- **NFR-004 Privacidad:** recopilar solo datos necesarios; definir retención y acceso antes de producción.
- **NFR-005 Accesibilidad:** navegación por teclado, foco visible, etiquetas, contraste suficiente, mensajes de error comprensibles y alternativa al flip.
- **NFR-006 Mantenibilidad:** componentes reutilizables y modelo de eventos preparado para futuras plantillas.
- **NFR-007 Observabilidad:** logs de errores sin exponer datos personales ni secretos.
- **NFR-008 Fiabilidad:** los pagos y cupos deben cambiar de estado solo después de validación de servidor.
- **NFR-009 Internacionalización:** fechas, mensajes, navegación y formularios traducibles; respetar la zona horaria de cada evento.
- **NFR-010 Integridad:** evitar doble procesamiento de webhooks, doble reserva de cupos y correos duplicados cuando sea técnicamente posible.
