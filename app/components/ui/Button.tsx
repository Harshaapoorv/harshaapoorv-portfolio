import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "~/lib/cn";
import { SmartLink } from "./SmartLink";

export type ButtonVariant = "primary" | "secondary" | "pop" | "dark";
type Size = "md" | "lg";

const variants: Record<ButtonVariant, string> = {
  primary: "bg-action text-paper hover:bg-action-dark",
  secondary: "bg-paper text-ink",
  pop: "bg-pop text-ink",
  dark: "bg-ink text-paper border-ink",
};
const sizes: Record<Size, string> = {
  md: "min-h-11 px-5 py-2.5 text-base",
  lg: "min-h-12 px-6 py-3 text-[17px]",
};

export function buttonClasses(variant: ButtonVariant = "primary", size: Size = "md", className?: string) {
  return cn(
    "lift inline-flex items-center justify-center gap-2 rounded-full ink-border font-bold no-underline shadow-comic-sm transition-colors",
    "disabled:cursor-not-allowed disabled:opacity-60",
    variants[variant],
    sizes[size],
    className,
  );
}

type Common = { variant?: ButtonVariant; size?: Size; className?: string; children: ReactNode };

/** A link styled as a button. Adds ↗ to external links and → to internal ones unless `arrow={false}`. */
export function ButtonLink({
  to,
  variant,
  size,
  className,
  children,
  arrow = true,
  download,
}: Common & { to: string; arrow?: boolean; download?: boolean }) {
  const external = /^https?:/.test(to);
  return (
    <SmartLink to={to} className={buttonClasses(variant, size, className)} download={download}>
      {children}
      {arrow && <span aria-hidden="true">{external ? "↗" : "→"}</span>}
    </SmartLink>
  );
}

export function Button({
  variant,
  size,
  className,
  children,
  ...rest
}: Common & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button className={buttonClasses(variant, size, className)} {...rest}>
      {children}
    </button>
  );
}
