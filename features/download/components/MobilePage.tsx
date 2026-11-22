import { FooterSection, MOBILE_ID_PREFIX as ID_PREFIX, MobileHeaderSection } from "@/features/main";
import { localePath } from "@/lib/i18n";
import screen from "@/styles/screen.module.css";
import DownloadsSection from "./sections/DownloadsSection";
import FirstRunSection from "./sections/FirstRunSection";
import type { UseDownloadLogicResult } from "../hooks/useDownloadLogic";

const MobilePage = ({
  lang,
  t,
  chrome,
  isMenuOpen,
  toggleMenu,
  closeMenu,
  detectKey,
  recommendedPlatform,
  recommendedFiles,
  isAdvancedOpen,
  toggleAdvanced,
}: UseDownloadLogicResult) => (
  <div className={screen.page}>
    <MobileHeaderSection
      lang={lang}
      chrome={chrome}
      linkBase={localePath(lang)}
      isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} closeMenu={closeMenu} />
    <main className={screen.main}>
      <DownloadsSection
        t={t}
        detectKey={detectKey}
        idPrefix={ID_PREFIX}
        stacked
        recommendedPlatform={recommendedPlatform}
        recommendedFiles={recommendedFiles}
      />
      <FirstRunSection
        t={t}
        idPrefix={ID_PREFIX}
        recommendedPlatform={recommendedPlatform}
        isAdvancedOpen={isAdvancedOpen}
        toggleAdvanced={toggleAdvanced}
      />
    </main>
    <FooterSection lang={lang} chrome={chrome} />
  </div>
);

export default MobilePage;
