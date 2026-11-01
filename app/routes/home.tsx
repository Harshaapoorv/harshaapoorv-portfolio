import type { Route } from "./+types/home";
import { ChapterCard, ProjectCard } from "~/components/cards";
import { ResumeMenu } from "~/components/layout";
import { CtaBubble, Marquee, RoleCycler, StatsGrid } from "~/components/sections";
import {
  ButtonLink,
  Chip,
  Container,
  Label,
  Reveal,
  SectionHeading,
  SpeechBubble,
  Stamp,
} from "~/components/ui";
import { featuredProjects, projects, site } from "~/content";
import { seo } from "~/lib/seo";

export const meta: Route.MetaFunction = () => seo({ path: "/" });

export default function Home() {
  const { hero } = site;
  return (
    <>
      {/* ───── Hero ───── */}
      <Container
        as="section"
        aria-labelledby="hero-heading"
        className="grid items-center gap-12 pt-10 pb-14 sm:pt-14 lg:grid-cols-[1.15fr_1fr] lg:gap-16 lg:pb-20"
      >
        <div className="flex flex-col gap-6">
          <Chip tone="pop" className="w-fit animate-rise">
            {hero.tag}
          </Chip>
          <h1 id="hero-heading" className="text-[42px] leading-[1.02] sm:text-6xl lg:text-[68px]">
            {hero.headline}
          </h1>
          <SpeechBubble
            tail="bottom-left"
            className="w-fit animate-rise px-5 py-3.5 text-lg [animation-delay:160ms] sm:text-xl"
          >
            <p>
              {hero.rolePrefix} <RoleCycler roles={hero.roles} /> {hero.roleSuffix}
            </p>
          </SpeechBubble>
          <p className="mt-3 max-w-[620px] animate-rise text-lg leading-relaxed text-body [animation-delay:240ms]">
            {hero.intro}
          </p>
          <div className="flex animate-rise flex-wrap items-center gap-3 [animation-delay:320ms]">
            <ButtonLink to={hero.primaryCta.to} size="lg">
              {hero.primaryCta.label}
            </ButtonLink>
            <ResumeMenu size="lg" />
          </div>
          <ul
            className="flex animate-rise flex-wrap items-center gap-2 [animation-delay:400ms]"
            aria-label="Roles I have a resume for"
          >
            {site.resumes.map((r) => (
              <li key={r.role}>
                <Chip tone="mono">{r.role}</Chip>
              </li>
            ))}
            <li className="font-mono text-xs text-subtle" aria-hidden="true">
              ← {hero.resumeHint}
            </li>
          </ul>
        </div>

        <div className="relative mx-auto w-full max-w-[520px] animate-rise [animation-delay:200ms]">
          <div className="relative overflow-hidden rounded-[26px] ink-border halftone shadow-comic-xl">
            <img
              src={hero.avatar.src}
              alt={hero.avatar.alt}
              width={600}
              height={600}
              decoding="async"
              className="relative z-10 block aspect-square w-full object-contain"
            />
            <Label
              tone="ink"
              className="absolute right-4 bottom-4 z-20 rounded-lg border-2 border-ink bg-paper px-2.5 py-1"
            >
              {hero.panelCaption}
            </Label>
          </div>
          <div className="absolute -top-6 -right-2 z-20 rotate-6 rounded-2xl ink-border bg-pop px-4 py-2 text-center shadow-comic sm:-right-6">
            <span className="block animate-pop font-comic text-4xl leading-none tracking-wide [animation-delay:600ms] sm:text-5xl">
              {hero.bigStamp.value}
            </span>
            <span className="block font-mono text-[11px] font-bold">{hero.bigStamp.label}</span>
          </div>
          <Stamp
            tone="blue"
            size="md"
            tilt={-8}
            animate
            className="absolute -bottom-5 -left-2 z-20 sm:-left-6"
          >
            {hero.smallStamp}
          </Stamp>
        </div>
      </Container>

      {/* ───── Stats ───── */}
      <Container as="section" aria-label="Highlights" className="pb-16">
        <StatsGrid stats={site.stats} />
      </Container>

      {/* ───── Featured work ───── */}
      <Container as="section" aria-labelledby="featured-heading" className="py-12">
        <Reveal>
          <SectionHeading
            id="featured-heading"
            label={site.featured.label}
            title={site.featured.heading}
            action={
              <ButtonLink to="/projects" variant="secondary">
                All {projects.length} projects
              </ButtonLink>
            }
          />
        </Reveal>
        <ul className="mt-8 grid gap-7 md:grid-cols-2 lg:grid-cols-3">
          {featuredProjects.map((p, i) => (
            <Reveal as="li" key={p.slug} delay={i * 90}>
              <ProjectCard project={p} />
            </Reveal>
          ))}
        </ul>
      </Container>

      {/* ───── Chapters ───── */}
      <Container as="section" aria-labelledby="chapters-heading" className="py-12">
        <Reveal>
          <SectionHeading id="chapters-heading" label={site.chapters.label} title={site.chapters.heading} />
        </Reveal>
        <ol className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {site.chapters.items.map((c, i) => (
            <Reveal as="li" key={c.title} delay={i * 80}>
              <ChapterCard chapter={c} />
            </Reveal>
          ))}
        </ol>
      </Container>

      <div className="mt-10">
        <Marquee items={site.marquee} />
      </div>

      <CtaBubble cta={site.cta} />
    </>
  );
}
