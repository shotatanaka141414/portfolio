"use client";

import { useState } from "react";

const SLOT =
  "flex h-[72px] w-[200px] shrink-0 items-center justify-center p-3 sm:h-[80px] sm:w-[220px]";

/** 格納 PNG はそのまま表示（白／カラーいずれも素材に合わせて調整） */
const LOGO_IMG =
  "max-h-14 w-full max-w-[200px] object-contain sm:max-h-16";

function CareerLogoFallback({ type }: { type: "gusho" | "accenture" | "hakuhodo" }) {
  if (type === "gusho") {
    return (
      <span className="font-en text-lg font-bold tracking-tight text-white sm:text-xl">
        GUSHO
      </span>
    );
  }
  if (type === "accenture") {
    return (
      <span className="font-en text-lg font-bold tracking-tight text-white sm:text-xl">
        &gt; Accenture
      </span>
    );
  }
  return (
    <span className="text-center font-en text-sm font-bold leading-tight text-white sm:text-base">
      HAKUHODO
      <br />
      <span className="text-xs font-normal">I-STUDIO</span>
    </span>
  );
}

/**
 * 格納: public/images/home/career/<ファイル名>
 * 未配置・読み込み失敗時はテキストフォールバック
 */
export function CareerLogoSlot({
  logoSrc,
  logoFallback,
}: {
  logoSrc: string;
  logoFallback: "gusho" | "accenture" | "hakuhodo";
}) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div className={SLOT}>
        <CareerLogoFallback type={logoFallback} />
      </div>
    );
  }

  return (
    <div className={SLOT}>
      <img
        src={logoSrc}
        alt=""
        className={LOGO_IMG}
        onError={() => setFailed(true)}
      />
    </div>
  );
}
