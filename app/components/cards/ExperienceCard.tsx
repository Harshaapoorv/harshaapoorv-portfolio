import { Link } from "react-router";
import type { Experience } from "~/content/schema";
import { cn } from "~/lib/cn";
import { Label } from "~/components/ui";

/** Card for one role. `featured` renders the large yellow version used for the lead role. */
export function ExperienceCard({
  experience: e,
  featured = false,
}: {
  experience: Experience;
  featured?: boolean;
}) {
  return (
    <article
      className={cn(
        "group relative flex h-full rounded-[18px] ink-border lift",
        featured
          ? "flex-col gap-5 bg-pop p-6 shadow-comic-lg sm:flex-row sm:items-center sm:gap-6 sm:p-7"
          : "flex-col gap-2 bg-paper p-6 shadow-comic",
      )}
    >
      {featured && (
        <span className="flex size-[72px] shrink-0 items-center justify-center rounded-2xl ink-border bg-paper font-display text-[22px] font-extrabold">
          {e.monogram}
        </span>
      )}
      <div className="min-w-0 flex-1">
        <Label tone={featured ? "ink" : "action"}>
          {[e.period, e.location, e.type].join(" · ").toUpperCase()}
        </Label>
        <h3 className={cn("mt-1.5", featured ? "text-2xl sm:text-3xl" : "text-xl sm:text-[22px]")}>
          <Link
            to={`/experience/${e.slug}`}
            prefetch="intent"
            className="no-underline after:absolute after:inset-0 after:rounded-[15px] after:content-['']"
          >
            {e.role}
          </Link>
        </h3>
        {featured && <p className="mt-1 font-medium">{e.organization}</p>}
        <p className={cn("mt-1.5 leading-relaxed", featured ? "text-[17px]" : "text-[15px] text-body")}>
          {!featured && <span className="font-medium text-ink">{e.organization}. </span>}
          {e.summary}
        </p>
      </div>
      <span aria-hidden="true" className={cn("font-bold", featured ? "text-[17px]" : "mt-auto pt-2 text-sm")}>
        Read the full story →
      </span>
    </article>
  );
}
