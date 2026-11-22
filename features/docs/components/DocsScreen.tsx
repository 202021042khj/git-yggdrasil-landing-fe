"use client"; // 모바일 서랍 메뉴 상태(useMobileMenu)

import { DesktopHeaderSection, FooterSection, MobileHeaderSection, type ChromeDictionary } from "@/features/main";
import { useMobileMenu } from "@/hooks/useMobileMenu";
import { type Locale, localePath } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import screen from "@/styles/screen.module.css";
import text from "@/styles/text.module.css";
import DocBlockView from "./DocBlockView";
import { ISSUES_URL } from "../constants";
import type { DocsDictionary } from "../types";
import styles from "./DocsScreen.module.css";

interface DocsScreenProps {
  lang: Locale;
  dict: DocsDictionary;
  chrome: ChromeDictionary;
}

/**
 * 문서 화면: 상단바(데스크톱 / 모바일) · 목차 + 본문 · 푸터. 본문은 한 벌만 그리고 CSS 로 배치만 바꾼다
 * (홈 · 다운로드와 달리 데스크톱 / 모바일 트리를 통째로 나누지 않으므로 #앵커가 겹치지 않는다).
 */
const DocsScreen = ({ lang, dict, chrome }: DocsScreenProps) => {
  const menu = useMobileMenu();
  const home = localePath(lang);

  return (
    <div className={screen.screen}>
      <div className={styles.desktopHeader}>
        <DesktopHeaderSection lang={lang} chrome={chrome} linkBase={home} />
      </div>
      <div className={styles.mobileHeader}>
        <MobileHeaderSection lang={lang} chrome={chrome} linkBase={home} {...menu} />
      </div>
      <main className={styles.main}>
        <div className={styles.layout}>
          <nav aria-labelledby="docs-toc" className={styles.toc}>
            <p id="docs-toc" className={cn(text.label, styles.tocLabel)}>{dict.tocLabel}</p>
            <ol className={styles.tocList}>
              {dict.sections.map((section) => (
                <li key={section.id}>
                  <a href={`#${section.id}`} className={cn(text.bodyM, styles.tocSection)}>{section.title}</a>
                  <ol>
                    {section.topics.map((topic) => (
                      <li key={topic.id}>
                        <a href={`#${topic.id}`} className={cn(text.bodyM, styles.tocTopic)}>{topic.title}</a>
                      </li>
                    ))}
                  </ol>
                </li>
              ))}
            </ol>
          </nav>
          <article className={styles.article}>
            <h1 className={text.title}>{dict.title}</h1>
            {dict.sections.map((section) => (
              <section key={section.id} id={section.id} aria-labelledby={`${section.id}-title`} className={styles.section}>
                <h2 id={`${section.id}-title`} className={cn(text.headingResponsive, styles.sectionTitle)}>{section.title}</h2>
                {section.topics.map((topic) => (
                  <section key={topic.id} id={topic.id} aria-labelledby={`${topic.id}-title`} className={styles.topic}>
                    <h3 id={`${topic.id}-title`} className={cn(text.headingM, styles.topicTitle)}>{topic.title}</h3>
                    {topic.blocks.map((block, index) => <DocBlockView key={index} block={block} />)}
                  </section>
                ))}
              </section>
            ))}
            <p className={cn(text.bodyM, styles.help)}>
              {dict.help.text}{" "}
              <a href={ISSUES_URL} target="_blank" rel="noopener noreferrer" className={styles.link}>{dict.help.link}</a>
            </p>
          </article>
        </div>
      </main>
      <FooterSection lang={lang} chrome={chrome} />
    </div>
  );
};

export default DocsScreen;
