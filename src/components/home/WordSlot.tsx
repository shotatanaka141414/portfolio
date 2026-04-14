import { INFORMATION_HEADLINE_CORE } from "./informationHeadline";

type WordSlotProps = {
  words: string[];
  className?: string;
  density?: "normal" | "compact";
  /** SP で Information 縦積みレイアウト用。md 以上は従来サイズ */
  prominentOnNarrow?: boolean;
};

/** md 以上: I am / Designer と同系の可変サイズ（1行維持・改行なし） */
const FONT_NORMAL =
  "text-[clamp(0.65rem,min(4.5rem,5.2vw),4.5rem)]";
const FONT_COMPACT =
  "text-[clamp(0.55rem,min(4.5rem,4.6vw),4.5rem)]";

export function WordSlot({
  words,
  className = "",
  density = "normal",
  prominentOnNarrow = false,
}: WordSlotProps) {
  const fontSizeClass = density === "compact" ? FONT_COMPACT : FONT_NORMAL;

  /** SP 縦積み: 見出しと同じタイポ。枠は文字が切れないよう min 高さを確保 */
  const slotWindowProminent =
    "h-[clamp(4.05rem,14.6vw,5.3rem)] overflow-hidden md:h-[5.75rem] lg:h-[6.25rem]";
  const lineHeightsProminent =
    "h-[clamp(4.05rem,14.6vw,5.3rem)] md:h-[5.75rem] lg:h-[6.25rem]";

  const slotWindowDefault =
    "h-[2.75rem] overflow-hidden sm:h-[4.25rem] md:h-[5.75rem] lg:h-[6.25rem]";
  const lineHeightsDefault =
    "h-[2.75rem] sm:h-[4.25rem] md:h-[5.75rem] lg:h-[6.25rem]";

  const slotWindow = prominentOnNarrow ? slotWindowProminent : slotWindowDefault;
  const lineHeights = prominentOnNarrow ? lineHeightsProminent : lineHeightsDefault;

  const lineClass = prominentOnNarrow
    ? `flex shrink-0 items-center whitespace-nowrap pt-[0.08em] pb-[0.05em] leading-[1.16] ${lineHeights} ${INFORMATION_HEADLINE_CORE}`
    : `flex shrink-0 items-center whitespace-nowrap font-bold leading-none tracking-tight ${lineHeights} ${fontSizeClass}`;

  const innerPad = prominentOnNarrow
    ? "px-[clamp(0.6rem,2.8vw,0.9rem)] py-[clamp(0.7rem,2.8vw,1rem)] md:px-10 md:py-6"
    : "px-[clamp(0.375rem,1.8vw,0.5rem)] py-[clamp(0.375rem,1.8vw,0.5rem)] sm:px-6 sm:py-4 md:px-10 md:py-6";

  return (
    <div
      className={`box-border min-w-0 shrink border-[length:clamp(3px,0.85vw+1.5px,6px)] border-[#242424] md:border-[10px] ${className}`}
    >
      <div className={innerPad}>
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
