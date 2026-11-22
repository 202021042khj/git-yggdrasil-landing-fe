import "server-only";

/**
 * 앱 저장소(GitHub)의 공개 정보: 릴리스 · 커밋. 서버에서만 부른다 (방문자 브라우저는 GitHub API 를 부르지 않는다).
 * 10분마다 새로 받는다(ISR). 공개 API 는 토큰 없이 시간당 60번이라, 빌드 서버가 자주 받는다면 GITHUB_TOKEN 을 둔다(권한 없는 읽기 전용이면 충분).
 */
export const GITHUB_REPO = "202021042khj/git-yggdrasil";
export const REPO_URL = `https://github.com/${GITHUB_REPO}`;
export const RELEASES_URL = `${REPO_URL}/releases`;
export const COMMITS_URL = `${REPO_URL}/commits`;

const REVALIDATE_SECONDS = 10 * 60; // 커밋 · 릴리스 2번 × 시간당 6번 = 12번 (토큰 없는 한도 60번 안)

export interface GithubRelease {
  tag: string;
  name: string;
  body: string;
  url: string;
  publishedAt: string;
}

export interface GithubCommit {
  sha: string;
  message: string;
  url: string;
  date: string;
}

async function api<T>(path: string): Promise<T | null> {
  try {
    const token = process.env.GITHUB_TOKEN;
    const res = await fetch(
      `https://api.github.com/repos/${GITHUB_REPO}${path}`,
      {
        headers: {
          Accept: "application/vnd.github+json",
          "X-GitHub-Api-Version": "2022-11-28",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        next: { revalidate: REVALIDATE_SECONDS },
      },
    );
    if (!res.ok) return null;
    return (await res.json()) as T;
  } catch {
    return null; // 네트워크 오류: 화면은 "GitHub 에서 보기" 로 대신한다
  }
}

/** 공개된 최근 릴리스 (초안 · 시험판 제외) */
export async function fetchReleases(limit: number): Promise<GithubRelease[]> {
  type Raw = {
    tag_name: string;
    name: string | null;
    body: string | null;
    html_url: string;
    published_at: string | null;
    draft: boolean;
    prerelease: boolean;
  };
  const raw = await api<Raw[]>(`/releases?per_page=${limit + 5}`);
  return (raw ?? [])
    .filter((r) => !r.draft && !r.prerelease && r.published_at)
    .slice(0, limit)
    .map((r) => ({
      tag: r.tag_name,
      name: r.name ?? "",
      body: r.body ?? "",
      url: r.html_url,
      publishedAt: r.published_at!,
    }));
}

/** 기본 브랜치의 최근 커밋 (merge 커밋 제외) */
export async function fetchCommits(limit: number): Promise<GithubCommit[]> {
  type Raw = {
    sha: string;
    html_url: string;
    parents: unknown[];
    commit: { message: string; committer: { date: string } | null };
  };
  const raw = await api<Raw[]>(`/commits?per_page=${limit + 10}`);
  return (raw ?? [])
    .filter((c) => c.parents.length < 2)
    .slice(0, limit)
    .map((c) => ({
      sha: c.sha,
      message: c.commit.message,
      url: c.html_url,
      date: c.commit.committer?.date ?? "",
    }));
}
