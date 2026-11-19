import SectionHead from "@/components/common/SectionHead";
import Shape from "../shared/Shape";
import { START_STEPS } from "../../constants";
import { useStartGuidePin } from "../../hooks/useStartGuidePin";

interface StartGuideSectionProps {
  idPrefix?: string;
  /** 데스크톱 트리만: 고정 스크롤로 한 칸씩 펼친다(폭 1024 · 높이 720 이상, 움직임 줄이기 아님) */
  pinnable?: boolean;
}

/** 시작 가이드 4칸(참조 HomeStartSection). 고정이면 섹션이 붙은 채 440px 마다 다음 칸이 2.6 배로 펼쳐진다 */
const StartGuideSection = ({
  idPrefix = "",
  pinnable = false,
}: StartGuideSectionProps) => {
  const { wrapperRef, stepsRef, pinned, active } = useStartGuidePin(
    pinnable,
    START_STEPS.length,
  );

  return (
    <div ref={wrapperRef} className="start-pin" data-pinned={pinned}>
      <section
        id={`${idPrefix}start`}
        aria-labelledby={`${idPrefix}start-title`}
        className="w-full border-t-3 border-line-strong bg-page px-5 py-16 md:px-10 md:py-32 lg:px-20"
      >
        <div className="mx-auto flex max-w-[1280px] flex-col gap-12 md:gap-16">
          <SectionHead
            headingId={`${idPrefix}start-title`}
            eyebrow="02 — START"
            title="Plant it in four steps."
            description="설치부터 첫 되돌리기까지, 5분이면 충분합니다."
          />
          <ol
            ref={stepsRef}
            className="start-steps grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4"
          >
            {START_STEPS.map((step, index) => (
              <li
                key={step.numeral}
                data-active={pinned && index === active ? "" : undefined}
                className="flex flex-col gap-4 border-3 border-line-strong bg-surface p-8 text-fg"
              >
                <div className="flex items-center justify-between">
                  <Shape kind={step.shape} size={40} />
                  <span
                    aria-hidden="true"
                    className="font-display text-display-m font-medium italic"
                  >
                    {step.numeral}
                  </span>
                </div>
                <h3 className="font-serif text-heading-m font-semibold">
                  {step.title}
                </h3>
                <p className="start-dim text-body-m text-fg-muted">
                  {step.description}
                </p>
                <p className="start-dim font-code text-code-m text-fg-brand">
                  {step.hint}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </div>
  );
};

export default StartGuideSection;
