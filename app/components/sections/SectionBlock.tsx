import type { Section } from "~/content/schema";
import { InfoCard } from "~/components/cards";
import { Label, Reveal } from "~/components/ui";
import { Gallery } from "./Gallery";
import { Timeline } from "./Timeline";

export const sectionId = (title: string) =>
  title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

/** Renders one content section of a detail page. Add a new `type` in schema.ts and a case here. */
export function SectionBlock({ section, index }: { section: Section; index: number }) {
  const id = sectionId(section.title);
  return (
    <section aria-labelledby={id} className="scroll-mt-24">
      <Reveal>
        <Label>{String(index + 1).padStart(2, "0")}</Label>
        <h2 id={id} className="mt-1 mb-5 text-3xl sm:text-[34px]">
          {section.title}
        </h2>
      </Reveal>
      <Reveal delay={80}>
        <SectionBody section={section} />
      </Reveal>
    </section>
  );
}

function SectionBody({ section }: { section: Section }) {
  switch (section.type) {
    case "text":
      return (
        <div className="flex max-w-[720px] flex-col gap-4 text-[17px] leading-relaxed text-body">
          {section.paragraphs.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
      );
    case "cards":
      return (
        <div className="grid gap-4 sm:grid-cols-2">
          {section.items.map((c) => (
            <InfoCard key={c.title} title={c.title} text={c.text} highlight={c.highlight} />
          ))}
        </div>
      );
    case "metrics":
      return (
        <ul className="grid gap-4 sm:grid-cols-2">
          {section.items.map((m) => (
            <li key={m.value + m.text} className="flex items-start gap-4 rounded-2xl ink-border bg-paper p-5">
              <span className="font-display text-4xl leading-none font-extrabold text-action">{m.value}</span>
              <span className="text-[16px] leading-snug">{m.text}</span>
            </li>
          ))}
        </ul>
      );
    case "list":
      return (
        <ul className="flex max-w-[760px] flex-col gap-3">
          {section.items.map((t) => (
            <li key={t} className="flex gap-3 text-[17px] leading-relaxed">
              <span
                aria-hidden="true"
                className="mt-2 size-3 shrink-0 rotate-45 border-2 border-ink bg-pop"
              />
              {t}
            </li>
          ))}
        </ul>
      );
    case "timeline":
      return <Timeline items={section.items} />;
    case "gallery":
      return <Gallery images={section.images} />;
  }
}
