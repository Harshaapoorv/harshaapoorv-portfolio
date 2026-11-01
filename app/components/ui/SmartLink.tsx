import type { AnchorHTMLAttributes, ReactNode } from "react";
import { Link } from "react-router";
import { isExternal } from "~/lib/cn";

type Props = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & { to: string; children: ReactNode };

/** Router <Link> for site paths, a new-tab <a> for external URLs, a plain <a> for files and mailto. */
export function SmartLink({ to, children, ...rest }: Props) {
  if (/^https?:/.test(to)) {
    return (
      <a href={to} target="_blank" rel="noopener noreferrer" {...rest}>
        {children}
        <span className="sr-only"> (opens in a new tab)</span>
      </a>
    );
  }
  if (isExternal(to) || /\.(pdf|png|jpe?g|webp)$/i.test(to)) {
    return (
      <a href={to} {...rest}>
        {children}
      </a>
    );
  }
  return (
    <Link to={to} prefetch="intent" {...rest}>
      {children}
    </Link>
  );
}
