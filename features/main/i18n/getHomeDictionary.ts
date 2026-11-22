import "server-only";
import type { Locale } from "@/lib/i18n";
import type { ChromeDictionary, HomeCopy, HomeDictionary } from "../types";
import { getHomeNews } from "./getHomeNews";

// 서버에서만 읽는다: 고른 언어 하나만 불러와 그 언어의 문구만 화면(클라이언트)에 props 로 넘긴다
const dictionaries: Record<Locale, () => Promise<HomeCopy>> = {
  ko: () => import("./ko").then((module) => module.default),
  en: () => import("./en").then((module) => module.default),
};

/** 문구 + GitHub 소식(릴리스 · 커밋, 10분마다 갱신) */
export const getHomeDictionary = async (locale: Locale): Promise<HomeDictionary> => {
  const [copy, news] = await Promise.all([dictionaries[locale](), getHomeNews(locale)]);
  return { ...copy, ...news };
};

/** 상단바 · 푸터 문구만 (다운로드 화면용) */
export const getChromeDictionary = async (locale: Locale): Promise<ChromeDictionary> =>
  (await dictionaries[locale]()).chrome;
