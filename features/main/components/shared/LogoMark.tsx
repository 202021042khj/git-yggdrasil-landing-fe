import { cn } from "@/lib/utils";
import styles from "./LogoMark.module.css";

interface LogoMarkProps {
  /** px (가로 = 세로) */
  size?: number;
  className?: string;
}

const LEAF = "M0 0 C7 -12 24 -13 36 0 C24 13 7 12 0 0 Z";

const LEAVES: { x: number; y: number; r: number; tone: "brand" | "clay" }[] = [
  { x: 182, y: 50, r: -80, tone: "brand" },
  { x: 198, y: 98, r: -20, tone: "clay" },
];

/** Yggdrasil 로고 (Y 모양: 왼쪽 팔 git 그래프 · 오른쪽 팔 나뭇가지 · 공통 줄기). 선은 글자 색, 잎은 sage·clay */
const LogoMark = ({ size = 40, className }: LogoMarkProps) => (
  <svg viewBox="0 0 240 240" width={size} height={size} aria-hidden="true" className={cn(styles.mark, className)}>
    <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
      <path d="M120 212 L120 132 L56 44" strokeWidth="14" />
      <path d="M106 113 C92 126 62 130 50 114" strokeWidth="10" />
      <path d="M120 132 C150 118 172 86 182 50" strokeWidth="14" />
      <path d="M162 96 C176 92 188 92 198 98" strokeWidth="10" />
      <path d="M98 230 C104 220 112 214 120 212 C128 214 136 220 142 230" strokeWidth="10" />
    </g>
    {LEAVES.map((leaf) => (
      <path
        key={`${leaf.x}-${leaf.y}`}
        transform={`translate(${leaf.x} ${leaf.y}) rotate(${leaf.r})`}
        d={LEAF}
        className={styles[leaf.tone]}
      />
    ))}
    <g stroke="currentColor" strokeWidth="10" className={styles.hollow}>
      <circle cx="56" cy="44" r="13" />
      <circle cx="120" cy="170" r="13" />
    </g>
    <g fill="currentColor">
      <circle cx="82" cy="80" r="12" />
      <circle cx="50" cy="114" r="11" />
    </g>
  </svg>
);

export default LogoMark;
