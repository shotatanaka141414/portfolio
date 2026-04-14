import { INFORMATION_HEADLINE_CORE } from "./informationHeadline";
import { WordSlot } from "./WordSlot";

/** SP: 左揃え・3 行（I am / 枠×2 / Designer）。md 以上は従来の 1 行・中央寄せ */
const taglineClass = `w-full shrink-0 text-left md:w-auto md:whitespace-nowrap ${INFORMATION_HEADLINE_CORE}`;

export function InformationSection() {
  return (
    <section className="scroll-reveal-manual-target mx-auto flex w-full max-w-[1512px] flex-col items-start gap-3 overflow-x-visible px-5 py-16 scrollbar-hide md:flex-row md:flex-nowrap md:items-center md:justify-center md:gap-5 md:overflow-x-auto md:px-8 md:py-[120px]">
      <h2 className={taglineClass}>I am</h2>
      <div className="flex w-full min-w-0 flex-col items-start gap-3 md:w-auto md:shrink-0 md:flex-row md:flex-nowrap md:items-center md:gap-2">
        <WordSlot
          words={["always", "usually", "often"]}
          density="normal"
          prominentOnNarrow
          className="w-[clamp(12.5rem,58vw,15.5rem)] md:max-w-none md:w-auto md:flex-none md:min-w-[300px] lg:min-w-[320px]"
        />
        <WordSlot
          words={["Interaction", "Service", "UX Writing"]}
          density="compact"
          prominentOnNarrow
          className="w-[clamp(17rem,80vw,20rem)] md:max-w-none md:w-auto md:flex-none md:min-w-[380px] lg:min-w-[420px]"
        />
      </div>
      <h2 className={taglineClass}>Designer</h2>
    </section>
  );
}
