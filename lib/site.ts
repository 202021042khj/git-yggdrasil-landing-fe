import type { Metadata } from "next";
import { DEFAULT_LOCALE, LOCALES, type Locale, localePath } from "@/lib/i18n";

/**
 * 사이트 주소 (hreflang · canonical 을 절대 주소로 만들 때 쓴다). 배포 주소가 정해지면 NEXT_PUBLIC_SITE_URL 로 넘긴다.
 * TODO: 실제 도메인 확정 전이라 기본값은 로컬 주소
 */
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

/** 사이트의 화면 (언어 없는 경로). 사이트맵이 이 목록으로 ko · en 주소를 만든다 — 화면을 더하면 여기에도 더한다 */
export const SITE_PATHS = ["/", "/download", "/docs"] as const;

/** 언어별 같은 화면 주소 (hreflang). path 는 언어 없는 경로("/", "/download") */
export const localeAlternates = (locale: Locale, path = "/"): Metadata["alternates"] => ({
  canonical: localePath(locale, path),
  languages: {
    ...Object.fromEntries(LOCALES.map((l) => [l, localePath(l, path)])),
    "x-default": localePath(DEFAULT_LOCALE, path),
  },
});
