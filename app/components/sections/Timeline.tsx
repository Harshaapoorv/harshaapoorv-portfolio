/** Vertical timeline with dated entries. */
export function Timeline({ items }: { items: { date: string; text: string }[] }) {
  return (
    <ol className="relative ml-2 border-l-[3px] border-ink">
      {items.map((it) => (
        <li key={it.date + it.text} className="relative pb-6 pl-7 last:pb-0">
          <span
            aria-hidden="true"
            className="absolute top-1 -left-[11px] size-[19px] rounded-full ink-border bg-pop"
          />
          <span className="block font-mono text-xs font-bold text-action">{it.date}</span>
          <span className="mt-1 block text-[17px] leading-snug">{it.text}</span>
        </li>
      ))}
    </ol>
  );
}
