import LogoMark from "../shared/LogoMark";
import { FOOTER_LINKS, footerHref } from "../../constants";
import type { ChromeDictionary } from "../../types";
import type { Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import text from "@/styles/text.module.css";
import styles from "./FooterSection.module.css";

interface FooterSectionProps {
  lang: Locale;
  chrome: ChromeDictionary;
}

const FooterSection = ({ lang, chrome }: FooterSectionProps) => (
  <footer className={styles.footer}>
    <div className={styles.inner}>
      <div className={styles.brand}>
        <LogoMark size={32} />
        <span className={styles.name}>Yggdrasil</span>
      </div>
      <div className={styles.spacer} />
      <ul className={styles.links}>
        {FOOTER_LINKS.map((id) => {
          const href = footerHref(id, lang);
          const external = href.startsWith("http");
          return (
            <li key={id}>
              <a
                href={href}
                {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className={cn(text.label, styles.link)}
              >
                {chrome.footerLinks[id]}
              </a>
            </li>
          );
        })}
      </ul>
      <p className={cn(text.code, styles.copyright)}>© 2026 Yggdrasil for Git</p>
    </div>
  </footer>
);

export default FooterSection;
