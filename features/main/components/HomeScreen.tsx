"use client"; // useHomeLogic 이 useState · useEffect 를 쓴다

import DesktopPage from "./DesktopPage";
import MobilePage from "./MobilePage";
import { useHomeLogic } from "../hooks/useHomeLogic";

/** 홈(랜딩) 화면: 로직 훅을 한 번 부르고 데스크톱 / 모바일 트리를 CSS 로 갈라 보여 준다 (768px) */
const HomeScreen = () => {
  const logic = useHomeLogic();

  return (
    <div className="flex flex-1 flex-col">
      <div className="hidden md:flex md:flex-1">
        <DesktopPage {...logic} />
      </div>
      <div className="flex flex-1 md:hidden">
        <MobilePage {...logic} />
      </div>
    </div>
  );
};

export default HomeScreen;
