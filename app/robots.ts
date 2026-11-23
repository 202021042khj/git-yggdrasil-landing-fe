import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

/** /robots.txt — 모든 검색 로봇에 사이트 전체를 열고, 사이트맵 위치를 알려 준다 */
const robots = (): MetadataRoute.Robots => ({
  rules: { userAgent: "*", allow: "/" },
  sitemap: `${SITE_URL}/sitemap.xml`,
});

export default robots;
