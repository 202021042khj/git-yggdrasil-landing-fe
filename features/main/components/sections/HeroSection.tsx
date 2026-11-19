import CtaButton from "@/components/common/CtaButton";
import DemoVideo from "../shared/DemoVideo";
import Shape from "../shared/Shape";
import { HERO } from "../../constants";
import { useHeroPin } from "../../hooks/useHeroPin";

interface HeroSectionProps {
  idPrefix?: string;
  /** 데스크톱 트리만: 고정 스크롤(글 사라짐 → 영상 창 열림)을 쓴다. 움직임 줄이기면 고정하지 않는다 */
  pinnable?: boolean;
}

/**
 * 히어로(참조 HomeHeroSection): 왼쪽 제목 · 버튼, 오른쪽 연필 나무. 고정이면 무대가 상단바 아래 붙은 채 800px 동안 글이 사라지고
 * 영상 창이 가운데부터 넓어진다. 고정이 아니면(모바일 · 움직임 줄이기) 글 아래 영상을 바로 놓는다.
 */
const HeroSection = ({ idPrefix = "", pinnable = false }: HeroSectionProps) => {
  const { wrapperRef, pinned } = useHeroPin(pinnable);

  return (
    <section
      ref={wrapperRef}
      id={`${idPrefix}top`}
      aria-labelledby={`${idPrefix}hero-title`}
      data-pinned={pinned}
      className="hero w-full bg-page"
    >
      <div className="hero-stage relative">
        <div className="relative mx-auto flex max-w-[1280px] flex-col items-start gap-8 px-5 pt-12 pb-16 md:gap-12 md:px-10 md:pt-24 md:pb-32 lg:px-20 [[data-pinned=true]_&]:static [[data-pinned=true]_&]:p-0">
          <div className="hero-text flex w-full flex-col items-start gap-10 md:flex-row md:items-center md:justify-between md:gap-12">
            <div className="flex w-full flex-col items-start gap-8 md:max-w-[560px] md:gap-10">
              <h1
                id={`${idPrefix}hero-title`}
                // 한글 제목: Playfair 에는 한글이 없어 이탤릭을 흉내 내면 기울어진 글자가 되므로 세리프 정자체로
                className="font-serif text-hero-sm font-semibold break-keep text-fg md:text-hero"
              >
                {HERO.title}
              </h1>
              <div className="flex flex-wrap gap-4">
                {/* TODO: 다운로드 · GitHub 주소 없음 — 더미 버튼 */}
                <CtaButton>{HERO.primaryCta}</CtaButton>
                <CtaButton variant="secondary">{HERO.secondaryCta}</CtaButton>
              </div>
            </div>
            {/* 장식 그림: 화면 낭독에서 숨긴다 */}
            <div aria-hidden="true" className="hero-tree w-full md:max-w-[680px] md:flex-1" />
          </div>
          <div className="hero-rise w-full">
            <figure className="hero-window flex w-full flex-col gap-3">
              <DemoVideo />
              <figcaption className="flex items-center gap-2 font-code text-code-m text-fg-muted">
                <Shape kind="triangle" size={10} />
                {HERO.videoCaption}
              </figcaption>
            </figure>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
