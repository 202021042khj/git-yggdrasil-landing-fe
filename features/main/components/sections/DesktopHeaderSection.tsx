import CtaButton from "@/components/common/CtaButton";
import LanguageMenu from "@/components/common/LanguageMenu";
import LogoLockup from "../shared/LogoLockup";
import { DOWNLOAD_PATH, NAV_TARGETS, navHref } from "../../constants";
import type { ChromeDictionary } from "../../types";
import { type Locale, localePath } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import text from "@/styles/text.module.css";
import styles from "./DesktopHeaderSection.module.css";

interface DesktopHeaderSectionProps {
  lang: Locale;
  chrome: ChromeDictionary;
  /** 메뉴 앵커 앞에 붙일 주소. 홈은 ""(같은 화면 #기능), 다른 화면(다운로드)은 "/en" 처럼 언어 홈 → "/en#features" */
  linkBase?: string;
}

const DesktopHeaderSection = ({ lang, chrome, linkBase = "" }: DesktopHeaderSectionProps) => (
  <header className={styles.header}>
    <div className={styles.bar}>
      <a href={`${linkBase}#top`} aria-label={chrome.homeLabel}>
        <LogoLockup />
      </a>
      <nav aria-label={chrome.navLabel}>
        <ul className={styles.nav}>
          {NAV_TARGETS.map((target) => (
            <li key={target}>
              <a
                href={navHref(target, { lang, linkBase })}
                className={cn(text.label, styles.navLink, "press")}
              >
                {chrome.nav[target]}
              </a>
            </li>
          ))}
        </ul>
      </nav>
      <div className={styles.spacer} />
      {/* 예전 "로그인" 더미 버튼 자리 (Figma Section/Header → Language dropdown) */}
      <LanguageMenu current={lang} label={chrome.languageLabel} />
      <CtaButton href={localePath(lang, DOWNLOAD_PATH)}>{chrome.download}</CtaButton>
    </div>
  </header>
);

export default DesktopHeaderSection;
