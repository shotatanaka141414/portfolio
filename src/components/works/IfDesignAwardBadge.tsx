"use client";

import { useState } from "react";

import { publicAssetUrlCandidates } from "@/lib/public-asset-url";

const ASSET_PATH = "/images/works/award-if-design-2026.png";

export function IfDesignAwardBadge({ className }: { className?: string }) {
  const candidates = publicAssetUrlCandidates(ASSET_PATH);
  const [index, setIndex] = useState(0);
  const [failed, setFailed] = useState(false);
  const src = candidates[index] ?? candidates[0] ?? ASSET_PATH;

  if (failed) {
    return (
      <div
        className={`flex items-center justify-center rounded border border-[#242424]/20 bg-white/95 text-[10px] font-bold text-zinc-800 ${className ?? ""}`}
      >
        iF
      </div>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt="iF Design Award 2026"
      className={className}
      onError={() => {
        if (index < candidates.length - 1) {
          setIndex((prev) => prev + 1);
          return;
        }
        setFailed(true);
      }}
    />
  );
}
