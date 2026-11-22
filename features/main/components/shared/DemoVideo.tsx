"use client";

import { useEffect, useRef, useState } from "react";
import type { DemoVideoCopy } from "../../types";
import { cn } from "@/lib/utils";
import styles from "./DemoVideo.module.css";

interface DemoVideoProps {
  copy: DemoVideoCopy;
  className?: string;
}

/**
 * 히어로 시연 영상. 소리 없이 반복 재생한다.
 * - prefers-reduced-motion 이면 자동 재생하지 않고 포스터 + 재생 버튼을 보여 준다.
 * - Desktop/Mobile 트리가 둘 다 마운트되므로 실제로 보이는 쪽만 재생한다.
 */
const DemoVideo = ({ copy, className }: DemoVideoProps) => {
  const ref = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        video.play().catch(() => setIsPlaying(false));
      } else {
        video.pause();
      }
    });
    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  const handlePlay = () => {
    ref.current?.play().catch(() => setIsPlaying(false));
  };

  return (
    <div className={cn(styles.frame, className)}>
      <video
        ref={ref}
        className={styles.video}
        src="/media/demo.mp4"
        poster="/media/poster.png"
        width={1920}
        height={1200}
        muted
        loop
        playsInline
        preload="metadata"
        aria-label={copy.label}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />
      {!isPlaying && (
        <button
          type="button"
          onClick={handlePlay}
          aria-label={copy.play}
          className={styles.play}
        >
          <svg aria-hidden="true" viewBox="0 0 11 12" className={styles.playIcon}>
            <path d="M0 0 L11 6 L0 12 Z" />
          </svg>
        </button>
      )}
    </div>
  );
};

export default DemoVideo;
