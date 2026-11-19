import CtaButton from "@/components/common/CtaButton";
import LogoLockup from "../shared/LogoLockup";
import { HERO, MOBILE_ID_PREFIX, NAV_ITEMS } from "../../constants";
import type { UseHomeLogicResult } from "../../hooks/useHomeLogic";
import { cn } from "@/lib/utils";

type MobileHeaderSectionProps = Pick<
  UseHomeLogicResult,
  "isMenuOpen" | "toggleMenu" | "closeMenu"
>;

const MobileHeaderSection = ({
  isMenuOpen,
  toggleMenu,
  closeMenu,
}: MobileHeaderSectionProps) => (
  <header className="sticky top-0 z-header w-full border-b-3 border-line-strong bg-page">
    <div className="flex items-center gap-4 px-5 py-3">
      <a
        href={`#${MOBILE_ID_PREFIX}top`}
        aria-label="Yggdrasil 처음으로"
        onClick={closeMenu}
      >
        <LogoLockup size="sm" />
      </a>
      <div className="flex-1" />
      <button
        type="button"
        onClick={toggleMenu}
        aria-expanded={isMenuOpen}
        aria-controls={`${MOBILE_ID_PREFIX}menu`}
        aria-label={isMenuOpen ? "메뉴 닫기" : "메뉴 열기"}
        className="flex size-11 flex-col items-center justify-center gap-[5px] text-fg focus-visible:outline-3 focus-visible:outline-fg-brand"
      >
        <span
          className={cn(
            "h-[3px] w-6 bg-current transition-transform",
            isMenuOpen && "translate-y-2 rotate-45",
          )}
        />
        <span
          className={cn(
            "h-[3px] w-6 bg-current transition-opacity",
            isMenuOpen && "opacity-0",
          )}
        />
        <span
          className={cn(
            "h-[3px] w-6 bg-current transition-transform",
            isMenuOpen && "-translate-y-2 -rotate-45",
          )}
        />
      </button>
    </div>
    <nav
      id={`${MOBILE_ID_PREFIX}menu`}
      aria-label="주요 메뉴"
      hidden={!isMenuOpen}
      className="h-[calc(100dvh-70px)] overflow-y-auto border-t-3 border-line-strong bg-page px-5 py-8"
    >
      <ul className="flex flex-col">
        {NAV_ITEMS.map((item) => (
          <li key={item.target} className="border-b border-line-subtle">
            <a
              href={`#${MOBILE_ID_PREFIX}${item.target}`}
              onClick={closeMenu}
              className="block py-4 font-serif text-heading-m font-semibold text-fg"
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
      <div className="mt-8 flex flex-col gap-3">
        {/* TODO: 다운로드 · 로그인 기능 없음 — 더미 버튼 */}
        <CtaButton className="justify-between">{HERO.primaryCta}</CtaButton>
        <CtaButton variant="secondary" className="justify-between">
          로그인
        </CtaButton>
      </div>
    </nav>
  </header>
);

export default MobileHeaderSection;
