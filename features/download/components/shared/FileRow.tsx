import CtaButton from "@/components/common/CtaButton";
import { latestDownloadUrl } from "../../constants";
import type { DownloadDictionary, DownloadFile } from "../../types";
import { formatMessage } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import text from "@/styles/text.module.css";
import styles from "./FileRow.module.css";

interface FileRowProps {
  t: DownloadDictionary;
  file: DownloadFile;
  /** 추천 파일이면 Primary 버튼 */
  recommended: boolean;
}

/** 다운로드 파일 한 줄 (Figma Download/FileRow: 데스크톱 Layout=Row, 모바일 Layout=Stack) */
const FileRow = ({ t, file, recommended }: FileRowProps) => (
  <div className={styles.row}>
    <div className={styles.info}>
      <p className={cn(text.headingM, styles.name)}>{t.files[file.id]}</p>
      <p className={cn(text.code, styles.fileName)}>{file.fileName}</p>
    </div>
    <CtaButton
      href={latestDownloadUrl(file.fileName)}
      newTab={false}
      variant={recommended ? "primary" : "secondary"}
      ariaLabel={formatMessage(t.downloadAria, { label: t.files[file.id], file: file.fileName })}
      className={styles.button}
    >
      {t.downloadLabel}
    </CtaButton>
  </div>
);

export default FileRow;
