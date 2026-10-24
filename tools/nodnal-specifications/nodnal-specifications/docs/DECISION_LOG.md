# Registro de decisiones

Los estados usados son: **Confirmado**, **Propuesta** y **Pendiente de validación**.

| ID | Área | Decisión | Estado |
|---|---|---|---|
| D-001 | Proyecto | Reconstrucción personalizada de `nodnal.com` | Confirmado |
| D-002 | Negocio | Todas las actividades mencionadas pertenecen a NODNAL | Confirmado |
| D-003 | Conversión | Prioridad: inscripciones a eventos; secundaria: coaching | Confirmado |
| D-004 | Idiomas | Español e inglés; traducciones revisadas por el cliente | Confirmado |
| D-005 | Selector idioma | Detectar preferencia del navegador y permitir cambio manual | Confirmado |
| D-006 | Tema | Toggle Light/Dark independiente del idioma | Confirmado |
| D-007 | Diseño | Minimalista; candidatos morado, durazno y turquesa | Confirmado |
| D-008 | Paleta | Descartar turquesa como color principal de la paleta | Confirmado |
| D-009 | Eventos | Tarjetas de flyer con botón More Info y flip de izquierda a derecha (eje vertical); el reverso conserva las dimensiones del anverso | Confirmado |
| D-010 | Inscripción | Modal amplio para formulario/compra | Confirmado |
| D-011 | Aprobación | Yoga: por defecto directa; Wilderness Coaching para jóvenes: por defecto con aprobación; configurable por evento | Propuesta aprobada como ejemplo, confirmar con cliente |
| D-012 | Cupo | Lista de espera opcional, configurable por evento | Confirmado |
| D-013 | Preventa | Posible pre-registro con prepago y descuento para financiar futuros eventos | Idea futura; no MVP hasta validación de política |
| D-014 | Pagos | PayPal integrado como preferencia, sujeto a viabilidad y pruebas | Confirmado como objetivo; integración pendiente |
| D-015 | Pagos manuales | Venmo y transferencia con verificación manual | Confirmado |
| D-016 | Moneda | USD por defecto | Confirmado |
| D-017 | Cobro | Modalidad configurable por evento: pago al registrarse o después de aprobación | Confirmado |
| D-018 | Correo | Utilizar correo del dominio, p. ej. `eventos@nodnal.com` (dirección final por confirmar) | Pendiente |
| D-019 | Recordatorios | Envío automático una semana y un día antes a participantes confirmados | Confirmado; proveedor y scheduler pendientes |
| D-020 | Blog | Desarrollador prepara/publica contenido a partir de materiales del cliente | Confirmado |
| D-021 | Accesibilidad | En esta fase: selector de idioma y tema claro/oscuro; seguir buenas prácticas básicas de accesibilidad en todo caso | Confirmado |
| D-022 | Calendario | Tarjetas por defecto y vista alternativa de calendario | Confirmado |
| D-023 | Hosting | Cloudflare es la opción preferida, no definitiva | Propuesta |
| D-024 | Dominio | Conservar dominio actual; acceso DNS se facilitará después | Confirmado |
| D-025 | Administración | Panel básico para revisar y gestionar inscripciones en el MVP | Confirmado |
| D-026 | Constructor de eventos | Constructor de plantillas para cliente en segunda fase | Fuera de alcance MVP |
| D-027 | IA | Sin asistente de IA en la primera versión | Confirmado |
| D-028 | Integraciones | No se conocen integraciones existentes; investigar y proponer las necesarias | Pendiente de auditoría |
| D-029 | Demo | Entorno de pruebas con eventos de demostración; publicación posterior tras revisión | Confirmado |
| D-030 | Plazo/presupuesto | Aproximadamente USD 1,000 y una semana para primer demo | Objetivo orientativo; alcance sujeto a priorización |
| D-031 | Paleta | Identidad del home (blanco cálido, verde bosque, salvia, piedra; morado solo como acento de CTAs/enlaces) propagada al resto de páginas vía tokens de diseño, en claro y oscuro | Confirmado por el cliente |

## Decisiones que deben cerrarse antes de producción

- Proveedor de correo transaccional y dirección remitente verificada.
- Proveedor y estrategia para tareas programadas/recordatorios.
- Flujo exacto de PayPal y configuración de webhooks.
- Política de reembolsos, cancelaciones y pagos.
- Consentimientos y datos requeridos para actividades con menores.
- Hosting final, dominio DNS, backups y costes.
- Contenido y traducciones finales revisados por el cliente.
- Configuración real de cupos, precios, fechas y condiciones por evento.
