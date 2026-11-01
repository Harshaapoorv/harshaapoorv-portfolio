import { cn } from "~/lib/cn";

/** Title + text card, used for "what I built" style sections and chapters. */
export function InfoCard({
  title,
  text,
  label,
  highlight = false,
}: {
  title: string;
  text: string;
  label?: string;
  highlight?: boolean;
}) {
  return (
    <div className={cn("h-full rounded-2xl ink-border p-5", highlight ? "bg-pop shadow-comic" : "bg-paper")}>
      {label && <span className="mb-1 block font-mono text-xs font-bold text-action">{label}</span>}
      <h3 className="text-lg leading-snug">{title}</h3>
      <p className={cn("mt-1.5 text-[15px] leading-relaxed", highlight ? "text-ink" : "text-body")}>{text}</p>
    </div>
  );
}
