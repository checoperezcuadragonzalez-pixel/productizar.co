(function () {
  "use strict";
  var CFG = window.PZ_CONFIG || {};

  var QS = [
    { key: "q1", title: "¿Qué vendes hoy con lo que sabes?", help: "Con esto sabemos qué parte del plan te sirve y cuál te sobra.", options: [
      ["nada", "Nada todavía, aunque me preguntan seguido"],
      ["medida", "Asesorías o servicio a la medida: cada cliente es distinto"],
      ["curso", "Un curso o programa que lancé una vez"],
      ["producto", "Un producto con nombre y precio que vendo de forma continua"]] },
    { key: "q2", title: "¿Cuánto te entra al mes con esto?", help: "Es el dato que más cambia tu plan. Sé honesto: esto no lo ve nadie más.", options: [
      ["m1", "Menos de $1,000 USD"], ["m2", "Entre $1,000 y $3,000 USD"], ["m3", "Entre $3,000 y $8,000 USD"], ["m4", "Más de $8,000 USD"]] },
    { key: "q3", title: "Si alguien te pregunta qué vendes, ¿qué contestas?", help: "La primera respuesta que te sale, no la ideal.", options: [
      ["frase", "Una frase: a quién, qué resultado y cuánto cuesta"],
      ["depende", "Depende del cliente, y armo algo a la medida"],
      ["parrafo", "Un párrafo. Y a la mitad me doy cuenta de que no se entiende"]] },
    { key: "q4", title: "¿Cuánta gente te sigue o te escucha?", help: "Sumando tus cuentas. Si es poca, no pasa nada: tu plan no depende de eso.", options: [
      ["a1", "Menos de 5,000"], ["a2", "Entre 5,000 y 20,000"], ["a3", "Entre 20,000 y 50,000"], ["a4", "Más de 50,000"]] },
    { key: "q5", title: "¿De dónde te llegan los clientes hoy?", help: "Marca lo principal. Si es mezcla, lo que más te trae.", options: [
      ["contenido", "De mi contenido en redes"],
      ["dms", "De DMs y mensajes que mando yo"],
      ["referidos", "De referidos y mi red de contactos"],
      ["ninguno", "Todavía no tengo un canal que funcione"]] },
    { key: "q6", title: "¿Qué pasa cuando publicas?", help: "Lo que pasa de verdad, no lo que pasa en tu mejor mes.", options: [
      ["views", "Tengo views, pero casi no se convierten en ventas"],
      ["poco", "Pocas views y pocas ventas"],
      ["empujo", "Vende, pero solo cuando lanzo o persigo en DM"],
      ["irregular", "No publico con constancia"]] },
    { key: "q7", title: "Si pudieras arreglar una sola cosa este mes, ¿cuál sería?", help: "Tu plan se ordena según esto. Elige la que más te movería el negocio.", options: [
      ["que", "Saber exactamente qué vender y a qué precio"],
      ["porqueyo", "Que se entienda por qué yo y no otro"],
      ["compradores", "Que mi contenido traiga compradores, no solo views"],
      ["horas", "Que el negocio no dependa de mis horas"],
      ["lanzar", "Lanzar con estructura y una fecha real"]] }
  ];
  var TOTAL = 9; // 7 de opción + meta + contacto

  var PH = [
    { name: "Avatar y oferta", title: "Sabes algo que vale y no tienes nada que se compre",
      diag: "Tu cuello no es el alcance. Es que en medio de lo que sabes y de la gente que te escucha no hay nada que comprar: cada venta es una negociación nueva y el precio sale en el momento. El producto ya existe en lo que repites con cada cliente. Falta escribirlo.",
      moves: ["Escribe tus últimos 10 casos y subraya los pasos que se repiten en al menos 6.", "Copia textual las 10 preguntas que más te hacen en DM. Ahí está tu avatar.", "Llena tu producto en una página: nombre, resultado, fases y un precio fijo."] },
    { name: "Identidad", title: "Tienes qué vender, pero nadie entiende por qué tú",
      diag: "Tu producto existe, pero desde afuera te ves igual que otros veinte de tu nicho, y cuando te comparan la conversación termina en precio. Te falta una postura: una tesis contra algo, una historia con número que la respalde y una forma de decirla que se reconozca.",
      moves: ["Escribe tu tesis: la mayoría cree ___, la verdad es ___, porque ___.", "Encuentra el momento de tu historia que tiene un número y cuéntalo en un minuto.", "Reescribe tu bio con filtro: si ya ___ → link."] },
    { name: "El motor", title: "Tienes producto, pero tu contenido no lo vende",
      diag: "Publicas y te ven, pero ninguna pieza está haciendo un trabajo: no hay un camino entre el video y lo que vendes. No necesitas más views. Necesitas que cada pieza tenga propósito y que el video largo sea el motor que trae compradores.",
      moves: ["Etiqueta tus próximas 10 ideas con un propósito antes de grabarlas.", "Graba un video largo que corrija un diagnóstico, con un CTA que filtre.", "Mide llamadas agendadas por video, no views."] },
    { name: "Producto", title: "Vendes, pero todo depende de tus horas",
      diag: "Ya cobras y tu agenda es el techo. Cada cliente nuevo es más trabajo, no más negocio, porque entregas a la medida algo que en su mayoría se repite. Esa parte repetida es un producto de entrada. Lo a la medida se cobra caro, un escalón arriba.",
      moves: ["Separa en tu entrega lo que es igual para todos de lo que es a la medida.", "Cierra lo repetido como producto de entrada con precio fijo y checkout.", "Ponle tope semanal a tus horas de entrega y respétalo."] },
    { name: "Lanzamiento", title: "Tienes todo, y lanzas a ver qué pasa",
      diag: "Producto, mensaje y contenido existen. Lo que falta es estructura: anuncias, esperas y vendes en picos. La gente no compra cuando anuncias, compra cuando se cierra. Te falta una ventana con fecha, una secuencia y un cierre que sí se cierra.",
      moves: ["Pon fecha de apertura y de cierre, y hazlas públicas.", "Abre una lista de espera con un recurso que filtre.", "Calcula antes de abrir: tamaño de lista × tasa × precio."] }
  ];

  var CH = {
    contenido: "Tus clientes ya llegan por contenido. El motor existe: falta que todo apunte al mismo producto.",
    dms: "Hoy vendes persiguiendo en DM. Funciona, pero cada venta cuesta horas tuyas, y eso no escala.",
    referidos: "Vives de referidos. Funciona hasta el mes en que dejan de llegar, y ese mes no lo controlas tú.",
    ninguno: "No tienes un canal que funcione, así que cada mes empiezas de cero. El plan lo resuelve en orden, no todo a la vez."
  };
  var AUD = {
    a1: "Te escuchan menos de 5 mil personas y alcanza: cinco compradores al mes no necesitan una audiencia grande.",
    a2: "Te escuchan entre 5 y 20 mil personas. Eso sobra para tus primeros 10K.",
    a3: "Te escuchan entre 20 y 50 mil personas. Audiencia te sobra: lo que falta es lo de tu fase.",
    a4: "Te escuchan más de 50 mil personas. Si con eso no llegas a 10K, el problema nunca fue el alcance."
  };
  var MID = { m1: 600, m2: 2000, m3: 5500, m4: 9000 };
  var TODAY = { m1: "<$1K", m2: "$2K", m3: "$5K", m4: "$8K+" };

  // ---------- estado ----------
  var KEY = "pz-plan10k";
  var S = load() || { step: 0, a: {}, goal: "", name: "", wa: "", email: "", ig: "" };
  var utm = captureUtm();

  function load() { try { return JSON.parse(sessionStorage.getItem(KEY)); } catch (e) { return null; } }
  function save() { try { sessionStorage.setItem(KEY, JSON.stringify(S)); } catch (e) {} }
  function captureUtm() {
    var p = new URLSearchParams(location.search), o = {};
    ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term", "fbclid"].forEach(function (k) { if (p.get(k)) o[k] = p.get(k); });
    return o;
  }
  function esc(s) { return String(s).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); }
  function fmt(n) { return "$" + n.toLocaleString("en-US"); }

  var $landing = document.getElementById("landing");
  var $quiz = document.getElementById("quiz");
  var $qroot = document.getElementById("quiz-root");
  var $result = document.getElementById("result");
  var $rroot = document.getElementById("result-root");

  function phaseOf(a) {
    if (a.q1 === "nada" || a.q3 === "parrafo" || (a.q3 === "depende" && a.q1 !== "producto") || a.q7 === "que") return 1;
    if (a.q7 === "porqueyo") return 2;
    if (a.q7 === "horas" || (a.q1 === "medida" && a.q6 === "empujo")) return 4;
    if (a.q6 === "views" || a.q6 === "poco" || a.q6 === "irregular" || a.q5 === "ninguno" || a.q7 === "compradores") return 3;
    return 5;
  }

  // ---------- navegación ----------
  function go(step) {
    S.step = step; save(); render();
    window.scrollTo({ top: 0, behavior: "instant" in window ? "instant" : "auto" });
  }
  function show(view) {
    $landing.hidden = view !== "landing";
    $quiz.hidden = view !== "quiz";
    $result.hidden = view !== "result";
  }
  function render() {
    if (S.step === 0) { show("landing"); return; }
    if (S.step >= 1 && S.step <= TOTAL) { show("quiz"); renderQuiz(); return; }
    show("result"); renderResult();
  }

  function bar(n) {
    var h = "";
    for (var i = 1; i <= TOTAL; i++) h += '<i class="' + (i <= n ? "on" : "") + '"></i>';
    return '<div class="q-top"><div class="q-meta"><span>Paso ' + n + " de " + TOTAL + "</span><span>Plan 10K</span></div>" +
      '<div class="q-bar" aria-hidden="true">' + h + "</div></div>";
  }
  var BACK = '<button class="btn btn-quiet js-back" type="button">← Atrás</button>';

  function renderQuiz() {
    var st = S.step, html = bar(st);
    if (st <= 7) {
      var Q = QS[st - 1];
      html += '<div class="q-panel"><div class="q-head"><h1 tabindex="-1">' + esc(Q.title) + "</h1><p>" + esc(Q.help) + '</p></div><div class="opts" role="radiogroup" aria-label="' + esc(Q.title) + '">';
      Q.options.forEach(function (o, i) {
        var on = S.a[Q.key] === o[0];
        html += '<button type="button" role="radio" aria-checked="' + on + '" class="opt' + (on ? " on" : "") + '" data-k="' + Q.key + '" data-v="' + o[0] + '"><kbd>' + (i + 1) + "</kbd><span>" + esc(o[1]) + "</span></button>";
      });
      html += '</div><div class="q-foot">' + BACK + '<span class="muted">Tip: usa las teclas 1 a ' + Q.options.length + "</span></div></div>";
    } else if (st === 8) {
      html += '<form class="q-panel js-goal" novalidate><div class="q-head"><h1 tabindex="-1">¿Dónde quieres estar en 12 meses?</h1><p>Una línea basta. Entre más concreto, más tuyo sale el plan.</p></div>' +
        '<div class="field"><label for="goal">Tu meta</label><input id="goal" name="goal" type="text" maxlength="160" autocomplete="off" placeholder="Ej. vender mi programa a 10 personas al mes sin perseguir en DM" value="' + esc(S.goal) + '"></div>' +
        '<div class="q-foot">' + BACK + '<button class="btn btn-gold" type="submit">Continuar <span class="arrow" aria-hidden="true">→</span></button></div></form>';
    } else {
      html += '<form class="q-panel js-contact" novalidate><div class="q-head"><h1 tabindex="-1">¿A dónde te mandamos tu plan?</h1><p>Tu diagnóstico sale en la siguiente pantalla. El WhatsApp es para mandarte el PDF y resolverte dudas.</p></div>' +
        '<div class="fields">' +
        field("nm", "name", "Tu nombre", "text", "Nombre", "given-name") +
        field("wa", "wa", "WhatsApp", "tel", "+52 55 0000 0000", "tel") +
        field("em", "email", "Email", "email", "tu@correo.com", "email") +
        field("ig", "ig", "Instagram o YouTube", "text", "@tucuenta", "off") +
        '</div><p class="muted">Tu cuenta es para ver tu negocio antes de hablar contigo y no hacerte repetir lo que ya está ahí.</p><p class="form-err" role="alert"></p>' +
        '<div class="q-foot">' + BACK + '<button class="btn btn-gold" type="submit">Ver mi diagnóstico <span class="arrow" aria-hidden="true">→</span></button></div></form>';
    }
    $qroot.innerHTML = html;
    var h1 = $qroot.querySelector("h1"); if (h1) h1.focus({ preventScroll: true });
  }
  function field(id, key, label, type, ph, ac) {
    return '<div class="field"><label for="' + id + '">' + label + '</label><input id="' + id + '" name="' + key + '" type="' + type + '" placeholder="' + ph + '" autocomplete="' + ac + '" value="' + esc(S[key] || "") + '"></div>';
  }

  function pick(k, v) {
    S.a[k] = v; save();
    var btns = $qroot.querySelectorAll(".opt");
    btns.forEach(function (b) { var on = b.dataset.v === v; b.classList.toggle("on", on); b.setAttribute("aria-checked", on); });
    setTimeout(function () { go(S.step + 1); }, 220);
  }

  // ---------- resultado ----------
  function stairs(n) {
    var hs = [34, 48, 62, 76, 90], h = "";
    PH.forEach(function (p, i) {
      var k = i + 1, cls = k < n ? "done" : k === n ? "here" : "later";
      h += '<div class="step ' + cls + '" style="--i:' + i + ";--h:" + hs[i] + '%">' +
        (k === n ? '<span class="you">Estás aquí</span>' : "") +
        '<div class="step-block"><span class="n">0' + k + '</span><span class="lbl">' + p.name + "</span></div></div>";
    });
    return '<div class="r-stairs" role="img" aria-label="Estás en la fase ' + n + ' de 5: ' + PH[n - 1].name + '">' + h + "</div>";
  }

  function planUrl(n) {
    var p = new URLSearchParams();
    if (S.name) p.set("n", S.name.trim().split(" ")[0]);
    if (S.goal) p.set("g", S.goal.trim());
    if (S.a.q2) p.set("m", S.a.q2);
    return "/plan/fase-" + n + "?" + p.toString();
  }

  function renderResult() {
    var a = S.a, n = phaseOf(a), P = PH[n - 1];
    var first = (S.name || "").trim().split(" ")[0];
    var mid = MID[a.q2] || 2000, gap = Math.max(0, 10000 - mid);
    var gapText = gap > 1500
      ? "Son unos " + fmt(gap) + " al mes de distancia. Seis meses de “la próxima semana lo armo” son " + fmt(gap * 6) + " que no entraron."
      : "Estás cerca. A este nivel la distancia ya no es volumen: es que el negocio funcione sin que tú empujes cada venta.";
    var diag = (first ? esc(first) + ", " : "") + (first ? P.diag.charAt(0).toLowerCase() + P.diag.slice(1) : P.diag);
    var chan = ((CH[a.q5] || "") + " " + (AUD[a.q4] || "")).trim();
    var wa = CFG.whatsapp ? '<a class="btn btn-glass" target="_blank" rel="noopener" href="https://wa.me/' + encodeURIComponent(CFG.whatsapp) + "?text=" +
      encodeURIComponent("Hola, hice el diagnóstico Plan 10K. Me salió la fase " + n + " (" + P.name + "). Quiero mi plan.") + '">Pedir mi plan por WhatsApp</a>' : "";

    $rroot.innerHTML =
      '<div class="r-hero well">' +
        '<div class="copy"><span class="tag">Tu diagnóstico · Fase 0' + n + " de 05</span>" +
        '<h1 tabindex="-1">' + esc(P.title) + "</h1>" +
        '<p class="diag">' + diag + "</p>" +
        (chan ? '<p class="chan">' + esc(chan) + "</p>" : "") + "</div>" +
        stairs(n) +
      "</div>" +
      '<div class="r-grid">' +
        '<div class="r-card glass"><span class="k">La distancia a tus 10K</span><div class="gap-row"><b>' + (TODAY[a.q2] || "$2K") + '</b><span>→</span><b class="to">$10K</b></div><p>' + esc(gapText) + " No es un tema de alcance: es lo que te dice tu fase.</p></div>" +
        '<div class="r-card glass"><span class="k">Tu meta a 12 meses</span>' + (S.goal ? '<p class="goal-q">“' + esc(S.goal.trim()) + "”</p>" : "") +
        "<p>Se cumple en orden. Saltarte la fase " + n + " para llegar más rápido es justo lo que te tiene donde estás.</p></div>" +
      "</div>" +
      '<div class="sec-head" style="margin:40px 0 4px"><span class="tag">Tus próximos 14 días</span><h2 style="font-size:clamp(28px,3.8vw,44px)">Tres movimientos. En este orden</h2></div>' +
      '<ol class="moves">' + P.moves.map(function (m) { return '<li class="glass"><p>' + esc(m) + "</p></li>"; }).join("") + "</ol>" +
      '<div class="plan-cta well" style="margin-top:20px">' +
        '<div class="copy"><span class="tag">Tu plan completo</span><h2>El mes de la fase 0' + n + ", semana por semana</h2>" +
        "<p>Diagnóstico, la regla de tu fase, la matemática de tus 10K, las cuatro semanas con lo que sale de cada una, la plantilla para llenar y cómo sabes que ya pasaste de fase. Lo abres y lo descargas en PDF.</p></div>" +
        '<div class="acts"><a class="btn btn-gold" href="' + planUrl(n) + '">Abrir mi plan <span class="arrow" aria-hidden="true">→</span></a>' + wa +
        '<a class="btn btn-glass" target="_blank" rel="noopener" href="' + esc(CFG.calUrl || "#") + '">Agendar diagnóstico 1:1</a>' +
        '<span class="muted" style="text-align:center">El 1:1 es solo si ya vendes algo.<br>Cupo de 5 a 8 personas a la vez.</span></div>' +
      "</div>" +
      '<div class="r-sub"><button class="btn btn-quiet js-restart" type="button">Volver a hacer el diagnóstico</button><span class="muted">Fase calculada con tus 7 respuestas.</span></div>';
    var h1 = $rroot.querySelector("h1"); if (h1) h1.focus({ preventScroll: true });
  }

  function sendLead() {
    var n = phaseOf(S.a);
    var payload = Object.assign({
      fecha: new Date().toISOString(), nombre: S.name.trim(), whatsapp: S.wa.trim(), email: S.email.trim(), cuenta: S.ig.trim(),
      fase: n, fase_nombre: PH[n - 1].name, meta_12m: S.goal.trim(),
      vende: S.a.q1, ingreso: S.a.q2, frase: S.a.q3, audiencia: S.a.q4, canal: S.a.q5, publicar: S.a.q6, prioridad: S.a.q7,
      origen: location.href
    }, utm);
    Object.keys(payload).forEach(function (k) {
      var v = payload[k];
      if (typeof v === "string" && /^[=+\-]/.test(v)) payload[k] = "'" + v; // que Sheets lo guarde como texto
    });
    if (CFG.leadWebhook) {
      try {
        fetch(CFG.leadWebhook, { method: "POST", mode: "no-cors", headers: { "Content-Type": "text/plain;charset=utf-8" }, body: JSON.stringify(payload), keepalive: true });
      } catch (e) {}
    }
    if (window.fbq) try { window.fbq("track", "Lead", { content_name: "Plan 10K fase " + n }); } catch (e) {}
    if (window.gtag) try { window.gtag("event", "generate_lead", { phase: n }); } catch (e) {}
  }

  // ---------- eventos ----------
  document.addEventListener("click", function (e) {
    var t = e.target.closest("button, a"); if (!t) return;
    if (t.classList.contains("js-start")) { S.step = S.step > 0 && S.step <= TOTAL ? S.step : 1; if (S.step > TOTAL) S.step = 1; go(S.step); }
    else if (t.classList.contains("js-back")) go(S.step - 1);
    else if (t.classList.contains("js-restart")) { S = { step: 1, a: {}, goal: "", name: S.name, wa: S.wa, email: S.email, ig: S.ig }; go(1); }
    else if (t.classList.contains("opt")) pick(t.dataset.k, t.dataset.v);
  });

  document.addEventListener("input", function (e) {
    if (e.target.name && e.target.closest("#quiz")) { S[e.target.name] = e.target.value; save(); }
  });

  document.addEventListener("submit", function (e) {
    var f = e.target; e.preventDefault();
    if (f.classList.contains("js-goal")) {
      if ((S.goal || "").trim().length < 3) { f.querySelector("input").focus(); f.querySelector("input").setAttribute("aria-invalid", "true"); return; }
      go(9);
    } else if (f.classList.contains("js-contact")) {
      var err = f.querySelector(".form-err"), msg = "";
      if (!S.name.trim()) msg = "Escribe tu nombre.";
      else if (S.wa.replace(/\D/g, "").length < 8) msg = "Revisa tu WhatsApp: incluye lada.";
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(S.email.trim())) msg = "Revisa tu email.";
      if (msg) { err.textContent = msg; return; }
      sendLead(); go(TOTAL + 1);
    }
  });

  document.addEventListener("keydown", function (e) {
    if ($quiz.hidden || S.step > 7 || e.metaKey || e.ctrlKey || e.altKey) return;
    if (/^(INPUT|TEXTAREA)$/.test(document.activeElement && document.activeElement.tagName)) return;
    var i = parseInt(e.key, 10), Q = QS[S.step - 1];
    if (i >= 1 && i <= Q.options.length) pick(Q.key, Q.options[i - 1][0]);
  });

  render();
})();
