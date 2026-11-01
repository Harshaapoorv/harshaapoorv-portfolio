import { useMemo } from "react";
import { useSearchParams } from "react-router";
import type { Route } from "./+types/projects";
import { ProjectCard } from "~/components/cards";
import { CtaBubble, FilterChips, PageHeader } from "~/components/sections";
import { Container } from "~/components/ui";
import { categorySchema, type Category } from "~/content/schema";
import { projects, site } from "~/content";
import { seo } from "~/lib/seo";

export const meta: Route.MetaFunction = () =>
  seo({ title: "Projects", description: site.pages.projects.intro, path: "/projects" });

type Filter = "All" | Category;
const FILTERS: Filter[] = ["All", ...categorySchema.options];

export default function ProjectsIndex() {
  const copy = site.pages.projects;
  // The filter lives in the URL (?type=Mobile) so filtered views can be shared.
  const [params, setParams] = useSearchParams();
  const raw = params.get("type");
  const filter: Filter = FILTERS.includes(raw as Filter) ? (raw as Filter) : "All";

  const counts = useMemo(() => {
    const c: Partial<Record<Filter, number>> = { All: projects.length };
    for (const cat of categorySchema.options)
      c[cat] = projects.filter((p) => p.categories.includes(cat)).length;
    return c;
  }, []);
  const shown = filter === "All" ? projects : projects.filter((p) => p.categories.includes(filter));

  return (
    <>
      <PageHeader label={copy.label} title={copy.heading} intro={copy.intro}>
        <div className="mt-7">
          <FilterChips
            label="Filter projects by type"
            options={FILTERS.filter((f) => counts[f])}
            value={filter}
            counts={counts}
            onChange={(f) =>
              setParams(f === "All" ? {} : { type: f }, { replace: true, preventScrollReset: true })
            }
          />
        </div>
      </PageHeader>
      <Container className="pt-6">
        <p className="sr-only" aria-live="polite">
          Showing {shown.length} {shown.length === 1 ? "project" : "projects"}
        </p>
        <ul className="grid gap-7 md:grid-cols-2 lg:grid-cols-3">
          {shown.map((p) => (
            <li key={p.slug} className="animate-rise">
              <ProjectCard project={p} headingLevel="h2" />
            </li>
          ))}
        </ul>
      </Container>
      <CtaBubble cta={site.cta} />
    </>
  );
}
