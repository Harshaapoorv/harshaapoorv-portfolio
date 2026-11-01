import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router";
import { site } from "~/content";
import { cn } from "~/lib/cn";
import { Container } from "~/components/ui";
import { ResumeMenu } from "./ResumeMenu";

function Logo() {
  return (
    <Link to="/" className="flex items-center gap-2.5 no-underline">
      <span
        aria-hidden="true"
        className="flex size-11 items-center justify-center rounded-full ink-border bg-pop font-comic text-[22px] shadow-comic-sm"
      >
        {site.name
          .split(" ")
          .map((w) => w[0])
          .join("")}
      </span>
      <span className="font-display text-lg font-extrabold sm:text-xl">{site.name}</span>
    </Link>
  );
}

/** Sticky site header: full nav from md up, a disclosure menu on phones. */
export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  // Close the phone menu whenever the route changes.
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(false);
  }
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  const linkCls = ({ isActive }: { isActive: boolean }) =>
    cn(
      "rounded-lg px-3.5 py-2.5 no-underline transition-colors hover:text-action",
      isActive && "font-bold underline decoration-action decoration-[3px] underline-offset-8",
    );

  return (
    <header className="sticky top-0 z-30 border-b-[3px] border-ink bg-paper/95 backdrop-blur supports-[backdrop-filter]:bg-paper/85">
      <Container className="flex items-center justify-between gap-4 py-3">
        <Logo />
        <nav aria-label="Main" className="hidden items-center gap-1 md:flex">
          {site.nav.map((n) => (
            <NavLink key={n.to} to={n.to} prefetch="intent" className={linkCls}>
              {n.label}
            </NavLink>
          ))}
          <ResumeMenu label="Resume" variant="primary" align="right" className="ml-3" />
        </nav>
        <button
          type="button"
          className="flex size-11 cursor-pointer items-center justify-center rounded-xl ink-border bg-paper text-xl font-bold md:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((o) => !o)}
        >
          <span aria-hidden="true">{open ? "✕" : "☰"}</span>
        </button>
      </Container>
      {open && (
        <nav
          id="mobile-menu"
          aria-label="Main"
          className="animate-drop border-t-[3px] border-ink bg-pop md:hidden"
        >
          <Container className="flex flex-col pt-2 pb-5">
            {site.nav.map((n) => (
              <NavLink
                key={n.to}
                to={n.to}
                className={({ isActive }) =>
                  cn(
                    "py-3 font-display text-[28px] font-extrabold no-underline",
                    isActive && "underline decoration-[3px] underline-offset-8",
                  )
                }
              >
                {n.label}
              </NavLink>
            ))}
            <ResumeMenu label="Resume" variant="secondary" className="mt-3" />
          </Container>
        </nav>
      )}
    </header>
  );
}
