import { ResponsiveDiagramImage } from "./ResponsiveDiagramImage";

const PC = "/images/home/my-speciality.jpg";
const SP = "/images/home/my-speciality-sp.jpg";

export function SpecialitySection() {
  return (
    <section className="mx-auto w-full max-w-[1512px] px-5 pb-16 md:px-20 md:pb-[120px]">
      <div className="mb-8 flex flex-col gap-4 md:mb-8">
        <h2 className="font-en text-[clamp(2rem,5vw,3.25rem)] font-bold leading-[1.3] text-[#242424]">
          MY SPECIALITY
        </h2>
        <p className="w-full text-[18px] font-normal leading-[1.5] text-[#242424]">
          持続可能なサービスを提供するために専門領域であるDesirabilityに責任を持ち、サービス開発支援を行います。
        </p>
      </div>
      <ResponsiveDiagramImage
        pcSrc={PC}
        spSrc={SP}
        alt="MY SPECIALITY — Desirability、Viability、Feasibilityと専門領域の説明図"
      />
    </section>
  );
}
