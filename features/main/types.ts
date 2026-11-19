export type ShapeKind = "circle" | "square" | "triangle" | "ring";

export interface HeroCopy {
  /** 대표 문구 (h1) */
  title: string;
  primaryCta: string;
  secondaryCta: string;
  videoCaption: string;
}

export interface NavItem {
  label: string;
  /** 섹션 id (DesktopPage 는 그대로, MobilePage 는 "m-" 접두사) */
  target: string;
}

export interface Feature {
  file: string;
  src: string;
  alt: string;
  shape: ShapeKind;
  title: string;
  description: string;
  command: string;
}

export interface StartStep {
  numeral: string;
  shape: ShapeKind;
  title: string;
  description: string;
  hint: string;
}

export interface FlowStep {
  numeral: string;
  tone: "brand" | "clay";
  title: string;
  description: string;
}

export interface ChecklistItem {
  title: string;
  description: string;
}

export interface ReleaseNote {
  version: string;
  title: string;
  date: string;
}

export interface ChangeLogEntry {
  hash: string;
  tone: "brand" | "clay" | "ink";
  title: string;
  date: string;
  /** 펼치면 보이는 자세한 설명 */
  detail: string;
}
