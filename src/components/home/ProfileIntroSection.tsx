import Image from "next/image";

import { ImageWithFallback } from "./ImageWithFallback";

const BIO =
  "大手広告代理店制作会社、大手コンサルティング会社にて、事業のリブランディング、サービスリニューアルのUI・情報設計・サービス設計を担当。デザイン支援をしたサービスはデザイン賞やリニューアル後売上３倍以上にした実績を持つ。デザイン思考に基づいたプランニング、ユーザーのニーズを引き出すインタビュー設計、ニーズに基づいた体験設計・情報設計、ブランドを昇華させるUIデザインに情熱を注ぎ、デザインリサーチからアウトプットまで一気通貫した活動を行っている。現在は独立し、あらゆる企業のデザイン支援、ベンチャー企業のCDOとして活動している。";

/** 格納: public/images/home/awards/<slug>.png — iF のみロゴが横長のため frame を分岐 */
const AWARDS = [
  { slug: "if-design", label: "iF Design", frame: "landscape" as const },
  { slug: "red-dot", label: "Red Dot", frame: "square" as const },
  { slug: "good-design", label: "Good Design", frame: "square" as const },
  { slug: "ces-innovation", label: "CES Innovation", frame: "square" as const },
] as const;

function awardFrameClass(frame: "square" | "landscape") {
  if (frame === "landscape") {
    return "relative h-[100px] w-[160px] shrink-0 overflow-hidden sm:h-[133px] sm:w-[212px]";
  }
  return "relative h-[100px] w-[100px] shrink-0 overflow-hidden sm:h-[133px] sm:w-[133px]";
}

function awardFallbackClass(frame: "square" | "landscape") {
  if (frame === "landscape") {
    return "flex h-[100px] w-[160px] shrink-0 items-center justify-center bg-zinc-100 text-center font-en text-[10px] font-bold leading-tight text-zinc-600 sm:h-[133px] sm:w-[212px] sm:text-xs";
  }
  return "flex h-[100px] w-[100px] shrink-0 items-center justify-center bg-zinc-100 text-center font-en text-[10px] font-bold leading-tight text-zinc-600 sm:h-[133px] sm:w-[133px] sm:text-xs";
}

export function ProfileIntroSection() {
  return (
    <section className="mx-auto w-full max-w-[1512px] px-5 pb-16 md:px-20 md:pb-[120px]">
      <div className="flex flex-col gap-12 lg:flex-row lg:items-center lg:gap-20">
        <div className="relative mx-auto aspect-[546/820] w-full max-w-[546px] shrink-0 overflow-hidden bg-zinc-200 lg:mx-0">
          <Image
            src="/images/home/profile-bg-6da149.png"
            alt=""
            fill
            className="object-cover"
            sizes="(max-width:1024px) 100vw, 546px"
          />
        </div>

        <div className="flex min-w-0 max-w-[726px] flex-col justify-center gap-8 lg:gap-20">
          <div className="flex flex-col gap-8">
            <h2 className="font-en text-[clamp(2rem,5vw,3rem)] font-bold leading-[1.5] tracking-tight text-[#242424]">
              Hello, I&apos;m Shota.
            </h2>
            <p className="text-base font-normal leading-[1.8] text-[#242424]">
              {BIO}
            </p>
          </div>
          <div className="flex flex-col gap-4">
            <p className="font-en text-[32px] font-bold leading-[1.5] text-[#242424]">
              Award
            </p>
            <div className="flex flex-wrap gap-2 sm:gap-3">
              {AWARDS.map(({ slug, label, frame }) => (
                <ImageWithFallback
                  key={slug}
                  src={`/images/home/awards/${slug}.png`}
                  alt={label}
                  containerClassName={awardFrameClass(frame)}
                  className={
                    frame === "landscape"
                      ? "px-2 py-1.5 sm:px-3 sm:py-2"
                      : "p-2"
                  }
                  fallback={
                    <div className={awardFallbackClass(frame)}>{label}</div>
                  }
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
