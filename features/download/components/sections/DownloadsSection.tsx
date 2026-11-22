import Shape from "@/components/common/Shape";
import SectionHead from "@/components/common/SectionHead";
import FileRow from "../shared/FileRow";
import PlatformCard from "../shared/PlatformCard";
import { PLATFORMS, RELEASES_URL } from "../../constants";
import type { UseDownloadLogicResult } from "../../hooks/useDownloadLogic";
import type { DetectKey, DownloadDictionary, PlatformId } from "../../types";
import { cn } from "@/lib/utils";
import text from "@/styles/text.module.css";
import styles from "./DownloadsSection.module.css";

type DownloadsSectionProps = Pick<UseDownloadLogicResult, "recommendedPlatform" | "recommendedFiles"> & {
  t: DownloadDictionary;
  detectKey: DetectKey;
  idPrefix?: string;
  /** 모바일 트리: 세 운영체제 모두 카드로 쌓고, 추천 카드를 맨 위로 */
  stacked?: boolean;
};

const byId = (id: PlatformId) => PLATFORMS.find((platform) => platform.id === id)!;

/**
 * 다운로드 화면 첫 섹션: 버전 · 제목 · 자동 감지 칩, 그 아래 카드.
 * 내려받기: 데스크톱은 macOS | Windows 카드를 나란히(감지된 쪽 강조) + 아래 Linux 한 줄, 모바일은 카드를 쌓는다.
 * 모든 링크는 GitHub Releases 의 latest/download 주소다.
 */
const DownloadsSection = ({ t, detectKey, recommendedPlatform, recommendedFiles, idPrefix = "", stacked = false }: DownloadsSectionProps) => {
  const linux = byId("linux");
  const linuxRecommended = recommendedPlatform === "linux";
  // 모바일 · Linux 감지(데스크톱)에서는 Linux 도 카드. 쌓을 때와 Linux 감지 때만 추천 카드를 맨 위로 올린다.
  // 데스크톱 나란히 놓기는 macOS | Windows 순서를 고정한다(감지가 끝난 뒤 카드 자리가 바뀌지 않게)
  const reorder = stacked || linuxRecommended;
  const shown = reorder ? PLATFORMS : PLATFORMS.filter((p) => p.id !== "linux");
  const cards = reorder
    ? [...shown].sort((a, b) => Number(b.id === recommendedPlatform) - Number(a.id === recommendedPlatform))
    : shown;

  return (
    <section aria-labelledby={`${idPrefix}download-title`} className={styles.downloads}>
      <div className={styles.inner}>
        <div className={styles.head}>
          <SectionHead as="h1" headingId={`${idPrefix}download-title`} {...t.intro} />
          {/* 감지 결과는 브라우저에서 바뀌므로 화면 낭독기에 알린다 */}
          <p role="status" className={cn(text.code, styles.status)}>
            <Shape kind="circle" size={10} tone={detectKey === "mobile" || detectKey === "unknown" ? "clay" : "brand"} />
            {t.detect[detectKey]}
          </p>
        </div>
        <div className={styles.cards}>
          {cards.map((platform) => (
            <PlatformCard
              key={platform.id}
              t={t}
              platform={platform}
              idPrefix={idPrefix}
              recommended={platform.id === recommendedPlatform}
              recommendedFiles={recommendedFiles}
              className={platform.id === "linux" && !stacked ? styles.wide : undefined}
            />
          ))}
        </div>
        {!stacked && !linuxRecommended && (
          <FileRow t={t} file={linux.files[0]} recommended={false} />
        )}
        <div className={styles.releases}>
          <a
            href={RELEASES_URL}
            target="_blank"
            rel="noreferrer"
            className={cn(text.label, styles.releasesLink)}
          >
            {t.releasesLink.label} <span aria-hidden="true">↗</span>
          </a>
          <p className={cn(text.code, styles.note)}>{t.releasesLink.note}</p>
        </div>
      </div>
    </section>
  );
};

export default DownloadsSection;
