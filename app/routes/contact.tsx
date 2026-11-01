import type { Route } from "./+types/contact";
import { ResumeMenu } from "~/components/layout";
import { ContactForm } from "~/components/sections";
import { Container, Label, SmartLink } from "~/components/ui";
import { site } from "~/content";
import { seo } from "~/lib/seo";

export const meta: Route.MetaFunction = () =>
  seo({ title: "Contact", description: site.pages.contact.intro, path: "/contact" });

export default function Contact() {
  const copy = site.pages.contact;
  return (
    <Container className="grid items-start gap-12 pt-12 pb-20 sm:pt-16 lg:grid-cols-[1fr_1.25fr] lg:gap-16">
      <div className="flex flex-col gap-6">
        <Label>{copy.label}</Label>
        <h1 className="-mt-3 text-[42px] leading-[1.03] sm:text-6xl">{copy.heading}</h1>
        <p className="text-lg leading-relaxed text-body sm:text-[19px]">{copy.intro}</p>
        <ul className="flex flex-col gap-3">
          {site.socials.map((s) => (
            <li key={s.label}>
              <SmartLink
                to={s.url}
                className="flex min-h-12 items-center justify-between rounded-2xl ink-border bg-paper px-5 py-3 font-bold no-underline shadow-comic-sm lift"
              >
                <span>{s.label}</span>
                <span aria-hidden="true">{s.url.startsWith("mailto:") ? "✉" : "↗"}</span>
              </SmartLink>
            </li>
          ))}
        </ul>
        <ResumeMenu label="Resume (pick a role)" variant="pop" />
      </div>
      <div className="animate-rise pb-8 [animation-delay:150ms]">
        <h2 className="sr-only">Send me a message</h2>
        <ContactForm />
      </div>
    </Container>
  );
}
