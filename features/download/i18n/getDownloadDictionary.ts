import "server-only";
import { fetchReleases } from "@/lib/github";
import type { Locale } from "@/lib/i18n";
import type { DownloadDictionary } from "../types";

// 서버에서만 읽는다: 고른 언어 하나만 불러와 그 언어의 문구만 화면(클라이언트)에 props 로 넘긴다
const dictionaries: Record<Locale, () => Promise<DownloadDictionary>> = {
  ko: () => import("./ko").then((module) => module.default),
  en: () => import("./en").then((module) => module.default),
};

/**
 * 문구 + 최신 버전. 버전 라벨은 GitHub 의 최신 공개 릴리스 태그(10분마다 갱신)를 쓰고,
 * 받지 못하면 사전의 기본값(constants.ts APP_VERSION)을 그대로 둔다.
 */
export const getDownloadDictionary = async (locale: Locale): Promise<DownloadDictionary> => {
  const [dict, releases] = await Promise.all([dictionaries[locale](), fetchReleases(1)]);
  const latest = releases[0]?.tag;
  return latest ? { ...dict, intro: { ...dict.intro, eyebrow: latest } } : dict;
};
