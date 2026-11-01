import { SmartLink, Label } from "~/components/ui";

type Chapter = { label: string; title: string; text: string; to?: string };

/** One "chapter" of the career story on the home page. */
export function ChapterCard({ chapter }: { chapter: Chapter }) {
  const body = (
    <>
      <Label>{chapter.label}</Label>
      <h3 className="mt-2 text-xl">{chapter.title}</h3>
      <p className="mt-2 text-[15px] leading-relaxed text-body">{chapter.text}</p>
    </>
  );
  const cls = "block h-full rounded-[18px] ink-border bg-paper p-5 no-underline shadow-comic lift";
  return chapter.to ? (
    <SmartLink to={chapter.to} className={cls}>
      {body}
    </SmartLink>
  ) : (
    <div className={cls}>{body}</div>
  );
}
