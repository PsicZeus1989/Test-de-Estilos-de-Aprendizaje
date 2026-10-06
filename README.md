# Test de Estilos de Aprendizaje (Kolb) — USP UNACAR

Versión en línea del Test de Estilos de Aprendizaje basado en el inventario
de David A. Kolb, con el mismo diseño y funcionamiento que la **Guía de
Orientación Vocacional**: cabecera con los tres logos, barra de avance,
consentimiento, resultados en pantalla, archivo de respuestas, reporte
imprimible tamaño carta y envío a Supabase.

El estudiante pasa por 4 pasos: **Inicio → Tus datos → Cuestionario →
Resultados**. El cuestionario muestra los 9 grupos en 3 páginas; en cada
grupo el alumno toca las opciones de la que más a la que menos lo describe
(4, 3, 2 y la última recibe 1 automáticamente).

## Archivos

| Archivo | Qué hace |
|---|---|
| `index.html` | La página completa: diseño, pasos, resultados, reporte impreso y envío a Supabase. La configuración está al inicio del `<script>` (objeto `CONFIG`). |
| `datos_kolb.js` | Contenido editable: catálogo de programas, los 36 reactivos, claves de calificación, puntos de corte y textos de interpretación. |
| `modelo_kolb.js` | Cálculo de puntajes y clasificación del estilo. |
| `supabase-schema.sql` | Crea la tabla `estilos_aprendizaje_respuestas`. |
| `img/` | Los mismos tres logos de la Guía Vocacional (ver abajo). |

## Puesta en marcha

1. **Logos.** Copia la carpeta `img/` de la Guía Vocacional (contiene
   `logo_unacar.png`, `logo_dgse.png` y `logo_usp.png`). Si falta algún logo,
   la página simplemente no lo muestra.
2. **Supabase.** `index.html` ya apunta al **mismo proyecto de la Guía
   Vocacional**, con una tabla nueva. Antes de publicar, entra a ese proyecto,
   abre **SQL Editor → New query**, pega `supabase-schema.sql` y presiona
   **Run**. Si no creas la tabla, el test funciona igual para el alumno, pero
   las respuestas no se guardan.
   - Para usar otro proyecto, cambia `url` y `anonKey` en `CONFIG.supabase`.
   - Para no guardar nada, pon `enabled: false`: también se oculta la casilla
     de consentimiento.
   - Nunca pongas ahí la llave `service_role` / `secret`.
3. **GitHub.** Sube todo a un repositorio y activa **Settings → Pages →
   Deploy from a branch → main / (root)**. La liga queda como
   `https://TU_USUARIO.github.io/TU_REPO/`.

Para probarlo en tu computadora basta con abrir `index.html`.

## Igual que en la Guía Vocacional

- **Consentimiento** con liga al aviso de privacidad de UNACAR; sin él no se
  puede continuar ni se envía nada. La tabla además rechaza filas sin
  consentimiento.
- **Las respuestas se conservan** si el alumno recarga la página, mientras no
  cierre la pestaña.
- **Archivo de respuestas:** el alumno (o tú) puede guardar un `.json` y
  abrirlo después desde la página de inicio para volver a ver el resultado. Un
  archivo abierto no se vuelve a enviar a Supabase.
- **Reporte en PDF:** tamaño carta, con encabezado institucional, tabla de
  datos, síntesis del estilo, gráfica, puntajes, descripción del estilo,
  preguntas de reflexión y el aviso de lectura. Sin firmas ni observaciones.
- **El aviso "no es una prueba diagnóstica"** aparece en cuatro lugares:
  inicio, resultados, PDF y pie de página.

## Correcciones respecto a la hoja en papel

1. **La gráfica de la hoja asigna el estilo opuesto.** Indica graficar
   CA − EC (positivo arriba) y EA − OR (positivo a la derecha), pero rotula los
   cuadrantes con la disposición clásica de Kolb, que tiene la experiencia
   concreta arriba y la experimentación activa a la izquierda. Resultado: cada
   alumno cae en el cuadrante diametralmente opuesto (quien puntúa alto en EC y
   OR, que la propia hoja define como Divergente, queda en "Convergente"). Aquí
   la gráfica usa la disposición de Kolb con los polos rotulados, y la
   clasificación es: CA − EC > 0 → abstracto; EA − OR > 0 → activo;
   abstracto + activo = Convergente, abstracto + reflexivo = Asimilador,
   concreto + reflexivo = Divergente, concreto + activo = Acomodador.
   **Si hay resultados en papel, conviene recalificarlos con esa regla.**
2. **Fila B:** "Analíticamente" aparecía dos veces. Se restituyó
   "Imparcialmente" (término del original). Esa casilla no se califica.
3. **Descripciones de los estilos:** reescritas con base en Kolb (1984). Las
   de la hoja mezclaban términos de otros modelos ("kinestésico") y se
   contradecían (el asimilador aparecía como inductivo y deductivo a la vez).

Las claves de calificación son las de la hoja y del inventario de 1976:

| Modo | Columna | Filas que suman |
|---|---|---|
| EC · Sentir | 1 | B, C, D, E, G, H |
| OR · Observar | 2 | A, C, F, G, H, I |
| CA · Pensar | 3 | B, C, D, E, H, I |
| EA · Hacer | 4 | A, C, F, G, H, I |

Si una resta da exactamente 0, el resultado se reporta como **frontera**
entre dos estilos; si ambas dan 0, como **perfil equilibrado**. Los puntos de
corte están en `CORTES` (`datos_kolb.js`); la hoja usa 0 y Kolb usaba la
mediana de su muestra, así que pueden ajustarse si algún día calculan
medianas con datos de UNACAR.

## Referencias

- Kolb, D. A. (1984). *Experiential Learning: Experience as the Source of
  Learning and Development*. Prentice Hall.
- Pashler, H., McDaniel, M., Rohrer, D., & Bjork, R. (2008). Learning styles:
  Concepts and evidence. *Psychological Science in the Public Interest, 9*(3),
  105–119.
