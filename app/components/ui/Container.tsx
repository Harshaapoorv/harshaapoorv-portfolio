import type { ElementType, ReactNode } from "react";
import { cn } from "~/lib/cn";

/** Centers content at the site's max width with responsive side gutters. */
export function Container({
  as: Tag = "div",
  className,
  children,
  ...rest
}: { as?: ElementType; className?: string; children: ReactNode } & Record<string, unknown>) {
  return (
    <Tag className={cn("mx-auto w-full max-w-[1240px] px-4 sm:px-6", className)} {...rest}>
      {children}
    </Tag>
  );
}
