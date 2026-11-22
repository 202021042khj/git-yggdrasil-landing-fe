"use client";

import { useLocaleSwitch } from "@/hooks/useLocaleSwitch";
import { LOCALES, LOCALE_NAMES, type Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import styles from "./LanguageToggle.module.css";

interface LanguageToggleProps {
  current: Locale;
  /** 화면 낭독 이름 ("언어" / "Language") */
  label: string;
  className?: string;
}

/** 모바일 서랍의 언어 선택: 두 언어를 나란히 놓은 링크 (Figma "Language dropdown" State=Segmented). 고른 쪽은 잉크 */
const LanguageToggle = ({ current, label, className }: LanguageToggleProps) => {
  const { hrefFor, handleSelect } = useLocaleSwitch();

  return (
    <div role="group" aria-label={label} className={cn(styles.group, className)}>
      {LOCALES.map((locale) => {
        const selected = locale === current;
        return (
          <a
            key={locale}
            href={hrefFor(locale)}
            hrefLang={locale}
            lang={locale}
            aria-current={selected ? "true" : undefined}
            onClick={handleSelect(locale)}
            className={cn(styles.option, "press")}
          >
            {LOCALE_NAMES[locale]}
          </a>
        );
      })}
    </div>
  );
};

export default LanguageToggle;
