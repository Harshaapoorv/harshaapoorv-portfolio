import { useEffect, useState } from "react";

/**
 * Cycles through role names with a flip-in animation (pure CSS, re-triggered by the key change).
 * Screen readers get the full list once instead of a constantly changing live region.
 */
export function RoleCycler({ roles, interval = 1900 }: { roles: string[]; interval?: number }) {
  const [i, setI] = useState(0);
  useEffect(() => {
    if (roles.length < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setInterval(() => setI((n) => (n + 1) % roles.length), interval);
    return () => clearInterval(t);
  }, [roles.length, interval]);

  return (
    <>
      <span className="sr-only">{roles.join(", ")}</span>
      <span aria-hidden="true" className="inline-block [perspective:400px]">
        <span key={roles[i]} className="inline-block animate-flip font-bold text-action">
          {roles[i]}
        </span>
      </span>
    </>
  );
}
