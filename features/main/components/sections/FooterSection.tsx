import LogoMark from "../shared/LogoMark";
import { FOOTER_LINKS } from "../../constants";

const FooterSection = () => (
  <footer className="w-full border-t border-on-ink/20 bg-ink px-5 py-12 text-on-ink md:px-10 lg:px-20">
    <div className="mx-auto flex max-w-[1280px] flex-col items-start gap-6 md:flex-row md:items-center md:gap-8">
      <div className="flex items-center gap-3">
        <LogoMark className="size-8" />
        <span className="font-display text-[32px] leading-[1.1] font-medium italic md:text-display-m">
          Yggdrasil
        </span>
      </div>
      <div className="hidden flex-1 md:block" />
      <ul className="flex flex-wrap gap-x-8 gap-y-2">
        {FOOTER_LINKS.map((link) => (
          <li key={link}>
            {/* TODO: 링크 주소 없음 — 더미 링크 */}
            <a
              href="#"
              className="font-code text-label-m font-medium uppercase hover:underline"
            >
              {link}
            </a>
          </li>
        ))}
      </ul>
      <p className="font-code text-code-m opacity-60">
        © 2026 Yggdrasil for Git
      </p>
    </div>
  </footer>
);

export default FooterSection;
