import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { HomeScreen } from "@/features/main";
import { getHomeDictionary } from "@/features/main/server";
import { hasLocale } from "@/lib/i18n";
import { localeAlternates } from "@/lib/site";

export const generateMetadata = async ({ params }: PageProps<"/[lang]">): Promise<Metadata> => {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const { metadata } = await getHomeDictionary(lang);
  return { ...metadata, alternates: localeAlternates(lang, "/") };
};

/** "/ko" · "/en" — 언어 사전을 읽어 기능(features/main)의 화면에 넘긴다. 상태 · 훅 · "use client" 없음 (서버 컴포넌트) */
const HomePage = async ({ params }: PageProps<"/[lang]">) => {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  return <HomeScreen lang={lang} dict={await getHomeDictionary(lang)} />;
};

export default HomePage;
