"use client";

import { type FocusEvent, type KeyboardEvent, useEffect, useId, useRef, useState } from "react";
import { useLocaleSwitch } from "@/hooks/useLocaleSwitch";
import { LOCALES, LOCALE_NAMES, type Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import styles from "./LanguageMenu.module.css";

interface LanguageMenuProps {
  current: Locale;
  /** 화면 낭독 이름 ("언어" / "Language"). 보이는 글자는 지금 언어 이름 */
  label: string;
  className?: string;
}

/**
 * 상단바 언어 선택 (Figma "Language dropdown"). 링크 목록을 여닫는 disclosure 메뉴:
 * - 버튼: Enter/Space 로 여닫기, ↓ 열고 지금 언어로, ↑ 열고 마지막 항목으로
 * - 목록: ↑↓ 이동(끝에서 돌아감) · Home/End · Esc 닫고 버튼으로 · Tab 이나 바깥 누르면 닫힘
 * - 항목은 같은 화면의 다른 언어 주소 링크 (useLocaleSwitch: 쿠키 기억 + #앵커 유지)
 */
const LanguageMenu = ({ current, label, className }: LanguageMenuProps) => {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  /** 열린 뒤 포커스를 줄 항목 (키보드로 열 때만) */
  const pendingFocus = useRef<number | null>(null);
  const listId = useId();
  const { hrefFor, handleSelect } = useLocaleSwitch();

  const items = () => Array.from(listRef.current?.querySelectorAll<HTMLAnchorElement>("a") ?? []);

  useEffect(() => {
    if (!open) return;
    if (pendingFocus.current !== null) {
      items()[pendingFocus.current]?.focus();
      pendingFocus.current = null;
    }
    const onPointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [open]);

  const openWithFocus = (index: number) => {
    pendingFocus.current = index;
    setOpen(true);
  };

  const close = (returnFocus: boolean) => {
    setOpen(false);
    if (returnFocus) buttonRef.current?.focus();
  };

  const onButtonKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      openWithFocus(LOCALES.indexOf(current));
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      openWithFocus(LOCALES.length - 1);
    } else if (event.key === "Escape" && open) {
      event.preventDefault();
      close(true);
    }
  };

  const onListKeyDown = (event: KeyboardEvent<HTMLUListElement>) => {
    const links = items();
    const index = links.indexOf(document.activeElement as HTMLAnchorElement);
    const move = (next: number) => {
      event.preventDefault();
      links[(next + links.length) % links.length]?.focus();
    };
    if (event.key === "ArrowDown") move(index + 1);
    else if (event.key === "ArrowUp") move(index - 1);
    else if (event.key === "Home") move(0);
    else if (event.key === "End") move(links.length - 1);
    else if (event.key === "Escape") {
      event.preventDefault();
      close(true);
    }
  };

  // Tab 등으로 포커스가 메뉴 밖으로 나가면 닫는다
  const onBlur = (event: FocusEvent<HTMLDivElement>) => {
    if (open && !rootRef.current?.contains(event.relatedTarget as Node | null)) setOpen(false);
  };

  return (
    <div ref={rootRef} onBlur={onBlur} className={cn(styles.root, className)}>
      <button
        ref={buttonRef}
        type="button"
        aria-expanded={open}
        aria-controls={listId}
        onClick={() => setOpen((value) => !value)}
        onKeyDown={onButtonKeyDown}
        className={cn(styles.button, "press")}
      >
        <span className="visually-hidden">{label}: </span>
        <span lang={current}>{LOCALE_NAMES[current]}</span>
        <svg aria-hidden="true" viewBox="0 0 12 8" className={styles.caret}>
          <path d={open ? "M0 8 L12 8 L6 0 Z" : "M0 0 L12 0 L6 8 Z"} />
        </svg>
      </button>
      <ul
        ref={listRef}
        id={listId}
        hidden={!open}
        aria-label={label}
        onKeyDown={onListKeyDown}
        className={styles.list}
      >
        {LOCALES.map((locale) => {
          const selected = locale === current;
          return (
            <li key={locale}>
              <a
                href={hrefFor(locale)}
                hrefLang={locale}
                lang={locale}
                aria-current={selected ? "true" : undefined}
                onClick={handleSelect(locale)}
                className={styles.option}
              >
                {LOCALE_NAMES[locale]}
                {selected && (
                  <svg aria-hidden="true" viewBox="0 0 12 10" className={styles.check}>
                    <path d="M1 5 L4.5 8.5 L11 1.5" fill="none" stroke="currentColor" strokeWidth="2.5" />
                  </svg>
                )}
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default LanguageMenu;
