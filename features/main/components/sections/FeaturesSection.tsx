import Image from "next/image";
import SectionHead from "@/components/common/SectionHead";
import CtaButton from "@/components/common/CtaButton";
import Shape from "@/components/common/Shape";
import { DOCS_PATH, FEATURES, SHOT_HEIGHT, SHOT_WIDTH } from "../../constants";
import type { HomeDictionary } from "../../types";
import { type Locale, localePath } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import section from "@/styles/section.module.css";
import text from "@/styles/text.module.css";
import styles from "./FeaturesSection.module.css";

interface FeaturesSectionProps {
  lang: Locale;
  t: HomeDictionary;
  idPrefix?: string;
}

const FeaturesSection = ({ lang, t, idPrefix = "" }: FeaturesSectionProps) => (
  <section
    id={`${idPrefix}features`}
    aria-labelledby={`${idPrefix}features-title`}
    className={cn(section.section, section.divided, section.surface)}
  >
    <div className={section.inner}>
      <SectionHead
        headingId={`${idPrefix}features-title`}
        {...t.featuresHead}
      />
      <ol className={styles.list}>
        {FEATURES.map((feature, index) => (
          <li key={feature.id}>
            <div
              className={cn(styles.row, index % 2 === 1 && styles.reversed)}
            >
              <div className={styles.shot}>
                <div className={styles.titleBar}>
                  <Shape kind="circle" size={10} />
                  <Shape kind="square" size={10} />
                  <Shape kind="triangle" size={10} />
                  <span className={cn(text.label, styles.muted)}>
                    {feature.file}
                  </span>
                </div>
                <Image
                  src={feature.src}
                  alt={t.features[feature.id].alt}
                  width={SHOT_WIDTH}
                  height={SHOT_HEIGHT}
                  sizes="(min-width: 1440px) 714px, (min-width: 768px) 56vw, 100vw"
                  className={styles.image}
                />
              </div>
              <div className={styles.body}>
                <div className={styles.counter}>
                  <Shape kind={feature.shape} size={24} />
                  <span className={cn(text.label, styles.muted)}>
                    {String(index + 1).padStart(2, "0")} /{" "}
                    {String(FEATURES.length).padStart(2, "0")}
                  </span>
                </div>
                <h3 className={cn(text.headingResponsive, styles.title)}>
                  {t.features[feature.id].title}
                </h3>
                <p className={cn(text.bodyResponsive, styles.muted)}>
                  {t.features[feature.id].description}
                </p>
                <CtaButton
                  variant="secondary"
                  href={`${localePath(lang, DOCS_PATH)}#${feature.docs}`}
                  ariaLabel={`${t.featureMore}: ${t.features[feature.id].title}`}
                >
                  {t.featureMore}
                </CtaButton>
              </div>
            </div>
          </li>
        ))}
      </ol>
    </div>
  </section>
);

export default FeaturesSection;
