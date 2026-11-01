import type { Image } from "~/content/schema";
import { cn } from "~/lib/cn";
import { Reveal } from "~/components/ui";

/** Image grid. Phone screenshots get a narrow multi-column layout; wide images get two columns. */
export function Gallery({ images }: { images: Image[] }) {
  const phone = images.every((i) => i.shape === "phone");
  return (
    <div
      className={cn(
        "grid gap-5",
        phone
          ? "grid-cols-2 sm:grid-cols-3 lg:grid-cols-6"
          : images.length === 1
            ? "grid-cols-1"
            : "grid-cols-1 md:grid-cols-2",
      )}
    >
      {images.map((img, i) => (
        <Reveal key={img.src} as="figure" delay={(i % 6) * 60} className="m-0">
          <div
            className={cn(
              "overflow-hidden ink-border bg-paper shadow-comic",
              phone ? "rounded-[22px]" : "rounded-[18px]",
            )}
          >
            <img
              src={img.src}
              alt={img.alt}
              loading="lazy"
              decoding="async"
              className={cn(
                "block w-full",
                phone ? "aspect-[9/20] object-cover object-top" : "aspect-[3/2] object-contain bg-paper",
              )}
            />
          </div>
          {img.caption && (
            <figcaption className="mt-2.5 font-mono text-xs font-bold tracking-wide uppercase">
              {img.caption}
            </figcaption>
          )}
        </Reveal>
      ))}
    </div>
  );
}
