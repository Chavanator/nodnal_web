# Especificación técnica

## Principio

La arquitectura final debe decidirse después de auditar el sitio descargado localmente, los assets y las dependencias existentes. No iniciar un reemplazo destructivo antes de esa auditoría.

## 0. Resultado de la auditoría inicial (2026-10-09)

Auditoría completada antes de codificar, según Hito 0 del plan y AGENTS.md.

### 0.1 Código y dependencias

- **El sitio local es una descarga estática de Squarespace 7.1, no una base de código editable.** No hay `package.json`, lockfiles, scripts, configuración ni Dockerfile en el proyecto.
- **No hay dependencias que migrar.** El stack existente (Squarespace hosted) es inadecuado para el MVP porque no permite: backend propio para inscripciones, validación de cupos en servidor, panel administrativo, ni control de pagos/webhooks. Por eso se reemplaza con código propio (decisión D-001 ya confirmada); la descarga local queda como **referencia de contenido, intacta** en `www.nodnal.com/`.
- Entorno de construcción verificado: Node v24 + npm con acceso al registry.

### 0.2 Páginas y URLs existentes (mapa para redirecciones)

| URL actual | Destino nuevo | Notas |
|---|---|---|
| `/` (Home, 0 palabras, sin H1) | `/es/`, `/en/` | Sin valor SEO que migrar; reescribir |
| `/about` (76 palabras) | `/es/acerca-de`, `/en/about` | Conservar propuesta "healing arts + blog" |
| `/bio` (166 palabras + credenciales) | Fusionar en Acerca de | Duplicada con About; no conservar como ruta propia |
| `/coaching` (604 palabras, huérfana del nav) | `/es/servicios/coaching-individual`, `/en/services/one-to-one-coaching` | Contenido valioso: precios $60-90/h, LatAm $40-60/h, consulta gratis |
| `/hikes-and-backpacks` (borrador, huérfana) | `/es/eventos/...`, `/en/events/...` | Semilla de Events: itinerario Cuenca + venmo/paypal/transferencia |
| `/blog` + 3 posts (12.190 palabras) | `/es/blog/...`, `/en/blog/...` | Conservar slugs EN donde sea posible |
| `/cart` (vacío) | Eliminar | Commerce sin productos; sin redirección necesaria |
| `/blog?author=...` | Eliminar | Página parásita; marcar `noindex`, sin redirección |

Redirecciones 301 solo para rutas con posible tráfico/enlaces: `/about`, `/bio`, `/coaching`, `/blog*`, `/hikes-and-backpacks`.

### 0.3 Assets

- ~40 fotografías de montañismo/paisajes/retratos (referencia y reutilización con optimización).
- **Primer flyer real disponible:** `tools/Day Hike CaJas.pdf/.png` (Canva, retrato 810x1020, "DAY HIKE CAJAS… Date?… CLICK TO REGISTER!"). Confirma el formato flyer-retrato como visual principal de eventos. Fecha real pendiente (en demo se usa fecha ficticia marcada).
- Sin videos, sin logo vectorial, sin favicon propio. Todo marcado como pendiente en OPEN_QUESTIONS.

### 0.4 Formularios, analítica, enlaces externos

- Formularios funcionales: **ninguno** (el footer está vacío en las 9 páginas; el "contact form" mencionado en About no existe).
- Analítica propia: ninguna detectada. Enlaces externos: solo CDN de Squarespace.
- **D-028 cerrada por auditoría: no existen integraciones que migrar; todo es greenfield.**

### 0.5 Skills instalados: reglas de uso reales

Leídas las instrucciones instaladas (`design-taste-frontend/SKILL.md` v1206 líneas, `impeccable/SKILL.md` v4.5.2). No se inventan comandos ni capacidades:

- **Taste** aplica solo a superficies públicas de marketing (Inicio, Eventos, Servicios, Blog, Contacto). **No** aplica al panel administrativo ni a tablas de datos ni a formularios multi-paso (fuera de alcance explícito del skill, §13): esas superficies usan patrones funcionales + Impeccable modo Operate.
- **Taste exige**: Design Read de una línea + diales explícitos + pre-flight check mecánico antes de dar por terminada cada página; prohibición total de em-dash (`—`); imágenes reales (foto del sitio o placeholder rotulado, nunca screenshots falsos con divs); protocolo de redesign: auditoría primero, la marca que ya es morada sigue morada (override de la LILA RULE), no cambiar IA/copy sin aprobación.
- **Impeccable por modos**: Persuade (páginas públicas), Operate (panel admin), Read (blog/artículos). Comandos reales disponibles: `shape`, `init`, `document`, `extract`, `critique`, `audit`, `polish`, `harden`, `clarify`, `adapt`, `optimize`, entre otros. Tras cambios de UI se ejecuta el detector mecánico (`impeccable detect --json <targets>`), una vez por entrega.
- `impeccable context` ejecutado el 2026-10-09: no existe `PRODUCT.md`/`DESIGN.md`; los documentos de `docs/` actúan como brief y los supuestos se etiquetan como tales. La entrevista `init` queda diferida salvo que el responsable la solicite.

## Stack decidido

- **Frontend:** Astro + TypeScript estricto para páginas de contenido rápidas y rutas ES/EN. Motivo: el MVP es 80% contenido estático bilingüe + islas de interactividad (flip, modal, calendario); Astro minimiza JS (NFR-001) frente a Next.js y comparte TypeScript con el backend.
- **Interactividad:** componentes ligeros y CSS; **no** se incorpora framework UI salvo que el panel administrativo lo justifique (pendiente de evaluar en Etapa 3).
- **Backend/API:** rutas API del mismo despliegue (sin servidor separado).
- **Base de datos:** relacional ligera con migraciones versionadas (ver § Entidades). Proveedor pendiente de la validación de hosting.
- **Archivos:** assets estáticos versionados para el MVP; almacenamiento con subida dinámica solo si se necesita.
- **Email:** proveedor transaccional con dominio verificado, **selección pendiente** (ver § Matriz de integraciones).
- **Scheduler:** solución con triggers programados **pendiente de selección** (ver § Matriz de integraciones).
- **Pagos:** PayPal sandbox con webhooks validados desde servidor **solo cuando haya credenciales** (ver § Matriz de integraciones).
- **Pruebas:** unitarias para lógica de negocio; integración para API y flujos de pago; end-to-end con Playwright si el entorno lo permite; en su defecto, pruebas manuales documentadas.

## Hosting: Cloudflare como propuesta preferida, no definitiva

D-023 se mantiene en **Propuesta**. Cloudflare (Pages/Workers/D1/R2/Cron) es la opción preferida por: free tier suficiente para el demo, previews por despliegue, cron nativo y salida simple. **La decisión se cierra solo si** el Hito 6 despliega el demo sin fricciones bloqueantes (coste, límites D1, cron, sandbox PayPal). Alternativa documentada si falla: VPS/container con Postgres + cron del sistema. No se cambia DNS ni se asumen costes sin aprobación.

## Matriz de integraciones: nada se considera completo hasta configurarse y probarse

| Integración | Estado | Lo que entrega el MVP |
|---|---|---|
| PayPal | **Pendiente** (sin credenciales sandbox) | UI de pago + creación de orden preparada + validación de importe/moneda en servidor; flujo marcado "no habilitado" hasta sandbox probado |
| Correo transaccional | **Pendiente** (sin proveedor ni remitente verificado) | Textos ES/EN de todos los estados + cola/tabla de envíos con reintentos idempotentes; pantalla confirma recepción; sin envío real simulado |
| Recordatorios 7d/1d | **Pendiente** (depende de correo + scheduler) | Lógica de elegibilidad y registro idempotente; scheduler desactivado y visible como tal |
| Pagos manuales (Venmo/transferencia) | **Funcional en MVP** | Instrucciones por evento (solo con datos aprobados) + declaración de pago + verificación manual en panel con quién/cuándo |

Regla: no afirmar que una transacción, correo o recordatorio funciona hasta probarlo (AGENTS.md). Cada entrega incluye su lista explícita de limitaciones.

## Alcance del MVP (reafirmado)

El MVP demuestra el **flujo completo de inscripción** (descubrir → entender → registrarse → confirmación en pantalla → revisión por el cliente en panel protegido) con eventos de demostración claramente rotulados. Quedan **reservados para fase 2**: publicación autónoma de eventos mediante plantillas (FR-026) y preventa con descuento (FR-027). El constructor no se presenta como disponible en el MVP (ACCEPTANCE_CRITERIA).

## Entidades de datos

Como mínimo:
- Event
- Registration
- Payment
- WaitlistEntry
- AdminUser o integración de autenticación equivalente
- EmailJob/NotificationLog para controlar recordatorios y evitar duplicados

Definir migraciones versionadas y restricciones de integridad.

## Autenticación y administración

- El panel administrativo requiere autenticación segura.
- Preferir un proveedor o mecanismo mantenido frente a crear criptografía propia.
- Aplicar autorización del lado servidor a cada operación.
- No confiar en que ocultar una ruta o botón proteja datos.
- Limitar acceso a datos de participantes por necesidad operativa.
- Definir recuperación de acceso y protección contra intentos repetidos.

## Tareas programadas

Recordatorios:
- Una semana antes.
- Un día antes.
- Solo inscripciones confirmadas.
- Zona horaria del evento.
- Idempotencia por inscripción, evento y tipo de recordatorio.
- Reintentos limitados y registro de fallos.
- No enviar recordatorios para eventos cancelados ni inscripciones canceladas.

## Entornos

- Local.
- Preview/demo.
- Producción.

Usar variables y secretos distintos por entorno. El entorno demo debe utilizar credenciales sandbox y contenido ficticio. No copiar datos personales reales al demo.

## Despliegue

- No cambiar DNS hasta aprobación explícita.
- Configurar dominio de preview y HTTPS.
- Documentar variables requeridas y pasos de despliegue.
- Verificar formularios, emails, logs y pagos sandbox antes de aprobar el demo.
- Definir rollback y backups antes de producción.

## Costes

Confirmar antes del lanzamiento:
- Plan de hosting.
- Base de datos/almacenamiento y límites.
- Proveedor de correo y volumen.
- Costes de dominio (si aplican), herramientas y servicios.
- Comisiones de PayPal/Venmo u otros proveedores.
- Mantenimiento, monitorización y backups.

## Decisiones de diseño derivadas de la auditoría
- Paleta concreta auditada del tema actual: morado `#7d2ad1` (primario), durazno `#efb0ab` (acento cálido), turquesa solo para detalles puntuales (D-008: descartado como principal), fondo off-white cálido `#f0eaea`, texto `#131212`. Valores finales sujetos a prueba de contraste en Light/Dark.
- Tipografías del sitio actual (Ojuju titulares / Josefin Slab cuerpo / Archivo mayúsculas para botones) se conservan como punto de partida por protocolo de redesign de Taste (la marca manda; aplica el override de serif al estar nombrada en el brief). Auto-hospedadas con `font-display: swap`, sin Google Fonts bloqueante.
- Estructura del repositorio: el código nuevo vive en `web/` (proyecto Astro); `www.nodnal.com/` e `images.squarespace-cdn.com/` quedan intactos como referencia.

## Hallazgos de implementación (Etapa 3, 2026-10-10)

- El chequeo CSRF interno de Astro (`security.checkOrigin`) compara `Origin` contra una URL derivada sin el `Host` real (devuelve `http://localhost` sin `X-Forwarded-*`), bloqueando formularios legítimos del mismo origen con 403. Se desactiva (`checkOrigin: false`) y la protección se aplica en `src/lib/admin-guard.ts` contra la cabecera `Host` real.
- Las respuestas `Response.redirect` tienen cabeceras inmutables y el adaptador Node rompe al añadir la cookie de sesión (`TypeError: immutable`). Los redirects con cookie se construyen manualmente (`new Response(null, { status: 303, headers: { Location } })`).
- Comparaciones de origen/retorno nunca usan `request.url` como fuente del host en este stack; usan la cabecera `Host`.
