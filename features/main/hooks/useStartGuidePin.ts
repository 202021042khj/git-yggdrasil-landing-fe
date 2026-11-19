"use client";

import { useCallback, useLayoutEffect, useRef, useState } from "react";
import { REDUCED_MOTION_QUERY, START_PIN } from "../constants";
import { useMediaQuery } from "./useMediaQuery";
import { useScrollPin } from "./useScrollPin";

const FITS_QUERY = `(min-width: ${START_PIN.minWidth}px) and (min-height: ${START_PIN.minHeight}px)`;

/**
 * 시작 가이드 고정(참조 useHomeStartPin). 붙은 뒤 440px 마다 펼친 칸이 01 → 04 로 바뀐다(스크롤에 1:1 이 아니라 경계에서 한 번, 520ms 는 CSS).
 * 폭 1024 · 높이 720 미만 · 움직임 줄이기 · 모바일 트리면 같은 폭 칸.
 * 펼친 칸이 바뀌면 칸 폭이 달라져 글 줄 수가 바뀌므로, 네 경우의 높이를 미리 재서 가장 큰 값을 줄 높이로 둔다(높이가 출렁이지 않게).
 */
export const useStartGuidePin = (pinnable: boolean, count: number) => {
  const reduceMotion = useMediaQuery(REDUCED_MOTION_QUERY);
  const fits = useMediaQuery(FITS_QUERY);
  const [active, setActive] = useState(0);
  const pinned = pinnable && fits && !reduceMotion;
  const readActive = useCallback(
    (_wrapper: HTMLDivElement, scrolled: number) =>
      setActive(
        Math.min(
          count - 1,
          Math.max(0, Math.floor(scrolled / START_PIN.stepPx)),
        ),
      ),
    [count],
  );
  const wrapperRef = useScrollPin<HTMLDivElement>(pinned, readActive);
  const stepsRef = useRef<HTMLOListElement>(null);

  useLayoutEffect(() => {
    const list = stepsRef.current;
    if (!list) return;
    if (!pinned) {
      list.style.minHeight = "";
      return;
    }

    const measure = () => {
      const items = [...list.children] as HTMLElement[];
      if (items.length === 0) return; // 자식이 없으면 중단

      const was = items.map((el) => el.hasAttribute("data-active"));
      list.dataset.measuring = "";
      list.style.minHeight = "";
      let max = 0;

      items.forEach((_, i) => {
        items.forEach((el, k) => el.toggleAttribute("data-active", k === i));
        max = Math.max(max, list.offsetHeight);
      });

      items.forEach((el, k) => el.toggleAttribute("data-active", was[k]));
      delete list.dataset.measuring;
      // React 상태로 두면 같은 값일 때 다시 그리지 않아 지운 높이가 돌아오지 않으므로 요소에 바로 쓴다
      list.style.minHeight = `${max}px`;
    };

    // 최초 마운트 시 정확한 렌더링 직후 측정하도록 raf 사용
    const rafId = requestAnimationFrame(measure);
    // 글꼴이 늦게 들어오면 글 높이가 바뀌므로 다 들어온 뒤 한 번 더
    let alive = true;
    void document.fonts?.ready.then(() => { if (alive) measure(); });

    let width = list.clientWidth;
    const ro = new ResizeObserver(() => {
      if (list.clientWidth === width) return;
      width = list.clientWidth;
      measure();
    });
    ro.observe(list);

    return () => {
      alive = false;
      cancelAnimationFrame(rafId);
      ro.disconnect();
    };
  }, [pinned, count]);

  return { wrapperRef, stepsRef, pinned, active };
};
