"use client";

import { useMemo, useState } from "react";

type Props = {
  file?: string;
  className?: string;
};

/** 作品詳細のファーストビュー用メディア。動画優先、見つからなければ画像へフォールバック */
export function WorkDetailHeroMedia({ file, className = "" }: Props) {
  const [index, setIndex] = useState(0);

  const candidates = useMemo(() => {
    if (!file) return [] as string[];
    const normalized = file.replace(/^\/+/, "");
    const enc = normalized
      .split("/")
      .map((segment) => encodeURIComponent(segment))
      .join("/");
    const base = normalized.replace(/\.[^.]+$/, "");
    const baseEnc = base
      .split("/")
      .map((segment) => encodeURIComponent(segment))
      .join("/");
    const direct = normalized.includes("/") ? [`/${enc}`] : [];
    return [
      ...direct,
      `/images/${enc}`,
      `/videos/${enc}`,
      `/images/works/${enc}`,
      `/videos/works/${enc}`,
      `/images/works/detail/${enc}`,
      `/videos/works/detail/${enc}`,
      `/images/works/${baseEnc}.jpg`,
      `/images/works/${baseEnc}.png`,
      `/images/works/detail/${baseEnc}.jpg`,
      `/images/works/detail/${baseEnc}.png`,
    ];
  }, [file]);

  const src = candidates[index];
  const isVideo = !!src && /\.(mp4|mov|webm|ogg|m4v)(\?|$)/i.test(src);
  const normalizedFile = (file ?? "").toLowerCase();
  const cropStyle =
    normalizedFile.includes("scramberry-01.mov")
      ? ({ clipPath: "inset(4px 0 4px 0)" } as const)
      : normalizedFile.includes("scramberry-02.mov")
        ? ({ clipPath: "inset(0 2px 0 2px)" } as const)
        : undefined;

  if (!src) {
    return <div className={`h-full w-full bg-zinc-200 ${className}`} />;
  }

  if (isVideo) {
    return (
      <video
        key={src}
        className={`h-full w-full object-cover ${className}`}
        style={cropStyle}
        src={src}
        muted
        loop
        playsInline
        autoPlay
        preload="metadata"
        onError={() => setIndex((i) => i + 1)}
      />
    );
  }

  return (
    <img
      src={src}
      alt=""
      className={`h-full w-full object-cover ${className}`}
      style={cropStyle}
      onError={() => setIndex((i) => i + 1)}
    />
  );
}
