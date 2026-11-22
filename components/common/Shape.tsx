import { cn } from "@/lib/utils";
import styles from "./Shape.module.css";

export type ShapeKind = "circle" | "square" | "triangle" | "ring";

interface ShapeProps {
  kind: ShapeKind;
  /** px */
  size: number;
  /** 원·삼각형 채움 색 (사각형은 항상 clay) */
  tone?: "brand" | "clay" | "ink";
  className?: string;
}


/** Yggdrasil 기하 도형 (원 · 사각형 · 삼각형 · 고리). 장식이라 화면 낭독에서 숨긴다 */
const Shape = ({ kind, size, tone = "brand", className }: ShapeProps) => (
  <svg
    aria-hidden="true"
    viewBox="0 0 24 24"
    width={size}
    height={size}
    className={cn(styles.shape, className)}
  >
    {kind === "square" && <rect width="24" height="24" className={styles.clay} />}
    {kind === "circle" && <circle cx="12" cy="12" r="12" className={styles[tone]} />}
    {kind === "triangle" && <path d="M1.6 0 L24 12 L1.6 24 Z" className={styles.ink} />}
    {kind === "ring" && (
      <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="3" />
    )}
  </svg>
);

export default Shape;
