# khj-fe-template

Personal Next.js App Router starter template — a scaffold to clone for new frontend projects, with an opinionated architecture convention and a ported design system already wired up.

## Tech stack

- [Next.js 16](https://nextjs.org) (App Router, Turbopack)
- [React 19](https://react.dev)
- [TypeScript](https://www.typescriptlang.org)
- CSS Modules for the landing screens (`<Name>.module.css` next to each component, shared `styles/*.module.css`; see "스타일(CSS Modules)" in `docs/ARCHITECTURE.md`)
- Design tokens as CSS variables in `app/globals.css` (light / dark); Tailwind CSS v4 is imported only for its CSS reset (preflight)

> This is a recent/unusual Next.js version. Before writing Next.js-specific code (routing, config, etc.), check `node_modules/next/dist/docs/` — see `AGENTS.md`.

## Getting started

```bash
npm run dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

- `npm run build` — production build
- `npm run start` — run the production build
- `npm run lint` — ESLint

## Project structure

```
app/
├── globals.css        # design tokens (:root, dark mode) + Tailwind v4 theme for the template ui kit
└── [lang]/            # 이 프로젝트: 언어 세그먼트 (ko · en)
    ├── layout.tsx     # root layout (<html lang>, fonts, generateStaticParams)
    ├── page.tsx       # "/ko" · "/en" 홈
    └── download/      # "/ko/download" · "/en/download"
proxy.ts               # "/" 등 언어 없는 주소 → 언어 주소 (Next 16 Proxy = 예전 Middleware)

features/<feature>/    # one folder per feature: components/, hooks/, types.ts, constants.ts, index.ts
├── main/              # 홈 랜딩 (Yggdrasil) — i18n/{ko,en}.ts 문구
└── download/          # 다운로드 화면 — i18n/{ko,en}.ts 문구

components/
├── ui/                # ported design system (Button, Dialog, Modal, Notify, Table, ...)
└── common/            # shared, domain-agnostic primitives (Badge, AsyncBoundary, ...)

hooks/                 # hooks shared by several features only
lib/                   # pure helpers, no React (i18n, site, github, detectPlatform, cn())
```

`app/**/page.tsx` only places a feature's screen component. Outside a feature, import it only through `@/features/<feature>` (its `index.ts`) — ESLint blocks deep imports.

Full conventions (naming, Desktop/Mobile split, section modularization, theming rules) are documented in **[docs/ARCHITECTURE.md](docs/ARCHITECTURE.md)** — read it before adding a new page or component.

이 프로젝트는 khj-fe-template 를 복제해 시작했고, 예제(`app/example/`, `features/example/`)는 지웠다. 랜딩 전용 메모는 [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) 의 "이 프로젝트에서" 를 본다.

### 주소 (이 프로젝트)

| 주소 | 화면 |
|---|---|
| `/` | `proxy.ts` 가 언어 주소로 보낸다: `NEXT_LOCALE` 쿠키 → `Accept-Language` → 기본 `ko` |
| `/ko` · `/en` | 홈 (`features/main`) |
| `/ko/download` · `/en/download` | 다운로드 (`features/download`) |
| `/download` 등 언어 없는 주소 | 같은 규칙으로 `/<언어>/download` 로 |

모든 페이지는 빌드 때 두 언어 모두 정적으로 만든다. 문구는 각 기능의 `i18n/{ko,en}.ts` (구조는 ARCHITECTURE.md "다국어(i18n)"). 배포 주소는 `NEXT_PUBLIC_SITE_URL` 로 넘긴다(hreflang · canonical).

## Styling

Every component styles itself with a `<Name>.module.css` next to it, using the CSS variables in `app/globals.css` (they switch automatically with `prefers-color-scheme`). Shared frames and text styles live in `styles/*.module.css`. See "스타일(CSS Modules)" in `docs/ARCHITECTURE.md`.

## Learn more

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS v4 Documentation](https://tailwindcss.com/docs)
