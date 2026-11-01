import { data } from "react-router";
import type { Route } from "./+types/project-detail";
import { CtaBubble, DetailHero, DetailLayout, PrevNextNav } from "~/components/sections";
import { Stamp } from "~/components/ui";
import { getProject, neighbours, projects, site } from "~/content";
import { seo } from "~/lib/seo";

/** Runs at build time for every pre-rendered project page. */
export function loader({ params }: Route.LoaderArgs) {
  const project = getProject(params.slug);
  if (!project) throw data("Not found", { status: 404 });
  return { slug: project.slug };
}

export const meta: Route.MetaFunction = ({ loaderData }) => {
  const p = loaderData && getProject(loaderData.slug);
  if (!p) return seo({ title: "Not found", path: "/projects" });
  return seo({
    title: p.title,
    description: p.seo?.description ?? p.summary,
    path: `/projects/${p.slug}`,
    image: p.cover?.src,
    type: "article",
  });
};

const statusLabel = { shipped: "SHIPPED!", "in-development": "IN PROGRESS", archived: null } as const;

export default function ProjectDetail({ loaderData }: Route.ComponentProps) {
  const p = getProject(loaderData.slug)!;
  const { prev, next } = neighbours(projects, p);
  const stamp = statusLabel[p.status];
  const sections =
    p.cover && !p.sections.some((s) => s.type === "gallery")
      ? [{ type: "gallery" as const, title: "Preview", images: [p.cover] }, ...p.sections]
      : p.sections;
  return (
    <article>
      <DetailHero
        back={{ label: "All projects", to: "/projects" }}
        chips={[p.meta, p.categories.join(" · ").toUpperCase()]}
        title={p.headline}
        intro={p.intro}
        links={p.links}
        stats={p.stats}
        aside={
          stamp && (
            <Stamp
              tone={p.status === "shipped" ? "blue" : "yellow"}
              size="lg"
              tilt={-5}
              animate
              className="shrink-0"
            >
              {stamp}
            </Stamp>
          )
        }
      />
      <DetailLayout sections={sections} role={p.role} stack={p.stack} />
      <PrevNextNav
        prev={{ title: prev.title, to: `/projects/${prev.slug}` }}
        next={{ title: next.title, to: `/projects/${next.slug}` }}
      />
      <CtaBubble cta={site.cta} />
    </article>
  );
}
