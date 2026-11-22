import type { FC } from "react";
import { DesktopHeaderSection, FooterSection } from "@/features/main";
import { localePath } from "@/lib/i18n";
import screen from "@/styles/screen.module.css";
import DownloadsSection from "./sections/DownloadsSection";
import FirstRunSection from "./sections/FirstRunSection";
import type { UseDownloadLogicResult } from "../hooks/useDownloadLogic";

// 상단바 · 푸터는 홈과 같다(features/main 이 공개). 메뉴는 홈 섹션을 가리키므로 linkBase 는 이 언어의 홈("/en")
const DesktopPage: FC<UseDownloadLogicResult> = ({
  lang,
  t,
  chrome,
  detectKey,
  recommendedPlatform,
  recommendedFiles,
  isAdvancedOpen,
  toggleAdvanced,
}) => (
  <div className={screen.page}>
    <DesktopHeaderSection lang={lang} chrome={chrome} linkBase={localePath(lang)} />
    <main className={screen.main}>
      <DownloadsSection t={t} detectKey={detectKey} recommendedPlatform={recommendedPlatform} recommendedFiles={recommendedFiles} />
      <FirstRunSection
        t={t}
        recommendedPlatform={recommendedPlatform}
        isAdvancedOpen={isAdvancedOpen}
        toggleAdvanced={toggleAdvanced}
      />
    </main>
    <FooterSection lang={lang} chrome={chrome} />
  </div>
);

export default DesktopPage;
