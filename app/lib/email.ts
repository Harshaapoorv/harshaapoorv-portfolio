import emailjs from "@emailjs/browser";

/** EmailJS client keys. These are public by design; override them with VITE_EMAILJS_* env vars. */
const config = {
  serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID ?? "service_6yxdt0f",
  templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID ?? "template_f3mp3si",
  publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY ?? "zsD33nd2_sjVO1I1K",
};

/** Sends the form's `name`, `email` and `message` fields to Harsha's inbox via EmailJS. */
export function sendContactForm(form: HTMLFormElement) {
  return emailjs.sendForm(config.serviceId, config.templateId, form, { publicKey: config.publicKey });
}
