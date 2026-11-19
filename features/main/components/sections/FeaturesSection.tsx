import Image from "next/image";
import SectionHead from "@/components/common/SectionHead";
import Shape from "../shared/Shape";
import { FEATURES, SHOT_HEIGHT, SHOT_WIDTH } from "../../constants";
import { cn } from "@/lib/utils";

interface FeaturesSectionProps {
  idPrefix?: string;
}

const FeaturesSection = ({ idPrefix = "" }: FeaturesSectionProps) => (
  <section
    id={`${idPrefix}features`}
    aria-labelledby={`${idPrefix}features-title`}
    className="w-full border-t-3 border-line-strong bg-surface px-5 py-16 md:px-10 md:py-32 lg:px-20"
  >
    <div className="mx-auto flex max-w-[1280px] flex-col gap-12 md:gap-16">
      <SectionHead
        headingId={`${idPrefix}features-title`}
        eyebrow="01 — FEATURES"
        title="Form follows the branch."
        description="명령어 대신 손으로. 커밋 그래프 위에서 하는 다섯 가지 일입니다."
      />
      <ol className="flex flex-col gap-16 md:gap-24">
        {FEATURES.map((feature, index) => (
          <li key={feature.file}>
            <div
              className={cn(
                "flex flex-col gap-6 md:items-center md:gap-10 lg:gap-20",
                index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse",
              )}
            >
              <div className="w-full shrink-0 overflow-hidden border-3 border-line-strong bg-surface md:w-[56%]">
                <div className="flex items-center gap-2 border-b-3 border-line-strong bg-page px-4 py-2">
                  <Shape kind="circle" size={10} />
                  <Shape kind="square" size={10} />
                  <Shape kind="triangle" size={10} />
                  <span className="font-code text-label-m font-medium text-fg-muted uppercase">
                    {feature.file}
                  </span>
                </div>
                <Image
                  src={feature.src}
                  alt={feature.alt}
                  width={SHOT_WIDTH}
                  height={SHOT_HEIGHT}
                  sizes="(min-width: 1440px) 714px, (min-width: 768px) 56vw, 100vw"
                  className="block aspect-[714/446] h-auto w-full object-cover object-left-top"
                />
              </div>
              <div className="flex min-w-0 flex-1 flex-col items-start gap-4">
                <div className="flex items-center gap-3">
                  <Shape kind={feature.shape} size={24} />
                  <span className="font-code text-label-m font-medium text-fg-muted uppercase">
                    {String(index + 1).padStart(2, "0")} /{" "}
                    {String(FEATURES.length).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="font-serif text-heading-m font-bold text-fg md:text-heading-l">
                  {feature.title}
                </h3>
                <p className="text-body-m text-fg-muted md:text-body-l">
                  {feature.description}
                </p>
                <code className="rounded-full border-3 border-line-strong bg-page px-4 py-2 font-code text-code-m text-fg">
                  {feature.command}
                </code>
              </div>
            </div>
          </li>
        ))}
      </ol>
    </div>
  </section>
);

export default FeaturesSection;
