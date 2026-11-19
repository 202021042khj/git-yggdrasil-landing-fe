import type { MouseEvent, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface CtaButtonProps {
  children: ReactNode;
  variant?: "primary" | "secondary" | "brand" | "paper";
  className?: string;
  /** 생략하면 기본 동작을 막는 더미 링크 */
  onClick?: (event: MouseEvent<HTMLAnchorElement>) => void;
}

const VARIANT = {
  primary: "bg-btn-ink text-btn-ink-fg hover:bg-fg-brand",
  secondary: "bg-transparent text-fg hover:bg-brand hover:text-on-color",
  brand: "bg-brand text-on-color hover:bg-clay",
  paper: "bg-paper text-on-color hover:bg-clay",
} as const;

// TODO: 다운로드 · GitHub · 로그인 · 문서 링크는 아직 없다. 실제 주소가 정해지면 href 로 바꾼다.
const preventDummy = (event: MouseEvent<HTMLAnchorElement>) => event.preventDefault();

/** 랜딩 CTA. 모서리 0, 3px 잉크 선, 오른쪽 삼각형 화살 */
const CtaButton = ({ children, variant = "primary", className, onClick }: CtaButtonProps) => (
  <a
    href="#"
    onClick={onClick ?? preventDummy}
    className={cn(
      "inline-flex items-center gap-4 border-3 border-line-strong py-[15px] pr-6 pl-7 font-code text-label-m font-medium whitespace-nowrap uppercase press",
      "focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-fg-brand",
      variant === "paper" && "border-charcoal",
      VARIANT[variant],
      className,
    )}
  >
    {children}
    <svg aria-hidden="true" viewBox="0 0 11 12" className="h-3 w-[11px] fill-current">
      <path d="M0 0 L11 6 L0 12 Z" />
    </svg>
  </a>
);

export default CtaButton;
