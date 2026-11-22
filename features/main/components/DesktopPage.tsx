import type { FC } from "react";
import screen from "@/styles/screen.module.css";
import ChecklistSection from "./sections/ChecklistSection";
import DesktopHeaderSection from "./sections/DesktopHeaderSection";
import FeaturesSection from "./sections/FeaturesSection";
import FooterSection from "./sections/FooterSection";
import HelpBandSection from "./sections/HelpBandSection";
import HeroSection from "./sections/HeroSection";
import NewsFeedSection from "./sections/NewsFeedSection";
import type { UseHomeLogicResult } from "../hooks/useHomeLogic";

// 공통 props 타입을 받지만 데스크톱은 메뉴 상태를 쓰지 않는다(변경 기록 펼침만)
const DesktopPage: FC<UseHomeLogicResult> = ({ lang, t, openChange, toggleChange }) => (
  <div className={screen.page}>
    <DesktopHeaderSection lang={lang} chrome={t.chrome} />
    <main className={screen.main}>
      <HeroSection lang={lang} t={t} pinnable />
      <FeaturesSection lang={lang} t={t} />
      <ChecklistSection t={t} />
      <NewsFeedSection t={t} openChange={openChange} toggleChange={toggleChange} />
      <HelpBandSection lang={lang} t={t} />
    </main>
    <FooterSection lang={lang} chrome={t.chrome} />
  </div>
);

export default DesktopPage;
