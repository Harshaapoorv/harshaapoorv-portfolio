import type { ReactNode } from "react";
import { cn } from "~/lib/cn";

type Tone = "plain" | "pop" | "mono";

/** Small pill for tags, stack items and meta labels. */
export function Chip({
  children,
  tone = "plain",
  className,
}: {
  children: ReactNode;
  tone?: Tone;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border-2 border-ink px-3 py-1",
        tone === "mono" ? "bg-paper font-mono text-xs font-bold tracking-wide" : "text-sm",
        tone === "pop" && "bg-pop font-mono text-xs font-bold tracking-wide",
        className,
      )}
    >
      {children}
    </span>
  );
}

export function ChipList({ items, className }: { items: string[]; className?: string }) {
  return (
    <ul className={cn("flex flex-wrap gap-2", className)} aria-label="Tech stack">
      {items.map((i) => (
        <li key={i}>
          <Chip>{i}</Chip>
        </li>
      ))}
    </ul>
  );
}
