type WordSlotProps = {
  words: string[];
  className?: string;
  density?: "normal" | "compact";
};

/** I am / Designer と同系の可変サイズ（1行維持・改行なし） */
const FONT_NORMAL =
  "text-[clamp(0.65rem,min(4.5rem,5.2vw),4.5rem)]";
const FONT_COMPACT =
  "text-[clamp(0.55rem,min(4.5rem,4.6vw),4.5rem)]";

export function WordSlot({
  words,
  className = "",
  density = "normal",
}: WordSlotProps) {
  const fontSizeClass = density === "compact" ? FONT_COMPACT : FONT_NORMAL;

  const slotWindow =
    "h-[2.75rem] overflow-hidden sm:h-[4.25rem] md:h-[5.75rem] lg:h-[6.25rem]";
  const lineClass = `flex h-[2.75rem] shrink-0 items-center whitespace-nowrap font-bold leading-none tracking-tight sm:h-[4.25rem] md:h-[5.75rem] lg:h-[6.25rem] ${fontSizeClass}`;

  return (
    <div
      className={`box-border min-w-0 shrink border-[6px] border-[#242424] sm:border-[10px] ${className}`}
    >
      <div className="px-2 py-2 sm:px-6 sm:py-4 md:px-10 md:py-6">
        <div className={slotWindow}>
          <div className="animate-word-slot flex flex-col font-en">
            {words.map((w) => (
              <span key={w} className={lineClass}>
                {w}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
