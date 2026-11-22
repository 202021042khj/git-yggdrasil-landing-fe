import { type NextRequest, NextResponse } from "next/server";
import { DEFAULT_LOCALE, LOCALE_COOKIE, hasLocale, localeFromPath, localePath, negotiateLocale } from "@/lib/i18n";

/**
 * 언어 없는 주소("/", "/download")를 언어 주소("/ko", "/en/download")로 보낸다 (Next 16 의 Proxy = 예전 Middleware).
 * 고르는 순서: 언어 쿠키(사용자가 고른 것) → Accept-Language → 기본 한국어.
 * 페이지 자체는 app/[lang] 에서 ko · en 둘 다 정적으로 미리 만들어 둔다 — proxy 는 요청마다 주소만 바꾼다.
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (localeFromPath(pathname)) return;

  const cookie = request.cookies.get(LOCALE_COOKIE)?.value;
  const locale = hasLocale(cookie)
    ? cookie
    : (negotiateLocale(request.headers.get("accept-language")) ?? DEFAULT_LOCALE);

  const url = request.nextUrl.clone();
  url.pathname = localePath(locale, pathname);
  const response = NextResponse.redirect(url);
  // 같은 "/" 라도 쿠키 · 언어 설정에 따라 다른 곳으로 보낸다 (중간 캐시가 섞지 않도록)
  response.headers.set("Vary", "Accept-Language, Cookie");
  return response;
}

export const config = {
  // _next(빌드 파일) · api · 점이 있는 파일(/media/*.png, favicon.ico 등)은 건너뛴다
  matcher: ["/((?!_next|api|.*\\..*).*)"],
};
