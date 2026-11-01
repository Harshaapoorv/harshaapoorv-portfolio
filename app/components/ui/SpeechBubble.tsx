import type { ReactNode } from "react";
import { cn } from "~/lib/cn";

type Props = {
  children: ReactNode;
  tone?: "plain" | "yellow";
  /** Where the tail points from. */
  tail?: "bottom-left" | "bottom-right" | "none";
  className?: string;
};

/**
 * Rounded comic speech bubble. The tail is a rotated square with only two ink edges,
 * so it joins the bubble's outline seamlessly.
 */
export function SpeechBubble({ children, tone = "plain", tail = "bottom-left", className }: Props) {
  const bg = tone === "yellow" ? "bg-pop" : "bg-paper";
  return (
    <div className={cn("relative rounded-[28px] ink-border shadow-comic", bg, className)}>
      {tail !== "none" && (
        <span
          aria-hidden="true"
          className={cn(
            "pointer-events-none absolute -bottom-[13px] size-[22px] rotate-45 border-r-[3px] border-b-[3px] border-ink",
            bg,
            tail === "bottom-left" ? "left-12" : "right-12",
          )}
        />
      )}
      <div className="relative">{children}</div>
    </div>
  );
}
