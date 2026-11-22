import Link from "next/link";
import type { MouseEvent, ReactNode } from "react";
import { cn } from "@/lib/utils";
import styles from "./CtaButton.module.css";

interface CtaButtonProps {
  children: ReactNode;
  variant?: "primary" | "secondary" | "brand" | "paper";
  className?: string;
  /** 가는 곳. 사이트 안 "/..." 는 next/link, 밖 주소(https://…)는 새 탭으로 연다 */
  href: string;
  /** 밖 주소를 새 탭으로 (기본). 설치 파일 다운로드처럼 페이지가 아닌 링크는 false */
  newTab?: boolean;
  /** 화면 낭독용 이름(보이는 글자가 짧을 때, 예: "다운로드" → "Apple Silicon 용 .dmg 다운로드") */
  ariaLabel?: string;
  onClick?: (event: MouseEvent<HTMLAnchorElement>) => void;
}



/** 랜딩 CTA. 모서리 0, 3px 잉크 선, 오른쪽 삼각형 화살 */
const CtaButton = ({ children, variant = "primary", className, href, newTab = true, ariaLabel, onClick }: CtaButtonProps) => {
  const classes = cn(styles.button, styles[variant], "press", className);
  const content = (
    <>
      {children}
      <svg aria-hidden="true" viewBox="0 0 11 12" className={styles.arrow}>
        <path d="M0 0 L11 6 L0 12 Z" />
      </svg>
    </>
  );

  // 사이트 안 이동은 next/link (미리 불러오기 · 클라이언트 이동)
  if (href?.startsWith("/")) {
    return (
      <Link href={href} aria-label={ariaLabel} onClick={onClick} className={classes}>
        {content}
      </Link>
    );
  }

  return (
    <a
      href={href}
      // 밖 주소는 새 탭 (푸터 링크와 같게)
      {...(newTab ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      aria-label={ariaLabel}
      onClick={onClick}
      className={classes}
    >
      {content}
    </a>
  );
};

export default CtaButton;
