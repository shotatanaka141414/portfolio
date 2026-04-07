"use client";

import { useState } from "react";

import { ResponsiveDiagramImage } from "./ResponsiveDiagramImage";

const DESCRIPTION_CLASSIC =
  "複雑なステークホルダー間の合意形成が必要なプロジェクトで採用するフローです。 徹底したユーザーリサーチから「Desirability（魅力性）」の根源を特定し、チーム全員が納得できるビジョンを構築します。人間中心設計に基づき、一貫性のあるサービス体験を確実にデリバリーすることに重きを置きます。";

const DESCRIPTION_AI =
  "AIを活用し、高速でアイデアをDesign & Developしてサービスを実装することで、仮説段階のプロダクトをいち早く市場へ投入します。。実際のユーザー行動という「答え」から、Discover & Define（課題の再定義）を逆引きで行います。リソースを最小限に抑えつつ、市場適合性（PMF）を最短距離で探るアプローチです。";

const APPROACH_PC = "/images/home/my-approach.jpg";
const APPROACH_SP = "/images/home/my-approach-sp.jpg";
const APPROACH_AI_PC = "/images/home/my-approach-ai.jpg";
const APPROACH_AI_SP = "/images/home/my-approach-ai-sp.jpg";

type TabId = "classic" | "ai";

const tabBase =
  "flex w-56 items-center justify-center px-4 py-4 transition duration-200";

export function ApproachSection() {
  const [tab, setTab] = useState<TabId>("classic");

  return (
    <section className="mx-auto w-full max-w-[1512px] px-5 pb-16 md:px-20 md:pb-[120px]">
      <div className="mb-8 flex flex-col gap-4">
        <h2 className="font-en text-[clamp(2rem,5vw,3.25rem)] font-bold leading-[1.3] text-[#242424]">
          MY APPROACH
        </h2>
        <p className="w-full text-[18px] font-normal leading-[1.5] text-[#242424] md:text-left">
          目的や企業形態に応じて2つのデザインアプローチを使い分けます。
        </p>
      </div>

      <div
        className="mb-8 flex flex-wrap gap-2"
        role="tablist"
        aria-label="アプローチの種類"
      >
        <button
          type="button"
          role="tab"
          aria-selected={tab === "classic"}
          onClick={() => setTab("classic")}
          className={`${tabBase} ${
            tab === "classic"
              ? "bg-[#242424] text-white shadow-sm hover:bg-zinc-800"
              : "border border-[#888888] text-[#6D6D6D] hover:border-[#242424] hover:bg-zinc-50 hover:text-[#242424]"
          }`}
        >
          <span
            className={`text-center text-xl leading-[1.5] ${
              tab === "classic" ? "font-bold" : "font-normal"
            }`}
          >
            従来フロー
          </span>
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={tab === "ai"}
          onClick={() => setTab("ai")}
          className={`${tabBase} ${
            tab === "ai"
              ? "bg-[#242424] text-white shadow-sm hover:bg-zinc-800"
              : "border border-[#888888] text-[#6D6D6D] hover:border-[#242424] hover:bg-zinc-50 hover:text-[#242424]"
          }`}
        >
          <span
            className={`text-center text-xl leading-[1.5] ${
              tab === "ai" ? "font-bold" : "font-normal"
            }`}
          >
            AIドリブンフロー
          </span>
        </button>
      </div>

      <div role="tabpanel" className="w-full">
        <p className="mb-10 w-full max-w-[848px] text-base font-normal leading-[1.8] text-[#242424]">
          {tab === "classic" ? DESCRIPTION_CLASSIC : DESCRIPTION_AI}
        </p>

        {tab === "classic" ? (
          <ResponsiveDiagramImage
            pcSrc={APPROACH_PC}
            spSrc={APPROACH_SP}
            alt="MY APPROACH — Discover、Define、Design、Develop、Deliverのプロセス図"
          />
        ) : (
          <ResponsiveDiagramImage
            pcSrc={APPROACH_AI_PC}
            spSrc={APPROACH_AI_SP}
            alt="MY APPROACH — AIドリブンフロー（Design＆Develop、Discover＆Define、Deliver）の説明図"
          />
        )}
      </div>
    </section>
  );
}
