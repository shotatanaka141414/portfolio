"use client";

import { useState, type ReactNode } from "react";

type Props = {
  src: string;
  alt: string;
  /** img に付与（object-contain / padding など） */
  className?: string;
  /** 外枠（position: relative と固定サイズを含むこと） */
  containerClassName: string;
  fallback: ReactNode;
};

/**
 * public 配下のローカル画像用。next/image の最適化経由だと環境によって onError が期待どおり動かないため、
 * ネイティブ img で表示する。
 */
export function ImageWithFallback({
  src,
  alt,
  className = "",
  containerClassName,
  fallback,
}: Props) {
  const [failed, setFailed] = useState(false);
  if (failed) return <>{fallback}</>;
  return (
    <div className={containerClassName}>
      <img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        className={`absolute inset-0 box-border h-full w-full object-contain ${className}`}
        onError={() => setFailed(true)}
      />
    </div>
  );
}
