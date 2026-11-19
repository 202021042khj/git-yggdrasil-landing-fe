import Collapse from "@/components/common/Collapse";
import SectionHead from "@/components/common/SectionHead";
import Shape from "../shared/Shape";
import { CHANGE_LOG, RELEASE_NOTES } from "../../constants";

interface NewsFeedSectionProps {
  idPrefix?: string;
  /** 펼친 변경 기록(hash). 한 번에 하나만 */
  openChange: string | null;
  toggleChange: (hash: string) => void;
}

// TODO: 릴리스 노트 · 변경 기록 전체 페이지가 아직 없다 — 더미 링크
const SeeAll = () => (
  <a
    href="#"
    className="font-code text-label-m font-medium whitespace-nowrap text-fg-brand uppercase hover:underline"
  >
    전체 보기 →
  </a>
);

const NewsFeedSection = ({
  idPrefix = "",
  openChange,
  toggleChange,
}: NewsFeedSectionProps) => (
  <section
    id={`${idPrefix}news`}
    aria-labelledby={`${idPrefix}news-title`}
    className="w-full border-t-3 border-line-strong bg-surface px-5 py-16 md:px-10 md:py-32 lg:px-20"
  >
    <div className="mx-auto flex max-w-[1280px] flex-col gap-12 md:gap-16">
      <SectionHead
        headingId={`${idPrefix}news-title`}
        eyebrow="05 — NEWS"
        title="Fresh rings."
      />
      <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
        <div>
          <div className="flex items-center gap-4 border-b-3 border-line-strong pb-4">
            <h3 className="flex-1 font-serif text-heading-m font-semibold text-fg">
              릴리스 노트
            </h3>
            <SeeAll />
          </div>
          <ul>
            {RELEASE_NOTES.map((note) => (
              <li
                key={note.version}
                className="flex items-center gap-4 border-b border-line-subtle py-4"
              >
                <span className="shrink-0 bg-btn-ink px-2 py-1 font-code text-label-m font-medium text-btn-ink-fg uppercase">
                  {note.version}
                </span>
                <span className="min-w-0 flex-1 text-body-m text-fg">
                  {note.title}
                </span>
                <time className="shrink-0 font-code text-code-m text-fg-muted">
                  {note.date}
                </time>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <div className="flex items-center gap-4 border-b-3 border-line-strong pb-4">
            <h3 className="flex-1 font-serif text-heading-m font-semibold text-fg">
              변경 기록
            </h3>
            <SeeAll />
          </div>
          <ul>
            {CHANGE_LOG.map((entry) => {
              const open = openChange === entry.hash;
              const panelId = `${idPrefix}change-${entry.hash}`;
              return (
                <li key={entry.hash} className="border-b border-line-subtle">
                  <button
                    type="button"
                    aria-expanded={open}
                    aria-controls={panelId}
                    onClick={() => toggleChange(entry.hash)}
                    className="flex w-full cursor-pointer flex-wrap items-center gap-x-4 gap-y-1 py-4 text-left focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-fg-brand"
                  >
                    <Shape kind="circle" size={12} tone={entry.tone} />
                    <code className="shrink-0 font-code text-code-m text-fg-brand">
                      {entry.hash}
                    </code>
                    <span className="min-w-0 flex-1 text-body-m text-fg">
                      {entry.title}
                    </span>
                    <time className="shrink-0 font-code text-code-m text-fg-muted">
                      {entry.date}
                    </time>
                    {/* 참조처럼 돌리지 않고 모양만 바뀐다(오른쪽 → 아래) */}
                    <svg
                      aria-hidden="true"
                      viewBox="0 0 12 12"
                      className="size-3 shrink-0 fill-current text-fg"
                    >
                      <path
                        d={open ? "M0 2 L12 2 L6 11 Z" : "M2 0 L11 6 L2 12 Z"}
                      />
                    </svg>
                  </button>
                  <Collapse open={open} id={panelId}>
                    <p className="pb-4 pl-7 text-body-m text-fg-muted">
                      {entry.detail}
                    </p>
                  </Collapse>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  </section>
);

export default NewsFeedSection;
