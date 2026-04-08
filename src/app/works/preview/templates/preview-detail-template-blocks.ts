import type { WorkDetailBlock } from "@/data/work-details";

type BlockType = WorkDetailBlock["type"];

/**
 * `/works/preview/templates` に **最低1件ずつ** 載せる `type`。
 * ここを編集したら、下の `PREVIEW_DETAIL_TEMPLATE_BLOCKS` に対応するブロックを追加すること。
 * 不足があると `assertPreviewTemplatesCoverRequired` が throw し **next build が失敗**する。
 */
export const PREVIEW_REQUIRED_TEMPLATE_TYPES = [
  "mediaTextTwoCol",
  "imageLeftTextRight",
  "quoteTwoLeft",
  "quoteTwoRight",
  "doubleBarTwo",
  "lineOne",
] as const satisfies readonly BlockType[];

function assertPreviewTemplatesCoverRequired(blocks: WorkDetailBlock[]): void {
  const used = new Set(blocks.map((b) => b.type));
  const missing = PREVIEW_REQUIRED_TEMPLATE_TYPES.filter((t) => !used.has(t));
  if (missing.length > 0) {
    throw new Error(
      `[works/preview/templates] 次の type が1件もありません: ${missing.join(", ")}。` +
        " preview-detail-template-blocks.ts の PREVIEW_DETAIL_TEMPLATE_BLOCKS を編集してください。"
    );
  }
}

/**
 * テンプレート一覧プレビュー専用。**`work-details.ts` や作品 slug からは参照しない。**
 */
export const PREVIEW_DETAIL_TEMPLATE_BLOCKS: WorkDetailBlock[] = [
  {
    sectionNumber: 1,
    type: "mediaTextTwoCol",
    eyebrow: "Design Approach",
    title: "貯蓄体験を継続させるUIを再設計",
    body:
      "日々の入出金導線を極力シンプルにしながら、利用動機を維持するフィードバックを画面内に配置。KPI とユーザー心理の両面で継続を設計しました。",
    mediaFile: "JA.mp4",
  },
  {
    sectionNumber: 2,
    type: "quoteTwoRight",
    eyebrow: "Achievement",
    title: "』two テンプレート",
    body: "「two」の左右反転版。上部ストリップと本文の順序も反転。",
    mediaFile: "kddi.mp4",
  },
  {
    sectionNumber: 3,
    type: "doubleBarTwo",
    eyebrow: "My Role",
    title: "｜｜two テンプレート",
    body: "左右 420 相当のメディアに中央テキストを置くタイプ。",
    mediaFile: "playads.mp4",
  },
  {
    sectionNumber: 4,
    type: "lineOne",
    eyebrow: "Design Approach",
    title: "2週間単位のデザインスプリントを11回実施",
    body:
      "アプリ内の「料金プランの確認」などの体験をリサーチから再定義し、1年半かけて計11回の2週間単位のデザインスプリントを実施。延べ73名へのインタビューを通じて、利用動機と行動の変化を可視化しながら改善を進めました。",
    mediaFile: "atom.mp4",
  },
  {
    sectionNumber: 5,
    type: "quoteTwoLeft",
    eyebrow: "Achievement",
    title: "「 two」テンプレート",
    body: "左に 520x600 メディア、右に 792 幅のテキストを配置する構成。",
    mediaFile: "atom.mp4",
  },
  {
    sectionNumber: 6,
    type: "mediaTextTwoCol",
    eyebrow: "Design Approach",
    title: "貯蓄体験を継続させるUIを再設計",
    body:
      "日々の入出金導線を極力シンプルにしながら、利用動機を維持するフィードバックを画面内に配置。KPI とユーザー心理の両面で継続を設計しました。",
    mediaFile: "IDARE.mp4",
  },
  {
    sectionNumber: 7,
    type: "imageLeftTextRight",
    eyebrow: "Design Approach",
    title: "貯蓄体験を継続させるUIを再設計",
    body:
      "日々の入出金導線を極力シンプルにしながら、利用動機を維持するフィードバックを画面内に配置。KPI とユーザー心理の両面で継続を設計しました。",
    mediaFile: "atom.mp4",
  },
];

assertPreviewTemplatesCoverRequired(PREVIEW_DETAIL_TEMPLATE_BLOCKS);
