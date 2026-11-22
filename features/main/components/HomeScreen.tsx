"use client"; // useHomeLogic 이 useState · useEffect 를 쓴다

import DesktopPage from "./DesktopPage";
import screen from "@/styles/screen.module.css";
import MobilePage from "./MobilePage";
import { type UseHomeLogicParams, useHomeLogic } from "../hooks/useHomeLogic";

/** 홈(랜딩) 화면: 로직 훅을 한 번 부르고 데스크톱 / 모바일 트리를 CSS 로 갈라 보여 준다 (768px) */
const HomeScreen = (props: UseHomeLogicParams) => {
  const logic = useHomeLogic(props);

  return (
    <div className={screen.screen}>
      <div className={screen.desktop}>
        <DesktopPage {...logic} />
      </div>
      <div className={screen.mobile}>
        <MobilePage {...logic} />
      </div>
    </div>
  );
};

export default HomeScreen;
