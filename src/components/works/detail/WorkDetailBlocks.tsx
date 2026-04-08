import { Fragment } from "react";

import type { WorkDetailBlock } from "@/data/work-details";
import { resolveWorkDetailSectionNumber } from "@/data/work-details";

import { WorkDetailHeroMedia } from "./WorkDetailHeroMedia";

/** プレビュー専用: 実装コンポーネント名（本番ページでは非表示） */
function getSectionDevTitle(block: WorkDetailBlock): string {
  if (block.type === "mediaTextTwoCol") return "MediaTextTwoCol";
  if (block.type === "imageLeftTextRight") return "ImageLeftTextRight";
  if (block.type === "fullImageOverlay") return "FullImageOverlay";
  if (block.type === "headlineBody") return "HeadlineBody";
  return `TemplateVariant · ${block.type}`;
}

function PreviewSectionCaption({ label }: { label: string }) {
  return (
    <p className="mb-2 font-mono text-[10px] font-normal uppercase tracking-[0.1em] text-zinc-400">
      {label}
    </p>
  );
}

function SectionNumberLabel({ value }: { value: number }) {
  const n = Math.max(1, Math.floor(value));
  const text = String(n).padStart(2, "0");
  return (
    <p
      className="mb-4 font-en text-sm font-normal tabular-nums tracking-[0.12em] text-zinc-400"
      aria-label={`セクション ${n}`}
    >
      {text}
    </p>
  );
}

function SectionText({
  eyebrow,
  title,
  body,
}: {
  eyebrow: string;
  title: string;
  body: string;
}) {
  return (
    <div className="flex max-w-[792px] flex-col gap-6">
      <p className="font-en text-xl font-normal leading-[1.4] text-[#242424]">{eyebrow}</p>
      <h3 className="whitespace-pre-line text-[clamp(2rem,3.3vw,2.5rem)] font-light leading-[1.4] text-[#242424]">
        {title}
      </h3>
      <p className="text-base font-light leading-[1.6] text-[#242424]">{body}</p>
    </div>
  );
}

function MediaTextTwoCol({ block }: { block: Extract<WorkDetailBlock, { type: "mediaTextTwoCol" }> }) {
  const titleCol = (
    <div className="flex min-w-0 flex-col gap-6">
      <p className="font-en text-xl font-normal leading-[1.4] text-[#242424]">{block.eyebrow}</p>
      <h3 className="whitespace-pre-line text-[clamp(2rem,3.3vw,2.5rem)] font-light leading-[1.4] text-[#242424]">
        {block.title}
      </h3>
    </div>
  );

  const mediaCol = (
    <div className="mx-auto w-full max-w-[420px] shrink-0 overflow-hidden bg-zinc-100">
      <div className="aspect-[3/4] w-full">
        <WorkDetailHeroMedia file={block.mediaFile} />
      </div>
    </div>
  );

  return (
    <section className="mx-auto flex w-full max-w-[1352px] flex-col gap-10 py-0 lg:flex-row lg:items-stretch lg:gap-8 xl:gap-10">
      <div
        className={`min-w-0 flex-1 ${block.reverse ? "order-3 lg:order-3" : "order-1 lg:order-1"}`}
      >
        {titleCol}
      </div>
      <div className="order-2 shrink-0 lg:order-2">{mediaCol}</div>
      <div
        className={`flex min-h-0 w-full min-w-0 flex-1 flex-col justify-end self-stretch lg:min-h-0 ${
          block.reverse ? "order-1 lg:order-1" : "order-3 lg:order-3"
        }`}
      >
        <p className="text-base font-light leading-[1.6] text-[#242424]">{block.body}</p>
      </div>
    </section>
  );
}

/** 左にメディア、右にラベル・見出し・本文（2カラム）。`reverse` で左右入れ替え */
function ImageLeftTextRight({ block }: { block: Extract<WorkDetailBlock, { type: "imageLeftTextRight" }> }) {
  const media = (
    <div className="w-full max-w-[600px] shrink-0 overflow-hidden bg-zinc-100">
      <div className="aspect-square w-full">
        <WorkDetailHeroMedia file={block.mediaFile} />
      </div>
    </div>
  );
  const text = <SectionText eyebrow={block.eyebrow} title={block.title} body={block.body} />;
  return (
    <section
      className={`mx-auto flex w-full max-w-[1352px] gap-10 py-0 lg:items-stretch lg:gap-8 xl:gap-10 ${
        block.reverse
          ? "flex-col-reverse lg:flex-row-reverse"
          : "flex-col lg:flex-row"
      }`}
    >
      {media}
      <div className="flex min-w-0 flex-1 flex-col justify-center">{text}</div>
    </section>
  );
}

function FullImageOverlay({ block }: { block: Extract<WorkDetailBlock, { type: "fullImageOverlay" }> }) {
  return (
    <section className="mx-auto w-full max-w-[1352px] py-0">
      <div className="relative overflow-hidden bg-zinc-100">
        <div className="aspect-[1352/600] w-full">
          <WorkDetailHeroMedia file={block.mediaFile} />
        </div>
        <div
          className={`absolute bottom-8 max-w-[480px] rounded bg-white/92 p-6 ${
            block.align === "left" ? "left-8" : "right-8"
          }`}
        >
          <SectionText eyebrow={block.eyebrow} title={block.title} body={block.body} />
        </div>
      </div>
    </section>
  );
}

function HeadlineBody({ block }: { block: Extract<WorkDetailBlock, { type: "headlineBody" }> }) {
  return (
    <section className="mx-auto w-full max-w-[1352px] py-0">
      <SectionText eyebrow={block.eyebrow} title={block.title} body={block.body} />
    </section>
  );
}

function Media520({ file }: { file?: string }) {
  return (
    <div className="w-full max-w-[520px] overflow-hidden bg-zinc-100">
      <div className="aspect-[520/600] w-full">
        <WorkDetailHeroMedia file={file} />
      </div>
    </div>
  );
}

function MediaStrip({ file }: { file?: string }) {
  return (
    <div className="w-full max-w-[792px] overflow-hidden bg-zinc-100">
      <div className="aspect-[792/240] w-full">
        <WorkDetailHeroMedia file={file} />
      </div>
    </div>
  );
}

function TemplateVariant({
  block,
}: {
  block: Extract<
    WorkDetailBlock,
    {
      type:
        | "quoteTwoLeft"
        | "quoteTwoRight"
        | "barStarOne"
        | "circleBarOne"
        | "doubleBarTwo"
        | "upOne"
        | "quoteOneRight"
        | "lOne"
        | "lineOne";
    }
  >;
}) {
  const text = <SectionText eyebrow={block.eyebrow} title={block.title} body={block.body} />;

  if (block.type === "quoteTwoLeft") {
    return (
      <section className="mx-auto flex w-full max-w-[1352px] flex-col gap-10 py-0 lg:flex-row lg:gap-10">
        <Media520 file={block.mediaFile} />
        <div className="flex w-full max-w-[792px] flex-col justify-between gap-10">
          <MediaStrip file={block.mediaFile} />
          {text}
        </div>
      </section>
    );
  }

  if (block.type === "quoteTwoRight") {
    return (
      <section className="mx-auto flex w-full max-w-[1352px] flex-col gap-10 py-0 lg:flex-row lg:gap-10">
        <div className="flex w-full max-w-[792px] flex-col justify-between gap-10">
          {text}
          <MediaStrip file={block.mediaFile} />
        </div>
        <Media520 file={block.mediaFile} />
      </section>
    );
  }

  if (block.type === "barStarOne" || block.type === "circleBarOne") {
    return (
      <section className="mx-auto relative w-full max-w-[1352px] py-0">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:gap-10">
          <Media520 file={block.mediaFile} />
          <div className="max-w-[372px]">{text}</div>
        </div>
        <div
          className={`pointer-events-none absolute hidden h-40 w-40 rounded-full border border-[#242424]/40 lg:block ${
            block.type === "barStarOne" ? "right-20 top-0 border-dashed" : "left-52 top-44"
          }`}
          aria-hidden
        />
      </section>
    );
  }

  if (block.type === "doubleBarTwo") {
    const renderSideMedia = () => (
      <div className="w-full max-w-[420px] overflow-hidden bg-zinc-100">
        <div className="aspect-[9/16] w-full">
          <WorkDetailHeroMedia file={block.mediaFile} />
        </div>
      </div>
    );
    return (
      <section className="mx-auto flex w-full max-w-[1352px] flex-col gap-10 py-0 lg:flex-row lg:items-end lg:gap-10">
        {renderSideMedia()}
        <div className="w-full max-w-[432px]">{text}</div>
        {renderSideMedia()}
      </section>
    );
  }

  if (block.type === "upOne") {
    return (
      <section className="mx-auto relative w-full max-w-[1352px] py-0">
        <div className="aspect-[1352/600] w-full overflow-hidden bg-zinc-100">
          <WorkDetailHeroMedia file={block.mediaFile} />
        </div>
        <div className="absolute bottom-8 right-8 max-w-[432px] bg-white/92 p-6">{text}</div>
      </section>
    );
  }

  if (block.type === "quoteOneRight") {
    return (
      <section className="mx-auto relative w-full max-w-[1352px] py-0">
        <div className="grid gap-10 lg:grid-cols-[872px_1fr]">
          <div className="max-w-[872px]">{text}</div>
          <div className="hidden lg:block" />
        </div>
        <div className="mt-8 aspect-[880/600] w-full max-w-[880px] overflow-hidden bg-zinc-100 lg:absolute lg:bottom-12 lg:right-0 lg:mt-0">
          <WorkDetailHeroMedia file={block.mediaFile} />
        </div>
      </section>
    );
  }

  if (block.type === "lOne") {
    return (
      <section className="mx-auto relative w-full max-w-[1352px] py-0">
        <div className="grid gap-10 lg:grid-cols-[1fr_872px]">
          <div className="hidden lg:block" />
          <div className="max-w-[872px]">{text}</div>
        </div>
        <div className="mt-8 aspect-[880/600] w-full max-w-[880px] overflow-hidden bg-zinc-100 lg:absolute lg:bottom-0 lg:left-0 lg:mt-0">
          <WorkDetailHeroMedia file={block.mediaFile} />
        </div>
      </section>
    );
  }

  if (block.type === "lineOne") {
    return (
      <section className="mx-auto w-full max-w-[1352px] py-0">
        <div className="aspect-[1352/520] w-full overflow-hidden bg-zinc-100">
          <WorkDetailHeroMedia file={block.mediaFile} />
        </div>
        <div className="mt-10 flex flex-col gap-8 lg:mt-12 lg:flex-row lg:items-center lg:gap-x-12">
          <div className="flex min-w-0 flex-col gap-6 lg:flex-1">
            <p className="font-en text-xl font-normal leading-[1.4] text-[#242424]">{block.eyebrow}</p>
            <h3 className="whitespace-pre-line text-[clamp(2rem,3.3vw,2.5rem)] font-light leading-[1.4] text-[#242424]">
              {block.title}
            </h3>
          </div>
          <p className="min-w-0 text-base font-light leading-[1.6] text-[#242424] lg:flex-1">{block.body}</p>
        </div>
      </section>
    );
  }

  return null;
}

function renderBlock(block: WorkDetailBlock) {
  if (block.type === "mediaTextTwoCol") {
    return <MediaTextTwoCol block={block} />;
  }
  if (block.type === "imageLeftTextRight") {
    return <ImageLeftTextRight block={block} />;
  }
  if (block.type === "fullImageOverlay") {
    return <FullImageOverlay block={block} />;
  }
  if (block.type === "headlineBody") {
    return <HeadlineBody block={block} />;
  }
  return <TemplateVariant block={block} />;
}

export function WorkDetailBlocks({
  blocks,
  previewSectionLabels = false,
  showSectionNumbers = false,
}: {
  blocks: WorkDetailBlock[];
  /** プレビュー用のみ。各ブロック直上に実装名を表示（本番では false のまま） */
  previewSectionLabels?: boolean;
  /** true のときのみ 01 などの番号ラベルを表示 */
  showSectionNumbers?: boolean;
}) {
  return (
    <div className="mx-auto flex w-full max-w-[1512px] flex-col gap-[160px] px-5 pb-12 md:px-20">
      {blocks.map((block, idx) => {
        const key = `${block.type}-${idx}`;
        const ordinal = resolveWorkDetailSectionNumber(block, idx);
        const node = renderBlock(block);
        const numbered = (
          <section
            id={`work-section-${ordinal}`}
            className="scroll-mt-24"
            aria-label={`セクション ${String(ordinal).padStart(2, "0")}`}
          >
            {showSectionNumbers ? <SectionNumberLabel value={ordinal} /> : null}
            {node}
          </section>
        );
        return previewSectionLabels ? (
          <div key={key} className="flex flex-col gap-2">
            <PreviewSectionCaption label={getSectionDevTitle(block)} />
            {numbered}
          </div>
        ) : (
          <Fragment key={key}>{numbered}</Fragment>
        );
      })}
    </div>
  );
}
