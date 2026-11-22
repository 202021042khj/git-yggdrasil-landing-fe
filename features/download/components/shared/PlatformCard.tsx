import Shape from "@/components/common/Shape";
import FileRow from "./FileRow";
import type { DownloadDictionary, FileId, PlatformInfo } from "../../types";
import { cn } from "@/lib/utils";
import text from "@/styles/text.module.css";
import styles from "./PlatformCard.module.css";

interface PlatformCardProps {
  t: DownloadDictionary;
  platform: PlatformInfo;
  /** 이 컴퓨터의 운영체제면 윗줄을 sage 로 칠하고 "추천" 표를 단다 */
  recommended: boolean;
  recommendedFiles: FileId[];
  idPrefix?: string;
  className?: string;
}

/** 운영체제 카드 (Figma Card/macOS · Card/Windows): 윗줄(도형 · 이름 · 추천 표) + 지원 버전 · 파일 줄 · 도움말 */
const PlatformCard = ({ t, platform, recommended, recommendedFiles, idPrefix = "", className }: PlatformCardProps) => (
  <section
    aria-labelledby={`${idPrefix}dl-${platform.id}`}
    data-recommended={recommended || undefined}
    className={cn(styles.card, recommended && styles.recommended, className)}
  >
    <div className={styles.head}>
      <Shape kind={platform.shape} size={24} className={styles.shape} />
      <h2 id={`${idPrefix}dl-${platform.id}`} className={cn(text.displayM, styles.title)}>
        {platform.title}
      </h2>
      <div className={styles.spacer} />
      {recommended && (
        <span className={cn(text.label, styles.tag)}>
          <span className={styles.tagLong}>{t.recommendedTag}</span>
          <span className={styles.tagShort}>{t.recommendedTagShort}</span>
        </span>
      )}
    </div>
    <div className={styles.body}>
      <p className={cn(text.bodyM, styles.muted)}>{t.platforms[platform.id].meta}</p>
      {platform.files.map((file) => (
        <FileRow key={file.id} t={t} file={file} recommended={recommendedFiles.includes(file.id)} />
      ))}
      {t.platforms[platform.id].hint && (
        <p className={cn(text.bodyM, styles.muted)}>{t.platforms[platform.id].hint}</p>
      )}
    </div>
  </section>
);

export default PlatformCard;
