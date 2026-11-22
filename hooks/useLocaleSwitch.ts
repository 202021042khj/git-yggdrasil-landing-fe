"use client";

import { usePathname } from "next/navigation";
import { type MouseEvent, useCallback } from "react";
import { LOCALE_COOKIE, LOCALE_COOKIE_MAX_AGE, type Locale, switchLocalePath } from "@/lib/i18n";

export interface UseLocaleSwitchResult {
  /** 같은 화면의 다른 언어 주소 ("/ko/download" → "/en/download") */
  hrefFor: (locale: Locale) => string;
  /** 언어 링크를 누를 때: 고른 언어를 쿠키에 기억하고, 지금 보던 #앵커를 붙여 이동한다 */
  handleSelect: (locale: Locale) => (event: MouseEvent<HTMLAnchorElement>) => void;
}

/** 언어 바꾸기 (LanguageMenu · LanguageToggle 이 같이 쓴다). 이동은 보통 링크라 JS 없이도 된다 */
export const useLocaleSwitch = (): UseLocaleSwitchResult => {
  const pathname = usePathname();
  const hrefFor = useCallback((locale: Locale) => switchLocalePath(pathname, locale), [pathname]);

  const handleSelect = useCallback(
    (locale: Locale) => (event: MouseEvent<HTMLAnchorElement>) => {
      // "/" 로 다시 들어와도 고른 언어로 가도록 proxy.ts 가 이 쿠키를 먼저 본다
      document.cookie = `${LOCALE_COOKIE}=${locale}; path=/; max-age=${LOCALE_COOKIE_MAX_AGE}; samesite=lax`;
      const { hash } = window.location;
      if (!hash || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      event.preventDefault();
      window.location.assign(`${hrefFor(locale)}${hash}`);
    },
    [hrefFor],
  );

  return { hrefFor, handleSelect };
};
