import ChecklistSection from "./sections/ChecklistSection";
import FeaturesSection from "./sections/FeaturesSection";
import FooterSection from "./sections/FooterSection";
import HelpBandSection from "./sections/HelpBandSection";
import HeroSection from "./sections/HeroSection";
import MobileHeaderSection from "./sections/MobileHeaderSection";
import NewsFeedSection from "./sections/NewsFeedSection";
import ProcessFlowSection from "./sections/ProcessFlowSection";
import StartGuideSection from "./sections/StartGuideSection";
import { MOBILE_ID_PREFIX as ID_PREFIX } from "../constants";
import type { UseHomeLogicResult } from "../hooks/useHomeLogic";

const MobilePage = ({ isMenuOpen, toggleMenu, closeMenu, openChange, toggleChange }: UseHomeLogicResult) => (
  <div className="flex min-w-0 flex-1 flex-col">
    <MobileHeaderSection isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} closeMenu={closeMenu} />
    <main className="flex flex-col">
      <HeroSection idPrefix={ID_PREFIX} />
      <FeaturesSection idPrefix={ID_PREFIX} />
      <StartGuideSection idPrefix={ID_PREFIX} />
      <ProcessFlowSection idPrefix={ID_PREFIX} />
      <ChecklistSection idPrefix={ID_PREFIX} />
      <NewsFeedSection idPrefix={ID_PREFIX} openChange={openChange} toggleChange={toggleChange} />
      <HelpBandSection idPrefix={ID_PREFIX} />
    </main>
    <FooterSection />
  </div>
);

export default MobilePage;
