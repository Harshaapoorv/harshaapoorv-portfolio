import { Link } from "react-router";
import type { Project } from "~/content/schema";
import { cn } from "~/lib/cn";
import { Label, Stamp } from "~/components/ui";

const statusStamp: Partial<Record<Project["status"], string>> = { "in-development": "IN PROGRESS" };

/** Project card used on the home page (featured) and the projects index. The whole card is one link. */
export function ProjectCard({
  project,
  headingLevel = "h3",
}: {
  project: Project;
  headingLevel?: "h2" | "h3";
}) {
  const Heading = headingLevel;
  const stamp = statusStamp[project.status];
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-[18px] ink-border bg-paper shadow-comic lift">
      <div className="relative aspect-[16/9] overflow-hidden border-b-[3px] border-ink">
        {project.cover ? (
          <img
            src={project.cover.src}
            alt=""
            loading="lazy"
            decoding="async"
            className="absolute inset-0 size-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
          />
        ) : (
          <div className="halftone flex size-full items-center justify-center p-4">
            <Stamp tone="white" size="md" tilt={-3}>
              {project.badge ?? project.title}
            </Stamp>
          </div>
        )}
        {stamp && (
          <Stamp tone="yellow" size="sm" tilt={5} className="absolute top-3 right-3">
            {stamp}
          </Stamp>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-2 p-5">
        <Label tone="subtle">{project.meta}</Label>
        <Heading className="text-2xl">
          <Link
            to={`/projects/${project.slug}`}
            prefetch="intent"
            className="no-underline after:absolute after:inset-0 after:content-[''] focus-visible:outline-none"
          >
            {project.title}
          </Link>
        </Heading>
        <p className="text-[15px] leading-relaxed text-body">{project.summary}</p>
        <p className="mt-auto pt-2 font-mono text-xs text-action">{project.stack.slice(0, 4).join(" · ")}</p>
      </div>
      {/* Focus ring for the stretched link */}
      <span
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute inset-0 rounded-[15px] group-has-[a:focus-visible]:outline-3 group-has-[a:focus-visible]:outline-action group-has-[a:focus-visible]:outline-offset-4",
        )}
      />
    </article>
  );
}
