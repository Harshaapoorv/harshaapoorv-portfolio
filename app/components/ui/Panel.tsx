import type { ElementType, ReactNode } from "react";
import { cn } from "~/lib/cn";

export type Tone = "plain" | "yellow" | "blue" | "halftone" | "dark";

export const toneClasses: Record<Tone, string> = {
  plain: "bg-paper text-ink",
  yellow: "bg-pop text-ink",
  blue: "bg-action text-paper",
  halftone: "halftone text-ink",
  dark: "bg-ink text-paper",
};

type Props = {
  as?: ElementType;
  tone?: Tone;
  shadow?: "none" | "sm" | "md" | "lg";
  radius?: "md" | "lg" | "xl";
  className?: string;
  children: ReactNode;
};

const shadows = { none: "", sm: "shadow-comic-sm", md: "shadow-comic", lg: "shadow-comic-lg" };
const radii = { md: "rounded-2xl", lg: "rounded-[18px]", xl: "rounded-[28px]" };

/** The basic comic panel: ink outline, rounded corners, hard offset shadow. */
export function Panel({
  as: Tag = "div",
  tone = "plain",
  shadow = "md",
  radius = "lg",
  className,
  children,
}: Props) {
  return (
    <Tag className={cn("ink-border", toneClasses[tone], shadows[shadow], radii[radius], className)}>
      {children}
    </Tag>
  );
}
