# Sistema de diseño

## Dirección visual

- Minimalista, editorial, cálida y relacionada con naturaleza, coaching y yoga.
- Priorizar fotografías auténticas y flyers de NODNAL.
- Evitar estética genérica de plantilla, exceso de gradientes, animaciones innecesarias y ornamentos que compitan con el contenido.
- Revisar el sitio actual y las referencias del cliente antes de cerrar decisiones visuales.

## Paleta inicial

- Morado: candidato a color de marca.
- Durazno: candidato a acento cálido.
- Turquesa: descartado como color principal por decisión preliminar.
- Definir tonos concretos, neutros, fondos y colores semánticos tras auditar assets y probar contraste.
- No elegir valores hex definitivos sin evaluación visual.

## Tipografía

- Elegir una familia legible para cuerpo y una jerarquía clara para encabezados.
- Incluir fallback fonts y evitar depender de fuentes remotas bloqueantes.
- Los controles de idioma y tema no deben cambiar inesperadamente el tamaño base de texto.

## Componentes

- Header responsive.
- Toggle ES/EN.
- Toggle Light/Dark.
- Hero.
- EventCard con anverso/reverso.
- EventList y CalendarView.
- EventDetail.
- RegistrationModal.
- FormField, ErrorMessage y SuccessState.
- StatusBadge para estados de inscripción/pago.
- AdminTable/List.
- ArticleCard y ArticleLayout.
- ContactForm.
- Footer.

## Flyers y animación flip

- La tarjeta gira alrededor del eje X para mostrar el reverso.
- `More Info` es un control real, no solo un efecto hover.
- Debe ser operable con teclado y toque.
- Mantener la lectura en lectores de pantalla y evitar que ambas caras se anuncien simultáneamente.
- Respetar `prefers-reduced-motion`.
- Evitar que la cara trasera corte contenido; permitir expansión/altura suficiente.
- El CTA de inscripción debe ser visible y no quedar detrás de la tarjeta.

## Modal

- Anchura amplia en escritorio y casi todo el viewport en móvil, conservando margen y cierre visible.
- Foco administrado correctamente.
- Scroll interno cuando el contenido excede la altura.
- Fondo y contraste coherentes con Light/Dark.
- Evitar scroll de fondo mientras está abierto.

## Responsive

Validar como mínimo:
- móvil estrecho (320–375 px),
- móvil común,
- tablet,
- escritorio,
- escritorio ancho.

## Accesibilidad

Aunque el alcance visual explícito incluye solo idioma y tema, las interfaces deben conservar:
- navegación por teclado,
- foco visible,
- etiquetas de formulario,
- mensajes de error asociados a campos,
- contraste legible,
- texto alternativo para imágenes informativas,
- estructura semántica,
- alternativa a animaciones y gestos.
