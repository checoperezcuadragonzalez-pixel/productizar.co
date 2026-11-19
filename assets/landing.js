(function () {
  "use strict";
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var CFG = window.PZ_CONFIG || {};

  // Link de agenda
  if (CFG.calUrl) $$(".js-cal").forEach(function (a) { a.href = CFG.calUrl; });

  // Tabs de la ventana de producto
  $$(".seg button").forEach(function (b) {
    b.addEventListener("click", function () {
      $$(".seg button").forEach(function (x) { x.setAttribute("aria-selected", x === b ? "true" : "false"); });
      $$(".panel").forEach(function (p) { p.hidden = p.id !== b.dataset.t; });
    });
  });

  // Checklist de ejemplo
  $$(".chk button").forEach(function (b) {
    b.addEventListener("click", function () { b.setAttribute("aria-pressed", b.getAttribute("aria-pressed") === "true" ? "false" : "true"); });
  });

  // Calculadora
  var rng = $("#crange"), price = $("#cprice"), res = $("#cres");
  function fmt(n) { return "$" + n.toLocaleString("en-US"); }
  function calc() {
    var v = +rng.value, n = Math.ceil(10000 / v);
    price.innerHTML = fmt(v) + "<small>USD</small>";
    res.innerHTML = "Para llegar a <b>$10K</b> necesitas <b>" + n + (n === 1 ? " venta" : " ventas") + "</b>.";
  }
  if (rng) { rng.addEventListener("input", calc); calc(); }

  // Nav: aparece el botón al bajar
  var pill = $("#navpill");
  function nav() { var l = $("#landing"); if (pill) pill.classList.toggle("show", window.scrollY > 420 && !!l && !l.hidden); }
  window.addEventListener("scroll", nav, { passive: true }); nav();

  // Reveal
  var els = $$(".rv");
  if (!("IntersectionObserver" in window)) { els.forEach(function (e) { e.classList.add("in"); }); return; }
  var io = new IntersectionObserver(function (en) {
    en.forEach(function (x) { if (x.isIntersecting) { x.target.classList.add("in"); io.unobserve(x.target); } });
  }, { threshold: 0.12, rootMargin: "0px 0px -6% 0px" });
  els.forEach(function (e) { io.observe(e); });
})();


/* ---- luz que sigue al cursor + stagger curvo ---- */
(function () {
  "use strict";
  var fine = window.matchMedia && window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var rvs = document.querySelectorAll(".rv");
  Array.prototype.forEach.call(rvs, function (el) {
    if (el.style.getPropertyValue("--d")) return;
    var sib = Array.prototype.filter.call(el.parentNode.children, function (c) { return c.classList.contains("rv"); });
    var i = sib.indexOf(el); if (i > 0) el.style.setProperty("--d", Math.min(i * 90, 450) + "ms");
  });
  if (!fine || reduce) return;
  var light = document.querySelector(".cursor-light"), ring = document.querySelector(".final-cta .ring");
  var tx = innerWidth / 2, ty = innerHeight / 3, x = tx, y = ty, ticking = false, cards = [];
  function collect() { cards = Array.prototype.slice.call(document.querySelectorAll(".g")); }
  collect(); setTimeout(collect, 1200);
  addEventListener("pointermove", function (e) { tx = e.clientX; ty = e.clientY; if (light) light.classList.add("on"); if (!ticking) { ticking = true; requestAnimationFrame(tick); } }, { passive: true });
  document.addEventListener("pointerleave", function () { if (light) light.classList.remove("on"); });
  function tick() {
    x += (tx - x) * .14; y += (ty - y) * .14;
    if (light) light.style.transform = "translate3d(" + x + "px," + y + "px,0)";
    var vh = innerHeight;
    for (var i = 0; i < cards.length; i++) {
      var c = cards[i], r = c.getBoundingClientRect();
      if (r.bottom < -300 || r.top > vh + 300) continue;
      var dx = Math.max(r.left - x, 0, x - r.right), dy = Math.max(r.top - y, 0, y - r.bottom);
      var near = Math.max(0, 1 - Math.hypot(dx, dy) / 280);
      c.style.setProperty("--mx", (x - r.left) + "px"); c.style.setProperty("--my", (y - r.top) + "px"); c.style.setProperty("--near", near.toFixed(3));
    }
    if (ring) { ring.style.setProperty("--rx", ((x / innerWidth - .5) * 14).toFixed(1) + "px"); ring.style.setProperty("--ry", ((y / vh - .5) * 10).toFixed(1) + "px"); }
    if (Math.abs(tx - x) > .4 || Math.abs(ty - y) > .4) requestAnimationFrame(tick); else ticking = false;
  }
})();

/* ---- carrusel de fases ---- */
(function () {
  var car = document.getElementById("car"); if (!car) return;
  var cards = [].slice.call(car.querySelectorAll(".ph-card")), n = cards.length, cur = 0, t;
  var dots = car.querySelector(".car-dots");
  cards.forEach(function () { dots.appendChild(document.createElement("i")); });
  var ds = [].slice.call(dots.children);
  function render() {
    var w = Math.min(car.offsetWidth, 900);
    cards.forEach(function (c, i) {
      var d = ((i - cur) % n + n) % n; if (d > n / 2) d -= n;
      var x = d * Math.min(w * .42, 380), s = 1 - Math.min(Math.abs(d), 2) * .12;
      c.style.transform = "translateX(" + x + "px) scale(" + s + ")";
      c.style.opacity = Math.abs(d) > 1 ? 0 : (d === 0 ? 1 : .35);
      c.style.zIndex = 10 - Math.abs(d);
      c.style.pointerEvents = Math.abs(d) > 1 ? "none" : "auto";
      c.classList.toggle("on", d === 0);
    });
    ds.forEach(function (x, i) { x.classList.toggle("on", i === cur); });
  }
  function go(k) { cur = (k + n) % n; render(); restart(); }
  function restart() { clearInterval(t); t = setInterval(function () { go(cur + 1); }, 3800); }
  car.querySelectorAll(".car-btn").forEach(function (b) { b.addEventListener("click", function () { go(cur + +b.dataset.d); }); });
  cards.forEach(function (c, i) { c.addEventListener("click", function () { go(i); }); });
  var sx = null;
  car.addEventListener("pointerdown", function (e) { sx = e.clientX; });
  car.addEventListener("pointerup", function (e) { if (sx !== null && Math.abs(e.clientX - sx) > 40) go(cur + (e.clientX < sx ? 1 : -1)); sx = null; });
  addEventListener("resize", render);
  render(); restart();
})();
