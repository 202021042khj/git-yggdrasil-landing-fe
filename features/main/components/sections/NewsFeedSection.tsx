import type { ReactNode } from "react";
import Collapse from "@/components/common/Collapse";
import SectionHead from "@/components/common/SectionHead";
import Shape from "@/components/common/Shape";
import type { HomeDictionary } from "../../types";
import { cn } from "@/lib/utils";
import section from "@/styles/section.module.css";
import text from "@/styles/text.module.css";
import styles from "./NewsFeedSection.module.css";

interface NewsFeedSectionProps {
  t: HomeDictionary;
  idPrefix?: string;
  /** 펼친 변경 기록(hash). 한 번에 하나만 */
  openChange: string | null;
  toggleChange: (hash: string) => void;
}

// 릴리스 · 커밋은 서버가 GitHub 에서 받아 온다 (features/main/i18n/getHomeNews.ts, 10분마다 갱신). "전체 보기" 는 GitHub 페이지로
const external = { target: "_blank", rel: "noopener noreferrer" } as const;

const SeeAll = ({ label, href }: { label: string; href: string }) => (
  <a href={href} {...external} className={cn(text.label, styles.seeAll)}>
    {label}
  </a>
);

const Empty = ({ message, link, href }: { message: string; link: string; href: string }) => (
  <p className={cn(text.bodyM, styles.empty)}>
    {message}{" "}
    <a href={href} {...external} className={styles.inlineLink}>
      {link}
    </a>
  </p>
);

const ColumnHead = ({ title, children }: { title: string; children: ReactNode }) => (
  <div className={styles.columnHead}>
    <h3 className={cn(text.headingM, styles.columnTitle)}>{title}</h3>
    {children}
  </div>
);

const NewsFeedSection = ({ t, idPrefix = "", openChange, toggleChange }: NewsFeedSectionProps) => (
  <section
    id={`${idPrefix}news`}
    aria-labelledby={`${idPrefix}news-title`}
    className={cn(section.section, section.divided, section.surface)}
  >
    <div className={section.inner}>
      <SectionHead headingId={`${idPrefix}news-title`} {...t.newsHead} />
      <div className={styles.columns}>
        <div>
          <ColumnHead title={t.releaseNotesTitle}>
            <SeeAll label={t.seeAll} href={t.releasesUrl} />
          </ColumnHead>
          {t.releaseNotes.length === 0 && (
            <Empty message={t.noReleases} link={t.viewOnGithub} href={t.releasesUrl} />
          )}
          <ul>
            {t.releaseNotes.map((note) => (
              <li key={note.version} className={styles.item}>
                <a href={note.url} {...external} className={cn(styles.row, styles.release)}>
                  <span className={cn(text.label, styles.version)}>{note.version}</span>
                  <span className={cn(text.bodyM, styles.rowTitle)}>{note.title ?? t.releaseDefault}</span>
                  <time className={cn(text.code, styles.date)}>{note.date}</time>
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <ColumnHead title={t.changeLogTitle}>
            <SeeAll label={t.seeAll} href={t.commitsUrl} />
          </ColumnHead>
          {t.changeLog.length === 0 && (
            <Empty message={t.noChanges} link={t.viewOnGithub} href={t.commitsUrl} />
          )}
          <ul>
            {t.changeLog.map((entry) => {
              const open = openChange === entry.hash;
              const panelId = `${idPrefix}change-${entry.hash}`;
              return (
                <li key={entry.hash} className={styles.item}>
                  <button
                    type="button"
                    aria-expanded={open}
                    aria-controls={panelId}
                    onClick={() => toggleChange(entry.hash)}
                    className={cn(styles.row, styles.change)}
                  >
                    <Shape kind="circle" size={12} tone={entry.tone} />
                    <code className={cn(text.code, styles.hash)}>{entry.hash}</code>
                    <span className={cn(text.bodyM, styles.rowTitle)}>{entry.title}</span>
                    <time className={cn(text.code, styles.date)}>{entry.date}</time>
                    {/* 돌리지 않고 모양만 바뀐다(오른쪽 → 아래) */}
                    <svg aria-hidden="true" viewBox="0 0 12 12" className={styles.caret}>
                      <path d={open ? "M0 2 L12 2 L6 11 Z" : "M2 0 L11 6 L2 12 Z"} />
                    </svg>
                  </button>
                  <Collapse open={open} id={panelId}>
                    <p className={cn(text.bodyM, styles.detail)}>
                      {entry.detail || t.noDetail}{" "}
                      <a href={entry.url} {...external} className={cn(text.code, styles.detailLink)}>
                        {t.viewOnGithub}
                      </a>
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
