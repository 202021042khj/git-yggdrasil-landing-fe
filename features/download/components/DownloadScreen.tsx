"use client"; // useDownloadLogic 이 useState · useSyncExternalStore(브라우저 감지)를 쓴다

import screen from "@/styles/screen.module.css";
import DesktopPage from "./DesktopPage";
import MobilePage from "./MobilePage";
import { type UseDownloadLogicParams, useDownloadLogic } from "../hooks/useDownloadLogic";

/** 다운로드 화면: 로직 훅을 한 번 부르고 데스크톱 / 모바일 트리를 CSS 로 갈라 보여 준다 (768px) */
const DownloadScreen = (props: UseDownloadLogicParams) => {
  const logic = useDownloadLogic(props);

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

export default DownloadScreen;
