// 밖(app/ 등)에 공개하는 목록. 이 기능의 안쪽 파일은 직접 import 하지 않는다(ESLint 가 막음).
// 서버 전용(사전 읽기)은 server.ts 에 따로 둔다 — 이 파일은 클라이언트 컴포넌트도 가져다 쓰므로.
export { default as HomeScreen } from "./components/HomeScreen";

// 사이트 공통 틀: 다운로드 화면(features/download)도 같은 상단바 · 푸터를 쓴다. 메뉴는 홈 섹션을 가리키므로 이 기능에 둔다
export { default as DesktopHeaderSection } from "./components/sections/DesktopHeaderSection";
export { default as MobileHeaderSection } from "./components/sections/MobileHeaderSection";
export { default as FooterSection } from "./components/sections/FooterSection";
export { MOBILE_ID_PREFIX } from "./constants";
export type { ChromeDictionary, HomeDictionary } from "./types";
