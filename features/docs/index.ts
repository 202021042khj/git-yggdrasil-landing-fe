// 밖(app/ 등)에 공개하는 목록. 이 기능의 안쪽 파일은 직접 import 하지 않는다(ESLint 가 막음).
// 서버 전용(사전 읽기)은 server.ts 에 따로 둔다.
export { default as DocsScreen } from "./components/DocsScreen";
