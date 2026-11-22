import ChecklistSection from "./sections/ChecklistSection";
import screen from "@/styles/screen.module.css";
import FeaturesSection from "./sections/FeaturesSection";
import FooterSection from "./sections/FooterSection";
import HelpBandSection from "./sections/HelpBandSection";
import HeroSection from "./sections/HeroSection";
import MobileHeaderSection from "./sections/MobileHeaderSection";
import NewsFeedSection from "./sections/NewsFeedSection";
import { MOBILE_ID_PREFIX as ID_PREFIX } from "../constants";
import type { UseHomeLogicResult } from "../hooks/useHomeLogic";

const MobilePage = ({ lang, t, isMenuOpen, toggleMenu, closeMenu, openChange, toggleChange }: UseHomeLogicResult) => (
  <div className={screen.page}>
    <MobileHeaderSection
      lang={lang}
      chrome={t.chrome}
      isMenuOpen={isMenuOpen}
      toggleMenu={toggleMenu}
      closeMenu={closeMenu}
    />
    <main className={screen.main}>
      <HeroSection lang={lang} t={t} idPrefix={ID_PREFIX} />
      <FeaturesSection lang={lang} t={t} idPrefix={ID_PREFIX} />
      <ChecklistSection t={t} idPrefix={ID_PREFIX} />
      <NewsFeedSection t={t} idPrefix={ID_PREFIX} openChange={openChange} toggleChange={toggleChange} />
      <HelpBandSection lang={lang} t={t} idPrefix={ID_PREFIX} />
    </main>
    <FooterSection lang={lang} chrome={t.chrome} />
  </div>
);

export default MobilePage;
