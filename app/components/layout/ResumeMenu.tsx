import { useCallback, useEffect, useId, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { site } from "~/content";
import { buttonClasses } from "~/components/ui";
import { cn } from "~/lib/cn";

const GAP = 12;
const MARGIN = 16;

/**
 * Disclosure button that lists one resume per target role.
 * The list is rendered in a portal at the end of <body>, so animated or positioned sections
 * later on the page can never paint over it. It is positioned (fixed) under the button,
 * flips above it when there isn't room below, and closes on Escape, outside click,
 * focus leaving it, or picking a resume.
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
  const [pos, setPos] = useState<{ top: number; left: number } | null>(null);
  const id = useId();
  const button = useRef<HTMLButtonElement>(null);
  const panel = useRef<HTMLDivElement>(null);
  const openedByKeyboard = useRef(false);

  const place = useCallback(() => {
    const b = button.current?.getBoundingClientRect();
    const p = panel.current;
    if (!b || !p) return;
    const w = p.offsetWidth;
    const h = p.offsetHeight;
    let left = align === "right" ? b.right - w : b.left;
    left = Math.max(MARGIN, Math.min(left, window.innerWidth - w - MARGIN));
    const below = b.bottom + GAP;
    const fitsBelow = below + h <= window.innerHeight - MARGIN;
    const top = fitsBelow || b.top - GAP - h < MARGIN ? below : b.top - GAP - h;
    setPos({ top, left });
  }, [align]);

  useLayoutEffect(() => {
    if (!open) return;
    place();
    if (openedByKeyboard.current) panel.current?.querySelector<HTMLAnchorElement>("a")?.focus();
  }, [open, place]);

  useEffect(() => {
    if (!open) return;
    const close = (refocus: boolean) => {
      setOpen(false);
      if (refocus) button.current?.focus();
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close(true);
    const onPointer = (e: PointerEvent) => {
      const t = e.target as Node;
      if (!panel.current?.contains(t) && !button.current?.contains(t)) close(false);
    };
    const onFocus = (e: FocusEvent) => {
      const t = e.target as Node;
      if (!panel.current?.contains(t) && !button.current?.contains(t)) close(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    document.addEventListener("focusin", onFocus);
    window.addEventListener("scroll", place, { passive: true });
    window.addEventListener("resize", place);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
      document.removeEventListener("focusin", onFocus);
      window.removeEventListener("scroll", place);
      window.removeEventListener("resize", place);
    };
  }, [open, place]);

  return (
    <div className={cn("inline-block", className)}>
      <button
        ref={button}
        type="button"
        aria-expanded={open}
        aria-controls={open ? id : undefined}
        onClick={(e) => {
          openedByKeyboard.current = e.detail === 0;
          setPos(null);
          setOpen((o) => !o);
        }}
        className={buttonClasses(variant, size, "cursor-pointer")}
      >
        {label}
        <span aria-hidden="true" className={cn("transition-transform", open && "rotate-180")}>
          ▾
        </span>
      </button>
      {open &&
        createPortal(
          <div
            ref={panel}
            id={id}
            className="fixed z-50 w-[min(19rem,calc(100vw-2rem))] animate-drop rounded-2xl ink-border bg-paper p-2 shadow-comic"
            style={pos ? { top: pos.top, left: pos.left } : { top: 0, left: 0, visibility: "hidden" }}
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
                    className="flex min-h-11 items-center justify-between gap-3 rounded-xl px-3 py-2 font-medium no-underline hover:bg-pop focus-visible:bg-pop"
                  >
                    {r.label}
                    {r.default && (
                      <span className="font-mono text-[11px] font-bold text-action">GENERAL</span>
                    )}
                  </a>
                </li>
              ))}
            </ul>
          </div>,
          document.body,
        )}
    </div>
  );
}
