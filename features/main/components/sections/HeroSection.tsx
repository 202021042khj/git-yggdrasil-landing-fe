import CtaButton from "@/components/common/CtaButton";
import DemoVideo from "../shared/DemoVideo";
import Shape from "@/components/common/Shape";
import { DOWNLOAD_PATH, REPO_URL } from "../../constants";
import { useHeroPin } from "../../hooks/useHeroPin";
import type { HomeDictionary } from "../../types";
import { type Locale, localePath } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import text from "@/styles/text.module.css";
import styles from "./HeroSection.module.css";

interface HeroSectionProps {
  lang: Locale;
  t: HomeDictionary;
  idPrefix?: string;
  /** 데스크톱 트리만: 고정 스크롤(글 사라짐 → 영상 창 열림)을 쓴다. 움직임 줄이기면 고정하지 않는다 */
  pinnable?: boolean;
}

/**
 * 히어로(참조 HomeHeroSection): 왼쪽 제목 · 버튼, 오른쪽 연필 나무. 고정이면 무대가 상단바 아래 붙은 채 800px 동안 글이 사라지고
 * 영상 창이 가운데부터 넓어진다. 고정이 아니면(모바일 · 움직임 줄이기) 글 아래 영상을 바로 놓는다.
 */
const HeroSection = ({ lang, t, idPrefix = "", pinnable = false }: HeroSectionProps) => {
  const { wrapperRef, pinned } = useHeroPin(pinnable);

  return (
    <section
      ref={wrapperRef}
      id={`${idPrefix}top`}
      aria-labelledby={`${idPrefix}hero-title`}
      data-pinned={pinned}
      className={styles.hero}
    >
      <div className={styles.stage}>
        <div className={styles.inner}>
          <div className={styles.text}>
            <div className={styles.copy}>
              <h1
                id={`${idPrefix}hero-title`}
                className={cn(text.title, styles.title)}
              >
                {t.hero.title}
              </h1>
              <div className={styles.ctas}>
                <CtaButton href={localePath(lang, DOWNLOAD_PATH)}>{t.chrome.download}</CtaButton>
                <CtaButton variant="secondary" href={REPO_URL}>{t.hero.secondaryCta}</CtaButton>
              </div>
            </div>
            {/* 장식 그림: 화면 낭독에서 숨긴다 */}
            <div aria-hidden="true" className={cn("pencil-tree", styles.tree)} />
          </div>
          <div className={styles.rise}>
            <figure className={styles.window}>
              <DemoVideo copy={t.demoVideo} />
              <figcaption className={styles.caption}>
                <Shape kind="triangle" size={10} />
                {t.hero.videoCaption}
              </figcaption>
            </figure>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
