import CtaButton from "@/components/common/CtaButton";
import LogoLockup from "../shared/LogoLockup";
import { HERO, NAV_ITEMS } from "../../constants";

const DesktopHeaderSection = () => (
  <header className="sticky top-0 z-header w-full border-b-3 border-line-strong bg-page">
    <div className="mx-auto flex max-w-[1440px] items-center gap-8 px-10 py-4 lg:px-20">
      <a href="#top" aria-label="Yggdrasil 처음으로">
        <LogoLockup />
      </a>
      <nav aria-label="주요 메뉴">
        <ul className="flex gap-8">
          {NAV_ITEMS.map((item) => (
            <li key={item.target}>
              <a
                href={`#${item.target}`}
                className="press inline-block font-code text-label-m font-medium whitespace-nowrap text-fg uppercase underline-offset-4 hover:text-fg-brand hover:underline"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
      <div className="flex-1" />
      {/* TODO: 로그인 기능 없음 — 더미 버튼 */}
      <CtaButton variant="secondary">로그인</CtaButton>
      {/* TODO: 다운로드 주소 없음 — 더미 버튼 */}
      <CtaButton>{HERO.primaryCta}</CtaButton>
    </div>
  </header>
);

export default DesktopHeaderSection;
