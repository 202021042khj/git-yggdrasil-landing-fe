import CtaButton from "@/components/common/CtaButton";

interface HelpBandSectionProps {
  idPrefix?: string;
}

const HelpBandShapes = () => (
  <svg
    aria-hidden="true"
    viewBox="0 0 280 200"
    className="h-[120px] w-[168px] shrink-0 md:h-[200px] md:w-[280px]"
  >
    <circle cx="70" cy="110" r="70" className="fill-brand" />
    <rect x="120" y="20" width="110" height="110" className="fill-clay" />
    <path d="M150 90 L280 160 L150 200 Z" className="fill-on-ink" />
  </svg>
);

const HelpBandSection = ({ idPrefix = "" }: HelpBandSectionProps) => (
  <section
    id={`${idPrefix}help`}
    aria-labelledby={`${idPrefix}help-title`}
    className="w-full bg-ink px-5 py-16 md:px-10 md:py-32 lg:px-20"
  >
    <div className="mx-auto flex max-w-[1280px] flex-col-reverse items-start gap-10 md:flex-row md:items-center md:gap-16">
      <div className="flex min-w-0 flex-1 flex-col items-start gap-6 text-on-ink">
        <h2
          id={`${idPrefix}help-title`}
          className="font-display text-display-m italic md:text-display-l"
        >
          Questions?
          <br />
          We’re on the branch.
        </h2>
        <p className="text-body-l text-on-ink/80">
          막히는 곳이 있다면 문서를 보거나 GitHub 이슈로 알려 주세요.
        </p>
        <div className="flex flex-wrap gap-4">
          {/* TODO: 문서 · GitHub 이슈 주소 없음 — 더미 버튼 */}
          <CtaButton variant="brand">문서 보기</CtaButton>
          <CtaButton variant="paper">이슈 남기기</CtaButton>
        </div>
      </div>
      <HelpBandShapes />
    </div>
  </section>
);

export default HelpBandSection;
