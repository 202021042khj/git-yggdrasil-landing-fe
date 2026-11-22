// 서버 전용 공개 목록 (app/[lang]/**/page.tsx 가 쓴다). 언어 사전을 읽어 그 언어 문구만 화면에 넘긴다.
export { getChromeDictionary, getHomeDictionary } from "./i18n/getHomeDictionary";
