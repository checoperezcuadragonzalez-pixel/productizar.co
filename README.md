# Plan 10K · /productizar

Landing + diagnóstico de 9 preguntas + 5 planes interactivos por fase. Sitio estático: no necesita build.

## Estructura

```
index.html            landing, diagnóstico y resultado
plan/fase-1.html … fase-5.html   el plan de cada fase (se abre como /plan/fase-3)
assets/config.js      lo único que editas: link de Cal, webhook de leads, WhatsApp
assets/app.js         preguntas, lógica de fase y resultado
assets/styles.css     estilos de marca
assets/plan2.css      estilos de los planes interactivos
assets/plan2.js       interacciones del plan: aparición al hacer scroll, creencias, calculadora, semanas, checklist y CTA flotante
vercel.json           URLs limpias (/plan/fase-3 sin .html)
```

## Subirlo a Vercel

1. Sube la carpeta a un repo de GitHub (o arrástrala en vercel.com/new).
2. Framework preset: **Other**. Sin build command. Output directory: la raíz.
3. Deploy. Conecta tu dominio en Settings → Domains (ej. `plan.productizar.co`).

## Guardar los leads (recomendado antes de mandar tráfico)

En `assets/config.js` pon una URL en `leadWebhook`. Cada vez que alguien termina el diagnóstico se manda un JSON con: nombre, WhatsApp, email, cuenta, fase, meta, sus 7 respuestas y los UTM del link.

Opción rápida con Google Sheets:

1. Crea un Sheet → Extensiones → Apps Script, pega esto y guarda:

```js
function doPost(e) {
  var d = JSON.parse(e.postData.contents);
  var sh = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var cols = ["fecha","nombre","whatsapp","email","cuenta","fase","fase_nombre","meta_12m","vende","ingreso","frase","audiencia","canal","publicar","prioridad","variante","temperatura","utm_source","utm_campaign","utm_content","origen"];
  if (sh.getLastRow() === 0) sh.appendRow(cols);
  sh.appendRow(cols.map(function (c) { return d[c] || ""; }));
  return ContentService.createTextOutput("ok");
}
```

2. Implementar → Nueva implementación → Aplicación web → Acceso: **Cualquier persona**.
3. Copia la URL que te da y pégala en `leadWebhook`.

También sirve un webhook de Make, Zapier o n8n (para mandar el plan por WhatsApp o meterlo a tu CRM).

## Píxel de Meta / Google Analytics

Pega el snippet en el `<head>` de `index.html`. El código ya dispara `Lead` (Meta) y `generate_lead` (GA4) cuando alguien termina el diagnóstico.

## Los planes

Cada plan (`/plan/fase-1` … `/plan/fase-5`) es una página interactiva: "¿te suena?" con respuesta, creencias que se voltean, la regla de la fase, calculadora de los $10K, 4 semanas desplegables, errores, checklist con barra y el cierre con el diagnóstico 1:1 gratis y WhatsApp. Se personaliza con el nombre (`?n=`) y el ingreso (`?m=`) que manda el diagnóstico. El botón de WhatsApp del cierre solo aparece si `whatsapp` está lleno en `config.js`.

## Cómo se asigna la fase

Se revisa en este orden y gana la primera que aplica (Producto va antes que El motor a propósito: si alguien ya dijo que su techo son sus horas, ese es su cuello aunque su contenido tampoco venda):

- **Fase 01 · Avatar y oferta:** no vende nada, o no puede decir qué vende en una frase, o quiere saber qué vender.
- **Fase 02 · Identidad:** su prioridad es que se entienda por qué él y no otro.
- **Fase 04 · Producto:** su prioridad es no depender de sus horas, o vende servicio a la medida y solo vende cuando empuja.
- **Fase 03 · El motor:** views sin ventas, pocas views, no publica constante, sin canal, o quiere que el contenido traiga compradores.
- **Fase 05 · Lanzamiento:** todo lo demás (ya tiene producto, mensaje y motor).

La lógica está en `phaseOf()` dentro de `assets/app.js`.

## Temperatura del lead

Cada lead llega al Sheet (columna `temperatura`) y al final del mensaje de WhatsApp como "Fase N · temperatura":

- `caliente`: ya vende y le entran $3K+ al mes → el setter NO manda el plan, propone llamada.
- `tibio`: ya vende → manda el plan + una pregunta para calificar.
- `frio`: no vende o le entra menos de $1K → manda el plan y que se nutra.

Actualiza el Apps Script del Sheet con la lista de columnas de arriba para que se guarde.
