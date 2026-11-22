import { cn } from "@/lib/utils";
import text from "@/styles/text.module.css";
import styles from "./SectionHead.module.css";

interface SectionHeadProps {
  title: string;
  /** 제목 위 작은 라벨 (선택) */
  eyebrow?: string;
  description?: string;
  /** 잉크 띠 위에 놓일 때 */
  onInk?: boolean;
  headingId?: string;
  /** h1 (화면의 첫 제목) 또는 h2 */
  as?: "h1" | "h2";
}

/** 섹션 제목 (히어로 제목과 같은 크기 · 글꼴 규칙, styles/text.module.css .title) */
const SectionHead = ({ title, eyebrow, description, onInk, headingId, as: Heading = "h2" }: SectionHeadProps) => (
  <div className={cn(styles.head, onInk && styles.onInk)}>
    {eyebrow && <p className={cn(text.label, styles.eyebrow)}>{eyebrow}</p>}
    <Heading id={headingId} className={text.title}>
      {title}
    </Heading>
    {description && <p className={cn(text.bodyL, styles.description)}>{description}</p>}
  </div>
);

export default SectionHead;
