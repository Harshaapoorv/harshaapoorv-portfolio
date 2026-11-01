import type { ReactNode } from "react";
import type { Link as LinkT, Stat } from "~/content/schema";
import { ButtonLink, Chip, Container, SmartLink } from "~/components/ui";
import { cn } from "~/lib/cn";
import { StatsGrid } from "./StatsGrid";

type Props = {
  back: { label: string; to: string };
  chips: string[];
  title: string;
  intro: string;
  links?: LinkT[];
  stats?: Stat[];
  tone?: "halftone" | "pop";
  aside?: ReactNode;
};

/** Hero for project and experience detail pages: back link, meta chips, H1, intro, link buttons, stats. */
export function DetailHero({
  back,
  chips,
  title,
  intro,
  links = [],
  stats = [],
  tone = "halftone",
  aside,
}: Props) {
  return (
    <>
      <section className={cn("border-b-[3px] border-ink", tone === "pop" ? "halftone-pop" : "halftone")}>
        <Container className="flex flex-col gap-4 pt-8 pb-12 sm:pt-12 sm:pb-14">
          <SmartLink
            to={back.to}
            className="w-fit rounded-full bg-paper px-3 py-1.5 font-bold no-underline ink-border"
          >
            <span aria-hidden="true">← </span>
            {back.label}
          </SmartLink>
          <div className="flex flex-wrap gap-2">
            {chips.map((c, i) => (
              <Chip key={c} tone={i === chips.length - 1 ? "pop" : "mono"}>
                {c}
              </Chip>
            ))}
          </div>
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <h1 className="max-w-[900px] text-[38px] leading-[1.05] sm:text-5xl lg:text-[60px]">{title}</h1>
              <p className="mt-4 max-w-[760px] text-lg leading-[1.9] sm:text-[19px]">
                <span className="box-decoration-clone bg-paper px-1.5 py-1">{intro}</span>
              </p>
            </div>
            {aside}
          </div>
          {links.length > 0 && (
            <div className="mt-1 flex flex-wrap gap-3">
              {links.map((l, i) => (
                <ButtonLink
                  key={l.url}
                  to={l.url}
                  variant={l.primary || (i === 0 && !links.some((x) => x.primary)) ? "primary" : "secondary"}
                >
                  {l.label}
                </ButtonLink>
              ))}
            </div>
          )}
        </Container>
      </section>
      {stats.length > 0 && (
        <Container className="pt-10">
          <StatsGrid stats={stats} />
        </Container>
      )}
    </>
  );
}
