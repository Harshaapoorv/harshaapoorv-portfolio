/** Endless scrolling strip of words. Pauses on hover; static for reduced-motion users. */
export function Marquee({ items }: { items: string[] }) {
  const row = (hidden: boolean) => (
    <ul aria-hidden={hidden || undefined} className="flex shrink-0 items-center gap-8 pr-8">
      {items.map((t) => (
        <li
          key={t}
          className="flex items-center gap-8 whitespace-nowrap font-display text-2xl font-extrabold sm:text-3xl"
        >
          {t}
          <span aria-hidden="true">✶</span>
        </li>
      ))}
    </ul>
  );
  return (
    <section aria-label="Tools I use" className="overflow-hidden border-y-[3px] border-ink bg-pop py-4">
      <div className="flex w-max animate-marquee hover:[animation-play-state:paused]">
        {row(false)}
        {row(true)}
      </div>
    </section>
  );
}
