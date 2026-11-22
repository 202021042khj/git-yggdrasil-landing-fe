import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import styles from "./Collapse.module.css";

interface CollapseProps {
  open: boolean;
  id?: string;
  className?: string;
  children: ReactNode;
}

/**
 * 펼침 · 접힘 상자(참조 common/display/Collapse). 높이 0fr → 1fr + 투명도, 펼침 200ms · 접힘 150ms (Collapse.module.css).
 * 닫혀 있으면 안쪽은 포커스 · 읽기에서 빠진다(inert).
 */
const Collapse = ({ open, id, className, children }: CollapseProps) => (
  <div id={id} data-open={open} inert={!open} className={cn(styles.panel, className)}>
    <div>{children}</div>
  </div>
);

export default Collapse;
