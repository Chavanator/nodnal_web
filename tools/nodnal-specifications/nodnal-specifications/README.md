# NODNAL — Especificaciones del proyecto

Este repositorio contiene la fuente de verdad funcional y técnica para reconstruir `nodnal.com` con código propio.

## Estado del proyecto

- **Objetivo de entrega inicial:** MVP funcional en un entorno de pruebas, con eventos de demostración.
- **Plazo objetivo del primer demo:** una semana desde el inicio efectivo del desarrollo.
- **Presupuesto orientativo:** aproximadamente USD 1,000; sujeto a confirmación y a los costes recurrentes de terceros.
- **Dominio de producción:** conservar `nodnal.com`; el acceso DNS se obtendrá antes de la publicación.
- **Idiomas:** español e inglés.
- **Hosting candidato:** Cloudflare, pendiente de validación durante la inspección técnica.
- **Estado:** especificación inicial. No asumir que todos los servicios externos ya están configurados.

## Orden recomendado de lectura

1. `AGENTS.md`
2. `docs/PROJECT_BRIEF.md`
3. `docs/DECISION_LOG.md`
4. `docs/REQUIREMENTS.md`
5. `docs/SITE_ARCHITECTURE.md`
6. `docs/FUNCTIONAL_SPEC.md`
7. `docs/EVENT_SYSTEM.md`
8. `docs/REGISTRATION_AND_PAYMENTS.md`
9. `docs/CONTENT_AND_I18N.md`
10. `docs/DESIGN_SYSTEM.md`
11. `docs/TECHNICAL_SPEC.md`
12. `docs/SECURITY_AND_PRIVACY.md`
13. `docs/ACCEPTANCE_CRITERIA.md`
14. `docs/IMPLEMENTATION_PLAN.md`

## Principios de implementación

- Auditar primero el sitio existente y los archivos locales antes de elegir o reemplazar tecnologías.
- No inventar datos comerciales, precios, requisitos de seguridad, testimonios, credenciales ni políticas.
- Usar contenido de demostración claramente identificado como tal.
- Mantener separadas las decisiones confirmadas, las propuestas y las preguntas pendientes.
- Implementar funcionalidades críticas de forma verificable; no simular pagos ni enviar correos ficticios como si fueran reales.
- Priorizar un MVP seguro, usable, responsive y demostrable.
- No desplegar en producción ni cambiar DNS sin autorización explícita del responsable.
