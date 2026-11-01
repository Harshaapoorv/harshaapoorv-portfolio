import type { Section } from "~/content/schema";
import { Container } from "~/components/ui";
import { DetailSidebar } from "./DetailSidebar";
import { SectionBlock } from "./SectionBlock";

/** Two-column body of a detail page: content sections + sticky sidebar. */
export function DetailLayout({
  sections,
  role,
  stack,
}: {
  sections: Section[];
  role?: string;
  stack: string[];
}) {
  // Galleries of phone screenshots read best full width, above the two-column part.
  const [lead, ...rest] = sections;
  const leadIsGallery = lead?.type === "gallery";
  const body = leadIsGallery ? rest : sections;
  return (
    <Container className="flex flex-col gap-14 pt-12">
      {leadIsGallery && lead && <SectionBlock section={lead} index={0} />}
      <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_300px] lg:gap-14">
        <div className="flex min-w-0 flex-col gap-14">
          {body.map((s, i) => (
            <SectionBlock key={s.title} section={s} index={i + (leadIsGallery ? 1 : 0)} />
          ))}
        </div>
        <DetailSidebar sections={sections} role={role} stack={stack} />
      </div>
    </Container>
  );
}
