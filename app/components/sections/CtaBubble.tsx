import { ButtonLink, Container, Reveal, SpeechBubble } from "~/components/ui";

type Cta = { heading: string; text: string; button: { label: string; to: string } };

/** The closing "say hi" speech bubble used at the bottom of pages. */
export function CtaBubble({ cta }: { cta: Cta }) {
  return (
    <Container as="section" aria-labelledby="cta-heading" className="py-16 sm:py-20">
      <Reveal>
        <SpeechBubble
          tone="yellow"
          className="flex flex-col gap-5 p-7 sm:flex-row sm:items-center sm:justify-between sm:p-10"
        >
          <div>
            <h2 id="cta-heading" className="text-[28px] leading-tight sm:text-4xl">
              {cta.heading}
            </h2>
            <p className="mt-2 text-lg">{cta.text}</p>
          </div>
          <ButtonLink to={cta.button.to} variant="dark" size="lg" className="shrink-0">
            {cta.button.label}
          </ButtonLink>
        </SpeechBubble>
      </Reveal>
    </Container>
  );
}
