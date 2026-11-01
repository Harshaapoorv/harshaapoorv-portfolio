import { useEffect, useId, useRef, useState } from "react";
import { site } from "~/content";
import { buttonClasses } from "~/components/ui";
import { cn } from "~/lib/cn";

/**
 * Disclosure button that lists one resume per target role.
 * Closes on Escape, outside click or picking a resume.
 */
export function ResumeMenu({
  label = "Get my resume",
  variant = "secondary",
  size = "md",
  align = "left",
  className,
}: {
  label?: string;
  variant?: "primary" | "secondary" | "pop";
  size?: "md" | "lg";
  align?: "left" | "right";
  className?: string;
}) {
  const [open, setOpen] = useState(false);
  const id = useId();
  const root = useRef<HTMLDivElement>(null);
  const button = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        button.current?.focus();
      }
    };
    const onClick = (e: MouseEvent) => {
      if (!root.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, [open]);

  return (
    <div ref={root} className={cn("relative inline-block", className)}>
      <button
        ref={button}
        type="button"
        aria-expanded={open}
        aria-controls={id}
        onClick={() => setOpen((o) => !o)}
        className={buttonClasses(variant, size, "cursor-pointer")}
      >
        {label}
        <span aria-hidden="true" className={cn("transition-transform", open && "rotate-180")}>
          ▾
        </span>
      </button>
      <div
        id={id}
        hidden={!open}
        className={cn(
          "absolute z-40 mt-3 w-[min(19rem,calc(100vw-2rem))] rounded-2xl ink-border bg-paper p-2 shadow-comic",
          align === "right" ? "right-0" : "left-0",
        )}
      >
        <p className="px-3 pt-2 pb-1 font-mono text-xs font-bold text-subtle">PICK A ROLE · PDF</p>
        <ul>
          {site.resumes.map((r) => (
            <li key={r.file}>
              <a
                href={r.file}
                target="_blank"
                rel="noopener"
                onClick={() => setOpen(false)}
                className="flex min-h-11 items-center justify-between gap-3 rounded-xl px-3 py-2 font-medium no-underline hover:bg-pop"
              >
                {r.label}
                {r.default && <span className="font-mono text-[11px] font-bold text-action">GENERAL</span>}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
