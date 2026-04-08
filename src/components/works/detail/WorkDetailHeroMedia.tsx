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
    const enc = encodeURIComponent(file);
    const base = file.replace(/\.[^.]+$/, "");
    return [
      `/images/works/${enc}`,
      `/videos/works/${enc}`,
      `/images/works/detail/${enc}`,
      `/videos/works/detail/${enc}`,
      `/images/works/${base}.jpg`,
      `/images/works/${base}.png`,
      `/images/works/detail/${base}.jpg`,
      `/images/works/detail/${base}.png`,
    ];
  }, [file]);

  const src = candidates[index];
  const isVideo = !!src && /\.mp4(\?|$)/i.test(src);

  if (!src) {
    return <div className={`h-full w-full bg-zinc-200 ${className}`} />;
  }

  if (isVideo) {
    return (
      <video
        key={src}
        className={`h-full w-full object-cover ${className}`}
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
      onError={() => setIndex((i) => i + 1)}
    />
  );
}
