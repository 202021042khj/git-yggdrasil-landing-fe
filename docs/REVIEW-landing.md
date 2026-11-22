# 랜딩 아키텍처 리뷰

기준: `CLAUDE.md` / `AGENTS.md` / `README.md` / `docs/ARCHITECTURE.md`, Next 16 문서(`node_modules/next/dist/docs/01-app/03-api-reference/01-directives/use-client.md`).
대상: `app/`, `features/main/**`, `components/common/*`(랜딩에서 더한 것), `app/globals.css`, `eslint.config.mjs`. (2026-11-19 템플릿의 기능 폴더 구조로 옮김: `components/pages/main` · `hooks/*` · `constants/*` · `types/*` → `features/main/`)

| 규칙 | 결과 | 비고 / 변경 |
|---|---|---|
| 폴더 배치 (features/main, common, lib) | Pass | 랜딩 전용은 `features/main`(components · hooks · constants.ts · types.ts · index.ts), 기능과 무관한 조각은 `components/common` |
| Desktop/Mobile 분리는 page 수준 CSS 토글 | Pass | `app/(main)/page.tsx` 에서 `hidden md:flex` / `flex md:hidden` |
| 페이지 로직 훅은 Screen 에서 한 번만 | Pass | `HomeScreen` 이 `useHomeLogic()` 1회, Desktop/Mobile 둘 다 `UseHomeLogicResult` 공유. `app/(main)/page.tsx` 는 `HomeScreen` 만 놓는 서버 컴포넌트 |
| 섹션 이름 `*Section`, 분리 시 `Desktop`/`Mobile` 접두사 | Pass | 헤더만 구조가 달라 `DesktopHeaderSection` / `MobileHeaderSection` 으로 분리 |
| 파일 이름 (PascalCase 컴포넌트, camelCase 훅) | Pass | |
| import 순서 (외부 → `@/components` → `@/constants` → `@/hooks` → `@/lib` → `@/types`) | **Fail → 고침** | `Shape.tsx` 에서 `@/types` 가 `@/lib` 보다 앞에 있었음 |
| `@/` 별칭만 사용, 상대 경로 X | Pass | |
| 배럴 `index.ts` X | Pass | |
| 화살표 컴포넌트 + default export | **Fail → 고침** | `app/(main)/page.tsx` 가 `function` 선언이었음 → 화살표 + `export default Home`. `Shape` 는 블록 본문 → 식 본문. (`layout.tsx` 와 템플릿 원본 파일은 그대로 둠) |
| props 이름 (`<Name>Props`), 안 쓰는 props | **Fail → 고침** | `DesktopPage` 가 `_props` + `eslint-disable` 로 안 쓰는 인자를 받았음 → `const DesktopPage: FC<UseLandingLogicResult> = () => …` |
| 상수는 `constants/`, 타입은 `types/` | **Fail → 고침** | 히어로 문구가 `HeroSection` 안에 하드코딩 → `HERO` (`constants/landing.ts`) + `HeroCopy` (`types/landing.ts`). 모바일 id 접두사 `"m-"` 가 `MobilePage` 와 `MobileHeaderSection` 에 따로 박혀 있었음 → `MOBILE_ID_PREFIX` 상수 하나로 (지금은 `features/main/constants.ts`) |
| 스타일: 시맨틱 토큰만, 원시 색 X | **Fail → 고침** | `bg-[var(--ygg-beige-50)]`, `border-[var(--ygg-grey-900)]` 등 원시 변수 직접 사용 → 두 테마 공통 색 토큰 `paper` · `charcoal` 추가 (`bg-paper`, `border-charcoal`, `text-paper`) |
| 스타일: z-index 토큰 | **Fail → 고침 (버그 A 원인)** | 아래 참고 |
| 인라인 style 제한 | **Fail → 고침** | `Shape` 사각형이 `style={{ width, height }}` → 다른 도형처럼 SVG `width`/`height` 속성 + `<rect>` |
| 임의 값 (`text-[20px]` 등) | Pass (예외) | 로고 락업 · 푸터 워드마크 글자 크기는 로고 고유 치수라 토큰이 없음. 그대로 둠 |
| `"use client"` | Pass | `HomeScreen` (훅 사용 → 경계), `useHomeLogic`(state/effect, ARCHITECTURE 허용), `Reveal`·`DemoVideo`(훅 사용, 서버 컴포넌트에서도 바로 쓸 수 있는 공용 조각이라 유지). 나머지 섹션은 지시어 없음 — 문서대로 경계 파일에만 |
| 이미지 · 영상 | Pass | 스크린샷은 `next/image` + `width`/`height`/`sizes`. 영상은 `poster`, `preload="metadata"`, `muted playsInline`, 보이는 쪽만 재생, reduced-motion 이면 자동재생 X |
| 플랫폼 문구 (Electron 앱) | **Fail → 고침** | `macOS 앱/다운로드`, `macOS 13`, `Apple Silicon`, `Finder`, `키체인`, `.dmg` → 플랫폼 중립. ⌘ 단축키는 `⌘Z (Ctrl+Z)` 처럼 함께 표기 |

## z-index (버그 A)

`globals.css` 의 `@theme` 에 `--z-header` 등 토큰이 있었지만 Tailwind v4 에는 z-index 테마 네임스페이스가 없어서
`z-header` · `z-modal` 같은 클래스가 **CSS 를 전혀 만들지 않았다** (빌드 CSS 에 `.z-header` 없음).
그래서 sticky 헤더는 `z-index: auto` 였고, DOM 상 뒤에 오는 `position: relative` 영상 래퍼가 헤더 위에 그려졌다.
`@utility z-* { z-index: --value(--z-*); }` 를 추가해 토큰을 유틸로 연결했다 → `.z-header{z-index:20}`.
같은 이유로 꺼져 있던 `components/ui` 의 `z-modal` · `z-dialog` · `z-popover` 등도 함께 살아난다.
(템플릿 원본에도 같은 문제가 있다 — 템플릿은 건드리지 않음.)

## eslint.config.mjs 예외

예외를 지우고 돌려 보면 20개 오류가 전부 템플릿에서 그대로 가져온 파일에서만 나고, `khj-fe-template` 원본에서도 똑같이 20개가 난다.
랜딩 코드에서는 하나도 나지 않는다. 그래서 **유지**하되 `components/ui/**` 폴더 전체 대신 오류가 나는 6개 파일만 정확히 지정하도록 좁혔다
(`components/ui/{button,slot,sortable-table,notify/notify}.tsx`, `components/common/deferred-component.tsx`, `hooks/useCallbackRef.ts`).

## 모션

참조 홈(`payday-developers-fe` `components/customer/pages/home/**`, `hooks/customer/home/*`, `lib/customer/homeDots.ts`, `constants/customer/customerHome.ts`)에서 옮겼다. 참조는 motion/GSAP을 쓰지 않는다. rAF로 줄인 scroll 리스너와 CSS 변수, sticky, CSS transition으로 만든다. 여기서도 같은 방식이다(`motion` 패키지는 쓰지 않음).
값은 `features/main/constants.ts` 모션 부분(JS)와 `app/globals.css` "모션" 블록(CSS)에 있다. 곡선 `--motion-ease-out: cubic-bezier(0.23, 1, 0.32, 1)`.

| 모션 | 참조 | 파라미터 | 움직임 줄이기 |
|---|---|---|---|
| 히어로 고정 | `useHomeHeroPin` · `useScrollPin` → `features/main/hooks/useHeroPin.ts` · `useScrollPin.ts` | 데스크톱 트리만. 무대가 상단바(95px) 아래 sticky, 거리 800px. 0→240 글 투명도 1→0, 위로 32px(linear). 120→760 영상 창 `clip-path` 가운데 한 점(50%)에서 열림(smoothstep). 다 열리면 80px 더 열림. 창은 top 56, 폭 min(1200, 100%−80), 아래 150px는 바탕으로 페이드 | 고정 없음, 글 아래 영상 |
| 변경 기록 펼침 | `ChangeEntry` · `Collapse` → `components/common/Collapse.tsx` | 한 번에 하나만. `grid-template-rows 0fr→1fr` + 투명도, 펼침 200ms · 접힘 150ms ease-out. 화살표는 돌지 않고 모양만 바뀜(→ / ↓). `inert`, `aria-expanded` | 투명도만 150ms |
| 누름 | `pressedStyle` · `pressTransition` → `.press` | `:active` scale 0.97, transform · 색 120ms ease-out. CTA 버튼 · 상단 메뉴 | scale 없음 |
| 영상 자동재생 | `useHomeHeroVideo` | (기존 DemoVideo 그대로) | 자동재생 안 함 |

참조에 없어서 옮기지 않은 것: 섹션 진입 페이드업이 없어서 `Reveal`을 지웠다. 상단바의 스크롤 반응(그림자 · 숨김)도 없다. 흐름 · 체크리스트 · 도움 띠 · 푸터에는 hover 색 말고 모션이 없다.
참조와 다른 점: 비로그인 참조 영상은 올라오지 않고 제자리에서 창만 넓어진다. 이 동작을 그대로 따랐다(올라오는 rise 360px는 로그인 판 전용이라 넣지 않음). 참조의 "왜" 줄과 시작 칸은 스크린샷이지만 여기 시작 칸은 글 카드다. 그래서 흐려지는 대상이 사진이 아니라 설명이다. 영상 멈춤 버튼은 참조처럼 구석에 있지 않고, 기존 가운데 재생 버튼을 그대로 썼다.

## 다운로드 화면 (/download, 2026-11-20)

Figma "Landing · Download"(데스크톱 `40:18` · 모바일 `41:137`, 컴포넌트 `Download/FileRow` `41:368` · `Download/Step` `39:24`) 를 `features/download` 로 옮겼다.

| 항목 | 결과 | 비고 |
|---|---|---|
| 기능 폴더 · Screen 한 번 훅 · CSS 토글 | Pass | `app/download/page.tsx` 는 `metadata` + `DownloadScreen` 만. 상단바 · 푸터는 `@/features/main` 공개 목록으로만 가져온다 |
| 문구 위치 | Pass | 화면 낭독 이름 · 복사 버튼까지 `features/download/constants.ts` 에 (번역 준비) |
| 자동 감지 | Pass | Electron(오프스크린) 에서 UA · Client Hints 를 바꿔 확인: Mac arm → Apple Silicon 추천, Mac x86 → Intel 추천, Client Hints 없는 Safari → WebGL 로 판별(모르면 두 파일 모두 추천 + 확인 방법), Windows → Windows 카드, Linux → Linux 카드(데스크톱은 두 칸 너비로 맨 위), iPhone → 강조 없음 + "컴퓨터에서 여세요" |
| 배치 | Pass | 데스크톱 macOS \| Windows 나란히(순서 고정, 감지된 쪽 sage 윗줄 + "추천" 표 + Primary 버튼), 모바일은 쌓고 추천 카드가 먼저. 처음 열기 단계도 Windows 감지면 Windows 가 먼저 |
| 가로 넘침 | Pass | 1440 · 375 모두 `scrollWidth == clientWidth` |
| 라이트 · 다크 | Pass | 토큰만 사용. sage 윗줄 위 글자 · 도형은 `on-color`(두 테마 잉크) |
| **버그 (기존)** | **Fail → 고침** | `cn()` 이 `text-label-m` 등을 색 클래스로 보고 지움 → CtaButton 글자가 16px, SectionHead 눈썹 글이 기본 크기였다. `lib/utils.ts` 에 크기 토큰 등록 |
| 다운로드 버튼 연결 | Pass | 홈 상단바(데스크톱 · 모바일 서랍) · 히어로의 "다운로드" → `/download` (`DOWNLOAD_PATH`) |

남은 것: 아직 GitHub 에 릴리스가 없어 `releases/latest/download/...` 링크는 지금 404. 앱 파일 이름에 버전이 들어가 릴리스마다 `APP_VERSION` 을 올려야 한다(앱 쪽 `artifactName` 을 버전 없이 바꾸면 해결).

## 다국어 · 언어 선택 (ko / en, 2026-11-20)

Figma: "Landing · Home" 상단바 `25:31` · "Landing · Download" 상단바 `40:19` 의 로그인 버튼 → `Language dropdown` 인스턴스(`44:139` · `44:356`). 컴포넌트 세트 `Language dropdown` `44:138`(State=Closed `44:116` · Open `44:121` · Segmented (mobile) `44:133`), 영어 참고 프레임 `44:361`. 모바일 상단바(`26:131` · `41:138`)에는 로그인 버튼이 없어 그대로 두었다(서랍은 Figma 에 그려져 있지 않음 → Segmented 변형으로 대신).

| 항목 | 결과 | 비고 |
|---|---|---|
| 라우팅 | Pass | Next 16 문서(i18n 가이드 · proxy): `app/[lang]` + `generateStaticParams`(ko · en) + `dynamicParams=false`, `proxy.ts`(Middleware 의 새 이름)로 언어 없는 주소를 307. 빌드 결과 `/ko` `/en` `/ko/download` `/en/download` 모두 ●SSG, `ƒ Proxy` |
| "/" 언어 고르기 | Pass | 쿠키 `NEXT_LOCALE` → `Accept-Language`(q 순, `en-US` → en) → ko. curl · Electron 으로 en / ko / fr(→ko) / `fr,en;q=0.5`(→en) / 쿠키가 Accept-Language 보다 우선 확인. 응답에 `Vary: Accept-Language, Cookie` |
| `<html lang>` · 메타 | Pass | 언어별 title · description, `alternates` canonical + hreflang ko · en · x-default(ko) |
| 사전 | Pass | 기능별 `i18n/{ko,en}.ts`, 타입(`HomeDictionary` · `DownloadDictionary`)이 같아 빠지면 타입 오류. 서버에서 한 언어만 읽어 props 로 넘김 — 빌드된 JS 청크에 두 언어 문구 모두 없음 |
| /en 에 한글 | Pass | 1440 · 375 의 `/en` · `/en/download` 보이는 글(innerText)에 한글 0 (언어 목록의 "한국어" 만) |
| 로그인 버튼 제거 | Pass | 데스크톱 상단바 → `LanguageMenu`, 모바일 서랍 → `LanguageToggle` |
| 드롭다운 키보드 | Pass | ↓ 열고 지금 언어로 · ↓↓ 돌아감 · End · Esc 닫고 버튼으로 · 버튼에서 ↑ 마지막 항목 · Tab 으로 나가면 닫힘 · 바깥 누르면 닫힘 |
| 언어 바꾸기 왕복 | Pass | `/ko/download#first-run` 에서 English → `/en/download#first-run`(앵커 유지), 쿠키 en → "/" 가 `/en`. 다시 한국어 → `/ko`, "/download" 가 `/ko/download` |
| 가로 넘침 | Pass | 네 화면 1440 · 375 모두 `scrollWidth == clientWidth` |
| 라이트 · 다크 | Pass | 토큰만 사용. 열린 목록은 `bg-surface`, 고른 항목 `bg-brand` + 체크, 모바일 고른 쪽 `bg-btn-ink` |

남은 것: 배포 도메인이 없어 hreflang 이 `http://localhost:3000` 기준(`NEXT_PUBLIC_SITE_URL` 로 바꾼다). 언어를 바꾸면 루트 레이아웃(`<html lang>`)이 바뀌어 전체 페이지를 다시 불러온다(의도). 정적 내보내기(`output: "export"`)로 바꾸면 proxy 를 쓸 수 없다.
