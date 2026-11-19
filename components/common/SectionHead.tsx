import { cn } from "@/lib/utils";

interface SectionHeadProps {
  eyebrow: string;
  title: string;
  description?: string;
  /** 잉크 띠 위에 놓일 때 */
  onInk?: boolean;
  headingId?: string;
}

const SectionHead = ({ eyebrow, title, description, onInk, headingId }: SectionHeadProps) => (
  <div className={cn("flex flex-col gap-4", onInk ? "text-on-ink" : "text-fg")}>
    <p
      className={cn(
        "font-code text-label-m font-medium uppercase",
        onInk ? "text-on-ink" : "text-fg-brand",
      )}
    >
      {eyebrow}
    </p>
    <h2 id={headingId} className="font-display text-display-m italic md:text-display-l">
      {title}
    </h2>
    {description && (
      <p className={cn("text-body-l", onInk ? "text-on-ink/80" : "text-fg-muted")}>
        {description}
      </p>
    )}
  </div>
);

export default SectionHead;
