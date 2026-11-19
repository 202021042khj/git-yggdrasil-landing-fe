"use client";

import { useCallback, useEffect, useState } from "react";

export interface UseHomeLogicResult {
  isMenuOpen: boolean;
  toggleMenu: () => void;
  closeMenu: () => void;
  /** 펼친 변경 기록(hash). 한 번에 하나만 */
  openChange: string | null;
  toggleChange: (hash: string) => void;
}

export const useHomeLogic = (): UseHomeLogicResult => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = useCallback(() => setIsMenuOpen((open) => !open), []);
  const closeMenu = useCallback(() => setIsMenuOpen(false), []);
  const [openChange, setOpenChange] = useState<string | null>(null);
  const toggleChange = useCallback((hash: string) => setOpenChange((open) => (open === hash ? null : hash)), []);

  // 모바일 메뉴: Esc 로 닫고, 열려 있는 동안 본문 스크롤을 막는다
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

  return { isMenuOpen, toggleMenu, closeMenu, openChange, toggleChange };
};
