import type { Feature, FooterLinkId, NavTarget } from "./types";
import { type Locale, localePath } from "@/lib/i18n";

// 화면 문구는 i18n/{ko,en}.ts 에 있다. 여기는 언어와 무관한 구조 · 주소 · 모션 값만 둔다.

// ---------- 화면 구조 ----------

/** 다운로드 화면 경로 (features/download). 언어를 붙여 쓴다: localePath(lang, DOWNLOAD_PATH) */
export const DOWNLOAD_PATH = "/download";

/** 문서 화면 경로 (features/docs). 기능 줄의 "자세히 보기" 는 localePath(lang, DOCS_PATH) + "#" + docs 앵커 */
export const DOCS_PATH = "/docs";

/** 앱 저장소 (푸터 · 도움 띠 링크) */
export const REPO_URL = "https://github.com/202021042khj/git-yggdrasil";
export const ISSUES_URL = `${REPO_URL}/issues`;
export const LICENSE_URL = `${REPO_URL}/blob/dev/LICENSE`;

/**
 * 메뉴 항목의 주소. 홈 섹션은 linkBase(다른 화면에서는 "/en" 같은 언어 홈) + #앵커(모바일 트리는 MOBILE_ID_PREFIX 를 붙인다),
 * 문서는 그 언어의 /docs.
 */
export const navHref = (target: NavTarget, { lang, linkBase, idPrefix = "" }: { lang: Locale; linkBase: string; idPrefix?: string }) =>
  target === "docs" ? localePath(lang, DOCS_PATH) : `${linkBase}#${idPrefix}${target}`;

/** Desktop 트리와 함께 마운트되므로 Mobile 트리의 앵커 id 는 이 접두사를 붙인다 */
export const MOBILE_ID_PREFIX = "m-";

/** 상단 메뉴 순서 (이름은 사전의 chrome.nav) */
export const NAV_TARGETS: NavTarget[] = ["features", "news", "docs"];

/**
 * 앱 화면 캡처 · 시연 영상 주소. 한국어는 /media/<file>, 영어는 영어 화면으로 찍은 같은 이름의 /media/en/<file>.
 */
export const mediaSrc = (lang: Locale, file: string): string => (lang === "en" ? `/media/en/${file}` : `/media/${file}`);

export const SHOT_WIDTH = 2732;
export const SHOT_HEIGHT = 1708;

export const FEATURES: Feature[] = [
  { id: "drag", file: "shot-drag.png", shape: "circle", docs: "drag" },
  { id: "menu", file: "shot-menu.png", shape: "square", docs: "menu" },
  { id: "diff", file: "shot-detail-diff.png", shape: "triangle", docs: "diff" },
  { id: "conflict", file: "shot-conflict.png", shape: "circle", docs: "conflict" },
  { id: "rebase", file: "shot-rebase.png", shape: "square", docs: "rebase" },
];

// ---------- 모션 (참조 페이지 값) ----------

/*
 * 랜딩 모션 값. 참조 홈(payday-developers-fe, constants/customer/customerHome.ts)의 값을 그대로 옮겼다.
 * 스크롤 거리(px)는 무대가 상단바 아래 붙은 뒤부터 잰다. CSS 쪽 거리(800 등)는 HeroSection.module.css 와 같아야 한다.
 */

/** 히어로 고정: 붙은 채 800px. 0 → 240 글 사라짐(위로 32, linear) · 120 → 760 영상 창이 가운데 한 점부터 열림(smoothstep) */
export const HERO_PIN = {
  distance: 800,
  textEnd: 240,
  revealStart: 120,
  revealEnd: 760,
} as const;

export const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

/**
 * 푸터 링크 주소. 개인정보는 별도 방침 페이지가 생기기 전까지 문서의 "개인정보와 보안" 으로, 문의는 개인 이메일 대신 GitHub 이슈로.
 */
export const footerHref = (id: FooterLinkId, lang: Locale): string =>
  ({ github: REPO_URL, license: LICENSE_URL, privacy: `${localePath(lang, DOCS_PATH)}#privacy`, contact: ISSUES_URL })[id];
export const FOOTER_LINKS: FooterLinkId[] = ["github", "license", "privacy", "contact"];
