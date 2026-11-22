import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DownloadScreen } from "@/features/download";
import { getDownloadDictionary } from "@/features/download/server";
import { getChromeDictionary } from "@/features/main/server";
import { hasLocale } from "@/lib/i18n";
import { localeAlternates } from "@/lib/site";

export const generateMetadata = async ({ params }: PageProps<"/[lang]/download">): Promise<Metadata> => {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const { metadata } = await getDownloadDictionary(lang);
  return { ...metadata, alternates: localeAlternates(lang, "/download") };
};

/** "/ko/download" · "/en/download" — 언어 사전을 읽어 기능(features/download)의 화면에 넘긴다 (서버 컴포넌트) */
const DownloadPage = async ({ params }: PageProps<"/[lang]/download">) => {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const [dict, chrome] = await Promise.all([getDownloadDictionary(lang), getChromeDictionary(lang)]);

  return <DownloadScreen lang={lang} dict={dict} chrome={chrome} />;
};

export default DownloadPage;
