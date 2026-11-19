import SectionHead from "@/components/common/SectionHead";
import { FLOW_STEPS } from "../../constants";
import { cn } from "@/lib/utils";

interface ProcessFlowSectionProps {
  idPrefix?: string;
}

const ProcessFlowSection = ({ idPrefix = "" }: ProcessFlowSectionProps) => (
  <section
    aria-labelledby={`${idPrefix}flow-title`}
    className="w-full bg-ink px-5 py-16 md:px-10 md:py-32 lg:px-20"
  >
    <div className="mx-auto flex max-w-[1280px] flex-col gap-12 md:gap-16">
      <SectionHead
        headingId={`${idPrefix}flow-title`}
        eyebrow="03 — HOW IT WORKS"
        title="Three gestures. No commands."
        onInk
      />
      <ol className="grid grid-cols-1 gap-12 md:grid-cols-3">
        {FLOW_STEPS.map((step) => (
          <li
            key={step.numeral}
            className="flex flex-col gap-4 border-t-3 border-on-ink pt-6 text-on-ink"
          >
            <span
              aria-hidden="true"
              className={cn(
                "font-display text-display-m italic md:text-display-l",
                step.tone === "brand" ? "text-fg-brand-on-ink" : "text-clay",
              )}
            >
              {step.numeral}
            </span>
            <h3 className="font-serif text-heading-m font-bold md:text-heading-l">
              {step.title}
            </h3>
            <p className="text-body-m text-on-ink/80">{step.description}</p>
          </li>
        ))}
      </ol>
    </div>
  </section>
);

export default ProcessFlowSection;
