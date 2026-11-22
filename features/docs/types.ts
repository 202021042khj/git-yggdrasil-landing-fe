// ---------- 문서 내용 (i18n/{ko,en}.ts) ----------

/**
 * 문단 안의 `백틱` 은 코드(<code>)로, [[⌘Z]] 는 키(<kbd>)로 그린다 (components/RichText.tsx).
 * 다른 마크업은 쓰지 않는다.
 */
export type DocBlock =
  | { kind: "p"; text: string }
  /** 순서 없는 목록 */
  | { kind: "list"; items: string[] }
  /** 따라 하는 순서 */
  | { kind: "steps"; items: string[] }
  /** 터미널 명령 한 줄 */
  | { kind: "command"; command: string }
  /** 단축키 표: 키 묶음 → 동작 */
  | { kind: "keys"; rows: { keys: string[]; action: string }[] }
  /** 눈에 띄게 보여 줄 한 문단 (주의 · 알아 둘 것) */
  | { kind: "note"; text: string };

export interface DocTopic {
  /** #앵커 (랜딩 "자세히 보기" 가 가리킨다) */
  id: string;
  title: string;
  blocks: DocBlock[];
}

export interface DocSection {
  id: string;
  title: string;
  topics: DocTopic[];
}

export interface DocsDictionary {
  metadata: { title: string; description: string };
  /** 화면 제목 (h1) */
  title: string;
  /** 목차 제목 */
  tocLabel: string;
  sections: DocSection[];
  /** 맨 아래: 해결되지 않으면 GitHub 이슈로 */
  help: { text: string; link: string };
}
