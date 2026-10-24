# Plan de implementación

## Hito 0 — Auditoría (antes de codificar)

- Inspeccionar el sitio local existente.
- Inventariar páginas, URLs, assets y contenido.
- Revisar stack y dependencias.
- Inspeccionar las instrucciones reales de Taste e Impeccable instalados en OpenCode.
- Identificar accesos/integraciones existentes.
- Crear matriz de brechas y confirmar arquitectura.

**Salida:** informe de auditoría, stack final recomendado y backlog priorizado.

## Hito 1 — Base visual y estructura

- Configurar rutas bilingües.
- Crear tokens de diseño y temas Light/Dark.
- Crear header, navegación, footer y layout responsive.
- Montar páginas principales con contenido validado o marcadores de posición.
- Incorporar assets disponibles con optimización.

## Hito 2 — Eventos y experiencia

- Definir el modelo Event.
- Crear tarjetas con flyer y flip accesible.
- Crear detalle individual.
- Implementar vista tarjetas/calendario.
- Crear modal y formulario de inscripción.
- Implementar validación, estados y cupos en servidor.

## Hito 3 — Panel administrativo

- Autenticación.
- Listado y filtrado de inscripciones.
- Aprobación/rechazo.
- Verificación manual de pagos.
- Pruebas de autorización.

## Hito 4 — Pagos y comunicaciones

- PayPal sandbox si credenciales y tiempo lo permiten.
- Flujo manual para Venmo/transferencia.
- Servicio de correo transaccional.
- Confirmaciones.
- Recordatorios programados.
- Pruebas de idempotencia y fallos.

## Hito 5 — Contenido, SEO y revisión

- Blog y servicios.
- Traducciones revisadas.
- Metadatos, sitemap y redirecciones.
- Pruebas responsive y accesibilidad básica.
- Revisión visual con skills disponibles.
- Corregir errores críticos.

## Hito 6 — Demo y aprobación

- Desplegar en entorno de pruebas.
- Cargar eventos ficticios claramente etiquetados.
- Probar el flujo completo.
- Entregar credenciales de demo de forma segura.
- Presentar funcionalidades completas, limitaciones y pendientes.
- Obtener aprobación antes de publicar en producción.

## Priorización para una semana

La semana es un objetivo agresivo. Priorizar en este orden:
1. Sitio responsive y bilingüe.
2. Páginas principales y sistema visual.
3. Eventos, detalle, modal y formulario funcional.
4. Panel administrativo mínimo.
5. Flujo de aprobación y pagos manuales.
6. PayPal sandbox, correos y scheduler si hay tiempo y accesos.
7. Calendario alternativo, pulido visual y SEO técnico.

No afirmar que una integración está lista si depende de credenciales o servicios aún no configurados. En ese caso, mostrar claramente el bloqueo y entregar el resto del flujo.

## Fase 2

- Constructor de eventos por plantillas.
- Personalización limitada de campos por el cliente.
- Gestión autónoma de flyers y contenido.
- Preventa con prepago/descuento y reglas de reembolso.
- Automatizaciones editoriales/marketing.
- Evaluar IA solo si el cliente la vuelve a solicitar.
