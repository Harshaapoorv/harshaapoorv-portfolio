import type { Stat } from "~/content/schema";
import { cn } from "~/lib/cn";
import { toneClasses } from "~/components/ui";

/** A big number with a label. Tone comes from the content ("plain" | "yellow" | "blue"). */
export function StatCard({ stat, size = "md" }: { stat: Stat; size?: "sm" | "md" }) {
  return (
    <p
      className={cn(
        "flex h-full flex-col rounded-2xl ink-border shadow-comic",
        toneClasses[stat.tone],
        size === "md" ? "p-5" : "p-4",
      )}
    >
      <span
        className={cn(
          "font-display font-extrabold leading-none",
          size === "md" ? "text-4xl sm:text-[44px]" : "text-3xl",
        )}
      >
        {stat.value}
      </span>
      <span className="mt-2 text-[15px] font-medium leading-snug">{stat.label}</span>
    </p>
  );
}
