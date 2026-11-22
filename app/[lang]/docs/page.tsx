import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DocsScreen } from "@/features/docs";
import { getDocsDictionary } from "@/features/docs/server";
import { getChromeDictionary } from "@/features/main/server";
import { hasLocale } from "@/lib/i18n";
import { localeAlternates } from "@/lib/site";

export const generateMetadata = async ({ params }: PageProps<"/[lang]/docs">): Promise<Metadata> => {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const { metadata } = await getDocsDictionary(lang);
  return { ...metadata, alternates: localeAlternates(lang, "/docs") };
};

/** "/ko/docs" · "/en/docs" — 사용법 · 문제 해결 (서버 컴포넌트) */
const DocsPage = async ({ params }: PageProps<"/[lang]/docs">) => {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const [dict, chrome] = await Promise.all([getDocsDictionary(lang), getChromeDictionary(lang)]);

  return <DocsScreen lang={lang} dict={dict} chrome={chrome} />;
};

export default DocsPage;
