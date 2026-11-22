import type { Metadata } from "next";
import { notFound } from "next/navigation";
// 글꼴은 npm(@fontsource)으로 프로젝트에 넣어 쓴다. next/font/google 은 빌드 때 Google 에서 받아 오는데,
// Noto Serif KR 일부 조각의 주소(?kit=…&skey=…)를 Turbopack 이 처리하지 못해 빌드가 가끔 깨졌다.
// 제목 · 숫자는 Playfair 정자체, 로고 글자만 이탤릭
import "@fontsource/playfair-display/400.css";
import "@fontsource/playfair-display/500.css";
import "@fontsource/playfair-display/400-italic.css";
import "@fontsource/noto-serif-kr/400.css";
import "@fontsource/noto-serif-kr/600.css";
import "@fontsource/noto-serif-kr/700.css";
import "@fontsource/jetbrains-mono/400.css";
import "@fontsource/jetbrains-mono/500.css";
import "../globals.css";
import { LOCALES, hasLocale } from "@/lib/i18n";
import { SITE_URL } from "@/lib/site";

// 언어마다 화면을 빌드 때 미리 만든다 (/ko · /en). 그 밖의 언어는 404
export const generateStaticParams = () => LOCALES.map((lang) => ({ lang }));
export const dynamicParams = false;

// 제목 · 설명 · hreflang 은 각 page.tsx 의 generateMetadata 가 언어별로 채운다
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
};

/** 루트 레이아웃 (app/[lang]): <html lang> 을 주소의 언어로 */
const RootLayout = async ({ children, params }: LayoutProps<"/[lang]">) => {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  return (
    <html
      lang={lang}
      // globals.css 의 scroll-behavior: smooth 는 #앵커 이동용. 이 표시가 있으면 Next 가 페이지 이동 때만 잠시 꺼서 바로 맨 위로 간다
      data-scroll-behavior="smooth"
    >
      <body>
        {children}
      </body>
    </html>
  );
};

export default RootLayout;
