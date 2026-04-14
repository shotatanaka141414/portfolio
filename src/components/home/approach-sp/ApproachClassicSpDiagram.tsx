/**
 * MY APPROACH「従来フロー」SP 用（Figma node 2575:7915）
 */
const PHASES = [
  {
    titleEn: "Discover",
    titleJa: "顧客ニーズを発見する",
    details: `デプスインタビュー
ステークホルダーインタビュー
デスクトップリサーチ
競合分析
UX/UIトレンドリサーチ
ASIS分析
エキスパートレビュー
ビジュアル/主要UI画面のコンセプトデザイン`,
    border: "#A5DAA3",
    titleColor: "#4BB548",
  },
  {
    titleEn: "Define",
    titleJa: `リサーチ情報を元に
未来の体験・アイデアを考える`,
    details: `アイデア構想ワークショップ
顧客インサイトの抽出
アイデアのDVF検証
ビジョン/バリュー/コンセプトの言語化
ロードマップ作成
ビジュアル/主要UI画面のコンセプトデザイン
コミュニケーションデザイン定義`,
    border: "#EFE3A5",
    titleColor: "#DEC64B",
  },
  {
    titleEn: "Design",
    titleJa: "体験・アイデアを具象化する",
    details: `ユーザー体験のストーリーマップ
ジャーニーマップ
主要機能の選定
情報設計
ワイヤーフレームの作成`,
    border: "#F3BFA9",
    titleColor: "#E68054",
  },
  {
    titleEn: "Develop",
    titleJa: "開発する",
    details: `プロトタイピング
ユーザーテスト
イテレーション
ソリューションの検証
全画面UIデザイン
デザインガイドラインの作成
デザインコンポーネント精緻化
画面遷移図`,
    border: "#A5D6E1",
    titleColor: "#4CADC2",
  },
  {
    titleEn: "Deliver",
    titleJa: "実装・運用する",
    details: `画面要件定義
マーケティング設計
マーケットへの導入
ユーザーフィードバック
運用設計`,
    border: "#D9B0E3",
    titleColor: "#B461C8",
  },
] as const;

export function ApproachClassicSpDiagram() {
  return (
    <div className="scrollbar-hide -mr-5 flex min-w-0 gap-1 overflow-x-auto pb-1 pr-5 [-webkit-overflow-scrolling:touch]">
      {PHASES.map((p) => (
        <article
          key={p.titleEn}
          className="flex w-[min(85vw,280px)] shrink-0 flex-col gap-[13px] border bg-white p-6"
          style={{ borderColor: p.border, borderWidth: 1 }}
        >
          <h3
            className="font-en text-[40px] font-bold leading-[1.3]"
            style={{ color: p.titleColor }}
          >
            {p.titleEn}
          </h3>
          <div className="flex flex-col gap-2.5">
            <p className="whitespace-pre-line text-[20px] font-bold leading-[1.6] text-[#242424]">
              {p.titleJa}
            </p>
            <p className="whitespace-pre-line text-sm font-normal leading-[1.6] text-[#242424]">
              {p.details}
            </p>
          </div>
        </article>
      ))}
    </div>
  );
}
