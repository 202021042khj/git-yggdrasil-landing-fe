"use client";

import { useEffect, useRef } from "react";

/**
 * 고정 스크롤(히어로) 뼈대(참조 useScrollPin). pinned 인 동안 감싼 칸이 상단바 아래 붙은 뒤 스크롤한 거리(px)를
 * 한 프레임에 한 번만 읽어 onRead 에 넘긴다. 끝나면 onReset. onRead · onReset 은 바뀌지 않는 함수로 넘긴다.
 */
export const useScrollPin = <T extends HTMLElement>(
  pinned: boolean,
  onRead: (wrapper: T, scrolled: number) => void,
  onReset?: (wrapper: T) => void,
) => {
  const wrapperRef = useRef<T>(null);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper || !pinned) return;
    const headerPx = parseFloat(getComputedStyle(wrapper).getPropertyValue("--header-h")) || 0;
    let frame = 0;
    const read = () => {
      frame = 0;
      onRead(wrapper, headerPx - wrapper.getBoundingClientRect().top);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(read);
    };
    read();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(frame);
      onReset?.(wrapper);
    };
  }, [pinned, onRead, onReset]);

  return wrapperRef;
};
