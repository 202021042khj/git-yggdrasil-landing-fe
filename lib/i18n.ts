/**
 * 사이트 언어(로케일) 공통 정의. React 없음 — proxy.ts(서버) · 페이지(서버) · 언어 선택(브라우저)이 같이 쓴다.
 * 문구 자체는 기능마다 features/<기능>/i18n/{ko,en}.ts 에 있다 (docs/ARCHITECTURE.md "다국어").
 */

export const LOCALES = ["ko", "en"] as const;
export type Locale = (typeof LOCALES)[number];

/** 기본 언어. Accept-Language 로도 고르지 못하면 이 언어로 보낸다 */
export const DEFAULT_LOCALE: Locale = "ko";

/** 사용자가 고른 언어를 기억하는 쿠키 (proxy 가 "/" 를 보낼 때 Accept-Language 보다 먼저 본다) */
export const LOCALE_COOKIE = "NEXT_LOCALE";
export const LOCALE_COOKIE_MAX_AGE = 60 * 60 * 24 * 365;

/** 언어 이름은 그 언어로 쓴다 (언어 선택 목록) */
export const LOCALE_NAMES: Record<Locale, string> = {
  ko: "한국어",
  en: "English",
};

export const hasLocale = (value: string | undefined | null): value is Locale =>
  !!value && (LOCALES as readonly string[]).includes(value);

/** "/en/download" → "en", "/download" → null */
export const localeFromPath = (pathname: string): Locale | null => {
  const first = pathname.split("/")[1];
  return hasLocale(first) ? first : null;
};

/** 로케일을 붙인 사이트 안 주소: ("en", "/download") → "/en/download", ("en", "/") → "/en" */
export const localePath = (locale: Locale, path = "/"): string =>
  path === "/" || path === "" ? `/${locale}` : `/${locale}${path.startsWith("/") ? path : `/${path}`}`;

/** 지금 주소의 로케일만 바꾼다: ("/ko/download", "en") → "/en/download". 로케일이 없으면 앞에 붙인다 */
export const switchLocalePath = (pathname: string, locale: Locale): string => {
  const current = localeFromPath(pathname);
  const rest = current ? pathname.slice(current.length + 1) : pathname;
  return localePath(locale, rest || "/");
};

/**
 * Accept-Language 헤더에서 지원하는 언어를 고른다 (q 값 순, "en-US" → "en").
 * Next 문서 예제는 negotiator + @formatjs/intl-localematcher 를 쓰지만, 언어가 둘뿐이라 의존성 없이 직접 고른다.
 */
export const negotiateLocale = (acceptLanguage: string | null | undefined): Locale | null => {
  if (!acceptLanguage) return null;
  const ranked = acceptLanguage
    .split(",")
    .map((part, index) => {
      const [tag, ...params] = part.trim().split(";");
      const q = params.map((p) => p.trim()).find((p) => p.startsWith("q="));
      return { tag: tag.toLowerCase(), q: q ? Number(q.slice(2)) : 1, index };
    })
    .filter((entry) => entry.tag && !Number.isNaN(entry.q) && entry.q > 0)
    .sort((a, b) => b.q - a.q || a.index - b.index);
  for (const { tag } of ranked) {
    const base = tag.split("-")[0];
    if (hasLocale(base)) return base;
  }
  return null;
};

/** 문구 틀의 {이름} 을 채운다: ("{label} 다운로드", { label: "Intel" }) → "Intel 다운로드" */
export const formatMessage = (template: string, values: Record<string, string>): string =>
  template.replace(/\{(\w+)\}/g, (match, key: string) => values[key] ?? match);
