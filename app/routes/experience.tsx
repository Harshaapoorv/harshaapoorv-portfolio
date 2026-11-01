import type { Route } from "./+types/experience";
import { ExperienceCard } from "~/components/cards";
import { CtaBubble, PageHeader } from "~/components/sections";
import { Container, Reveal } from "~/components/ui";
import { experiences, site } from "~/content";
import { seo } from "~/lib/seo";

export const meta: Route.MetaFunction = () =>
  seo({ title: "Experience", description: site.pages.experience.intro, path: "/experience" });

export default function ExperienceIndex() {
  const copy = site.pages.experience;
  const lead = experiences.filter((e) => e.featured);
  const rest = experiences.filter((e) => !e.featured);
  return (
    <>
      <PageHeader
        label={`${copy.label} · ${experiences.length} ROLES`}
        title={copy.heading}
        intro={copy.intro}
      />
      <Container className="flex flex-col gap-6 pt-6">
        <ul className="flex flex-col gap-6">
          {lead.map((e) => (
            <Reveal as="li" key={e.slug}>
              <ExperienceCard experience={e} featured />
            </Reveal>
          ))}
        </ul>
        <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {rest.map((e, i) => (
            <Reveal as="li" key={e.slug} delay={(i % 3) * 80}>
              <ExperienceCard experience={e} />
            </Reveal>
          ))}
        </ul>
      </Container>
      <CtaBubble cta={site.cta} />
    </>
  );
}
