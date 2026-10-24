# Contenido, idiomas y SEO

## Idiomas

Idiomas iniciales: español (`es`) e inglés (`en`).

### Comportamiento
- Detectar preferencia de idioma del navegador en la primera visita.
- Si no hay preferencia compatible, usar inglés como fallback provisional; confirmar con el cliente antes de producción.
- Mostrar un toggle visible `ES / EN`.
- Permitir que el usuario cambie manualmente el idioma.
- Persistir la elección explícita.
- Al cambiar idioma, mantener la página equivalente cuando exista traducción; si no existe, ir a la página de destino apropiada sin mostrar contenido del idioma equivocado.
- Traducir navegación, formularios, validaciones, estados, emails y contenido.
- El cliente revisa las traducciones antes de producción.

### Rutas e indexación
- Usar URLs separadas por idioma.
- Configurar `hreflang` solo para páginas realmente equivalentes.
- Definir canonical por idioma.
- No indexar contenido de demostración ni páginas administrativas.
- Evitar que el idioma se determine solo por geolocalización.

## Tema claro/oscuro

- Toggle independiente del selector de idioma.
- Persistir preferencia manual.
- Respetar la preferencia del sistema en primera visita, si no hay elección guardada.
- Comprobar contraste y legibilidad en ambos temas.
- Usar tokens de diseño y evitar estilos hardcodeados dispersos.

## Dirección editorial

- Reutilizar y reorganizar contenido valioso del sitio actual.
- Reescribir para claridad, estructura y conversión, sin alterar el significado sin aprobación.
- El desarrollador prepara/publica artículos a partir del material del cliente.
- Objetivo editorial tentativo: una publicación mensual, sujeto a disponibilidad y revisión del cliente.
- Dividir textos extensos en piezas más digeribles cuando tenga sentido.
- No fabricar historias, testimonios, credenciales ni afirmaciones de resultados.
- Los contenidos de salud, seguridad y actividades con jóvenes requieren revisión del cliente.

## SEO / AEO / GEO

- Títulos y descripciones únicos por página e idioma.
- Estructura semántica de encabezados.
- URLs legibles.
- Sitemap XML y robots.txt.
- Open Graph/social previews.
- Datos estructurados solo cuando correspondan y los datos sean verídicos.
- Enlaces internos entre servicios, eventos y artículos.
- Optimización de imágenes, texto alternativo descriptivo y carga eficiente.
- Respuestas claras a preguntas frecuentes cuando existan respuestas aprobadas.
- No prometer posicionamiento ni tráfico específico.

## Auditoría de contenido

Durante la fase inicial:
1. Inventariar las páginas existentes.
2. Identificar imágenes, logos, flyers y videos.
3. Mapear URLs antiguas a nuevas rutas.
4. Registrar qué contenido se conserva, reescribe, traduce o elimina.
5. Identificar redirecciones necesarias.
6. Marcar cada contenido faltante como pendiente; no inventarlo.
