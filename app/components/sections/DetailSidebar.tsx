import type { Section } from "~/content/schema";
import { ChipList, Label, Panel } from "~/components/ui";
import { sectionId } from "./SectionBlock";

/** Sticky side rail on detail pages: table of contents, role and stack. */
export function DetailSidebar({
  sections,
  role,
  stack,
}: {
  sections: Section[];
  role?: string;
  stack: string[];
}) {
  return (
    <aside className="flex flex-col gap-5 lg:sticky lg:top-24">
      {sections.length > 1 && (
        <Panel as="nav" aria-label="On this page" shadow="sm" className="hidden p-5 lg:block">
          <Label tone="ink">ON THIS PAGE</Label>
          <ol className="mt-3 flex flex-col gap-1.5">
            {sections.map((s) => (
              <li key={s.title}>
                <a
                  href={`#${sectionId(s.title)}`}
                  className="font-medium no-underline hover:text-action hover:underline"
                >
                  {s.title}
                </a>
              </li>
            ))}
          </ol>
        </Panel>
      )}
      {role && (
        <Panel tone="yellow" shadow="sm" className="p-5">
          <Label tone="ink">MY ROLE</Label>
          <p className="mt-2 leading-relaxed">{role}</p>
        </Panel>
      )}
      {stack.length > 0 && (
        <Panel shadow="sm" className="p-5">
          <Label tone="ink">STACK</Label>
          <ChipList items={stack} className="mt-3" />
        </Panel>
      )}
    </aside>
  );
}
