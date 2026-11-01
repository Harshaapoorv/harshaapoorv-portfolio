import { Container, SmartLink } from "~/components/ui";

type Item = { title: string; to: string };

/** "Previous issue / Next issue" links at the bottom of detail pages. */
export function PrevNextNav({ prev, next, noun = "ISSUE" }: { prev: Item; next: Item; noun?: string }) {
  const cls = "block rounded-2xl ink-border bg-paper p-5 no-underline shadow-comic lift sm:p-6";
  return (
    <Container as="nav" aria-label="More" className="pt-16">
      <div className="grid gap-5 sm:grid-cols-2">
        <SmartLink to={prev.to} className={cls} rel="prev">
          <span className="block font-mono text-xs font-bold text-subtle">← PREVIOUS {noun}</span>
          <span className="mt-1 block font-display text-2xl font-extrabold">{prev.title}</span>
        </SmartLink>
        <SmartLink to={next.to} className={cls + " sm:text-right"} rel="next">
          <span className="block font-mono text-xs font-bold text-subtle">NEXT {noun} →</span>
          <span className="mt-1 block font-display text-2xl font-extrabold">{next.title}</span>
        </SmartLink>
      </div>
    </Container>
  );
}
