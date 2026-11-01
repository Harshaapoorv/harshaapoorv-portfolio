import { useRef, useState, type FormEvent } from "react";
import { site } from "~/content";
import { sendContactForm } from "~/lib/email";
import { Button, SpeechBubble, Stamp } from "~/components/ui";

type Status = "idle" | "sending" | "sent" | "error";

const field =
  "w-full min-h-12 rounded-xl ink-border bg-paper px-3.5 py-3 text-base text-ink placeholder:text-subtle/80 focus-visible:outline-action";

/** The contact form. Field names (name, email, message) must match the EmailJS template. */
export function ContactForm() {
  const form = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<Status>("idle");
  const copy = site.pages.contact;

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const el = form.current;
    if (!el) return;
    // Honeypot: real people never see or fill this field.
    if ((el.elements.namedItem("company") as HTMLInputElement | null)?.value) {
      setStatus("sent");
      return;
    }
    setStatus("sending");
    try {
      await sendContactForm(el);
      el.reset();
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  return (
    <SpeechBubble className="p-6 sm:p-8">
      {status === "sent" ? (
        <div role="status" className="flex animate-rise flex-col items-start gap-5 py-6">
          <Stamp size="lg" animate>
            WHOOSH!
          </Stamp>
          <p className="text-lg leading-relaxed">{copy.success}</p>
          <Button variant="secondary" onClick={() => setStatus("idle")}>
            Send another
          </Button>
        </div>
      ) : (
        <form ref={form} onSubmit={onSubmit} className="flex flex-col gap-5" aria-describedby="contact-note">
          <p className="font-comic text-[32px] tracking-wide" aria-hidden="true">
            {copy.formTitle}
          </p>
          <div className="grid gap-5 sm:grid-cols-2">
            <label className="flex flex-col gap-1.5 font-bold">
              Your name
              <input
                className={field}
                name="name"
                type="text"
                autoComplete="name"
                required
                placeholder="Jane Doe"
              />
            </label>
            <label className="flex flex-col gap-1.5 font-bold">
              Your email
              <input
                className={field}
                name="email"
                type="email"
                autoComplete="email"
                required
                placeholder="jane@company.com"
              />
            </label>
          </div>
          <label className="flex flex-col gap-1.5 font-bold">
            What's on your mind?
            <textarea
              className={field + " min-h-40 resize-y"}
              name="message"
              rows={6}
              required
              minLength={10}
              placeholder="A role, a project, or a question..."
            />
          </label>
          <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
            <label>
              Company
              <input name="company" tabIndex={-1} autoComplete="off" />
            </label>
          </div>
          <Button type="submit" size="lg" disabled={status === "sending"} className="w-full sm:w-fit">
            {status === "sending" ? "Sending…" : "Send it my way"}
            {status !== "sending" && <span aria-hidden="true">→</span>}
          </Button>
          {status === "error" && (
            <p role="alert" className="rounded-xl ink-border bg-pop p-3 font-medium">
              That didn't go through. Please try again, or email me at{" "}
              <a href={`mailto:${site.email}`} className="font-bold">
                {site.email}
              </a>
              .
            </p>
          )}
          <p id="contact-note" className="font-mono text-xs text-subtle">
            {copy.note}
          </p>
        </form>
      )}
    </SpeechBubble>
  );
}
