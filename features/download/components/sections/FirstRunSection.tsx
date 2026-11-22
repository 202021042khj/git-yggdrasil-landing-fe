import Collapse from "@/components/common/Collapse";
import SectionHead from "@/components/common/SectionHead";
import CommandChip from "../shared/CommandChip";
import GuideColumn from "../shared/GuideColumn";
import { MAC_QUARANTINE_COMMAND } from "../../constants";
import type { UseDownloadLogicResult } from "../../hooks/useDownloadLogic";
import type { DownloadDictionary } from "../../types";
import { cn } from "@/lib/utils";
import section from "@/styles/section.module.css";
import text from "@/styles/text.module.css";
import styles from "./FirstRunSection.module.css";

type FirstRunSectionProps = Pick<UseDownloadLogicResult, "isAdvancedOpen" | "toggleAdvanced" | "recommendedPlatform"> & {
  t: DownloadDictionary;
  idPrefix?: string;
};

/** 처음 열기 (잉크 띠): macOS | Windows 단계를 나란히(모바일은 쌓음, 감지된 쪽이 먼저). macOS 아래 "손상됨" 고급 안내는 접어 둔다 */
const FirstRunSection = ({ t, isAdvancedOpen, toggleAdvanced, recommendedPlatform, idPrefix = "" }: FirstRunSectionProps) => {
  const guides =
    recommendedPlatform === "windows" ? [...t.firstRunGuides].reverse() : t.firstRunGuides;
  const tipId = `${idPrefix}mac-quarantine`;

  return (
    <section
      id={`${idPrefix}first-run`}
      aria-labelledby={`${idPrefix}first-run-title`}
      className={cn(section.section, section.divided, section.ink)}
    >
      <div className={section.inner}>
        <SectionHead headingId={`${idPrefix}first-run-title`} onInk {...t.firstRunHead} />
        <div className={styles.guides}>
          {guides.map((guide) => (
            <GuideColumn key={guide.id} guide={guide} idPrefix={idPrefix}>
              {guide.id === "mac" && (
                <div className={styles.tip}>
                  <button
                    type="button"
                    onClick={toggleAdvanced}
                    aria-expanded={isAdvancedOpen}
                    aria-controls={tipId}
                    className={styles.tipButton}
                  >
                    <span className={cn(text.label, styles.tipTag)}>
                      {t.quarantineTip.tag}
                    </span>
                    <span className={cn(text.headingM, styles.tipTitle)}>{t.quarantineTip.title}</span>
                    <span aria-hidden="true" className={cn(text.code, styles.tipArrow)}>
                      {isAdvancedOpen ? "↓" : "→"}
                    </span>
                  </button>
                  <Collapse open={isAdvancedOpen} id={tipId}>
                    <div className={styles.tipBody}>
                      <p className={cn(text.bodyM, styles.muted)}>{t.quarantineTip.body}</p>
                      <CommandChip command={MAC_QUARANTINE_COMMAND} copyLabel={t.copy} tone="line" />
                    </div>
                  </Collapse>
                </div>
              )}
            </GuideColumn>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FirstRunSection;
