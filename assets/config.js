// Lo único que tienes que editar antes de subir a Vercel.
window.PZ_CONFIG = {
  // Link de agenda (agendar.productizar.co)
  calUrl: "https://agendar.productizar.co/",

  // A dónde mandar cada lead (POST con JSON). Déjalo vacío para no guardar.
  // Sirve cualquier webhook: Make, Zapier, n8n o un Google Apps Script que escriba en un Sheet.
  leadWebhook: "https://script.google.com/macros/s/AKfycbxjkfNUrNQPzV7Evnq3_n5CnXP0qSPpCluHcHFBbpAAY8P1ZaQvJuVFo89VMTtJk7dk/exec",

  // Tu WhatsApp en formato internacional sin signos (ej. "5215512345678").
  // Es OBLIGATORIO para el A/B: mientras esté vacío, todos ven el plan en la página.
  whatsapp: "5215632497751",

  // Mensaje prellenado que la persona solo tiene que enviar.
  // Va después de "Hola, soy {nombre}." y antes de sus respuestas.
  whatsappMsg: "Ya llené el formulario del Plan 10K, quiero mis recursos.",

  // A/B tras el formulario: la mitad ve el plan en la página, la otra mitad va a WhatsApp.
  // Pon false para que todos vean el plan. Para probar: agrega ?v=plan o ?v=wa a la URL.
  ab: true,

  // Video corto (30-60 s) del hero, mini VSL. Link directo a .mp4 o embed de YouTube/Vimeo. Vacío = sin video.
  videoUrl: ""
};
