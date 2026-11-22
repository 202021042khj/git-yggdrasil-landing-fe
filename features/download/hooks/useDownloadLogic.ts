"use client";

import { useCallback, useState, useSyncExternalStore } from "react";
import { type UseMobileMenuResult, useMobileMenu } from "@/hooks/useMobileMenu";
import type { ChromeDictionary } from "@/features/main";
import { type DetectedPlatform, detectPlatform } from "@/lib/detectPlatform";
import type { Locale } from "@/lib/i18n";
import type { DetectKey, DownloadDictionary, FileId, PlatformId } from "../types";

// ---------- 자동 감지 (브라우저에서 한 번만) ----------
// 서버 · 첫 렌더는 "pending"(아무 카드도 강조 안 함) → 브라우저에서 감지가 끝나면 한 번 바뀐다.
// useSyncExternalStore 로 읽어 effect 안 setState 없이, 수화(hydration) 불일치 없이 바꾼다.

type DetectState = { status: "pending" } | { status: "done"; platform: DetectedPlatform };

const PENDING: DetectState = { status: "pending" };
let snapshot: DetectState = PENDING;
let started = false;
const listeners = new Set<() => void>();

const subscribe = (listener: () => void) => {
  listeners.add(listener);
  if (!started) {
    started = true;
    void detectPlatform(navigator).then((platform) => {
      snapshot = { status: "done", platform };
      listeners.forEach((notify) => notify());
    });
  }
  return () => {
    listeners.delete(listener);
  };
};
const getSnapshot = () => snapshot;
const getServerSnapshot = () => PENDING;

const toDetectKey = (state: DetectState): DetectKey => {
  if (state.status === "pending") return "pending";
  const { os, arch } = state.platform;
  if (os === "mac") return arch === "unknown" ? "mac-unknown" : `mac-${arch}`;
  if (os === "windows") return arch === "arm64" ? "windows-arm64" : "windows";
  return os;
};

const RECOMMENDED: Record<DetectKey, { platform: PlatformId | null; files: FileId[] }> = {
  pending: { platform: null, files: [] },
  "mac-arm64": { platform: "mac", files: ["mac-arm64"] },
  "mac-x64": { platform: "mac", files: ["mac-x64"] },
  // 칩을 모르면 두 파일을 똑같이 보여 주고 확인 방법(카드 도움말)을 함께 둔다
  "mac-unknown": { platform: "mac", files: ["mac-arm64", "mac-x64"] },
  windows: { platform: "windows", files: ["win-x64"] },
  "windows-arm64": { platform: "windows", files: ["win-x64"] },
  linux: { platform: "linux", files: ["linux-x64"] },
  mobile: { platform: null, files: [] },
  unknown: { platform: null, files: [] },
};

export interface UseDownloadLogicParams {
  lang: Locale;
  /** 서버(app/[lang]/download/page.tsx)가 읽어 넘긴 이 언어의 문구 */
  dict: DownloadDictionary;
  /** 상단바 · 푸터 문구 (features/main) */
  chrome: ChromeDictionary;
}

export interface UseDownloadLogicResult extends UseMobileMenuResult {
  lang: Locale;
  t: DownloadDictionary;
  chrome: ChromeDictionary;
  /** 감지 칩 문구를 고르는 키 */
  detectKey: DetectKey;
  /** 강조할 운영체제 카드 (모르면 null → 강조 없음) */
  recommendedPlatform: PlatformId | null;
  /** Primary 버튼으로 보여 줄 파일 id */
  recommendedFiles: FileId[];
  /** macOS "손상되었습니다" 고급 안내 펼침 */
  isAdvancedOpen: boolean;
  toggleAdvanced: () => void;
}

export const useDownloadLogic = ({ lang, dict, chrome }: UseDownloadLogicParams): UseDownloadLogicResult => {
  const menu = useMobileMenu();
  const state = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const detectKey = toDetectKey(state);
  const [isAdvancedOpen, setIsAdvancedOpen] = useState(false);
  const toggleAdvanced = useCallback(() => setIsAdvancedOpen((open) => !open), []);

  return {
    ...menu,
    lang,
    t: dict,
    chrome,
    detectKey,
    recommendedPlatform: RECOMMENDED[detectKey].platform,
    recommendedFiles: RECOMMENDED[detectKey].files,
    isAdvancedOpen,
    toggleAdvanced,
  };
};
