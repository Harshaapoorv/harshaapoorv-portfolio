import type { Stat } from "~/content/schema";
import { cn } from "~/lib/cn";
import { StatCard } from "~/components/cards";
import { Reveal } from "~/components/ui";

/** Responsive grid of StatCards. Columns adapt to how many stats the content provides. */
export function StatsGrid({
  stats,
  size,
  className,
}: {
  stats: Stat[];
  size?: "sm" | "md";
  className?: string;
}) {
  if (!stats.length) return null;
  const lg = stats.length >= 5 ? "lg:grid-cols-5" : stats.length === 4 ? "lg:grid-cols-4" : "lg:grid-cols-3";
  return (
    <ul
      className={cn("grid grid-cols-2 gap-3 sm:gap-4", stats.length > 2 && "md:grid-cols-3", lg, className)}
    >
      {stats.map((s, i) => (
        <Reveal
          as="li"
          key={s.label}
          delay={i * 70}
          className={cn(stats.length % 2 === 1 && i === stats.length - 1 && "col-span-2 md:col-span-1")}
        >
          <StatCard stat={s} size={size} />
        </Reveal>
      ))}
    </ul>
  );
}
