import type { ReactNode } from "react";
import { cn } from "~/lib/cn";

type Props = {
  children: ReactNode;
  tone?: "yellow" | "blue" | "white";
  size?: "sm" | "md" | "lg";
  tilt?: number;
  className?: string;
  /** Pops in with a spring animation on first render. */
  animate?: boolean;
};

const tones = { yellow: "bg-pop text-ink", blue: "bg-action text-paper", white: "bg-paper text-ink" };
const sizes = { sm: "text-2xl px-3 py-0.5", md: "text-3xl px-4 py-1", lg: "text-5xl px-5 py-1.5" };

/** Comic sound-effect stamp ("SHIPPED!"). Decorative text, so keep the real info elsewhere on the page. */
export function Stamp({ children, tone = "yellow", size = "md", tilt = -4, className, animate }: Props) {
  return (
    <span
      className={cn(
        "inline-block w-fit rounded-xl ink-border font-comic tracking-wide shadow-comic-sm",
        tones[tone],
        sizes[size],
        className,
      )}
      style={{ rotate: `${tilt}deg` }}
    >
      <span className={cn("inline-block", animate && "animate-pop")}>{children}</span>
    </span>
  );
}
