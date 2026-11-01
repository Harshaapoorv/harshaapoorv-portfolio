import type { ReactNode } from "react";
import { isRouteErrorResponse, Links, Meta, Outlet, Scripts, ScrollRestoration } from "react-router";
import type { Route } from "./+types/root";
import { SiteFooter, SiteHeader, SkipLink } from "~/components/layout";
import { ButtonLink, Container, Stamp } from "~/components/ui";
import { site } from "~/content";
import { useReveal } from "~/lib/useReveal";
// Self-hosted fonts (latin subsets only): no third-party requests, no layout shift from late fonts.
import "@fontsource-variable/bricolage-grotesque/opsz.css";
import "@fontsource/dm-sans/latin-400.css";
import "@fontsource/dm-sans/latin-500.css";
import "@fontsource/dm-sans/latin-700.css";
import "@fontsource/jetbrains-mono/latin-500.css";
import "@fontsource/jetbrains-mono/latin-700.css";
import "@fontsource/bangers/latin-400.css";
import "./app.css";
import displayFont from "@fontsource-variable/bricolage-grotesque/files/bricolage-grotesque-latin-opsz-normal.woff2?url";
import bodyFont from "@fontsource/dm-sans/files/dm-sans-latin-400-normal.woff2?url";

// Preload the two fonts used above the fold so the headline paints in its final font right away.
const preloadFont = (href: string) => ({
  rel: "preload",
  as: "font",
  type: "font/woff2",
  href,
  crossOrigin: "anonymous" as const,
});

export const links: Route.LinksFunction = () => [
  preloadFont(displayFont),
  preloadFont(bodyFont),
  { rel: "icon", href: "/favicon.svg", type: "image/svg+xml" },
  { rel: "apple-touch-icon", href: "/apple-touch-icon.png" },
];

export function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#FFD43B" />
        {/* Enables scroll-reveal styles only when JS runs, so content is never hidden without it. */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

function Shell({ children }: { children: ReactNode }) {
  useReveal();
  return (
    <>
      <div className="flex min-h-dvh flex-col">
        <SkipLink />
        <SiteHeader />
        <main id="main" tabIndex={-1} className="flex-1 pb-4 focus:outline-none">
          {children}
        </main>
        <SiteFooter />
      </div>
    </>
  );
}

export default function App() {
  return (
    <Shell>
      <Outlet />
    </Shell>
  );
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  const notFound = isRouteErrorResponse(error) && error.status === 404;
  const copy = site.pages.notFound;
  return (
    <Shell>
      <NotFound
        stamp={notFound ? "404!" : "OOPS!"}
        heading={notFound ? copy.heading : "Something went wrong."}
        text={notFound ? copy.text : "Please refresh the page, or head back home."}
      />
    </Shell>
  );
}

export function NotFound({
  stamp = "404!",
  heading,
  text,
}: {
  stamp?: string;
  heading: string;
  text: string;
}) {
  return (
    <Container className="flex flex-col items-start gap-6 py-20 sm:py-28">
      <Stamp size="lg" animate>
        {stamp}
      </Stamp>
      <h1 className="max-w-[760px] text-4xl sm:text-6xl">{heading}</h1>
      <p className="text-lg text-body">{text}</p>
      <div className="flex flex-wrap gap-3">
        <ButtonLink to="/">Back to the home page</ButtonLink>
        <ButtonLink to="/projects" variant="secondary">
          See my projects
        </ButtonLink>
      </div>
    </Container>
  );
}
