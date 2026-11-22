import type { ShapeKind } from "@/components/common/Shape";
import type { DetectedArch } from "@/lib/detectPlatform";

/** 설치 파일이 있는 운영체제 (electron-builder: mac dmg · win nsis · linux AppImage) */
export type PlatformId = "mac" | "windows" | "linux";

export type FileId = "mac-arm64" | "mac-x64" | "win-x64" | "linux-x64";

export interface DownloadFile {
  id: FileId;
  /** GitHub Releases 에 올라가는 파일 이름 (electron-builder 기본 이름, 공백 → "-") */
  fileName: string;
  /** Mac 은 CPU 로 추천 파일을 고른다. 다른 OS 는 "any" */
  arch: DetectedArch | "any";
}

export interface PlatformInfo {
  id: PlatformId;
  /** 운영체제 이름 (번역하지 않음) */
  title: string;
  shape: ShapeKind;
  files: DownloadFile[];
}

/** 운영체제 카드 문구 (i18n) */
export interface PlatformCopy {
  /** 지원 버전 · 파일 종류 */
  meta: string;
  /** 카드 아래 도움말 (없으면 생략) */
  hint?: string;
}

/** 자동 감지 결과를 사람이 읽는 문구로 고를 때 쓰는 키 */
export type DetectKey =
  | "pending"
  | "mac-arm64"
  | "mac-x64"
  | "mac-unknown"
  | "windows"
  | "windows-arm64"
  | "linux"
  | "mobile"
  | "unknown";

export interface FirstRunStep {
  title: string;
  body: string;
  /** 눌러야 할 화면 문구 (칩으로 보여 줌) */
  ui?: string;
}

export interface FirstRunGuide {
  id: "mac" | "windows";
  title: string;
  shape: ShapeKind;
  steps: FirstRunStep[];
  note: string;
}

export interface AdvancedTip {
  tag: string;
  title: string;
  body: string;
}

export interface SectionCopy {
  eyebrow?: string;
  title: string;
  description?: string;
}

/** 다운로드 화면 문구 전체 (i18n/{ko,en}.ts). 한 언어라도 빠지면 타입 오류가 난다 */
export interface DownloadDictionary {
  metadata: { title: string; description: string };
  /** 화면 제목 + 버전 라벨 */
  intro: SectionCopy;
  /** 자동 감지 칩 문구 */
  detect: Record<DetectKey, string>;
  recommendedTag: string;
  recommendedTagShort: string;
  downloadLabel: string;
  /** 화면 낭독용 버튼 이름. {label} · {file} 을 채운다 (formatMessage) */
  downloadAria: string;
  releasesLink: { label: string; note: string };
  platforms: Record<PlatformId, PlatformCopy>;
  /** 파일 이름표 ("Apple Silicon" 처럼 사람이 고르는 이름) */
  files: Record<FileId, string>;
  firstRunHead: SectionCopy;
  firstRunGuides: FirstRunGuide[];
  /** macOS "손상되었습니다" 대처 (명령은 constants.ts MAC_QUARANTINE_COMMAND) */
  quarantineTip: AdvancedTip;
  copy: { idle: string; done: string; aria: string };
}
