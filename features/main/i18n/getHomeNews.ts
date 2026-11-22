import "server-only";
import {
  COMMITS_URL,
  RELEASES_URL,
  fetchCommits,
  fetchReleases,
} from "@/lib/github";
import type { Locale } from "@/lib/i18n";
import type { ChangeLogEntry, HomeNews, ReleaseNote } from "../types";

const COUNT = 3;

/** 날짜: ko "11.12", en "Nov 12" (한국 시간 기준) */
const formatDate = (iso: string, locale: Locale) => {
  if (!iso) return "";
  const d = new Date(iso);
  return locale === "ko"
    ? new Intl.DateTimeFormat("ko-KR", {
        month: "2-digit",
        day: "2-digit",
        timeZone: "Asia/Seoul",
      })
        .format(d)
        .replace(/\s/g, "")
        .replace(/\.$/, "")
    : new Intl.DateTimeFormat("en-US", {
        month: "short",
        day: "numeric",
        timeZone: "Asia/Seoul",
      }).format(d);
};

/** 마크다운 한 줄을 글자만: "- **feat**: [x](u) by @a in #3" → "feat: x" */
const plain = (line: string) =>
  line
    .replace(/^\s*(?:[-*+]|\d+\.)\s+/, "")
    .replace(/!?\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/\*\*|__|`/g, "")
    .replace(/\s+by @\S+ in \S+$/, "")
    .trim();

/** 릴리스 제목: 본문의 첫 내용 줄 → 릴리스 이름 → 태그 */
const releaseTitle = (body: string, name: string, tag: string) => {
  const line = body
    .split("\n")
    .map((l) => l.trim())
    .find(
      (l) =>
        l &&
        !l.startsWith("#") &&
        !/^\*\*Full Changelog\*\*/i.test(l) &&
        !/^<!--/.test(l),
    );
  const title = (line && plain(line)) || name.replace(/^Yggdrasil\s+/i, "");
  return title && title !== tag ? title : null; // 버전만 되풀이하면 화면의 기본 문구로
};

/** 커밋 종류로 점 색: feat 초록 · fix 흙색 · 나머지 먹색 */
const toneOf = (title: string): ChangeLogEntry["tone"] =>
  /^feat\b/i.test(title) ? "brand" : /^fix\b/i.test(title) ? "clay" : "ink";

/** 커밋 본문 (제목 줄 · 서명 줄 빼고, 목록 기호 없이 한 문단으로) */
const commitDetail = (rest: string[]) =>
  rest
    .filter(
      (l) => l.trim() && !/^(co-authored-by|signed-off-by):/i.test(l.trim()),
    )
    .map(plain)
    .join(" · ")
    .slice(0, 400);

/** 홈 "릴리스 노트 · 변경 기록": GitHub 릴리스와 기본 브랜치 커밋 (10분마다 갱신) */
export async function getHomeNews(locale: Locale): Promise<HomeNews> {
  const [releases, commits] = await Promise.all([
    fetchReleases(COUNT),
    fetchCommits(COUNT),
  ]);
  const releaseNotes: ReleaseNote[] = releases.map((r) => ({
    version: r.tag,
    title: releaseTitle(r.body, r.name, r.tag),
    date: formatDate(r.publishedAt, locale),
    url: r.url,
  }));
  const changeLog: ChangeLogEntry[] = commits.map((c) => {
    const [first, ...rest] = c.message.split("\n");
    return {
      hash: c.sha.slice(0, 7),
      tone: toneOf(first),
      title: first.trim(),
      date: formatDate(c.date, locale),
      detail: commitDetail(rest),
      url: c.url,
    };
  });
  return {
    releaseNotes,
    changeLog,
    releasesUrl: RELEASES_URL,
    commitsUrl: COMMITS_URL,
  };
}
