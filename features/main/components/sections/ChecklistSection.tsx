import SectionHead from "@/components/common/SectionHead";
import { CHECKLIST } from "../../constants";

interface ChecklistSectionProps {
  idPrefix?: string;
}

const ChecklistSection = ({ idPrefix = "" }: ChecklistSectionProps) => (
  <section
    aria-labelledby={`${idPrefix}checklist-title`}
    className="w-full bg-page px-5 py-16 md:px-10 md:py-32 lg:px-20"
  >
    <div className="mx-auto flex max-w-[1280px] flex-col gap-12 md:gap-16">
      <SectionHead
        headingId={`${idPrefix}checklist-title`}
        eyebrow="04 — CHECKLIST"
        title="Before you plant."
        description="설치 전에 확인해 주세요."
      />
      <ul className="border-t-3 border-line-strong">
        {CHECKLIST.map((item) => (
          <li
            key={item.title}
            className="flex flex-col gap-2 border-b border-line-subtle py-6 md:flex-row md:items-center md:gap-8"
          >
            <div className="flex items-center gap-4 md:w-[400px] md:shrink-0">
              <span aria-hidden="true" className="size-5 shrink-0 bg-brand" />
              <h3 className="font-serif text-heading-m font-semibold text-fg">
                {item.title}
              </h3>
            </div>
            <p className="flex-1 pl-9 text-body-m text-fg-muted md:pl-0">
              {item.description}
            </p>
          </li>
        ))}
      </ul>
    </div>
  </section>
);

export default ChecklistSection;
