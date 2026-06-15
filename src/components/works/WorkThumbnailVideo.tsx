"use client";

import { useEffect, useRef, useState } from "react";

import { publicAssetUrl } from "@/lib/public-asset-url";

type Props = {
  slug: string;
  /** 例: IDARE.mp4 — 省略時は `<slug>.mp4` */
  videoFile?: string;
};

/**
 * サムネイル用動画。public/videos/works/ に配置
 * アスペクト比は親で確保し、video は absolute で塗りつぶし（高さ 0 問題を避ける）
 */
export function WorkThumbnailVideo({ slug, videoFile }: Props) {
  const [videoError, setVideoError] = useState(false);
  const [pathIndex, setPathIndex] = useState(0);
  const [hoverActive, setHoverActive] = useState(false);
  const [isSp, setIsSp] = useState(false);
  const [inView, setInView] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const fileName = videoFile ?? `${slug}.mp4`;
  const encoded = encodeURIComponent(fileName);
  /** R2 / CDN は images/works 配下。Vercel 直配信用に videos/works をフォールバック */
  const candidateSrcs = [
    publicAssetUrl(`/images/works/${encoded}`),
    publicAssetUrl(`/videos/works/${encoded}`),
  ] as const;
  const src = candidateSrcs[pathIndex] ?? candidateSrcs[0];

  useEffect(() => {
    setVideoError(false);
    setPathIndex(0);
    setHoverActive(false);
  }, [fileName]);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const onChange = () => setIsSp(mq.matches);
    onChange();
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
      },
      { root: null, threshold: 0.35 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const active = isSp ? inView : hoverActive;

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (active) {
      void video.play().catch(() => {
        // autoplay block時は静止フレームのままにする
      });
      return;
    }

    video.pause();
  }, [active, src]);

  if (videoError) {
    return (
      <div className="flex aspect-[694/668] w-full items-center justify-center bg-zinc-200 text-sm text-zinc-500">
        <span className="font-en tracking-wide">Video</span>
      </div>
    );
  }

  return (
    <div
      ref={rootRef}
      className="relative aspect-[694/668] w-full overflow-hidden bg-zinc-100"
      onMouseEnter={() => setHoverActive(true)}
      onMouseLeave={() => setHoverActive(false)}
      onTouchStart={() => setHoverActive(true)}
    >
      <video
        key={src}
        ref={videoRef}
        className="absolute inset-0 h-full w-full object-cover"
        src={src}
        muted
        loop
        playsInline
        preload="metadata"
        aria-hidden
        onError={(e) => {
          if (pathIndex < candidateSrcs.length - 1) {
            setPathIndex((prev) => prev + 1);
            return;
          }
          setVideoError(true);
        }}
      />
    </div>
  );
}
