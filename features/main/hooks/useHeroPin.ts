"use client";

import { HERO_PIN, REDUCED_MOTION_QUERY } from "../constants";
import { useMediaQuery } from "./useMediaQuery";
import { useScrollPin } from "./useScrollPin";

const clamp01 = (value: number) => Math.min(1, Math.max(0, value));

/** 스크롤 거리 → CSS 변수. --hero-text linear, --hero-reveal smoothstep (참조 applyHeroProgress) */
const applyHeroProgress = (wrapper: HTMLElement, scrolled: number) => {
  const { textEnd, revealStart, revealEnd } = HERO_PIN;
  const text = clamp01(scrolled / textEnd);
  const reveal = clamp01((scrolled - revealStart) / (revealEnd - revealStart));
  wrapper.style.setProperty("--hero-text", String(text));
  wrapper.style.setProperty("--hero-reveal", String(reveal * reveal * (3 - 2 * reveal)));
  wrapper.toggleAttribute("data-text-gone", text >= 1);
  wrapper.toggleAttribute("data-rise-hidden", scrolled <= revealStart);
};

const clearHeroProgress = (wrapper: HTMLElement) => {
  wrapper.style.removeProperty("--hero-text");
  wrapper.style.removeProperty("--hero-reveal");
  wrapper.removeAttribute("data-text-gone");
  wrapper.removeAttribute("data-rise-hidden");
};

/** 히어로 고정. pinnable(데스크톱 트리)이고 움직임 줄이기가 아니면 무대가 붙은 채 글이 사라지고 영상 창이 열린다 */
export const useHeroPin = (pinnable: boolean) => {
  const reduceMotion = useMediaQuery(REDUCED_MOTION_QUERY);
  const pinned = pinnable && !reduceMotion;
  const wrapperRef = useScrollPin<HTMLElement>(pinned, applyHeroProgress, clearHeroProgress);
  return { wrapperRef, pinned };
};
