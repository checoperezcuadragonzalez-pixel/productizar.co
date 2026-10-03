(function () {
  "use strict";
  var CFG = window.PZ_CONFIG || {};
  var p = new URLSearchParams(location.search);
  var name = (p.get("n") || "").slice(0, 40);
  var goal = (p.get("g") || "").slice(0, 160);
  var m = p.get("m");
  var MID = { m1: 600, m2: 2000, m3: 5500, m4: 9000 };
  var fase = document.body.dataset.fase;

  function fmt(n) { return "$" + n.toLocaleString("en-US"); }

  if (name) {
    var f = document.querySelector(".js-for");
    f.textContent = "Preparado para " + name;
    f.hidden = false;
    document.title = "Plan 10K de " + name + " · Fase 0" + fase + " · /productizar";
  }

  var any = false;
  if (goal) {
    document.querySelector(".js-goal").textContent = "“" + goal + "”";
    document.querySelector(".js-goal-wrap").hidden = false;
    any = true;
  }
  if (MID[m]) {
    var gap = Math.max(0, 10000 - MID[m]);
    document.querySelector(".js-gap").textContent = gap > 1500
      ? "Unos " + fmt(gap) + " al mes entre donde estás y tus 10K. Seis meses sin moverte son " + fmt(gap * 6) + " que no entran. Este plan ataca lo que te los está costando."
      : "Estás cerca de los 10K. A este nivel la distancia ya no es volumen: es que funcione sin que tú empujes cada venta.";
    document.querySelector(".js-gap-wrap").hidden = false;
    any = true;
  }
  if (any) document.querySelector(".js-personal").hidden = false;

  if (CFG.calUrl) document.querySelectorAll(".js-cal").forEach(function (a) { a.href = CFG.calUrl; });

  document.querySelectorAll(".js-print").forEach(function (b) {
    b.addEventListener("click", function () { window.print(); });
  });
})();
