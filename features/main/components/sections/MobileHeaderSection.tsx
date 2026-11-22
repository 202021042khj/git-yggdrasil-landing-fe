import CtaButton from "@/components/common/CtaButton";
import LanguageToggle from "@/components/common/LanguageToggle";
import LogoLockup from "../shared/LogoLockup";
import { DOWNLOAD_PATH, MOBILE_ID_PREFIX, NAV_TARGETS, navHref } from "../../constants";
import type { ChromeDictionary } from "../../types";
import type { UseMobileMenuResult } from "@/hooks/useMobileMenu";
import { type Locale, localePath } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import text from "@/styles/text.module.css";
import styles from "./MobileHeaderSection.module.css";

interface MobileHeaderSectionProps extends UseMobileMenuResult {
  lang: Locale;
  chrome: ChromeDictionary;
  /** 메뉴 앵커 앞에 붙일 주소. 홈은 "", 다른 화면(다운로드)은 "/en" 처럼 언어 홈 → "/en#m-features" */
  linkBase?: string;
}

const MobileHeaderSection = ({
  isMenuOpen,
  toggleMenu,
  closeMenu,
  lang,
  chrome,
  linkBase = "",
}: MobileHeaderSectionProps) => (
  <header className={styles.header}>
    <div className={styles.bar}>
      <a href={`${linkBase}#${MOBILE_ID_PREFIX}top`} aria-label={chrome.homeLabel} onClick={closeMenu}>
        <LogoLockup size="sm" />
      </a>
      <div className={styles.spacer} />
      <button
        type="button"
        onClick={toggleMenu}
        aria-expanded={isMenuOpen}
        aria-controls={`${MOBILE_ID_PREFIX}menu`}
        aria-label={isMenuOpen ? chrome.menuClose : chrome.menuOpen}
        className={styles.menuButton}
      >
        <span className={styles.line} />
        <span className={styles.line} />
        <span className={styles.line} />
      </button>
    </div>
    <nav
      id={`${MOBILE_ID_PREFIX}menu`}
      aria-label={chrome.navLabel}
      hidden={!isMenuOpen}
      className={styles.drawer}
    >
      <ul className={styles.links}>
        {NAV_TARGETS.map((target) => (
          <li key={target} className={styles.linkItem}>
            <a
              href={navHref(target, { lang, linkBase, idPrefix: MOBILE_ID_PREFIX })}
              onClick={closeMenu}
              className={cn(text.headingM, styles.link)}
            >
              {chrome.nav[target]}
            </a>
          </li>
        ))}
      </ul>
      <div className={styles.actions}>
        <CtaButton href={localePath(lang, DOWNLOAD_PATH)} onClick={closeMenu} className={styles.download}>
          {chrome.download}
        </CtaButton>
        {/* 예전 "로그인" 더미 버튼 자리: 두 언어를 나란히 (Figma Language dropdown · State=Segmented) */}
        <LanguageToggle current={lang} label={chrome.languageLabel} />
      </div>
    </nav>
  </header>
);

export default MobileHeaderSection;
