/* ==========================================================================
   Test de Estilos de Aprendizaje (Kolb) — lógica de calificación
   Funciones puras: no tocan la página. Se usan en index.html y en las pruebas.
   ========================================================================== */
(function (raiz, fabrica) {
  if (typeof module !== "undefined" && module.exports) {
    module.exports = fabrica(require("./datos_kolb.js"));
  } else {
    raiz.ModeloKolb = fabrica({ COLUMNAS, CLAVES, CORTES, BANDAS, FILAS });
  }
})(typeof self !== "undefined" ? self : this, function (D) {
  "use strict";

  /* Una fila está completa si usa 4, 3, 2 y 1 exactamente una vez. */
  function filaCompleta(rangos) {
    if (!Array.isArray(rangos) || rangos.length !== 4) return false;
    return [1, 2, 3, 4].every(function (n) {
      return rangos.filter(function (v) { return v === n; }).length === 1;
    });
  }

  function respuestasCompletas(respuestas) {
    return D.FILAS.every(function (f) { return filaCompleta(respuestas[f.id]); });
  }

  /*
   * Ubicación de cada estilo según la teoría de Kolb:
   *   CA−EC > 0 → polo abstracto (Pensar)   ·  CA−EC < 0 → polo concreto (Sentir)
   *   EA−OR > 0 → polo activo (Hacer)       ·  EA−OR < 0 → polo reflexivo (Observar)
   *
   *   Divergente  = concreto + reflexivo   (EC + OR)
   *   Asimilador  = abstracto + reflexivo  (CA + OR)
   *   Convergente = abstracto + activo     (CA + EA)
   *   Acomodador  = concreto + activo      (EC + EA)
   */
  function estiloPorSignos(dy, dx) {
    var abstracto = dy > 0, activo = dx > 0;
    if (dy === 0 && dx === 0) return ["divergente", "asimilador", "convergente", "acomodador"];
    if (dy === 0) return activo ? ["acomodador", "convergente"] : ["divergente", "asimilador"];
    if (dx === 0) return abstracto ? ["asimilador", "convergente"] : ["divergente", "acomodador"];
    if (abstracto) return [activo ? "convergente" : "asimilador"];
    return [activo ? "acomodador" : "divergente"];
  }

  function calificar(respuestas) {
    if (!respuestasCompletas(respuestas)) {
      throw new Error("Las respuestas están incompletas o tienen números repetidos.");
    }

    var puntajes = {};
    Object.keys(D.CLAVES).forEach(function (modo) {
      var col = D.COLUMNAS.indexOf(modo);
      puntajes[modo] = D.CLAVES[modo].reduce(function (suma, filaId) {
        return suma + respuestas[filaId][col];
      }, 0);
    });

    var caEc = puntajes.CA - puntajes.EC;
    var eaOr = puntajes.EA - puntajes.OR;
    var dy = caEc - D.CORTES.CA_EC;
    var dx = eaOr - D.CORTES.EA_OR;
    var estilos = estiloPorSignos(dy, dx);
    var tipo = estilos.length === 1 ? "estilo" : (estilos.length === 2 ? "frontera" : "centro");
    var distancia = Math.hypot(dx, dy);

    var banda = null;
    if (tipo === "estilo") {
      for (var i = 0; i < D.BANDAS.length; i++) {
        if (distancia <= D.BANDAS[i].hasta) { banda = D.BANDAS[i].texto; break; }
      }
    }

    return {
      puntajes: puntajes,
      caEc: caEc,
      eaOr: eaOr,
      estilos: estilos,
      tipo: tipo,
      distancia: Math.round(distancia * 10) / 10,
      banda: banda
    };
  }

  /* Texto corto para guardar en la base de datos o en el CSV. */
  function etiquetaEstilo(resultado, catalogoEstilos) {
    var nombres = resultado.estilos.map(function (e) { return catalogoEstilos[e].nombre; });
    if (resultado.tipo === "estilo") return nombres[0];
    if (resultado.tipo === "frontera") return "Frontera " + nombres.join("/");
    return "Equilibrado";
  }

  return {
    filaCompleta: filaCompleta,
    respuestasCompletas: respuestasCompletas,
    calificar: calificar,
    estiloPorSignos: estiloPorSignos,
    etiquetaEstilo: etiquetaEstilo
  };
});
