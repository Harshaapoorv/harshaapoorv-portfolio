/** Joins class names, skipping falsy values. */
export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export const isExternal = (url: string) => /^(https?:|mailto:)/.test(url);
