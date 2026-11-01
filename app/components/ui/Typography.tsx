import type { ReactNode } from "react";
import { cn } from "~/lib/cn";

/** Monospace overline label, e.g. "CH. 01 · 2019–23". */
export function Label({
  children,
  className,
  tone = "action",
}: {
  children: ReactNode;
  className?: string;
  tone?: "action" | "subtle" | "ink";
}) {
  return (
    <span
      className={cn(
        "block font-mono text-xs font-bold tracking-wide sm:text-[13px]",
        tone === "action" && "text-action",
        tone === "subtle" && "text-subtle",
        className,
      )}
    >
      {children}
    </span>
  );
}

/** Section heading with an optional overline label. */
export function SectionHeading({
  label,
  title,
  id,
  className,
  action,
}: {
  label?: string;
  title: string;
  id?: string;
  className?: string;
  action?: ReactNode;
}) {
  return (
    <div className={cn("flex flex-wrap items-end justify-between gap-4", className)}>
      <div>
        {label && <Label>{label}</Label>}
        <h2 id={id} className="mt-1 text-3xl sm:text-4xl">
          {title}
        </h2>
      </div>
      {action}
    </div>
  );
}
