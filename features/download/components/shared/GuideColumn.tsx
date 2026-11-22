import type { ReactNode } from "react";
import Shape from "@/components/common/Shape";
import type { FirstRunGuide } from "../../types";
import { cn } from "@/lib/utils";
import text from "@/styles/text.module.css";
import styles from "./GuideColumn.module.css";

interface GuideColumnProps {
  guide: FirstRunGuide;
  idPrefix?: string;
  /** 단계 아래에 붙는 것 (macOS 고급 안내) */
  children?: ReactNode;
}

/** 처음 열기 단계 목록 한 열 (Figma Column/macOS · Column/Windows, 줄마다 Download/Step) */
const GuideColumn = ({ guide, idPrefix = "", children }: GuideColumnProps) => (
  <section aria-labelledby={`${idPrefix}guide-${guide.id}`} className={styles.column}>
    <div className={styles.head}>
      <Shape kind={guide.shape} size={20} tone="brand" />
      <h3 id={`${idPrefix}guide-${guide.id}`} className={cn(text.headingM, styles.heading)}>
        {guide.title}
      </h3>
    </div>
    <ol className={styles.steps}>
      {guide.steps.map((step, index) => (
        <li key={step.title} className={styles.step}>
          <span aria-hidden="true" className={cn(text.displayM, styles.number)}>
            {index + 1}
          </span>
          <div className={styles.content}>
            <p className={cn(text.headingM, styles.heading)}>{step.title}</p>
            <p className={cn(text.bodyM, styles.muted)}>{step.body}</p>
            {step.ui && (
              <span className={cn(text.code, styles.ui)}>
                {step.ui}
              </span>
            )}
          </div>
        </li>
      ))}
    </ol>
    <p className={cn(text.bodyM, styles.muted, styles.note)}>{guide.note}</p>
    {children}
  </section>
);

export default GuideColumn;
