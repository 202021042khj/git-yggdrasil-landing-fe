import LogoMark from "./LogoMark";
import { cn } from "@/lib/utils";

interface LogoLockupProps {
  size?: "md" | "sm";
  className?: string;
}

const LogoLockup = ({ size = "md", className }: LogoLockupProps) => (
  <span className={cn("flex items-center gap-2.5 text-fg", className)}>
    <LogoMark className={size === "md" ? "size-10" : "size-8"} />
    <span className="flex flex-col leading-none">
      <span
        className={cn(
          "font-display italic tracking-[-0.015em]",
          size === "md" ? "text-[20px]" : "text-[16px]",
        )}
      >
        Yggdrasil
      </span>
      <span className="mt-0.5 font-code text-[6px] font-medium tracking-[0.14em] text-fg-brand">
        FOR GIT
      </span>
    </span>
  </span>
);

export default LogoLockup;
