import type { ReactNode } from "react";

/**
 * MY APPROACH「AIドリブンフロー」SP 用（Figma node 2575:7965）
 */

function GradientFrame({
  gradient,
  children,
}: {
  gradient: string;
  children: ReactNode;
}) {
  return (
    <div className={`flex h-full min-h-0 flex-col rounded-sm bg-gradient-to-br p-px ${gradient}`}>
      <div className="flex min-h-0 flex-1 flex-col gap-[13px] rounded-[3px] bg-white p-6">{children}</div>
    </div>
  );
}

const AI_PHASES = [
  {
    kind: "gradient" as const,
    gradient: "from-[#f1c1ac] to-[#d3eaee]",
    titleEn: "Design＆Develop",
    titleColor: "#A98C7F",
    titleJa: "高速プロトタイピングと実装",
    details: `仮説に基づくMVP（最小機能製品）の開発
マルチパターンの開発
Cursor / Claude を活用したUIデザイン・実装`,
  },
  {
    kind: "solid" as const,
    border: "#D9B0E3",
    titleEn: "Deliver\n ",
    titleColor: "#B461C8",
    titleJa: "マーケットへの早期公開",
    details: `分析ツールの導入
先行公開によるリアルタイム検証
A/Bテストによる定量的評価`,
  },
  {
    kind: "gradient" as const,
    gradient: "from-[#d3edd1] to-[#f7f1d2]",
    titleEn: "Discover＆Define",
    titleColor: "#82AB81",
    titleJa: "実データに基づく課題の再定義",
    details: `ユーザー行動ログからの摩擦特定
先行配信者への定性インタビューの分析
市場適合性（PMF）の評価とピボット判断`,
  },
] as const;

export function ApproachAiSpDiagram() {
  return (
    <div className="scrollbar-hide -mr-5 flex min-h-[341px] min-w-0 items-stretch gap-1 overflow-x-auto pb-1 pr-5 [-webkit-overflow-scrolling:touch]">
      {AI_PHASES.map((p) => {
        const inner = (
          <>
            <h3
              className="whitespace-pre-line font-en text-[40px] font-bold leading-[1.3]"
              style={{ color: p.titleColor }}
            >
              {p.titleEn}
            </h3>
            <div className="flex flex-col gap-2.5">
              <p className="text-[20px] font-bold leading-[1.6] text-[#242424]">{p.titleJa}</p>
              <p className="whitespace-pre-line text-sm font-normal leading-[1.6] text-[#242424]">
                {p.details}
              </p>
            </div>
          </>
        );

        if (p.kind === "gradient") {
          return (
            <div key={p.titleEn} className="flex w-[min(85vw,280px)] shrink-0 self-stretch">
              <GradientFrame gradient={p.gradient}>{inner}</GradientFrame>
            </div>
          );
        }

        return (
          <article
            key={p.titleEn}
            className="flex w-[min(85vw,280px)] shrink-0 flex-col gap-[13px] self-stretch border bg-white p-6"
            style={{ borderColor: p.border, borderWidth: 1 }}
          >
            {inner}
          </article>
        );
      })}
    </div>
  );
}
