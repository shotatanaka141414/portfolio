import Link from "next/link";

import type { WorkItem } from "@/data/works";
import { publicAssetUrl } from "@/lib/public-asset-url";
import type { WorkDetailHero as HeroData } from "@/data/work-details";

import { WorkDetailHeroMedia } from "./WorkDetailHeroMedia";

/** 前の作品へ: ホバーで円内を黒塗り、矢印を白に */
function HeroPrevWorkButton({ target }: { target: WorkItem }) {
  return (
    <Link
      href={`/works/${target.slug}`}
      prefetch={true}
      className="group inline-flex h-12 w-12 shrink-0 items-center justify-center transition"
      aria-label={`前の作品: ${target.title}`}
    >
      <svg
        viewBox="0 0 80 80"
        fill="none"
        className="h-12 w-12"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden
      >
        <circle
          cx="40"
          cy="40"
          r="39.5"
          fill="transparent"
          stroke="#242424"
          strokeWidth={1}
          className="transition-[fill,stroke] group-hover:fill-[#242424] group-hover:stroke-[#242424]"
        />
        <path
          d="M40.1421 54.2843L26 40.1421L40.1421 26"
          stroke="#242424"
          strokeWidth={1}
          className="transition-colors group-hover:stroke-white"
        />
        <path
          d="M26.3535 40.1421H53.9307"
          stroke="#242424"
          strokeWidth={1}
          strokeLinecap="square"
          className="transition-colors group-hover:stroke-white"
        />
      </svg>
    </Link>
  );
}

/** 次の作品へ: ホバーは HeroPrevWorkButton と同じ（円が黒、矢印が白） */
function HeroNextWorkButton({ target }: { target: WorkItem }) {
  return (
    <Link
      href={`/works/${target.slug}`}
      prefetch={true}
      className="group inline-flex h-12 w-12 shrink-0 items-center justify-center transition"
      aria-label={`次の作品: ${target.title}`}
    >
      <svg
        viewBox="0 0 80 80"
        fill="none"
        className="h-12 w-12"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden
      >
        <circle
          cx="40"
          cy="40"
          r="39.5"
          fill="transparent"
          stroke="#242424"
          strokeWidth={1}
          className="transition-[fill,stroke] group-hover:fill-[#242424] group-hover:stroke-[#242424]"
        />
        <path
          d="M40.1421 26L54.2842 40.1421L40.1421 54.2843"
          stroke="#242424"
          strokeWidth={1}
          className="transition-colors group-hover:stroke-white"
        />
        <path
          d="M53.9307 40.1421H26.3535"
          stroke="#242424"
          strokeWidth={1}
          strokeLinecap="square"
          className="transition-colors group-hover:stroke-white"
        />
      </svg>
    </Link>
  );
}

function renderHeadlineWithBold(raw: string) {
  const lines = raw.split("\n");
  return lines.map((line, i) => {
    const parts = line.split(/(\*\*.*?\*\*)/g).filter(Boolean);
    return (
      <span key={`${line}-${i}`} className="block">
        {parts.map((part, j) => {
          const isBold = part.startsWith("**") && part.endsWith("**");
          const text = isBold ? part.slice(2, -2) : part;
          return (
            <span key={`${text}-${j}`} className={isBold ? "font-bold" : "font-light"}>
              {text}
            </span>
          );
        })}
      </span>
    );
  });
}

export function WorkDetailHero({
  work,
  hero,
  prev,
  next,
}: {
  work: WorkItem;
  hero: HeroData;
  /** 一覧順の前作品（先頭では末尾へループ）。未指定時は矢印ナビを出さない */
  prev?: WorkItem | null;
  /** 一覧順の次作品（末尾では先頭へループ）。未指定時は矢印ナビを出さない */
  next?: WorkItem | null;
}) {
  return (
    <section className="mx-auto w-full max-w-[1512px] px-5 pb-40 pt-6 md:px-20 md:pt-10">
      <div className="flex flex-col gap-10 lg:flex-row lg:items-stretch lg:gap-[60px]">
        <div className="flex w-full max-w-[440px] flex-col lg:min-h-0">
          {(prev || next) && (
            <div className="mb-8 flex items-center gap-4">
              {prev ? <HeroPrevWorkButton target={prev} /> : null}
              {next ? <HeroNextWorkButton target={next} /> : null}
            </div>
          )}

          <div className="flex flex-1 flex-col justify-center">
            <div className="mb-4 flex items-center gap-4">
              <h1 className="font-sans text-xl font-bold leading-[1.28] text-[#242424]">
                {work.title}
              </h1>
              <span className="h-6 w-px bg-[#D1D1D1]" aria-hidden />
              <p className="font-sans text-sm font-normal leading-[1.83] text-[#242424]">
                {work.client}
              </p>
            </div>

            <div className="space-y-10">
              <p className="text-[clamp(2rem,4.2vw,3.25rem)] leading-[1.4] text-[#242424]">
                {renderHeadlineWithBold(hero.headline)}
              </p>
              <p className="whitespace-normal text-base font-light leading-[1.8] text-[#242424] md:whitespace-pre-line">
                {hero.summary}
              </p>
            </div>
          </div>
        </div>

        <div className="relative w-full max-w-[852px]">
          <div className="aspect-[3/5] w-full overflow-hidden bg-zinc-100 lg:aspect-[852/822]">
            <WorkDetailHeroMedia file={hero.mediaFile ?? work.videoFile} />
          </div>

          {work.awards?.some((a) => a === "gooddesign" || a === "reddot") ? (
            <div className="pointer-events-none absolute right-3 top-[-12px] z-10 flex flex-col items-end gap-1 sm:right-4 sm:top-[-8px] md:gap-1">
              {work.awards.includes("gooddesign") && (
                <img
                  src={publicAssetUrl("/images/works/award-gooddesign.png")}
                  alt="Good Design Award"
                  className="h-[72px] w-[72px] sm:h-[100px] sm:w-[100px] md:h-[123px] md:w-[123px]"
                />
              )}
              {work.awards.includes("reddot") && (
                <img
                  src={publicAssetUrl("/images/works/award-reddot.png")}
                  alt="Red Dot Award"
                  className="h-[64px] w-[64px] sm:h-[88px] sm:w-[88px] md:h-[110px] md:w-[110px]"
                />
              )}
            </div>
          ) : null}

          {work.awards?.includes("if-design") ? (
            <div className="pointer-events-none absolute right-3 top-3 z-10 sm:right-4 sm:top-4">
              <img
                src={publicAssetUrl("/images/works/award-if-design-2026.png")}
                alt="iF Design Award 2026"
                className="h-[36px] w-[70px] object-contain object-right sm:h-[50px] sm:w-[98px] md:h-[62px] md:w-[120px]"
              />
            </div>
          ) : null}

          <div className="absolute left-0 top-0 bg-white px-4 py-2 text-sm font-normal leading-6 text-[#242424]">
            {hero.date}
          </div>

          <div className="absolute bottom-4 right-4 flex flex-col items-end gap-1">
            {hero.tags.map((tag) => (
              <span
                key={tag}
                className="text-sm font-normal leading-6 text-[#242424] [text-shadow:0_0_10px_rgba(255,255,255,0.95),0_0_3px_rgba(255,255,255,1),0_1px_4px_rgba(0,0,0,0.45)]"
              >
                #{tag}
              </span>
            ))}
          </div>

          <div className="absolute bottom-0 left-0 flex flex-col items-start gap-0">
            {hero.roles.map((role) => (
              <span
                key={role}
                className="inline-flex w-fit bg-white pr-4 text-[clamp(1rem,2.3vw,1.5rem)] font-light leading-[1.625] text-[#242424] lg:text-[clamp(1.5rem,2.3vw,2rem)]"
              >
                {role}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
