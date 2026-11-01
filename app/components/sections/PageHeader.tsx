import type { ReactNode } from "react";
import { Container, Label } from "~/components/ui";

/** Standard top-of-page header: overline label, H1 and intro. */
export function PageHeader({
  label,
  title,
  intro,
  children,
}: {
  label: string;
  title: string;
  intro?: string;
  children?: ReactNode;
}) {
  return (
    <Container as="header" className="pt-12 pb-6 sm:pt-16">
      <div>
        <Label>{label}</Label>
        <h1 className="mt-2 text-[44px] leading-[1.02] sm:text-6xl">{title}</h1>
        {intro && (
          <p className="mt-4 animate-rise max-w-[680px] text-lg leading-relaxed text-body sm:text-[19px]">
            {intro}
          </p>
        )}
        {children}
      </div>
    </Container>
  );
}
