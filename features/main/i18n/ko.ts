import type { HomeCopy } from "../types";

/** 홈 · 공통 틀 문구 (한국어, 기본 언어) */
const ko: HomeCopy = {
  metadata: {
    title: "Yggdrasil for Git",
    description:
      "커밋 그래프를 직접 끌어 놓아 git 히스토리를 고치는 데스크톱 앱. Yggdrasil로 git을 쉽게 관리하세요.",
  },
  chrome: {
    homeLabel: "Yggdrasil 처음으로",
    navLabel: "주요 메뉴",
    nav: { features: "기능", news: "소식", docs: "문서" },
    download: "다운로드",
    menuOpen: "메뉴 열기",
    menuClose: "메뉴 닫기",
    languageLabel: "언어",
    footerLinks: { github: "GitHub", license: "라이선스", privacy: "개인정보", contact: "문의" },
  },
  hero: {
    title: "Yggdrasil로 git을 쉽게 관리하세요",
    secondaryCta: "GitHub",
    videoCaption: "demo.mp4 · 앱 시연",
  },
  demoVideo: {
    label: "Yggdrasil 시연: 커밋을 release/1.0 이름표로 끌어 복사(cherry-pick)한 뒤 ⌘Z 로 되돌리고 ⌘K 로 찾기",
    play: "시연 영상 재생",
  },
  featuresHead: { title: "기능 알아보기" },
  featureMore: "자세히 보기",
  features: {
    drag: {
      alt: "커밋을 release/1.0 브랜치 이름표로 끌자 동작 알약과 결과 그래프 고스트가 미리 그려진 화면",
      title: "끌어 놓기로 git 조작",
      description:
        "커밋을 다른 브랜치 이름표로 끌면 놓을 수 있는 동작이 알약 모양으로 뜨고, 결과 그래프가 고스트로 미리 그려집니다. 실행될 git 명령도 함께 보여 줍니다.",
    },
    menu: {
      alt: "놓은 뒤 옮기기·복사·브랜치 합치기 중에서 고르는 동작 메뉴",
      title: "놓은 뒤 고르는 동작 메뉴",
      description:
        "놓으면 옮기기·복사(cherry-pick)·브랜치 합치기 중에서 고릅니다. 항목마다 대응하는 git 명령이 적혀 있습니다.",
    },
    diff: {
      alt: "커밋 파일의 바뀐 내용을 좌우로 비교하는 diff 화면",
      title: "좌우 비교 diff",
      description:
        "커밋의 파일을 누르면 통합 또는 좌우 보기로 바뀐 내용을 봅니다. 히스토리·blame 탭도 같은 자리에서 열립니다.",
    },
    conflict: {
      alt: "merge 충돌 구간마다 A·B·둘 다 중에서 고르는 충돌 편집기",
      title: "충돌 편집기",
      description:
        "merge 충돌이 나면 배너가 뜨고, 구간마다 A·B·둘 다 중에서 골라 결과를 확인한 뒤 해결합니다. 계속하기·중단도 한 번에 할 수 있습니다.",
    },
    rebase: {
      alt: "커밋 순서를 끌어서 바꾸고 합치기·메시지 수정·빼기를 고르는 rebase 정리 화면",
      title: "커밋 정리 (rebase -i)",
      description: "브랜치의 커밋을 끌어서 순서를 바꾸고, 합치기·메시지 수정·빼기를 골라 한 번에 정리합니다.",
    },
  },
  checklistHead: { title: "설치 전 확인하기" },
  checklist: [
    {
      title: "Git 2.38 이상 필요",
      description: "시스템에 설치된 git 을 그대로 씁니다. 터미널에서 git --version 으로 확인하세요.",
    },
    {
      title: "macOS · Windows · Linux",
      description: "Electron 으로 만든 데스크톱 앱이라 세 운영체제에서 똑같이 동작합니다.",
    },
    {
      title: "서명 전 첫 실행 안내",
      description:
        "아직 코드 서명 전이라 처음 열 때 운영체제 보안 경고가 뜰 수 있어요. 안내에 따라 실행을 허용하세요.",
    },
    {
      title: "시스템 자격 증명 사용",
      description:
        "원격 저장소 인증 정보는 git 이 쓰는 운영체제 자격 증명 저장소에 그대로 두며 앱이 따로 보관하지 않습니다.",
    },
  ],
  newsHead: { title: "최신 소식" },
  releaseNotesTitle: "릴리스 노트",
  changeLogTitle: "변경 기록",
  seeAll: "전체 보기 →",
  noReleases: "아직 공개된 릴리스가 없어요.",
  releaseDefault: "새 버전이 나왔어요",
  noChanges: "변경 기록을 불러오지 못했어요.",
  noDetail: "자세한 설명이 없는 커밋이에요.",
  viewOnGithub: "GitHub 에서 보기 ↗",
  help: {
    title: ["Questions?", "We’re on the branch."],
    description: "막히는 곳이 있다면 문서를 보거나 GitHub 이슈로 알려 주세요.",
    docs: "문서 보기",
    issue: "이슈 남기기",
  },
};

export default ko;
