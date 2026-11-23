import type { MetadataRoute } from "next";
import { LOCALES, localePath } from "@/lib/i18n";
import { SITE_PATHS, SITE_URL } from "@/lib/site";

/**
 * /sitemap.xml — 검색엔진에 알리는 페이지 목록. 화면마다 ko · en 주소를 적고, 서로 같은 내용의 다른 언어판임을 표시한다.
 * 주소는 NEXT_PUBLIC_SITE_URL 로 만든다 (도메인이 바뀌면 환경 변수만 바꾸고 다시 배포).
 */
const sitemap = (): MetadataRoute.Sitemap =>
  SITE_PATHS.flatMap((path) =>
    LOCALES.map((locale) => ({
      url: `${SITE_URL}${localePath(locale, path)}`,
      lastModified: new Date(),
      changeFrequency: path === "/" ? "weekly" : "monthly",
      priority: path === "/" ? 1 : 0.7,
      alternates: {
        languages: Object.fromEntries(LOCALES.map((l) => [l, `${SITE_URL}${localePath(l, path)}`])),
      },
    })),
  );

export default sitemap;
