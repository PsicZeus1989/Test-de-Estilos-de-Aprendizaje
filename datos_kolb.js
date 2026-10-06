/* ==========================================================================
   Test de Estilos de Aprendizaje (Kolb) — datos del instrumento
   Unidad de Servicios Psicopedagógicos · UNACAR

   Aquí vive TODO el contenido editable: catálogo de facultades, reactivos,
   claves de calificación, puntos de corte y textos de interpretación.
   La lógica de cálculo está en modelo_kolb.js y la interfaz en index.html.
   ========================================================================== */

/* --------------------------------------------------------------------------
   Catálogo de facultades y programas educativos (modalidad presencial).
   Tomado de unacar.mx/ofertaeducativa/licenciatura.php. Si cambia un nombre
   o se abre/cierra un programa, edítalo aquí: el desplegable se genera solo.
   -------------------------------------------------------------------------- */
const FACULTADES = {
  "Facultad de Derecho": [
    "Derecho",
    "Criminología y Criminalística"
  ],
  "Facultad de Ciencias Económicas Administrativas": [
    "Administración de Empresas",
    "Contaduría",
    "Administración Turística",
    "Mercadotecnia",
    "Negocios Internacionales"
  ],
  "Facultad de Ciencias Educativas": [
    "Educación",
    "Lengua Inglesa",
    "Comunicación y Gestión Cultural"
  ],
  "Facultad de Química": [
    "Ingeniería Química",
    "Ingeniería Petrolera",
    "Ingeniería Geológica"
  ],
  "Facultad de Ciencias de la Información": [
    "Ingeniería en Sistemas Computacionales",
    "Ingeniería en Diseño Multimedia",
    "Ingeniería en Tecnologías de Cómputo y Comunicaciones"
  ],
  "Facultad de Ingeniería y Arquitectura": [
    "Ingeniería Mecatrónica",
    "Ingeniería Civil",
    "Ingeniería Mecánica",
    "Ingeniería Geofísica",
    "Ingeniería en Energía",
    "Arquitectura Sustentable"
  ],
  "Facultad de Ciencias de la Salud": [
    "Educación Física y Deporte",
    "Enfermería",
    "Nutrición",
    "Psicología",
    "Fisioterapia",
    "Medicina"
  ],
  "Facultad de Ciencias Naturales y Exactas": [
    "Biología Marina"
  ]
};

/* --------------------------------------------------------------------------
   Los cuatro modos del ciclo de aprendizaje de Kolb.
   El orden de COLUMNAS es el orden de las opciones dentro de cada fila:
   columna 1 = EC, columna 2 = OR, columna 3 = CA, columna 4 = EA.
   -------------------------------------------------------------------------- */
const COLUMNAS = ["EC", "OR", "CA", "EA"];

const MODOS = {
  EC: { corto: "Sentir",   nombre: "Experiencia concreta",        color: "#c4553f", que: "Vivir la experiencia: aprender involucrándote, sintiendo y relacionándote con las personas." },
  OR: { corto: "Observar", nombre: "Observación reflexiva",       color: "#1f8a9e", que: "Reflexionar: mirar con calma, escuchar y considerar distintos puntos de vista antes de opinar." },
  CA: { corto: "Pensar",   nombre: "Conceptualización abstracta", color: "#0b4f6c", que: "Conceptualizar: entender las ideas, ordenarlas con lógica y construir explicaciones." },
  EA: { corto: "Hacer",    nombre: "Experimentación activa",      color: "#3c7a4e", que: "Experimentar: probar en la práctica, aplicar lo aprendido y aprender del resultado." }
};

/* --------------------------------------------------------------------------
   Reactivos: 9 filas (A–I) con 4 opciones cada una, en el orden de COLUMNAS.
   Redacción tomada de la versión en papel de la USP.

   CORRECCIÓN: en la versión en papel, la fila B repetía "Analíticamente"
   en las columnas 3 y 4. En el inventario original de Kolb (1976) la cuarta
   opción de esa fila es "impartial" (imparcialmente). Se restituyó.
   Esa celda no se califica (EA no puntúa en la fila B), así que el cambio
   no altera ningún puntaje; solo evita que el alumno ordene dos opciones
   idénticas.
   -------------------------------------------------------------------------- */
const FILAS = [
  { id: "A", opciones: [
    { t: "Discriminando",  d: "Distinguiendo una cosa de otra." },
    { t: "Ensayando",      d: "Para mejor uso posterior." },
    { t: "Comprometiéndome", d: "Involucrándome." },
    { t: "Practicando",    d: "Poniendo en práctica lo aprendido." }
  ]},
  { id: "B", opciones: [
    { t: "Receptivamente", d: "Me fijo principalmente en lo que recibo." },
    { t: "Apropiadamente", d: "Acomodándome al objetivo que tengo." },
    { t: "Analíticamente", d: "Descomponiendo el todo en sus partes." },
    { t: "Imparcialmente", d: "Sin tomar partido, considerando todo por igual." }
  ]},
  { id: "C", opciones: [
    { t: "Sintiendo",  d: "Experimentando sensaciones." },
    { t: "Observando", d: "Examinando atentamente." },
    { t: "Pensando",   d: "Examinando con cuidado para hacerme una idea." },
    { t: "Haciendo",   d: "Realizando actividades." }
  ]},
  { id: "D", opciones: [
    { t: "Aceptando",         d: "Aprobando, dando por correcto." },
    { t: "Corriendo riesgos", d: "Exponiéndome a fallar." },
    { t: "Cuidadosamente",    d: "Examinando el valor de los contenidos." },
    { t: "Evaluando",         d: "Fijándome si las ideas son ciertas o correctas." }
  ]},
  { id: "E", opciones: [
    { t: "Intuitivamente",  d: "Teniendo percepciones tal como si las viviera." },
    { t: "Productivamente", d: "Con resultados a la vista." },
    { t: "Lógicamente",     d: "Descubriendo de modo lógico." },
    { t: "Interrogando",    d: "Preguntando a quien sabe más." }
  ]},
  { id: "F", opciones: [
    { t: "En forma abstracta", d: "Separando lo esencial de las cualidades." },
    { t: "Observando",         d: "Examinando atentamente los detalles." },
    { t: "Concretamente",      d: "Dedicándome a lo esencial o a lo importante." },
    { t: "Activamente",        d: "Realizando, trabajando, manipulando todo." }
  ]},
  { id: "G", opciones: [
    { t: "Orientándome al presente", d: "Lo aprendido me servirá ahora." },
    { t: "Reflexivamente",           d: "Considerando detenidamente." },
    { t: "Orientándome al futuro",   d: "Lo aprendido me servirá después." },
    { t: "Pragmáticamente",          d: "Buscando efectos o usos prácticos." }
  ]},
  { id: "H", opciones: [
    { t: "Viviendo las situaciones", d: "" },
    { t: "Observando",               d: "" },
    { t: "Conceptualizando",         d: "Definiendo las cosas." },
    { t: "Diseñando formas de probar las ideas", d: "" }
  ]},
  { id: "I", opciones: [
    { t: "Afectivamente",    d: "Siendo estimulado por las emociones." },
    { t: "Reservadamente",   d: "Con cautela y sin manifestación externa." },
    { t: "Racionalmente",    d: "Discerniendo con la razón lo verdadero de lo falso." },
    { t: "Responsablemente", d: "Obligándome a responder concretamente." }
  ]}
];

/* --------------------------------------------------------------------------
   Claves de calificación (idénticas a la hoja en papel y al LSI de 1976).
   Cada modo suma 6 filas → rango de 6 a 24. Las celdas no listadas son
   distractores del instrumento original y no puntúan.
   -------------------------------------------------------------------------- */
const CLAVES = {
  EC: ["B", "C", "D", "E", "G", "H"],
  OR: ["A", "C", "F", "G", "H", "I"],
  CA: ["B", "C", "D", "E", "H", "I"],
  EA: ["A", "C", "F", "G", "H", "I"]
};

/* --------------------------------------------------------------------------
   Puntos de corte para clasificar el estilo.
   La hoja en papel usa 0 en ambos ejes y así se dejó. Kolb clasificaba con
   la mediana de su muestra normativa, no con 0; si la USP llega a calcular
   medianas locales con los datos recolectados, se cambian aquí y la gráfica
   y la clasificación se ajustan solas.
   -------------------------------------------------------------------------- */
const CORTES = { CA_EC: 0, EA_OR: 0 };

/* Distancia al centro (en puntos) para describir qué tan definido es el estilo.
   Son rangos descriptivos, no normas. */
const BANDAS = [
  { hasta: 4,        texto: "Tu punto está cerca del centro: combinas los cuatro modos de forma bastante equilibrada, con una ligera inclinación hacia este estilo." },
  { hasta: 10,       texto: "Tienes una preferencia moderada por este estilo." },
  { hasta: Infinity, texto: "Tienes una preferencia marcada por este estilo." }
];

/* --------------------------------------------------------------------------
   Interpretación de los estilos (Kolb, 1984). Redacción propia de la USP,
   dirigida al estudiante.
   -------------------------------------------------------------------------- */
const ESTILOS = {
  divergente: {
    nombre: "Divergente",
    combina: ["EC", "OR"],
    fortalecer: ["CA", "EA"],
    resumen: "Aprendes mejor cuando vives una situación concreta y te das tiempo para mirarla desde distintos ángulos. Tu fortaleza principal es la imaginación: generas muchas ideas y alternativas, y captas con facilidad lo que sienten y piensan las personas.",
    fortalezas: [
      "Ves un mismo problema desde varias perspectivas",
      "Generas ideas y alternativas con facilidad",
      "Eres sensible a las personas y a los significados",
      "Te interesan temas amplios y culturales"
    ],
    reto: "Puede costarte elegir entre tantas opciones, pasar a la acción u ordenar tus ideas en una explicación teórica.",
    estrategias: [
      "Comentar el tema en grupo antes de estudiarlo a solas",
      "Analizar casos reales desde distintos puntos de vista",
      "Hacer mapas mentales o conceptuales",
      "Llevar un breve diario de lo que observaste y aprendiste",
      "Relacionar cada tema con ejemplos y experiencias propias"
    ],
    ampliar: "Para completar el ciclo, practica Pensar (resume la idea central en un esquema o una definición) y Hacer (ponte una fecha y aplica lo aprendido en un ejercicio)."
  },
  asimilador: {
    nombre: "Asimilador",
    combina: ["CA", "OR"],
    fortalecer: ["EC", "EA"],
    resumen: "Aprendes mejor cuando puedes reflexionar sobre la información y organizarla en explicaciones lógicas. Tu fortaleza es construir modelos: reúnes observaciones dispersas y las integras en una idea coherente.",
    fortalezas: [
      "Integras información diversa en una explicación clara",
      "Razonas de los casos particulares a la regla general",
      "Eres ordenado y riguroso con las ideas",
      "Disfrutas la teoría y la investigación"
    ],
    reto: "Puede costarte llevar la teoría a la práctica, actuar con poca información o manejar lo imprevisto y lo emocional.",
    estrategias: [
      "Leer y tomar apuntes estructurados",
      "Hacer resúmenes, cuadros comparativos y esquemas",
      "Aprovechar clases expositivas y conferencias",
      "Investigar más allá de lo que se vio en clase",
      "Darte tiempo para pensar antes de responder"
    ],
    ampliar: "Para completar el ciclo, practica Hacer (resuelve un caso o ejercicio aplicado sin esperar a dominar toda la teoría) y Sentir (participa en prácticas, visitas o actividades donde vivas el tema)."
  },
  convergente: {
    nombre: "Convergente",
    combina: ["CA", "EA"],
    fortalecer: ["EC", "OR"],
    resumen: "Aprendes mejor cuando aplicas las ideas a problemas concretos. Tu fortaleza es encontrarle uso práctico a la teoría y tomar decisiones; rindes especialmente bien cuando hay una respuesta o solución clara que encontrar.",
    fortalezas: [
      "Aplicas la teoría para resolver problemas",
      "Tomas decisiones con rapidez",
      "Planteas hipótesis y las pones a prueba",
      "Te sientes cómodo con tareas técnicas"
    ],
    reto: "Puede costarte considerar muchas alternativas, tolerar la ambigüedad o atender los aspectos interpersonales y emocionales de un tema.",
    estrategias: [
      "Resolver ejercicios y problemas de práctica",
      "Prácticas de laboratorio y simulaciones",
      "Proyectos con objetivos claros",
      "Buscar un ejemplo de aplicación para cada concepto",
      "Comprobar lo aprendido con autoevaluaciones"
    ],
    ampliar: "Para completar el ciclo, practica Observar (antes de resolver, describe el problema desde otros ángulos) y Sentir (comenta el tema con compañeros y escucha sus experiencias)."
  },
  acomodador: {
    nombre: "Acomodador",
    combina: ["EC", "EA"],
    fortalecer: ["CA", "OR"],
    resumen: "Aprendes mejor involucrándote directamente: haciendo, probando y viviendo experiencias nuevas. Tu fortaleza es llevar los planes a la acción y adaptarte a lo que pide cada situación.",
    fortalezas: [
      "Aprendes haciendo y por ensayo y error",
      "Te adaptas rápido a situaciones nuevas",
      "Tomas la iniciativa y te arriesgas",
      "Trabajas con facilidad con otras personas"
    ],
    reto: "Puede costarte detenerte a planear, revisar con calma antes de actuar o sustentar tus decisiones en la teoría; a veces te apoyas más en lo que otros te dicen que en tu propio análisis.",
    estrategias: [
      "Prácticas, proyectos y trabajo de campo",
      "Trabajo en equipo y discusión en clase",
      "Explicarle el tema a alguien más",
      "Aprender con casos reales y retos",
      "Probar, equivocarte y corregir con retroalimentación"
    ],
    ampliar: "Para completar el ciclo, practica Observar (antes de actuar, anota qué funcionó y qué no) y Pensar (relaciona lo que hiciste con el concepto o la teoría que lo explica)."
  }
};

const EQUILIBRADO = {
  nombre: "Perfil equilibrado",
  resumen: "Tu punto cae justo en el centro de la gráfica: tus preferencias por sentir, observar, pensar y hacer están balanceadas. Eso significa que puedes moverte con relativa facilidad entre los cuatro modos del ciclo de aprendizaje y elegir el que pida cada materia o tarea."
};

/* Preguntas de reflexión al final del resultado. */
const REFLEXION = [
  "¿En qué materias te sientes más cómodo(a) y en cuáles te cuesta más? ¿Tiene que ver con tu estilo?",
  "¿Qué estrategia de estudio de tu resultado puedes probar esta semana?",
  "Cuando una materia se te complica, ¿qué parte del ciclo te falta: vivirla, reflexionarla, entenderla o practicarla?",
  "¿Qué modo de aprender usas menos y en qué materia podrías practicarlo?"
];

const VERSION_INSTRUMENTO = "kolb-lsi1976-es-usp-v1";

/* Permite usar este archivo también desde Node (pruebas automáticas). */
if (typeof module !== "undefined" && module.exports) {
  module.exports = { FACULTADES, COLUMNAS, MODOS, FILAS, CLAVES, CORTES, BANDAS, ESTILOS, EQUILIBRADO, REFLEXION, VERSION_INSTRUMENTO };
}
