import { WordSlot } from "./WordSlot";

/** 枠内と同じスケールで I am / Designer を縮小 */
const taglineClass =
  "shrink-0 whitespace-nowrap font-en font-bold leading-none tracking-tight text-[#242424] text-[clamp(0.65rem,min(4.5rem,5.2vw),4.5rem)]";

export function InformationSection() {
  return (
    <section className="mx-auto flex w-full max-w-[1512px] flex-row flex-nowrap items-center gap-5 overflow-x-auto px-5 py-16 scrollbar-hide md:justify-center md:px-8 md:py-[120px]">
      <h2 className={taglineClass}>I am</h2>
      <div className="flex min-w-0 shrink-0 flex-row flex-nowrap items-center gap-2">
        <WordSlot
          words={["always", "usually", "often"]}
          density="normal"
          className="max-w-[min(42vw,340px)] sm:max-w-none sm:min-w-[280px] md:min-w-[300px] lg:min-w-[320px]"
        />
        <WordSlot
          words={["Interaction", "Service", "UX Writing"]}
          density="compact"
          className="max-w-[min(48vw,460px)] sm:max-w-none sm:min-w-[300px] md:min-w-[380px] lg:min-w-[420px]"
        />
      </div>
      <h2 className={taglineClass}>Designer</h2>
    </section>
  );
}
