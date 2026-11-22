import "server-only";
import type { Locale } from "@/lib/i18n";
import type { DocsDictionary } from "../types";

// 서버에서만 읽는다: 고른 언어 하나만 불러와 화면(클라이언트)에 props 로 넘긴다
const dictionaries: Record<Locale, () => Promise<DocsDictionary>> = {
  ko: () => import("./ko").then((module) => module.default),
  en: () => import("./en").then((module) => module.default),
};

export const getDocsDictionary = (locale: Locale): Promise<DocsDictionary> => dictionaries[locale]();
