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
- `components/common/` — shared UI primitives (e.g. `Badge.tsx`, `AsyncBoundary`, `DeferredComponent`), domain-agnostic and reusable across features.
- `components/ui/` — the design-system primitives (Button, Dialog, AlertDialog, Popover, Tooltip, Command palette, Combobox, Modal/ConfirmModal, Notify/toast, Table/SortableTable, icons, etc.), also domain-agnostic. See "Design system" below.
- `hooks/` — only hooks used by several features (`useCallbackRef`, `useCopyClipboard`). A page's logic hook lives in its feature.
- `lib/` — pure helper functions only, no React (`lib/formatDate.ts`, `lib/utils.ts`'s `cn()` classname merger).
- Domain types and constants live in the feature (`types.ts`, `constants.ts`). There are no root `types/` or `constants/` folders.

## Design system (`components/ui/`)

`components/ui/` was ported wholesale from an internal Vite/React admin template (shadcn "new-york" style, Radix UI primitives). It brought its own dependencies (`@radix-ui/*`, `cmdk`, `@dnd-kit/*`, `react-toastify`, `react-focus-lock`, `overlay-kit`, `react-error-boundary`, `tw-animate-css`) and its own design tokens, all defined in `app/globals.css` under `@theme`/`:root`:

- A custom color palette (`primary-main-blue`, `gray-100`–`800`, etc.) and a compound font-size scale (`text-font-16-500`, meaning 16px/weight 500 in one utility class) — both ported as-is from the source admin template.
- A custom `z-*` scale (`z-modal`, `z-dialog`, `z-popover`, ...) and a few named box-shadows (`shadow-pop-over`, `shadow-notify-success`, ...).
- shadcn-standard neutral tokens (`background`, `foreground`, `popover`, `border`, `muted`, `accent`, `primary`, `ring`, each with a `-foreground` pair) that the Radix-based components (`dialog.tsx`, `popover.tsx`, `command.tsx`, `table.tsx`, ...) are built on.

`components.json` is present so the shadcn CLI can add more primitives later (`npx shadcn add <name>` — set `aliases.ui` to `@/components/ui`).

**Known gap:** `components/ui/*`'s own custom palette (`primary-main-blue`, `gray-*`, etc.) is static and does not react to dark mode — it wasn't designed with theming in mind in the source template. Only the shadcn neutral tokens (`background`/`foreground`/`popover`/`border`/`muted`/`accent`) are dark-mode aware. Keep this in mind if you restyle these components.

## Theming and dark mode

Dark mode is automatic via the `prefers-color-scheme: dark` media query in `app/globals.css` (no manual toggle, no `next-themes`, no `.dark` class). `:root` defines light values; a `@media (prefers-color-scheme: dark)` block overrides the same variables for dark.

**Always style with the semantic tokens, never hardcoded Tailwind grays**, or the element won't react to theme changes:

| Use | Not |
|---|---|
| `bg-background` | `bg-white` |
| `text-foreground` | `text-black`, `text-zinc-900` |
| `text-muted-foreground` | `text-zinc-500`, `text-gray-400` |
| `border-border` | `border-zinc-200` |
| `bg-popover` / `text-popover-foreground` | `bg-white` / `text-black` |

This bit us once already: `features/example/**` (then `components/pages/example/**`) was originally written with hardcoded `text-zinc-*`/`border-zinc-*` classes, so its background/borders followed dark mode (they used tokens) but its text didn't (it didn't) — now fixed to use the tokens above. Brand/accent colors that are meant to look the same in both themes (e.g. `indigo-600` link color, `Badge`'s `indigo-50`/`indigo-700`) are a deliberate exception — leave those as static Tailwind colors.

## Note on page-level hooks and `"use client"`

A page-level hook only needs `"use client"` if it uses client-only APIs (`useState`, `useEffect`, browser globals). If it's pure derived-data logic (e.g. `usePostDetailLogic`, which just does an array `find`), it doesn't need the directive itself — called from a server `<Name>Screen` it simply runs on the server (as `PostDetailScreen` does); called from a `"use client"` Screen it runs in the browser. Don't add `"use client"` reflexively to every hook file.

## 이 프로젝트(git-yggdrasil-landing-fe)에서

khj-fe-template 의 규칙을 그대로 따르고, 다른 점만 적는다.

- **기능은 `features/main` 하나.** "/" 의 랜딩 페이지다. 예제(`app/example`, `features/example`)는 지웠다.
  - `components/HomeScreen.tsx` — `useHomeLogic()` 을 한 번 부르고 Desktop/Mobile 을 CSS 로 가른다. 훅이 state · effect 를 써서 `"use client"`.
  - `components/sections/` — 섹션. 상단바만 Desktop/Mobile 로 나눴다(모바일은 서랍 메뉴로 구조가 다름).
  - `components/shared/` — 이 기능 안에서 여러 섹션이 같이 쓰는 조각(LogoMark · LogoLockup · Shape · DemoVideo). 다른 기능이 생겨 같이 쓰게 되면 `components/common/` 으로 옮긴다.
  - `hooks/` — `useHomeLogic`(페이지 로직) 과 모션 훅(`useHeroPin` · `useStartGuidePin` · `useScrollPin` · `useMediaQuery`). 지금은 이 기능만 쓰므로 기능 안에 둔다.
  - `constants.ts` — 화면 문구와 모션 값, `types.ts` — 문구 · 모션 타입.
- **`components/common/`** 에 더한 것: `CtaButton`(더미 버튼, TODO) · `SectionHead` · `Collapse`(펼침 상자). 기능과 무관한 조각이다.
- **디자인 토큰**은 Figma "Landing · Home" 기준으로 `app/globals.css` 에 더했다(색 · 글자 · z 순서 · 모션). Tailwind v4 에는 z 토큰 유틸이 없어 `@utility z-*` 로 연결한다.
- **lint 예외**: 템플릿에서 그대로 가져온 6개 파일은 템플릿 원본에서도 같은 오류가 나서 규칙 3개를 끈다(`eslint.config.mjs`). 새 코드에는 모든 규칙을 적용한다.
- 점검 기록과 모션 값: [REVIEW-landing.md](REVIEW-landing.md).
