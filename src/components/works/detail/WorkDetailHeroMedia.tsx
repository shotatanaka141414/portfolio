"use client";

import { useEffect, useMemo, useRef, useState } from "react";

import { publicAssetUrl } from "@/lib/public-asset-url";

import { useWorkDetailMediaOptions } from "./WorkDetailMediaOptions";

type Props = {
  file?: string;
  className?: string;
};

/** 作品詳細のファーストビュー用メディア。動画優先、見つからなければ画像へフォールバック */
export function WorkDetailHeroMedia({ file, className = "" }: Props) {
  const { deferMediaUntilVisible } = useWorkDetailMediaOptions();
  const [canLoad, setCanLoad] = useState(!deferMediaUntilVisible);
  const [index, setIndex] = useState(0);
  const holdRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!deferMediaUntilVisible) return;
    setCanLoad(false);
    setIndex(0);
  }, [file, deferMediaUntilVisible]);

  useEffect(() => {
    if (!deferMediaUntilVisible || canLoad) return;
    const el = holdRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setCanLoad(true);
          io.disconnect();
        }
      },
      { root: null, rootMargin: "160px 0px", threshold: 0.01 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [deferMediaUntilVisible, canLoad, file]);

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
    /** images/works/*.mp4 は .vercelignore 対象のため videos/works を先に試す */
    const raw = [
      ...direct,
      `/videos/works/${enc}`,
      `/images/works/${enc}`,
      `/images/works/detail/${enc}`,
      `/videos/works/detail/${enc}`,
      `/images/${enc}`,
      `/videos/${enc}`,
      `/images/works/${baseEnc}.jpg`,
      `/images/works/${baseEnc}.png`,
      `/images/works/detail/${baseEnc}.jpg`,
      `/images/works/detail/${baseEnc}.png`,
    ];
    return raw.map((p) => publicAssetUrl(p));
  }, [file]);

  if (!canLoad) {
    return (
      <div ref={holdRef} className={`h-full w-full bg-zinc-100 ${className}`} aria-hidden />
    );
  }

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
