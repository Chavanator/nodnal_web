# Instrucciones para agentes — NODNAL

## Misión

Construir una nueva versión de NODNAL a partir de estas especificaciones, trabajando por etapas y validando cada entrega. La fuente de verdad son los documentos de `docs/`.

## Antes de modificar código

1. Inspecciona el repositorio y el sitio descargado localmente.
2. Identifica stack, dependencias, estructura, assets, rutas y contenido existentes.
3. No sobrescribas ni elimines archivos hasta entender su función.
4. Revisa los skills disponibles en el entorno de OpenCode y lee sus instrucciones reales. Usa Taste e Impeccable solo de acuerdo con sus instrucciones instaladas; no inventes comandos ni capacidades.
5. Resume los hallazgos y propone una arquitectura que encaje con el repositorio y el alcance del MVP.
6. Si el stack existente es inadecuado, documenta por qué antes de reemplazarlo.

## Reglas de producto

- El objetivo principal es conseguir inscripciones a eventos; el secundario es vender sesiones de coaching.
- Todo el contenido y las actividades mencionadas pertenecen a NODNAL.
- Las actividades se realizan principalmente en Montana, Estados Unidos (Wilderness Coaching para jóvenes) y Ecuador (yoga/coaching), según cada evento.
- El sitio debe ser bilingüe ES/EN y tener tema claro/oscuro.
- El idioma inicial se detecta desde la preferencia del navegador, con selector manual persistente. No confiar exclusivamente en geolocalización.
- Los precios de la primera versión se expresan en USD, salvo que se confirme una excepción.
- El cliente necesita revisar y gestionar inscripciones desde el MVP.
- No integrar un asistente de IA en el MVP.
- No construir todavía el constructor avanzado de eventos para el cliente. Diseñar la arquitectura para permitirlo en una segunda fase.

## Reglas de calidad

- TypeScript estricto cuando sea compatible con el stack elegido.
- Componentes accesibles por teclado y táctiles; no depender de hover.
- Validación en cliente y servidor para datos y operaciones sensibles.
- Nunca confiar en el precio, estado de pago, cupo o permisos enviados por el navegador.
- Nunca almacenar secretos en el repositorio ni exponer claves privadas en el frontend.
- No usar credenciales reales ni datos personales reales en contenido de demostración.
- No afirmar que una transacción, correo o recordatorio funciona hasta probarlo.
- No marcar tareas como completadas sin ejecutar pruebas apropiadas y reportar sus resultados.
- Documentar las decisiones que cambien alcance o arquitectura.

## Flujo de trabajo requerido

1. Auditoría del proyecto y assets.
2. Matriz de brechas entre el estado actual y las especificaciones.
3. Plan por hitos pequeños.
4. Implementación de una sección vertical a la vez.
5. Pruebas automáticas y manuales, incluyendo móvil y teclado.
6. Revisión visual con los skills instalados.
7. Resumen final: cambios, pruebas ejecutadas, limitaciones y pendientes.

## Límites de autonomía

- No publicar en `nodnal.com`, cambiar DNS, crear gastos, habilitar pagos reales ni enviar comunicaciones a clientes sin aprobación explícita.
- No inventar textos legales, políticas de reembolso, términos médicos ni recomendaciones de seguridad para actividades al aire libre.
- Para eventos que involucren menores, recopilar solo los datos estrictamente necesarios y marcar requisitos de consentimiento/privacidad como pendientes de validación por el cliente.
- Si una especificación es ambigua, implementar una opción reversible y documentar el supuesto; preguntar antes de decisiones irreversibles.
