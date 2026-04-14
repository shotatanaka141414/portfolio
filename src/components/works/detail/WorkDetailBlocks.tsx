import { Fragment } from "react";

import type { WorkDetailBlock } from "@/data/work-details";
import { resolveWorkDetailSectionNumber } from "@/data/work-details";

import { WorkDetailHeroMedia } from "./WorkDetailHeroMedia";
import { WorkDetailMediaOptionsProvider } from "./WorkDetailMediaOptions";

function getMediaFile(block: WorkDetailBlock, slot = 0): string | undefined {
  const withMediaFiles = block as WorkDetailBlock & { mediaFiles?: string[]; mediaFile?: string };
  return withMediaFiles.mediaFiles?.[slot] ?? withMediaFiles.mediaFile;
}

/** Nissan GT-R 詳細のみ: 横幅は維持しつつ縦を 32px 短くする（container は親幅＝カラム幅） */
function isNissanGtrDetail916Short(file?: string) {
  return (
    typeof file === "string" &&
    (file.includes("nissangtr-01.png") || file.includes("nissangtr-02.png"))
  );
}

function isNissanGtrDetail34Short(file?: string) {
  return typeof file === "string" && file.includes("nissangtr-03.png");
}

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

/** SP は改行/半角スペースを除去、PC はデータ改行を維持 */
const sectionHeadingClass = "text-[28px] font-bold leading-[1.4] text-[#242424]";

function SectionHeading({ title }: { title: string }) {
  const mobileTitle = title.replace(/[ \t\r\n]+/g, "");
  return (
    <h3 className={sectionHeadingClass}>
      <span className="md:hidden">{mobileTitle}</span>
      <span className="hidden whitespace-pre-line md:inline">{title}</span>
    </h3>
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
      <p className="inline-flex w-fit items-center rounded-full border border-[#242424] bg-white px-3 py-1 font-en text-[14px] font-normal leading-[1.4] text-[#242424]">
        {eyebrow}
      </p>
      <SectionHeading title={title} />
      <p className="text-base font-light leading-[1.8em] text-[#242424]">{body}</p>
    </div>
  );
}

function MediaTextTwoCol({ block }: { block: Extract<WorkDetailBlock, { type: "mediaTextTwoCol" }> }) {
  const titleCol = (
    <div className="flex min-w-0 flex-col gap-6">
      <p className="inline-flex w-fit items-center rounded-full border border-[#242424] bg-white px-3 py-1 font-en text-[14px] font-normal leading-[1.4] text-[#242424]">
        {block.eyebrow}
      </p>
      <SectionHeading title={block.title} />
    </div>
  );

  const mediaFile0 = getMediaFile(block, 0);
  const mediaCol = (
    <div className="mx-auto w-full max-w-[420px] shrink-0 overflow-hidden bg-zinc-100">
      {isNissanGtrDetail34Short(mediaFile0) ? (
        <div className="relative w-full overflow-hidden bg-zinc-100">
          <div
            className="pointer-events-none w-full"
            style={{ paddingBottom: "calc(100% * 4 / 3 - 32px)" }}
            aria-hidden
          />
          <div className="absolute inset-0">
            <WorkDetailHeroMedia file={mediaFile0} />
          </div>
        </div>
      ) : (
        <div className="aspect-[3/4] w-full">
          <WorkDetailHeroMedia file={mediaFile0} />
        </div>
      )}
    </div>
  );

  return (
    <section className="mx-auto flex w-full max-w-[1352px] flex-col gap-10 py-0 lg:flex-row lg:items-stretch lg:gap-8 xl:gap-10">
      <div
        className={`min-w-0 flex-1 ${block.reverse ? "order-1 lg:order-3" : "order-1 lg:order-1"}`}
      >
        {titleCol}
      </div>
      <div className="order-3 w-full max-w-[420px] shrink-0 lg:order-2">{mediaCol}</div>
      <div
        className={`flex min-h-0 w-full min-w-0 flex-1 flex-col justify-end self-stretch lg:min-h-0 ${
          block.reverse ? "order-2 lg:order-1" : "order-2 lg:order-3"
        }`}
      >
        <p className="text-base font-light leading-[1.8em] text-[#242424]">{block.body}</p>
      </div>
    </section>
  );
}

/** 左にメディア、右にラベル・見出し・本文（2カラム）。`reverse` で左右入れ替え */
function ImageLeftTextRight({ block }: { block: Extract<WorkDetailBlock, { type: "imageLeftTextRight" }> }) {
  const media = (
    <div className="w-full max-w-[600px] shrink-0 overflow-hidden bg-zinc-100">
      <div className="aspect-square w-full">
        <WorkDetailHeroMedia file={getMediaFile(block, 0)} />
      </div>
    </div>
  );
  const text = <SectionText eyebrow={block.eyebrow} title={block.title} body={block.body} />;
  return (
    <section
      className={`mx-auto flex w-full max-w-[1352px] gap-10 py-0 lg:items-stretch lg:gap-8 xl:gap-10 ${
        block.reverse ? "flex-col-reverse lg:flex-row-reverse" : "flex-col-reverse lg:flex-row"
      }`}
    >
      {media}
      <div className="flex min-w-0 flex-1 flex-col justify-center">{text}</div>
    </section>
  );
}

function FullImageOverlay({ block }: { block: Extract<WorkDetailBlock, { type: "fullImageOverlay" }> }) {
  const textProps = { eyebrow: block.eyebrow, title: block.title, body: block.body };
  return (
    <section className="mx-auto w-full max-w-[1352px] py-0">
      <div className="flex flex-col gap-8 lg:hidden">
        <div className="max-w-[792px]">
          <SectionText {...textProps} />
        </div>
        <div className="relative overflow-hidden bg-zinc-100">
          <div className="aspect-[1352/600] w-full">
            <WorkDetailHeroMedia file={getMediaFile(block, 0)} />
          </div>
        </div>
      </div>
      <div className="relative hidden overflow-hidden bg-zinc-100 lg:block">
        <div className="aspect-[1352/600] w-full">
          <WorkDetailHeroMedia file={getMediaFile(block, 0)} />
        </div>
        <div
          className={`absolute bottom-8 max-w-[480px] rounded bg-white/92 p-6 ${
            block.align === "left" ? "left-8" : "right-8"
          }`}
        >
          <SectionText {...textProps} />
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
  const textProps = { eyebrow: block.eyebrow, title: block.title, body: block.body };

  if (block.type === "quoteTwoLeft") {
    return (
      <>
        <section className="mx-auto flex w-full max-w-[1352px] flex-col gap-6 py-0 lg:hidden">
          <SectionText {...textProps} />
          <div className="flex flex-col gap-4">
            <Media520 file={getMediaFile(block, 0)} />
            <MediaStrip file={getMediaFile(block, 1)} />
          </div>
        </section>
        <section className="mx-auto hidden w-full max-w-[1352px] flex-row gap-10 py-0 lg:flex">
          <Media520 file={getMediaFile(block, 0)} />
          <div className="flex w-full max-w-[792px] flex-col justify-between gap-10">
            <MediaStrip file={getMediaFile(block, 1)} />
            <SectionText {...textProps} />
          </div>
        </section>
      </>
    );
  }

  if (block.type === "quoteTwoRight") {
    return (
      <>
        <section className="mx-auto flex w-full max-w-[1352px] flex-col gap-6 py-0 lg:hidden">
          <SectionText {...textProps} />
          <div className="flex flex-col gap-4">
            <MediaStrip file={getMediaFile(block, 0)} />
            <Media520 file={getMediaFile(block, 1)} />
          </div>
        </section>
        <section className="mx-auto hidden w-full max-w-[1352px] flex-row gap-10 py-0 lg:flex">
          <div className="flex w-full max-w-[792px] flex-col justify-between gap-10">
            <SectionText {...textProps} />
            <MediaStrip file={getMediaFile(block, 0)} />
          </div>
          <Media520 file={getMediaFile(block, 1)} />
        </section>
      </>
    );
  }

  if (block.type === "barStarOne" || block.type === "circleBarOne") {
    return (
      <section className="mx-auto relative w-full max-w-[1352px] py-0">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:gap-10">
          <div className="order-2 lg:order-1">
            <Media520 file={getMediaFile(block, 0)} />
          </div>
          <div className="order-1 max-w-[372px] lg:order-2">
            <SectionText {...textProps} />
          </div>
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
    const leftFile = getMediaFile(block, 0);
    const rightFile = getMediaFile(block, 1);
    const renderSideMedia = (file: string | undefined) => (
      <div className="w-full max-w-[420px] overflow-hidden bg-zinc-100">
        {isNissanGtrDetail916Short(file) ? (
          <div className="relative w-full overflow-hidden bg-zinc-100">
            <div
              className="pointer-events-none w-full"
              style={{ paddingBottom: "calc(100% * 16 / 9 - 32px)" }}
              aria-hidden
            />
            <div className="absolute inset-0">
              <WorkDetailHeroMedia file={file} />
            </div>
          </div>
        ) : (
          <div className="aspect-[9/16] w-full">
            <WorkDetailHeroMedia file={file} />
          </div>
        )}
      </div>
    );
    return (
      <section className="mx-auto flex w-full max-w-[1352px] flex-col gap-10 py-0 lg:flex-row lg:items-end lg:gap-10">
        <div className="order-1 w-full max-w-[432px] lg:order-2">
          <SectionText {...textProps} />
        </div>
        <div className="order-2 flex w-full flex-col gap-4 lg:contents">
          <div className="lg:order-1">{renderSideMedia(leftFile)}</div>
          <div className="lg:order-3">{renderSideMedia(rightFile)}</div>
        </div>
      </section>
    );
  }

  if (block.type === "upOne") {
    return (
      <section className="mx-auto w-full max-w-[1352px] py-0">
        <div className="flex flex-col gap-8 lg:hidden">
          <div className="max-w-[432px] bg-white p-6">
            <SectionText {...textProps} />
          </div>
          <div className="aspect-[1352/600] w-full overflow-hidden bg-zinc-100">
            <WorkDetailHeroMedia file={getMediaFile(block, 0)} />
          </div>
        </div>
        <div className="relative hidden lg:block">
          <div className="aspect-[1352/600] w-full overflow-hidden bg-zinc-100">
            <WorkDetailHeroMedia file={getMediaFile(block, 0)} />
          </div>
          <div className="absolute bottom-8 right-8 max-w-[432px] bg-white/92 p-6">
            <SectionText {...textProps} />
          </div>
        </div>
      </section>
    );
  }

  if (block.type === "quoteOneRight") {
    return (
      <section className="mx-auto w-full max-w-[1352px] py-0">
        <div className="flex flex-col gap-8 lg:hidden">
          <div className="max-w-[872px]">
            <SectionText {...textProps} />
          </div>
          <div className="aspect-[880/600] w-full max-w-[880px] overflow-hidden bg-zinc-100">
            <WorkDetailHeroMedia file={getMediaFile(block, 0)} />
          </div>
        </div>
        <div className="relative hidden lg:block">
          <div className="grid gap-10 lg:grid-cols-[872px_1fr]">
            <div className="max-w-[872px]">
              <SectionText {...textProps} />
            </div>
            <div className="hidden lg:block" />
          </div>
          <div className="mt-8 aspect-[880/600] w-full max-w-[880px] overflow-hidden bg-zinc-100 lg:absolute lg:bottom-12 lg:right-0 lg:mt-0">
            <WorkDetailHeroMedia file={getMediaFile(block, 0)} />
          </div>
        </div>
      </section>
    );
  }

  if (block.type === "lOne") {
    return (
      <section className="mx-auto w-full max-w-[1352px] py-0">
        <div className="flex flex-col gap-8 lg:hidden">
          <div className="max-w-[872px]">
            <SectionText {...textProps} />
          </div>
          <div className="aspect-[880/600] w-full max-w-[880px] overflow-hidden bg-zinc-100">
            <WorkDetailHeroMedia file={getMediaFile(block, 0)} />
          </div>
        </div>
        <div className="relative hidden lg:block">
          <div className="grid gap-10 lg:grid-cols-[1fr_872px]">
            <div className="hidden lg:block" />
            <div className="max-w-[872px]">
              <SectionText {...textProps} />
            </div>
          </div>
          <div className="mt-8 aspect-[880/600] w-full max-w-[880px] overflow-hidden bg-zinc-100 lg:absolute lg:bottom-0 lg:left-0 lg:mt-0">
            <WorkDetailHeroMedia file={getMediaFile(block, 0)} />
          </div>
        </div>
      </section>
    );
  }

  if (block.type === "lineOne") {
    const lineMediaFile = getMediaFile(block, 0);
    const isLineOneMediaShort48 =
      typeof lineMediaFile === "string" &&
      (lineMediaFile.includes("peerworker-04.png") || lineMediaFile.includes("atom-01.png"));

    const renderLineOneMedia = () =>
      isLineOneMediaShort48 ? (
        <div className="relative w-full overflow-hidden bg-zinc-100">
          <div
            className="pointer-events-none w-full"
            style={{ paddingBottom: "calc(100% * 520 / 1352 - 48px)" }}
            aria-hidden
          />
          <div className="absolute inset-0">
            <WorkDetailHeroMedia file={lineMediaFile} />
          </div>
        </div>
      ) : (
        <div className="aspect-[1352/520] w-full overflow-hidden bg-zinc-100">
          <WorkDetailHeroMedia file={lineMediaFile} />
        </div>
      );

    const textBlockProps = {
      eyebrow: block.eyebrow,
      title: block.title,
      body: block.body,
    };

    return (
      <>
        <section className="mx-auto flex w-full max-w-[1352px] flex-col gap-6 py-0 lg:hidden">
          <div className="mt-0 flex flex-col gap-8 lg:mt-12 lg:flex-row lg:items-center lg:gap-x-12">
            <div className="flex min-w-0 flex-col gap-6 lg:flex-1">
              <p className="inline-flex w-fit items-center rounded-full border border-[#242424] bg-white px-3 py-1 font-en text-[14px] font-normal leading-[1.4] text-[#242424]">
                {textBlockProps.eyebrow}
              </p>
              <SectionHeading title={textBlockProps.title} />
            </div>
            <p className="min-w-0 text-base font-light leading-[1.8em] text-[#242424] lg:flex-1">{textBlockProps.body}</p>
          </div>
          {renderLineOneMedia()}
        </section>
        <section className="mx-auto hidden w-full max-w-[1352px] py-0 lg:block">
          {renderLineOneMedia()}
          <div className="mt-10 flex flex-col gap-8 lg:mt-12 lg:flex-row lg:items-center lg:gap-x-12">
            <div className="flex min-w-0 flex-col gap-6 lg:flex-1">
              <p className="inline-flex w-fit items-center rounded-full border border-[#242424] bg-white px-3 py-1 font-en text-[14px] font-normal leading-[1.4] text-[#242424]">
                {textBlockProps.eyebrow}
              </p>
              <SectionHeading title={textBlockProps.title} />
            </div>
            <p className="min-w-0 text-base font-light leading-[1.8em] text-[#242424] lg:flex-1">{textBlockProps.body}</p>
          </div>
        </section>
      </>
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
  /** テンプレ一覧プレビュー向け。画面内に入るまで動画・画像を読み込まず、同時読み込みによる固まりを防ぐ */
  deferBlockMediaUntilVisible = false,
}: {
  blocks: WorkDetailBlock[];
  /** プレビュー用のみ。各ブロック直上に実装名を表示（本番では false のまま） */
  previewSectionLabels?: boolean;
  /** true のときのみ 01 などの番号ラベルを表示 */
  showSectionNumbers?: boolean;
  deferBlockMediaUntilVisible?: boolean;
}) {
  return (
    <WorkDetailMediaOptionsProvider deferMediaUntilVisible={deferBlockMediaUntilVisible}>
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
    </WorkDetailMediaOptionsProvider>
  );
}
