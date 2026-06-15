"use client";

import { useState } from "react";

import type { WorkItem } from "@/data/works";
import { publicAssetUrl, publicAssetUrlCandidates } from "@/lib/public-asset-url";

function OptionalBadge({
  assetPath,
  shortLabel,
  sizeClass,
  objectFit = "cover",
}: {
  assetPath: string;
  shortLabel: string;
  sizeClass: string;
  objectFit?: "cover" | "contain";
}) {
  const candidates = publicAssetUrlCandidates(assetPath);
  const [index, setIndex] = useState(0);
  const [failed, setFailed] = useState(false);
  const src = candidates[index] ?? candidates[0] ?? assetPath;

  if (failed) {
    return (
      <div
        className={`flex shrink-0 items-center justify-center rounded border border-white/80 bg-white/95 text-[10px] font-bold text-zinc-800 ${sizeClass}`}
      >
        {shortLabel}
      </div>
    );
  }
  return (
    <div
      className={`relative shrink-0 overflow-hidden rounded-sm ${sizeClass}`}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt=""
        className={objectFit === "contain" ? "h-full w-full object-contain" : "h-full w-full object-cover"}
        onError={() => {
          if (index < candidates.length - 1) {
            setIndex((prev) => prev + 1);
            return;
          }
          setFailed(true);
        }}
      />
    </div>
  );
}

/** Figma: サムネ右上に Good Design / Red Dot バッジ（画像は任意・未配置時は略称） */
export function AwardBadges({ awards }: { awards?: WorkItem["awards"] }) {
  if (!awards?.length) return null;

  return (
    <>
      {awards.some((a) => a === "gooddesign" || a === "reddot") ? (
        <div className="pointer-events-none absolute right-3 top-[-12px] z-10 flex flex-col items-end gap-1 sm:right-4 sm:top-[-8px] md:gap-1">
          {awards.includes("gooddesign") && (
            <OptionalBadge
              assetPath="/images/works/award-gooddesign.png"
              shortLabel="GD"
              sizeClass="h-[72px] w-[72px] sm:h-[100px] sm:w-[100px] md:h-[123px] md:w-[123px]"
            />
          )}
          {awards.includes("reddot") && (
            <OptionalBadge
              assetPath="/images/works/award-reddot.png"
              shortLabel="RD"
              sizeClass="h-[64px] w-[64px] sm:h-[88px] sm:w-[88px] md:h-[110px] md:w-[110px]"
            />
          )}
        </div>
      ) : null}
      {awards.includes("if-design") ? (
        <div className="pointer-events-none absolute right-3 top-3 z-10 sm:right-4 sm:top-4">
          <OptionalBadge
            assetPath="/images/works/award-if-design-2026.png"
            shortLabel="iF"
            sizeClass="h-[36px] w-[70px] sm:h-[50px] sm:w-[98px] md:h-[62px] md:w-[120px]"
            objectFit="contain"
          />
        </div>
      ) : null}
    </>
  );
}
