import { APP_PRODUCT_NAME, APP_VERSION, WINDOWS_SETUP_FILE } from "../constants";
import type { DownloadDictionary } from "../types";

/** 다운로드 화면 문구 (한국어, 기본 언어). macOS · Windows 화면 이름은 한국어판 운영체제 표기를 따른다 */
const ko: DownloadDictionary = {
  metadata: {
    title: "다운로드 — Yggdrasil for Git",
    description:
      "macOS · Windows · Linux 용 Yggdrasil for Git 설치 파일을 받고, 서명하지 않은 앱을 처음 여는 방법을 확인하세요.",
  },
  intro: { eyebrow: `v${APP_VERSION}`, title: "무료 다운로드" },
  detect: {
    pending: "이 컴퓨터에 맞는 파일을 찾는 중…",
    "mac-arm64": "이 컴퓨터: macOS · Apple Silicon",
    "mac-x64": "이 컴퓨터: macOS · Intel",
    "mac-unknown": "이 컴퓨터: macOS · 칩 종류를 알 수 없어 두 파일을 모두 표시했어요",
    windows: "이 컴퓨터: Windows",
    "windows-arm64": "이 컴퓨터: Windows (ARM) · x64 판이 에뮬레이션으로 실행됩니다",
    linux: "이 컴퓨터: Linux",
    mobile: "휴대폰 · 태블릿에서는 설치할 수 없어요. 컴퓨터에서 이 페이지를 여세요.",
    unknown: "운영체제를 알아내지 못했어요. 아래에서 직접 골라 주세요.",
  },
  recommendedTag: "추천 · 이 컴퓨터",
  recommendedTagShort: "추천",
  downloadLabel: "다운로드",
  downloadAria: "{label} 용 {file} 다운로드",
  releasesLink: {
    label: "모든 파일 · 이전 버전 · 체크섬 → GitHub Releases",
    note: "자동 업데이트용 .zip 과 .blockmap 도 그곳에 있습니다",
  },
  platforms: {
    mac: {
      meta: "macOS 12 Monterey 이상 · 디스크 이미지(.dmg)",
      hint: '칩을 모르겠다면 화면 왼쪽 위 Apple(사과) 메뉴 › 이 Mac에 관하여 에서 확인하세요. "칩 Apple M…" 이면 Apple Silicon, "프로세서 Intel" 이면 Intel 입니다.',
    },
    windows: {
      meta: "Windows 10 · 11 (64비트) · 설치 프로그램(.exe)",
      hint: "설치할 때 위치를 고를 수 있습니다. 설치 없이 쓰는 휴대용(portable) 판은 아직 없습니다.",
    },
    linux: { meta: "AppImage (x64) · 받은 뒤 chmod +x 하고 실행" },
  },
  files: {
    "mac-arm64": "Apple Silicon",
    "mac-x64": "Intel",
    "win-x64": "설치 프로그램 (x64)",
    "linux-x64": "Linux · AppImage (x64)",
  },
  firstRunHead: { title: "설치 후 실행 도움말" },
  firstRunGuides: [
    {
      id: "mac",
      title: "macOS — 15 Sequoia 이상 기준",
      shape: "circle",
      steps: [
        {
          title: "Applications 로 옮기기",
          body: `받은 .dmg 를 열고 ${APP_PRODUCT_NAME} 아이콘을 Applications 폴더로 끌어 놓습니다.`,
        },
        {
          title: "처음 열면 막힙니다",
          body: `"${APP_PRODUCT_NAME}"이(가) 열리지 않았습니다 창이 뜨면 완료를 누릅니다. 휴지통으로 옮기지 마세요.`,
          ui: "완료",
        },
        {
          title: "그래도 열기",
          body: `시스템 설정 › 개인정보 보호 및 보안 을 열고, 아래 보안 항목의 "${APP_PRODUCT_NAME}"이(가) 차단되었습니다 옆 그래도 열기를 누릅니다. 암호나 Touch ID 로 확인합니다.`,
          ui: "시스템 설정 › 개인정보 보호 및 보안 › 그래도 열기",
        },
        {
          title: "한 번 더 열기",
          body: "다시 뜨는 확인 창에서 그래도 열기를 누르면 앱이 열립니다. 다음부터는 바로 열립니다.",
          ui: "그래도 열기",
        },
      ],
      note: "macOS 15 부터는 Finder 의 오른쪽 클릭 › 열기 로 넘어갈 수 없습니다. macOS 12 – 14 에서는 그 방법도 됩니다.",
    },
    {
      id: "windows",
      title: "Windows 10 · 11",
      shape: "square",
      steps: [
        {
          title: "설치 프로그램 실행",
          body: `${WINDOWS_SETUP_FILE} 를 엽니다. 브라우저가 "자주 다운로드되는 파일이 아닙니다" 라고 하면 ⋯ › 유지 를 고릅니다.`,
        },
        {
          title: "Windows의 PC 보호",
          body: "파란 SmartScreen 창이 뜨면 바로 닫지 말고 추가 정보를 누릅니다.",
          ui: "추가 정보",
        },
        {
          title: "실행",
          body: `앱 이름 ${APP_PRODUCT_NAME}, 게시자 알 수 없음 을 확인하고 실행을 누릅니다.`,
          ui: "실행",
        },
        {
          title: "설치 위치 고르기",
          body: `설치 위치를 고르고 설치합니다. 끝나면 시작 메뉴에서 ${APP_PRODUCT_NAME} 을 엽니다.`,
        },
      ],
      note: "SmartScreen 은 서명 없는 새 앱에 늘 이 창을 띄웁니다. 경고가 뜬다고 해서 앱에 문제가 있다는 뜻은 아니지만, 반드시 GitHub Releases 에서 받은 파일인지 확인하세요.",
    },
  ],
  quarantineTip: {
    tag: "고급 · 선택",
    title: '"손상되었기 때문에 열 수 없습니다" 가 뜰 때',
    body: "위 순서로도 열리지 않고 이 메시지가 뜨면, 터미널에서 다운로드 격리 표시를 지웁니다. GitHub Releases 에서 직접 받은 파일일 때만 하세요.",
  },
  copy: { idle: "복사", done: "복사됨", aria: "명령 복사" },
};

export default ko;
