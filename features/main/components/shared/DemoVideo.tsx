"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface DemoVideoProps {
  className?: string;
}

/**
 * 히어로 시연 영상. 소리 없이 반복 재생한다.
 * - prefers-reduced-motion 이면 자동 재생하지 않고 포스터 + 재생 버튼을 보여 준다.
 * - Desktop/Mobile 트리가 둘 다 마운트되므로 실제로 보이는 쪽만 재생한다.
 */
const DemoVideo = ({ className }: DemoVideoProps) => {
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
    <div className={cn("relative overflow-hidden border-3 border-line-strong bg-surface", className)}>
      <video
        ref={ref}
        className="block aspect-[16/10] w-full object-cover"
        src="/media/demo.mp4"
        poster="/media/poster.png"
        width={1920}
        height={1200}
        muted
        loop
        playsInline
        preload="metadata"
        aria-label="Yggdrasil 시연: 커밋을 release/1.0 이름표로 끌어 복사(cherry-pick)한 뒤 ⌘Z 로 되돌리고 ⌘K 로 찾기"
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />
      {!isPlaying && (
        <button
          type="button"
          onClick={handlePlay}
          aria-label="시연 영상 재생"
          className="absolute top-1/2 left-1/2 flex size-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-3 border-charcoal bg-charcoal text-paper transition-transform hover:scale-105 focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-fg-brand md:size-32"
        >
          <svg aria-hidden="true" viewBox="0 0 11 12" className="ml-1 size-6 fill-current md:ml-2 md:size-12">
            <path d="M0 0 L11 6 L0 12 Z" />
          </svg>
        </button>
      )}
    </div>
  );
};

export default DemoVideo;
