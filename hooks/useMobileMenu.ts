"use client";

import { useCallback, useEffect, useState } from "react";

export interface UseMobileMenuResult {
  isMenuOpen: boolean;
  toggleMenu: () => void;
  closeMenu: () => void;
}

/** 모바일 상단바 서랍 메뉴: 여닫기, Esc 로 닫기, 열려 있는 동안 본문 스크롤 막기. 홈 · 다운로드가 같이 쓴다 */
export const useMobileMenu = (): UseMobileMenuResult => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = useCallback(() => setIsMenuOpen((open) => !open), []);
  const closeMenu = useCallback(() => setIsMenuOpen(false), []);

  useEffect(() => {
    if (!isMenuOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsMenuOpen(false);
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isMenuOpen]);

  return { isMenuOpen, toggleMenu, closeMenu };
};
