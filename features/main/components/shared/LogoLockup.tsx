import LogoMark from "./LogoMark";
import { cn } from "@/lib/utils";
import styles from "./LogoLockup.module.css";

interface LogoLockupProps {
  size?: "md" | "sm";
  className?: string;
}

const LogoLockup = ({ size = "md", className }: LogoLockupProps) => (
  <span className={cn(styles.lockup, size === "sm" && styles.sm, className)}>
    <LogoMark size={size === "md" ? 40 : 32} />
    <span className={styles.words}>
      <span className={styles.name}>Yggdrasil</span>
      <span className={styles.tag}>FOR GIT</span>
    </span>
  </span>
);

export default LogoLockup;
