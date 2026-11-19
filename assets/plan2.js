(function () {
  "use strict";
  var CFG = window.PZ_CONFIG || {};
  var q = new URLSearchParams(location.search);
  var name = (q.get("n") || "").slice(0, 40);
  var m = q.get("m");
  var MID = { m1: 600, m2: 2000, m3: 5500, m4: 9000 };
  function $(s) { return document.querySelector(s); }
  function $$(s) { return Array.prototype.slice.call(document.querySelectorAll(s)); }
  function fmt(n) { return "$" + Math.round(n).toLocaleString("en-US"); }

  if (name) { $(".js-for").textContent = "Preparado para " + name; $(".js-for").hidden = false; }
  if (MID[m]) {
    var gap = Math.max(0, 10000 - MID[m]);
    $(".js-gap").innerHTML = gap > 1500
      ? "Estás a unos <b>" + fmt(gap) + " al mes</b> de tus $10K. Seis meses igual son <b>" + fmt(gap * 6) + "</b> que no entran. Este plan ataca justo lo que te los está costando."
      : "Ya estás cerca de los $10K. A este nivel la distancia no es volumen: es que funcione sin que tú empujes cada venta.";
    $(".js-gapbox").hidden = false;
  }

  // links
  if (CFG.calUrl) $$(".js-cal").forEach(function (a) { a.href = CFG.calUrl; });
  var waEls = $$(".js-wa");
  if (CFG.whatsapp) {
    var fase = document.body.dataset.fase, fn = document.body.dataset.nombre;
    var txt = (name ? "Hola, soy " + name + ". " : "Hola. ") + "Leí mi plan de la fase " + fase + " (" + fn + ") y tengo una duda: ";
    waEls.forEach(function (a) { a.href = "https://wa.me/" + encodeURIComponent(CFG.whatsapp) + "?text=" + encodeURIComponent(txt); });
  } else waEls.forEach(function (a) { a.hidden = true; });

  // reveal
  var rv = $$(".rv");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }); }, { rootMargin: "0px 0px -8% 0px" });
    rv.forEach(function (el) { io.observe(el); });
  } else rv.forEach(function (el) { el.classList.add("in"); });

  // progreso + CTA flotante
  var bar = $(".progress"), sticky = $(".sticky-cta"), close = $(".close2");
  function onScroll() {
    var h = document.documentElement, p = h.scrollTop / Math.max(1, h.scrollHeight - h.clientHeight);
    if (bar) bar.style.width = (p * 100) + "%";
    if (sticky && close) {
      var r = close.getBoundingClientRect();
      sticky.classList.toggle("on", p > 0.25 && r.top > window.innerHeight);
    }
  }
  window.addEventListener("scroll", onScroll, { passive: true }); onScroll();

  // te suena
  var taps = $$(".taps.suena button"), tapres = $(".tapres");
  var MSG = ["", "Una ya es una señal.", "Dos. No es casualidad.", "Tres. Este plan es para ti.", "Cuatro. Llevas tiempo aquí, ¿verdad?", "Las cinco. Lee todo con calma: esto lo escribimos pensando en ti."];
  taps.forEach(function (b) { b.addEventListener("click", function () {
    b.setAttribute("aria-pressed", b.getAttribute("aria-pressed") !== "true");
    var n = taps.filter(function (x) { return x.getAttribute("aria-pressed") === "true"; }).length;
    tapres.textContent = MSG[Math.min(n, 5)] || "";
  }); });

  // creencias
  $$(".belief").forEach(function (b) { b.addEventListener("click", function () { b.classList.toggle("open"); b.setAttribute("aria-expanded", b.classList.contains("open")); }); });

  // semanas
  $$(".wk > button").forEach(function (b, i) {
    var wk = b.parentNode; if (i === 0) { wk.classList.add("open"); b.setAttribute("aria-expanded", "true"); }
    b.addEventListener("click", function () { wk.classList.toggle("open"); b.setAttribute("aria-expanded", wk.classList.contains("open")); });
  });

  // calculadora
  var pr = $("#c-price"), cr = $("#c-close");
  function calc() {
    var price = +pr.value, close = +cr.value / 100;
    var sales = Math.ceil(10000 / price), calls = Math.ceil(sales / close);
    $("#o-price").textContent = fmt(price); $("#o-close").textContent = Math.round(close * 100) + "%";
    $("#r-sales").textContent = sales; $("#r-calls").textContent = calls; $("#r-week").textContent = Math.ceil(calls / 4.3);
    $("#r-say").innerHTML = "Para tus $10K necesitas <b>" + sales + " " + (sales === 1 ? "venta" : "ventas") + "</b> al mes. Con un cierre de " + Math.round(close * 100) + "% son <b>" + calls + " llamadas</b>: unas " + Math.ceil(calls / 4.3) + " por semana. " +
      (price < 800 ? "Fíjate cuántas llamadas pide un precio bajo: cobrar poco no te hace vender más fácil, te hace necesitar más gente." : "No necesitas una audiencia gigante. Necesitas que esas pocas personas lleguen calificadas.");
  }
  if (pr && cr) { pr.addEventListener("input", calc); cr.addEventListener("input", calc); calc(); }

  // checklist
  var cks = $$(".checks2 .taps button"), meter = $(".meter i"), mt = $(".meter-t");
  cks.forEach(function (b) { b.addEventListener("click", function () {
    var n = cks.filter(function (x) { return x.getAttribute("aria-pressed") === "true"; }).length;
    meter.style.width = (n / cks.length * 100) + "%";
    mt.textContent = n === cks.length ? "Listo. Pasaste de fase." : n + " de " + cks.length + ". Si falta una, sigues aquí.";
  }); });
})();
