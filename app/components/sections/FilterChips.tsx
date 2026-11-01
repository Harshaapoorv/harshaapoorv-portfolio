import { cn } from "~/lib/cn";

/** Single-select toggle chips. Each chip is a button with aria-pressed. */
export function FilterChips<T extends string>({
  options,
  value,
  onChange,
  label,
  counts,
}: {
  options: readonly T[];
  value: T;
  onChange: (v: T) => void;
  label: string;
  counts?: Partial<Record<T, number>>;
}) {
  return (
    <div role="group" aria-label={label} className="flex flex-wrap gap-2.5">
      {options.map((o) => {
        const on = o === value;
        return (
          <button
            key={o}
            type="button"
            aria-pressed={on}
            onClick={() => onChange(o)}
            className={cn(
              "min-h-11 cursor-pointer rounded-full ink-border px-4 py-2 text-[15px] font-bold shadow-comic-sm transition-colors",
              on ? "bg-ink text-paper" : "bg-paper text-ink hover:bg-pop",
            )}
          >
            {o}
            {counts?.[o] !== undefined && (
              <span className={cn("ml-1.5 font-mono text-xs", on ? "text-pop" : "text-subtle")}>
                {counts[o]}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
