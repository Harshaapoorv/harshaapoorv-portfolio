import { data } from "react-router";
import type { Route } from "./+types/experience-detail";
import { CtaBubble, DetailHero, DetailLayout, PrevNextNav } from "~/components/sections";
import { experiences, getExperience, neighbours, site } from "~/content";
import { seo } from "~/lib/seo";

/** Runs at build time for every pre-rendered role page. */
export function loader({ params }: Route.LoaderArgs) {
  const experience = getExperience(params.slug);
  if (!experience) throw data("Not found", { status: 404 });
  return { slug: experience.slug };
}

export const meta: Route.MetaFunction = ({ loaderData }) => {
  const e = loaderData && getExperience(loaderData.slug);
  if (!e) return seo({ title: "Not found", path: "/experience" });
  return seo({
    title: `${e.role} at ${e.organization}`,
    description: e.seo?.description ?? e.summary,
    path: `/experience/${e.slug}`,
    type: "article",
  });
};

export default function ExperienceDetail({ loaderData }: Route.ComponentProps) {
  const e = getExperience(loaderData.slug)!;
  const { prev, next } = neighbours(experiences, e);
  return (
    <article>
      <DetailHero
        tone={e.featured ? "pop" : "halftone"}
        back={{ label: "All experience", to: "/experience" }}
        chips={[
          e.organization.toUpperCase(),
          e.period.toUpperCase(),
          e.location.toUpperCase(),
          e.type.toUpperCase(),
        ]}
        title={e.headline}
        intro={e.intro}
        links={e.links}
        stats={e.stats}
      />
      <DetailLayout sections={e.sections} role={e.role} stack={e.stack} />
      <PrevNextNav
        noun="ROLE"
        prev={{ title: prev.role, to: `/experience/${prev.slug}` }}
        next={{ title: next.role, to: `/experience/${next.slug}` }}
      />
      <CtaBubble cta={site.cta} />
    </article>
  );
}
