"use client";

import { useSyncExternalStore } from "react";

/** 미디어 쿼리가 맞는가. 서버 렌더에서는 false */
export const useMediaQuery = (query: string) =>
  useSyncExternalStore(
    (onChange) => {
      const list = window.matchMedia(query);
      list.addEventListener("change", onChange);
      return () => list.removeEventListener("change", onChange);
    },
    () => window.matchMedia(query).matches,
    () => false,
  );
