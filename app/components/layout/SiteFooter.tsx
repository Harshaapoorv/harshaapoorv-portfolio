import { Link } from "react-router";
import { site } from "~/content";
import { Container, SmartLink } from "~/components/ui";

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t-[3px] border-ink bg-ink text-paper">
      <Container className="flex flex-col gap-6 py-10 md:flex-row md:items-center md:justify-between">
        <div>
          <Link to="/" className="font-display text-2xl font-extrabold text-paper no-underline">
            {site.fullName}
          </Link>
          <p className="mt-1 text-sm text-paper/75">
            © {new Date().getFullYear()} · {site.footer.text}
          </p>
        </div>
        <ul className="flex flex-wrap gap-x-6 gap-y-2" aria-label="Elsewhere">
          {site.socials.map((s) => (
            <li key={s.label}>
              <SmartLink
                to={s.url}
                className="inline-flex min-h-11 items-center font-bold text-paper decoration-pop hover:underline"
              >
                {s.label}
              </SmartLink>
            </li>
          ))}
        </ul>
      </Container>
    </footer>
  );
}
