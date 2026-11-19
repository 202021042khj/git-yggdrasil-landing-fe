import type {

// ---------- 화면 문구 ----------

ChangeLogEntry,
  ChecklistItem,
  Feature,
  FlowStep,
  HeroCopy,
  NavItem,
  ReleaseNote,
  StartStep,
} from "./types";

/** Desktop 트리와 함께 마운트되므로 Mobile 트리의 앵커 id 는 이 접두사를 붙인다 */
export const MOBILE_ID_PREFIX = "m-";

export const HERO: HeroCopy = {
  title: "Yggdrasil로 git을 쉽게 관리하세요",
  primaryCta: "다운로드",
  secondaryCta: "GitHub",
  videoCaption: "demo.mp4 · 앱 시연",
};

export const NAV_ITEMS: NavItem[] = [
  { label: "기능", target: "features" },
  { label: "시작하기", target: "start" },
  { label: "릴리스 노트", target: "news" },
  { label: "도움말", target: "help" },
];

export const SHOT_WIDTH = 2732;
export const SHOT_HEIGHT = 1708;

export const FEATURES: Feature[] = [
  {
    file: "shot-drag.png",
    src: "/media/shot-drag.png",
    alt: "커밋을 release/1.0 브랜치 이름표로 끌자 동작 알약과 결과 그래프 고스트가 미리 그려진 화면",
    shape: "circle",
    title: "끌어 놓기로 git 조작",
    description:
      "커밋을 다른 브랜치 이름표로 끌면 놓을 수 있는 동작이 알약 모양으로 뜨고, 결과 그래프가 고스트로 미리 그려집니다. 실행될 git 명령도 함께 보여 줍니다.",
    command: "$ git cherry-pick 3f2a9c1",
  },
  {
    file: "shot-menu.png",
    src: "/media/shot-menu.png",
    alt: "놓은 뒤 옮기기·복사·브랜치 합치기 중에서 고르는 동작 메뉴",
    shape: "square",
    title: "놓은 뒤 고르는 동작 메뉴",
    description:
      "놓으면 옮기기·복사(cherry-pick)·브랜치 합치기 중에서 고릅니다. 항목마다 대응하는 git 명령이 적혀 있습니다.",
    command: "$ git merge release/1.0",
  },
  {
    file: "shot-detail-diff.png",
    src: "/media/shot-detail-diff.png",
    alt: "커밋 파일의 바뀐 내용을 좌우로 비교하는 diff 화면",
    shape: "triangle",
    title: "좌우 비교 diff",
    description:
      "커밋의 파일을 누르면 통합 또는 좌우 보기로 바뀐 내용을 봅니다. 히스토리·blame 탭도 같은 자리에서 열립니다.",
    command: "$ git diff HEAD~1 -- src/app.ts",
  },
  {
    file: "shot-conflict.png",
    src: "/media/shot-conflict.png",
    alt: "merge 충돌 구간마다 A·B·둘 다 중에서 고르는 충돌 편집기",
    shape: "circle",
    title: "충돌 편집기",
    description:
      "merge 충돌이 나면 배너가 뜨고, 구간마다 A·B·둘 다 중에서 골라 결과를 확인한 뒤 해결합니다. 계속하기·중단도 한 번에 할 수 있습니다.",
    command: "$ git merge --continue",
  },
  {
    file: "shot-rebase.png",
    src: "/media/shot-rebase.png",
    alt: "커밋 순서를 끌어서 바꾸고 합치기·메시지 수정·빼기를 고르는 rebase 정리 화면",
    shape: "square",
    title: "커밋 정리 (rebase -i)",
    description:
      "브랜치의 커밋을 끌어서 순서를 바꾸고, 합치기·메시지 수정·빼기를 골라 한 번에 정리합니다.",
    command: "$ git rebase -i HEAD~4",
  },
];

export const START_STEPS: StartStep[] = [
  {
    numeral: "i.",
    shape: "circle",
    title: "설치하기",
    description: "운영체제에 맞는 설치 파일을 내려받아 실행합니다.",
    hint: ".dmg · .exe · .AppImage",
  },
  {
    numeral: "ii.",
    shape: "square",
    title: "저장소 열기",
    description: "⌘O (Ctrl+O) 로 git 저장소 폴더를 고르면 커밋 그래프가 바로 그려집니다.",
    hint: "⌘O · Ctrl+O",
  },
  {
    numeral: "iii.",
    shape: "triangle",
    title: "끌어서 고치기",
    description: "커밋을 브랜치 이름표로 끌어 놓고, 메뉴에서 동작을 고릅니다.",
    hint: "drag → drop",
  },
  {
    numeral: "iv.",
    shape: "ring",
    title: "되돌리기",
    description: "마음에 들지 않으면 ⌘Z (Ctrl+Z) 한 번으로 이전 상태로 돌아갑니다.",
    hint: "⌘Z · Ctrl+Z",
  },
];

export const FLOW_STEPS: FlowStep[] = [
  {
    numeral: "i.",
    tone: "brand",
    title: "고르기",
    description:
      "그래프에서 옮길 커밋이나 브랜치를 누릅니다. 오른쪽에 작성자·부모·바뀐 파일이 보입니다.",
  },
  {
    numeral: "ii.",
    tone: "clay",
    title: "끌기",
    description:
      "다른 브랜치 이름표로 끕니다. 놓을 수 있는 동작과 결과 그래프가 미리 그려집니다.",
  },
  {
    numeral: "iii.",
    tone: "brand",
    title: "놓기",
    description:
      "놓고 동작을 고르면 끝. 실행된 git 명령은 기록에 남고 ⌘Z (Ctrl+Z) 로 되돌릴 수 있습니다.",
  },
];

export const CHECKLIST: ChecklistItem[] = [
  {
    title: "Git 2.x 이상 필요",
    description:
      "시스템에 설치된 git 을 그대로 씁니다. 터미널에서 git --version 으로 확인하세요.",
  },
  {
    title: "macOS · Windows · Linux",
    description: "Electron 으로 만든 데스크톱 앱이라 세 운영체제에서 똑같이 동작합니다.",
  },
  {
    title: "서명 전 첫 실행 안내",
    description: "아직 코드 서명 전이라 처음 열 때 운영체제 보안 경고가 뜰 수 있어요. 안내에 따라 실행을 허용하세요.",
  },
  {
    title: "시스템 자격 증명 사용",
    description:
      "원격 저장소 인증 정보는 git 이 쓰는 운영체제 자격 증명 저장소에 그대로 두며 앱이 따로 보관하지 않습니다.",
  },
];

export const RELEASE_NOTES: ReleaseNote[] = [
  { version: "v0.4.0", title: "충돌 편집기와 빠른 찾기(⌘K · Ctrl+K)를 추가했습니다", date: "11.12" },
  { version: "v0.3.2", title: "큰 저장소에서 그래프 그리기가 빨라졌습니다", date: "10.28" },
  { version: "v0.3.0", title: "다크 테마와 rebase -i 정리 화면", date: "10.09" },
];

export const CHANGE_LOG: ChangeLogEntry[] = [
  { hash: "a41c9e2", tone: "brand", title: "diff 좌우 보기 줄 맞춤 수정", date: "11.15", detail: "diff 를 좌우로 볼 때 긴 줄이 접히면 반대쪽 줄 번호가 밀리던 문제를 고쳤습니다." },
  { hash: "7be03d1", tone: "clay", title: "실행 기록에 git 명령 함께 표시", date: "11.13", detail: "실행 기록 각 줄 아래에 앱이 실제로 실행한 git 명령을 함께 보여 줍니다. 눌러서 복사할 수 있어요." },
  { hash: "e9f2a58", tone: "ink", title: "드래그 고스트 미리보기 깜빡임 수정", date: "11.10", detail: "커밋을 끌 때 미리보기가 한 프레임씩 사라졌다 나타나던 문제를 고쳤습니다." },
];

export const FOOTER_LINKS = ["GitHub", "라이선스", "개인정보", "문의"];

// ---------- 모션 (참조 페이지 값) ----------

/*
 * 랜딩 모션 값. 참조 홈(payday-developers-fe, constants/customer/customerHome.ts)의 값을 그대로 옮겼다.
 * 스크롤 거리(px)는 무대가 상단바 아래 붙은 뒤부터 잰다. CSS 쪽 거리(800 · 1760 · 2.6 등)는 app/globals.css 와 같아야 한다.
 */

/** 히어로 고정: 붙은 채 800px. 0 → 240 글 사라짐(위로 32, linear) · 120 → 760 영상 창 열림(smoothstep) */
export const HERO_PIN = {
  distance: 800,
  textEnd: 240,
  revealStart: 120,
  revealEnd: 760,
} as const;

/** 시작 가이드 고정: 붙은 뒤 440px 마다 다음 칸을 펼친다(4칸 = 1760px). 폭 1024 · 높이 720 이상일 때만 */
export const START_PIN = {
  stepPx: 440,
  minWidth: 1024,
  minHeight: 720,
} as const;

export const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";
