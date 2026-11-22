# Architecture Conventions

## Purpose / provenance

This convention is inspired by `recruit-khj` (a prior take-home-test project) but deliberately improves on it rather than copying it verbatim:

- **Single shared props interface.** In the reference, `DesktopPage.tsx` and `MobilePage.tsx` each redefined their own copy of the same props interface. Here, the page-level hook exports one interface; both device components import it.
- **Consistent naming.** The reference had a `Mobilepage.tsx` casing typo. Here it's always `MobilePage.tsx`.
- **Real section composition.** The reference had no section layer — each device component was one large block with comment dividers. Here, pages compose named section components from a `sections/` folder.
- **Centralized constants.** The reference scattered constants inline inside hooks. Here, constant data lives in the feature's `constants.ts`.
- **Added shared infra.** `components/common/` and `lib/` folders didn't exist in the reference; they're part of the base layout here.
- **Feature folders** (borrowed from the `payday-developers-front` structure). Everything one feature needs — screens, sections, logic hook, types, constants — lives in one `features/<feature>/` folder, so adding or deleting a feature touches one folder instead of five.

## Feature folders

```
app/example/page.tsx              ← places the screen only
features/<feature>/
├── components/
│   └── <route-part>/             ← one folder per route under this feature (e.g. list/, detail/)
│       ├── <Name>Screen.tsx      ← calls the logic hook once + Desktop/Mobile toggle
│       ├── DesktopPage.tsx
│       ├── MobilePage.tsx
│       └── sections/
├── hooks/use<PageName>Logic.ts
├── types.ts
├── constants.ts
└── index.ts                      ← the feature's public list
```

Rules:

- **`app/**/page.tsx` only places** a feature's `<Name>Screen`. It reads route params (`await params`) and passes them down; no state, no hooks, no `"use client"`. Keeping the page a server component lets you add `generateMetadata`, data fetching, `loading.tsx` / `error.tsx` without restructuring.
- **Outside a feature, import only from `@/features/<feature>`** (its `index.ts`). Importing `@/features/<feature>/<anything>` is an ESLint error (`no-restricted-imports` in `eslint.config.mjs`).
- **Inside a feature, import its own files with relative paths** (`./`, `../`). Shared code outside the feature (`@/components/...`, `@/lib/...`, `@/hooks/...`) still uses the `@/` alias.
- **Features don't reach into each other's internals.** If two features need the same thing, export it from one feature's `index.ts`, or move it to `components/common/`, `hooks/` or `lib/`.
- A feature with only one route can skip the `<route-part>/` level (see `features/main/components/`).

## Desktop/Mobile split

Inside `features/<feature>/components/<route-part>/`:

```
├── <Name>Screen.tsx
├── DesktopPage.tsx
└── MobilePage.tsx
```

- **All state/logic lives in one hook**, `features/<feature>/hooks/use<PageName>Logic.ts`, called exactly once, in `<Name>Screen.tsx`.
- **The toggle always happens in the Screen component**, never inside a Desktop/Mobile component's own root `<div>`:

  ```tsx
  "use client"; // only if the hook uses client-only APIs (useState, useEffect, ...)

  export default function PostsListScreen() {
    const logic = usePostsListLogic();

    return (
      <div className="flex flex-1 flex-col">
        <div className="hidden md:flex md:flex-1">
          <DesktopPage {...logic} />
        </div>
        <div className="flex flex-1 md:hidden">
          <MobilePage {...logic} />
        </div>
      </div>
    );
  }
  ```

  This is CSS-only (Tailwind `hidden md:flex` / `flex md:hidden`) — no JS media-query hooks, no user-agent sniffing. Both trees mount; the `md:` breakpoint (768px) decides what's visible.

- **The shared props type is the hook's exported return-type interface** (e.g. `UsePostsListLogicResult`), imported by both `DesktopPage.tsx` and `MobilePage.tsx`. Never redefine it per file.

Worked example: `features/example/components/list/` (`PostsListScreen`, client — search state) + `features/example/components/detail/` (`PostDetailScreen`, server — the hook only looks up a post).

## Route groups: `(main)` vs `example`

- **`app/(main)/`** is a [route group](https://nextjs.org/docs/app/api-reference/file-conventions/route-groups) — it's omitted from the URL, so `app/(main)/page.tsx` serves `/`. This is where your actual application starts. Right now it's a minimal placeholder (`features/main/`); replace it with real content.
- **`app/example/`** (`/example`, `/example/[id]`) is reference code, not a real feature. It exists purely to demonstrate the feature folder + Desktop/Mobile split + section composition pattern end-to-end (`features/example/`). Once you've internalized the pattern, delete `app/example/` and `features/example/` rather than building real features inside them.

## Section-based modularization

Sections live in `features/<feature>/components/<route-part>/sections/`, one file per logical section, PascalCase, suffixed `Section`:

```
sections/
├── HeaderSection.tsx
└── ListSection.tsx
```

`DesktopPage.tsx` / `MobilePage.tsx` compose sections — they don't contain section-level markup themselves.

**Split rule:** default to a single shared section file using responsive Tailwind classes (`md:`, `lg:`) internally. Only split a section into `Desktop<Name>Section.tsx` / `Mobile<Name>Section.tsx` when the two variants have genuinely different DOM structure or composition — a different element hierarchy, different interactive components, or content reordering that can't be expressed by rearranging classes on one JSX tree. If you find yourself reaching for a JS viewport check, or the two versions' JSX no longer resemble each other line-for-line, split. Otherwise, keep one file.

Worked example (paths under `features/example/components/`):

| Section | Shared or split? | Why |
|---|---|---|
| `list/sections/HeaderSection.tsx` | Shared | Only spacing/type-scale differs by breakpoint |
| `list/sections/PostListSection.tsx` | Shared | Grid column count is the only difference (`grid-cols-1 md:grid-cols-2 lg:grid-cols-3`) |
| `detail/sections/ContentSection.tsx` | Shared | Paragraph list, same structure at all sizes |
| `detail/sections/DesktopHeaderSection.tsx` + `MobileHeaderSection.tsx` | Split | Desktop uses a text back-link + breadcrumb-style block; mobile uses a sticky icon app-bar — genuinely different element hierarchy, not just styling |

## Naming conventions

- **Components**: PascalCase files (`HeaderSection.tsx`). The component a page places is `<Name>Screen.tsx`.
- **Hooks**: camelCase, `use`-prefixed (`usePostsListLogic.ts`), matching the exported hook name.
- **Feature folders**: kebab-case (`features/example/`). Route-part folders inside `components/` mirror the route tree (`list/`, `detail/`).
- **Barrel files: only `features/<feature>/index.ts`.** No other `index.ts` — import directly from the file.
- **`@/` alias for anything outside the current feature; relative paths inside it.**
- **Split-section files are prefixed** `Desktop`/`Mobile` (not suffixed), to visually match `DesktopPage`/`MobilePage`.

## Shared infra layout

- `features/<feature>/` — one folder per feature; see Feature folders above.
- `components/common/` — shared UI pieces used by several features (`CtaButton`, `SectionHead`, `Shape`, `Collapse`, `LanguageMenu`, `LanguageToggle`), each with its own `.module.css`.
- `styles/` — shared CSS Modules (`section`, `text`, `screen`). See "스타일(CSS Modules)".
- `hooks/` — only hooks used by several features (`useCopyClipboard`, `useLocaleSwitch`, `useMobileMenu`). A page's logic hook lives in its feature.
- `lib/` — pure helper functions only, no React (`i18n`, `site`, `github`, `detectPlatform`, and `utils.ts`'s `cn()` class-name joiner).
- Domain types and constants live in the feature (`types.ts`, `constants.ts`). There are no root `types/` or `constants/` folders.

## Theming and dark mode

Dark mode is automatic via the `prefers-color-scheme: dark` media query in `app/globals.css` (no manual toggle, no `next-themes`, no `.dark` class). `:root` defines light values; a `@media (prefers-color-scheme: dark)` block overrides the same variables for dark.

**Always style with the semantic tokens** (`var(--text-primary)`, `var(--bg-page)`, `var(--border-strong)` …) in the component's `.module.css`, never raw colors, or the element won't react to theme changes. Colors that must look the same in both themes use the primitives (`--ygg-beige-50`, `--ygg-grey-900`).

## Note on page-level hooks and `"use client"`

A page-level hook only needs `"use client"` if it uses client-only APIs (`useState`, `useEffect`, browser globals). If it's pure derived-data logic (e.g. `usePostDetailLogic`, which just does an array `find`), it doesn't need the directive itself — called from a server `<Name>Screen` it simply runs on the server (as `PostDetailScreen` does); called from a `"use client"` Screen it runs in the browser. Don't add `"use client"` reflexively to every hook file.

## 이 프로젝트(git-yggdrasil-landing-fe)에서

khj-fe-template 의 규칙을 그대로 따르고, 다른 점만 적는다.

- **`app/(main)/` 은 없앴다** — 루트 레이아웃이 언어 세그먼트 `app/[lang]/layout.tsx` 로 내려갔다(위 "Route groups" 절은 템플릿 설명).
- **기능은 `features/main`("/ko" · "/en" 랜딩)과 `features/download`("/ko/download" · "/en/download" 다운로드) 둘.** 예제(`app/example`, `features/example`)는 지웠다. 주소 · 언어는 아래 "다국어(i18n)".
  - `components/HomeScreen.tsx` — 서버 페이지가 넘긴 `{ lang, dict }` 로 `useHomeLogic()` 을 한 번 부르고 Desktop/Mobile 을 CSS 로 가른다. 훅이 state · effect 를 써서 `"use client"`.
  - `components/sections/` — 섹션. 상단바만 Desktop/Mobile 로 나눴다(모바일은 서랍 메뉴로 구조가 다름).
  - `components/shared/` — 이 기능 안에서 여러 섹션이 같이 쓰는 조각(LogoMark · LogoLockup · Shape · DemoVideo). 다른 기능이 생겨 같이 쓰게 되면 `components/common/` 으로 옮긴다.
  - `hooks/` — `useHomeLogic`(페이지 로직) 과 모션 훅(`useHeroPin` · `useScrollPin` · `useMediaQuery`). 지금은 이 기능만 쓰므로 기능 안에 둔다.
  - `constants.ts` — 언어와 무관한 구조(스크린샷 · 도형 · 명령 · 메뉴 순서)와 모션 값, `i18n/{ko,en}.ts` — 화면 문구, `types.ts` — 구조 · 사전(`HomeDictionary` · `ChromeDictionary`) 타입.
- **`features/download`** — 다운로드 화면. 경로가 하나라 `<route-part>/` 단계 없이 `components/DownloadScreen.tsx` · `DesktopPage` · `MobilePage` · `sections/`(Downloads: 버전 · 제목 · 감지 칩 + 카드, FirstRun: 잉크 띠의 설치 후 실행 도움말) · `shared/`(PlatformCard · FileRow · GuideColumn · CommandChip).
  - 별도 기능으로 둔 이유: 홈과 상태(감지 · 고급 안내 펼침)도, 문구도 겹치지 않는다. 홈의 route-part 로 넣으면 `features/main` 이 두 화면의 로직을 같이 갖게 된다.
  - `hooks/useDownloadLogic.ts` — OS · Mac CPU 감지(`lib/detectPlatform.ts`)를 `useSyncExternalStore` 로 읽는다. 서버 · 첫 렌더는 "pending"(강조 없음), 브라우저에서 한 번 바뀐다. 추천 카드 · 추천 파일 · 고급 안내 펼침을 돌려준다.
  - `constants.ts` — 릴리스 주소 · 파일 이름 · 명령(언어 무관), `i18n/{ko,en}.ts` — 화면 문구 전부(`DownloadDictionary`). 릴리스 파일 이름은 버전 없는 고정 이름(`Yggdrasil-mac-arm64.dmg` …, 앱 `electron-builder.config.cjs` 의 `artifactName`)이라 `releases/latest/download/<파일>` 링크가 그대로 맞는다. `APP_VERSION` 은 화면 표시용.
  - 상단바 · 푸터는 홈 것을 쓴다: `features/main/index.ts` 가 `DesktopHeaderSection` · `MobileHeaderSection` · `FooterSection` · `MOBILE_ID_PREFIX` 를 공개한다(메뉴가 홈 섹션을 가리키므로 main 에 둠). 다른 화면에서는 `linkBase={localePath(lang)}` 로 앵커가 `/en#features` 처럼 그 언어의 홈을 가리킨다. 상단바 · 푸터 문구는 `ChromeDictionary`(홈 사전의 `chrome`)를 받는다.
- **`features/docs`** — 문서 화면("/ko/docs" · "/en/docs"). "어떻게 하나" 와 "안 될 때" 만 쓴다(무엇을 할 수 있는지는 홈 "기능 알아보기" 가 맡는다).
  - 내용은 `i18n/{ko,en}.ts` 의 데이터(섹션 → 토픽 → 블록: 문단 · 목록 · 순서 · 명령 · 단축키 표 · 알림). 문단 안 `` `코드` `` 와 `[[키]]` 만 `components/RichText.tsx` 가 `<code>` · `<kbd>` 로 그린다. 앱 화면 이름(메뉴 · 버튼)은 앱의 `src/shared/i18n/{ko,en}.ts` 와 같게 쓴다.
  - 토픽 id 는 홈 기능 줄의 "자세히 보기" 가 가리킨다(`features/main/constants.ts` `FEATURES[].docs`: drag · menu · diff · conflict · rebase). 도움 띠의 "문서 보기" 도 이 화면으로.
  - 본문은 한 벌만 그리고(앵커가 겹치지 않게) 상단바만 데스크톱 / 모바일로 가른다. 데스크톱은 목차가 왼쪽에 붙어 따라온다.
  - 경로 상수 `DOCS_PATH` 는 `features/main/constants.ts` 에 둔다(main ↔ docs 가 서로 import 하지 않도록).
- **둘 이상의 기능이 쓰는 것**: `components/common/Shape.tsx`(도형, `features/main/components/shared` 에서 옮김), `hooks/useMobileMenu.ts`(서랍 메뉴 · Esc · 스크롤 막기), `lib/detectPlatform.ts`(UA Client Hints → UA → WebGL 순으로 OS · CPU 추정). 연필 나무는 전역 클래스 `.pencil-tree`(globals.css, 홈 히어로).
- **`components/common/`** 에 더한 것: `CtaButton`(`href` 를 주면 링크, "/..." 는 `next/link`. 없으면 더미 버튼) · `SectionHead` · `Collapse`(펼침 상자) · `LanguageMenu`(상단바 언어 드롭다운) · `LanguageToggle`(모바일 서랍의 두 언어 버튼). 기능과 무관한 조각이다. 둘이 같이 쓰는 `hooks/useLocaleSwitch.ts`(다른 언어 주소 · 쿠키 기억 · #앵커 유지).
- **스타일은 CSS Modules** — 템플릿은 Tailwind 클래스를 `className` 에 직접 쓰지만, 이 프로젝트의 화면 코드(`features/**`, `components/common/` 의 랜딩 조각)는 컴포넌트 옆 `<Name>.module.css` 에 일반 CSS 로 쓴다. 아래 "스타일(CSS Modules)" 절.
- **디자인 토큰**은 Figma "Landing · Home" 기준으로 `app/globals.css` 에 더했다(색 · 글자 · z 순서 · 모션). `@theme inline` 은 Tailwind 클래스용이라 CSS 변수로 남지 않으므로, CSS Modules 가 쓰는 값은 `:root` 에 따로 둔다(`--bg-*` · `--text-*` · `--border-*` 색, `--family-*` 글꼴, `--type-*` 글자 스타일, `--motion-*`, `--header-h`, `--content-max`).
- **템플릿 UI 묶음은 지웠다** (2026-11-22): khj-fe-template 에서 따라온 `components/ui/*`(shadcn · Radix), 쓰지 않던 공용 조각 · 훅 · 패키지와 그 토큰을 정리했다. lint 예외도 없다.
- 점검 기록과 모션 값: [REVIEW-landing.md](REVIEW-landing.md).

### 스타일(CSS Modules)

```
features/main/components/sections/
├── HeroSection.tsx            ← className={styles.title} · cn(styles.row, open && styles.open)
└── HeroSection.module.css     ← 이 컴포넌트만의 CSS (클래스 이름은 빌드 때 겹치지 않게 바뀐다)
styles/
├── section.module.css         ← 섹션 틀: .section(바깥 여백) · .divided(위 3px 선, 첫 섹션 빼고 모두) · .page/.surface/.ink(바탕) · .inner(최대 1280 · 제목 간격)
├── text.module.css            ← 글자 스타일: .title(섹션 · 히어로 제목, 언어별 글꼴) · .label · .code · .bodyM/.bodyL · .headingM · .displayM 와 반응형(…Responsive)
└── screen.module.css          ← 화면 뼈대: 데스크톱/모바일 트리를 768px 에서 가르기 (HomeScreen · DownloadScreen)
app/globals.css                ← 토큰(:root) · 다크 모드 값 · 전역 규칙(html/body, .press 누름 효과, .visually-hidden, .pencil-tree)
```

- **값은 토큰으로**: 색은 `var(--text-primary)` · `var(--bg-page)` 처럼 시맨틱 변수만 쓴다(다크 모드는 globals.css 가 변수 값만 바꾼다). 두 테마에서 같아야 하는 색만 원시 값(`--ygg-beige-50` 등).
- **글자 스타일은 `text.module.css` + 컴포넌트 CSS**: 글꼴 · 크기 · 줄 간격 · 자간은 `text.*`, 색 · 굵기는 컴포넌트 CSS 에 둔다 → `className={cn(text.headingM, styles.title)}`. 두 파일이 같은 속성을 정하지 않게 해서 CSS 순서에 기대지 않는다.
- **반응형**: 모바일 값을 먼저 쓰고 `@media (min-width: 768px)`(md) · `@media (min-width: 1024px)`(lg) 에서 덮는다. 미디어 쿼리에는 변수를 못 써서 숫자로 쓴다.
- **상태는 data · aria 속성으로**: `[aria-expanded="true"]` · `[aria-current="true"]` · `[data-pinned="true"]` 처럼 이미 있는 속성을 선택자로 쓴다(상태마다 클래스를 붙이지 않는다). 고정 스크롤 규칙은 그 섹션 CSS 안에 있다(`HeroSection.module.css`).
- **자식 크기를 바꿀 때는 props 로**: 다른 컴포넌트의 CSS 를 `className` 으로 덮어쓰면 CSS 순서에 따라 결과가 바뀐다. 크기 같은 값은 props 로 넘긴다(예: `<LogoMark size={32} />`). `className` 으로는 레이아웃 속성(정렬 · 그리드 칸)만 더한다.
- **Tailwind 클래스는 쓰지 않는다.** `@import "tailwindcss"` 는 기본 CSS 초기화(preflight)용으로만 남아 있다. 전역 클래스는 globals.css 의 `.press` · `.visually-hidden` · `.pencil-tree` 셋뿐이다.

### 다국어(i18n)

Next 16 문서(`node_modules/next/dist/docs/01-app/02-guides/internationalization.md`)의 권장 방식 그대로: 하위 경로(`/ko` · `/en`) + `app/[lang]` + Proxy(예전 Middleware) 리다이렉트 + 서버에서 읽는 사전.

```
proxy.ts                         ← 언어 없는 주소("/", "/download")를 언어 주소로 307 (쿠키 → Accept-Language → ko)
app/[lang]/layout.tsx            ← 루트 레이아웃: <html lang={lang}>, generateStaticParams(ko · en), dynamicParams = false
app/[lang]/page.tsx              ← "/ko" · "/en": 사전을 읽어 HomeScreen 에 { lang, dict }
app/[lang]/download/page.tsx     ← "/ko/download" · "/en/download"
lib/i18n.ts                      ← LOCALES · DEFAULT_LOCALE("ko") · 쿠키 이름 · 언어 이름 · localePath · switchLocalePath · negotiateLocale · formatMessage
lib/site.ts                      ← SITE_URL(NEXT_PUBLIC_SITE_URL) · hreflang alternates
features/<기능>/
├── i18n/ko.ts · en.ts           ← 그 기능의 문구. 둘 다 `<기능>Dictionary` 타입이라 영어 문구가 하나라도 빠지면 타입 오류
├── i18n/get<Name>Dictionary.ts  ← import "server-only" + 언어별 동적 import (한 언어만 읽는다)
└── server.ts                    ← 서버 전용 공개 목록 (사전 읽기). index.ts 와 나눈 이유는 아래
```

- **문구는 기능마다 따로** 둔다(`features/main/i18n`, `features/download/i18n`). 공용 사전 파일은 없다. 상단바 · 서랍 · 푸터 문구는 홈 사전의 `chrome` 이고, 다운로드 페이지는 `getChromeDictionary(lang)` 로 그 부분만 받는다.
- **구조와 문구를 나눈다.** 스크린샷 경로 · 도형 · git 명령 · 파일 이름처럼 언어와 무관한 것은 `constants.ts` 에 id 와 함께 두고, 문구는 사전에 같은 id 를 키로 둔다(`features: Record<FeatureId, FeatureCopy>`). 키가 빠지면 타입 오류. 릴리스 노트 · 체크리스트 · 처음 열기 단계처럼 통째로 글인 목록은 사전에 배열로 둔다.
- **사전은 서버에서만 읽는다.** `app/[lang]/**/page.tsx`(서버 컴포넌트)가 `@/features/<기능>/server` 로 그 언어의 사전 하나를 읽어 Screen 에 props 로 넘긴다. 클라이언트로는 그 언어 문구만 RSC 데이터로 간다(빌드 결과 JS 청크에 사전 문구 없음). 로직 훅이 `{ lang, t }` 를 돌려주므로 Desktop/Mobile 은 여전히 공통 props 타입 하나만 받는다.
- **`server.ts` 를 index.ts 와 나눈 이유**: `index.ts` 는 클라이언트 컴포넌트(다운로드 화면의 상단바 import 등)도 가져가는데, 거기서 `server-only` 사전 로더를 다시 내보내면 클라이언트 묶음에 서버 전용 모듈이 섞인다. 그래서 ESLint `no-restricted-imports` 예외는 `@/features/*/server` 하나뿐이다.
- 화면 낭독 이름(aria) · 날짜 표기("11.12" / "Nov 12")도 사전에 있다. 사전은 서버→클라이언트로 직렬화되므로 함수 대신 `{label}` 틀 + `formatMessage()` 를 쓴다.
- **글꼴**: 한글 히어로 제목은 Noto Serif KR, 영문 히어로 제목은 Playfair(`hero.titleFont`). 제목 · 숫자는 모두 정자체이고, 이탤릭은 로고의 "Yggdrasil" 에만 쓴다.
- **언어 바꾸기**: `LanguageMenu`(데스크톱) · `LanguageToggle`(모바일 서랍)는 같은 화면의 다른 언어 주소로 가는 보통 링크다(JS 없이도 이동). 누르면 `NEXT_LOCALE` 쿠키(1년)를 남겨 다음에 "/" 로 들어와도 그 언어로 가고, 보던 `#앵커` 를 붙인다. 언어가 바뀌면 `<html lang>` 이 바뀌므로 전체 페이지를 새로 불러온다.
- **정적 생성 유지**: 페이지는 빌드 때 ko · en 둘 다 미리 만든다(●SSG). Proxy 는 요청마다 리다이렉트만 하므로 `output: "export"`(정적 내보내기)에서는 쓸 수 없다 — 그때는 "/" 리다이렉트를 호스팅 쪽 규칙이나 클라이언트 리다이렉트로 바꿔야 한다.
- **언어 추가**: `lib/i18n.ts` 의 `LOCALES` · `LOCALE_NAMES` 에 더하고, 각 기능의 `i18n/<언어>.ts` 를 만들어 로더에 등록한다(빠진 문구는 타입 오류로 드러난다).
