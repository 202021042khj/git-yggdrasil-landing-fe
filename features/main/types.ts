import type { ShapeKind } from "@/components/common/Shape";

export type { ShapeKind };

// ---------- 화면 구조 (constants.ts, 언어와 무관) ----------

export type FeatureId = "drag" | "menu" | "diff" | "conflict" | "rebase";
/** 상단 메뉴: 홈 섹션(features · news) 또는 다른 화면(docs) */
/** 푸터 링크 */
export type FooterLinkId = "github" | "license" | "privacy" | "contact";

export type NavTarget = "features" | "news" | "docs";

export interface Feature {
  id: FeatureId;
  file: string;
  src: string;
  shape: ShapeKind;
  /** 문서(features/docs)의 토픽 앵커 — "자세히 보기" 가 가리킨다 */
  docs: string;
}

// ---------- 문구 (i18n/{ko,en}.ts) ----------

export interface SectionCopy {
  eyebrow?: string;
  title: string;
  description?: string;
}

export interface HeroCopy {
  /** 대표 문구 (h1) */
  title: string;
  secondaryCta: string;
  videoCaption: string;
}

export interface FeatureCopy {
  alt: string;
  title: string;
  description: string;
}

export interface ChecklistItem {
  title: string;
  description: string;
}

export interface ReleaseNote {
  version: string;
  /** 릴리스 본문의 첫 줄. 없으면 null (화면이 releaseDefault 로) */
  title: string | null;
  date: string;
  /** GitHub 릴리스 페이지 */
  url: string;
}

export interface ChangeLogEntry {
  hash: string;
  tone: "brand" | "clay" | "ink";
  title: string;
  date: string;
  /** 펼치면 보이는 자세한 설명 (커밋 본문. 없으면 빈 문자열) */
  detail: string;
  /** GitHub 커밋 페이지 */
  url: string;
}

/** GitHub 에서 받아 오는 소식 (서버에서 getHomeNews 가 채운다) */
export interface HomeNews {
  releaseNotes: ReleaseNote[];
  changeLog: ChangeLogEntry[];
  releasesUrl: string;
  commitsUrl: string;
}

export interface DemoVideoCopy {
  /** 화면 낭독용 영상 설명 */
  label: string;
  play: string;
}

/** 사이트 공통 틀(상단바 · 서랍 · 푸터) 문구. 다운로드 화면도 같이 쓴다 */
export interface ChromeDictionary {
  /** 로고 링크의 화면 낭독 이름 */
  homeLabel: string;
  navLabel: string;
  nav: Record<NavTarget, string>;
  download: string;
  menuOpen: string;
  menuClose: string;
  /** 언어 선택의 화면 낭독 이름 (보이는 글자는 언어 이름) */
  languageLabel: string;
  /** 푸터 링크 이름 (주소는 constants.ts FOOTER_LINKS) */
  footerLinks: Record<FooterLinkId, string>;
}

/** 홈 화면 문구 전체 (언어 파일). 한 언어라도 빠지면 타입 오류가 난다 */
export interface HomeCopy {
  metadata: { title: string; description: string };
  chrome: ChromeDictionary;
  hero: HeroCopy;
  demoVideo: DemoVideoCopy;
  featuresHead: SectionCopy;
  /** 기능 줄마다 문서로 가는 버튼 */
  featureMore: string;
  features: Record<FeatureId, FeatureCopy>;
  checklistHead: SectionCopy;
  checklist: ChecklistItem[];
  newsHead: SectionCopy;
  releaseNotesTitle: string;
  changeLogTitle: string;
  seeAll: string;
  /** GitHub 에서 받지 못했거나 아직 없을 때 */
  noReleases: string;
  /** 릴리스 본문에 설명이 없을 때 */
  releaseDefault: string;
  noChanges: string;
  /** 커밋 본문이 없을 때 펼친 칸 */
  noDetail: string;
  viewOnGithub: string;
  help: {
    /** 두 줄 제목 */
    title: [string, string];
    description: string;
    docs: string;
    issue: string;
  };
}

/** 화면이 받는 것: 문구 + GitHub 소식 */
export type HomeDictionary = HomeCopy & HomeNews;
