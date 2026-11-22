"use client";

import { useCallback, useState } from "react";
import { type UseMobileMenuResult, useMobileMenu } from "@/hooks/useMobileMenu";
import type { Locale } from "@/lib/i18n";
import type { HomeDictionary } from "../types";

export interface UseHomeLogicParams {
  lang: Locale;
  /** 서버(app/[lang]/page.tsx)가 읽어 넘긴 이 언어의 문구 */
  dict: HomeDictionary;
}

export interface UseHomeLogicResult extends UseMobileMenuResult {
  lang: Locale;
  t: HomeDictionary;
  /** 펼친 변경 기록(hash). 한 번에 하나만 */
  openChange: string | null;
  toggleChange: (hash: string) => void;
}

export const useHomeLogic = ({ lang, dict }: UseHomeLogicParams): UseHomeLogicResult => {
  // 모바일 메뉴(Esc 로 닫기 · 본문 스크롤 막기)는 다운로드 화면과 같이 쓰는 훅
  const menu = useMobileMenu();
  const [openChange, setOpenChange] = useState<string | null>(null);
  const toggleChange = useCallback((hash: string) => setOpenChange((open) => (open === hash ? null : hash)), []);

  return { ...menu, lang, t: dict, openChange, toggleChange };
};
