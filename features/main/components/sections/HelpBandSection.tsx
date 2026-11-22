import CtaButton from "@/components/common/CtaButton";
import { DOCS_PATH, ISSUES_URL } from "../../constants";
import type { HomeDictionary } from "../../types";
import { type Locale, localePath } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import section from "@/styles/section.module.css";
import text from "@/styles/text.module.css";
import styles from "./HelpBandSection.module.css";

interface HelpBandSectionProps {
  lang: Locale;
  t: HomeDictionary;
  idPrefix?: string;
}

const HelpBandShapes = () => (
  <svg
    aria-hidden="true"
    viewBox="0 0 280 200"
    className={styles.shapes}
  >
    <circle cx="70" cy="110" r="70" className={styles.brand} />
    <rect x="120" y="20" width="110" height="110" className={styles.clay} />
    <path d="M150 90 L280 160 L150 200 Z" className={styles.onInk} />
  </svg>
);

const HelpBandSection = ({ lang, t, idPrefix = "" }: HelpBandSectionProps) => (
  <section
    id={`${idPrefix}help`}
    aria-labelledby={`${idPrefix}help-title`}
    className={cn(section.section, section.divided, section.ink)}
  >
    <div className={styles.inner}>
      <div className={styles.copy}>
        <h2
          id={`${idPrefix}help-title`}
          className={text.title}
        >
          {t.help.title[0]}
          <br />
          {t.help.title[1]}
        </h2>
        <p className={cn(text.bodyL, styles.description)}>
          {t.help.description}
        </p>
        <div className={styles.ctas}>
          <CtaButton variant="brand" href={localePath(lang, DOCS_PATH)}>{t.help.docs}</CtaButton>
          <CtaButton variant="paper" href={ISSUES_URL}>{t.help.issue}</CtaButton>
        </div>
      </div>
      <HelpBandShapes />
    </div>
  </section>
);

export default HelpBandSection;
