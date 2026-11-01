import type { Route } from "./+types/about";
import { CtaBubble, PageHeader } from "~/components/sections";
import { Container, Label, Panel, Reveal, SectionHeading } from "~/components/ui";
import { about, site } from "~/content";
import { seo } from "~/lib/seo";

export const meta: Route.MetaFunction = () =>
  seo({ title: "About", description: about.paragraphs[0], path: "/about" });

export default function About() {
  return (
    <>
      <div className="grid">
        <PageHeader label={about.label} title={about.heading} />
      </div>
      <Container className="grid gap-10 pb-6 lg:grid-cols-[1.3fr_1fr] lg:gap-14">
        <div className="flex flex-col gap-5 text-lg leading-relaxed text-body sm:text-[19px]">
          {about.paragraphs.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
        <Reveal>
          <Panel tone="yellow" shadow="lg" className="p-6">
            <h2 className="font-comic text-3xl font-normal tracking-wide">{about.characterStats.title}</h2>
            <dl className="mt-4 grid grid-cols-[auto_1fr] gap-x-5 gap-y-2.5">
              {about.characterStats.items.map((s) => (
                <div key={s.key} className="contents">
                  <dt className="font-mono text-xs font-bold leading-6">{s.key}</dt>
                  <dd className="font-medium">{s.value}</dd>
                </div>
              ))}
            </dl>
          </Panel>
        </Reveal>
      </Container>

      <Container as="section" aria-labelledby="journey" className="py-14">
        <Reveal>
          <SectionHeading id="journey" title={about.journey.heading} />
        </Reveal>
        <ol className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {about.journey.items.map((j, i) => (
            <Reveal as="li" key={j.year} delay={(i % 4) * 70}>
              <Panel className="relative h-full p-5 pt-6">
                <span className="absolute -top-4 left-4 rounded-lg ink-border bg-pop px-2.5 py-0.5 font-comic text-xl tracking-wide">
                  {j.year}
                </span>
                <h3 className="mt-2 text-lg leading-snug">{j.title}</h3>
                <p className="mt-1.5 text-[15px] leading-relaxed text-body">{j.text}</p>
              </Panel>
            </Reveal>
          ))}
        </ol>
      </Container>

      <Container as="section" aria-labelledby="education" className="py-10">
        <Reveal>
          <SectionHeading id="education" title={about.education.heading} />
        </Reveal>
        <ul className="mt-8 grid gap-5 md:grid-cols-2">
          {about.education.items.map((e) => (
            <Reveal as="li" key={e.school}>
              <Panel className="h-full p-6">
                <Label>{e.period}</Label>
                <h3 className="mt-1 text-2xl">{e.school}</h3>
                <p className="mt-1 font-medium">{e.degree}</p>
                {e.detail && <p className="mt-1 text-body">{e.detail}</p>}
              </Panel>
            </Reveal>
          ))}
        </ul>
      </Container>

      <Container as="section" aria-labelledby="skills" className="py-10">
        <Reveal>
          <SectionHeading id="skills" title={about.skills.heading} />
        </Reveal>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {about.skills.groups.map((g, i) => (
            <Reveal key={g.name} delay={i * 70}>
              <Panel shadow="sm" className="h-full p-5">
                <h3 className="font-mono text-xs font-bold tracking-wide text-action">{g.name}</h3>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {g.items.map((s) => (
                    <li key={s} className="rounded-full border-2 border-ink px-3 py-1 text-sm">
                      {s}
                    </li>
                  ))}
                </ul>
              </Panel>
            </Reveal>
          ))}
        </div>
      </Container>

      <Container as="section" className="grid gap-6 py-10 md:grid-cols-2">
        <Reveal>
          <Panel tone="dark" shadow="none" className="h-full p-6 sm:p-7">
            <h2 className="text-2xl text-pop sm:text-3xl">{about.trophies.heading}</h2>
            <ul className="mt-4 flex flex-col gap-3">
              {about.trophies.items.map((t) => (
                <li key={t} className="flex gap-3">
                  <span aria-hidden="true" className="text-pop">
                    ★
                  </span>
                  {t}
                </li>
              ))}
            </ul>
          </Panel>
        </Reveal>
        <Reveal delay={80}>
          <Panel tone="halftone" className="h-full p-6 sm:p-7">
            <h2 className="w-fit rounded-lg bg-paper px-2 text-2xl sm:text-3xl">
              {about.offTheClock.heading}
            </h2>
            <ul className="mt-4 flex flex-col gap-3">
              {about.offTheClock.items.map((t) => (
                <li key={t} className="rounded-xl ink-border bg-paper px-4 py-3">
                  {t}
                </li>
              ))}
            </ul>
          </Panel>
        </Reveal>
      </Container>

      <CtaBubble cta={site.cta} />
    </>
  );
}
