import type { FC } from "react";
import ChecklistSection from "./sections/ChecklistSection";
import DesktopHeaderSection from "./sections/DesktopHeaderSection";
import FeaturesSection from "./sections/FeaturesSection";
import FooterSection from "./sections/FooterSection";
import HelpBandSection from "./sections/HelpBandSection";
import HeroSection from "./sections/HeroSection";
import NewsFeedSection from "./sections/NewsFeedSection";
import ProcessFlowSection from "./sections/ProcessFlowSection";
import StartGuideSection from "./sections/StartGuideSection";
import type { UseHomeLogicResult } from "../hooks/useHomeLogic";

// 공통 props 타입을 받지만 데스크톱은 메뉴 상태를 쓰지 않는다(변경 기록 펼침만)
const DesktopPage: FC<UseHomeLogicResult> = ({ openChange, toggleChange }) => (
  <div className="flex flex-1 flex-col">
    <DesktopHeaderSection />
    <main className="flex flex-col">
      <HeroSection pinnable />
      <FeaturesSection />
      <StartGuideSection pinnable />
      <ProcessFlowSection />
      <ChecklistSection />
      <NewsFeedSection openChange={openChange} toggleChange={toggleChange} />
      <HelpBandSection />
    </main>
    <FooterSection />
  </div>
);

export default DesktopPage;
