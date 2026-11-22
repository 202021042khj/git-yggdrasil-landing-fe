"use client"; // 복사 버튼 상태(useCopyClipboard)

import { useCopyClipboard } from "@/hooks/useCopyClipboard";
import { cn } from "@/lib/utils";
import text from "@/styles/text.module.css";
import styles from "./CommandChip.module.css";

interface CommandChipProps {
  /** 복사 버튼 문구 (사전의 copy) */
  copyLabel: { idle: string; done: string; aria: string };
  command: string;
  /** 명령 뒤 회색 주석 (예: "macOS · Linux") */
  comment?: string;
  /** "$" (셸) 또는 ">" (PowerShell) */
  prompt?: string;
  /** ink: 종이 바탕 위 잉크 상자, line: 잉크 띠 위 선 상자 */
  tone?: "ink" | "line";
}

/** 터미널 명령 한 줄 + 복사 버튼. 프롬프트 · 주석은 복사하지 않는다 */
const CommandChip = ({ command, copyLabel, comment, prompt = "$", tone = "ink" }: CommandChipProps) => {
  const { isCopied, copy } = useCopyClipboard();

  return (
    <div
      className={cn(text.code, styles.chip, styles[tone])}
    >
      <code className={styles.command}>
        <span aria-hidden="true" className={styles.dim}>
          {prompt}{" "}
        </span>
        {command}
        {/* 주석은 단어 중간에서 끊기지 않게 다음 줄로 */}
        {comment && <span className={styles.comment}>{`# ${comment}`}</span>}
      </code>
      <button
        type="button"
        onClick={() => void copy(command)}
        aria-label={`${copyLabel.aria}: ${command}`}
        className={cn(styles.copy, "press")}
      >
        <span aria-live="polite">{isCopied ? copyLabel.done : copyLabel.idle}</span>
      </button>
    </div>
  );
};

export default CommandChip;
