export type WorkDetailHero = {
  headline: string;
  summary: string;
  date: string;
  tags: string[];
  roles: string[];
  mediaFile?: string;
};

/**
 * 作品詳細の 1 ブロック。レイアウトは **`type` のみ**が決定する。
 * - **`mediaTextTwoCol`** … 左上にラベル＋見出し／**中央**にメディア／**右下**に本文（3カラム）
 * - **`imageLeftTextRight`** … **左**にメディア／**右**にラベル〜本文を縦積み（2カラム。上記とは別コンポーネント）
 * 同じ `eyebrow`/`title`/`body` でも `type` を誤るとレイアウトだけ変わる。番号（`sectionNumber`）は表示・id 用でレイアウトに無関係。
 * 未指定時は配列順で 1 始まりの番号が当たる。
 */
export type WorkDetailBlock =
  | {
      sectionNumber?: number;
      type: "mediaTextTwoCol";
      eyebrow: string;
      title: string;
      body: string;
      mediaFile?: string;
      reverse?: boolean;
    }
  | {
      sectionNumber?: number;
      type: "imageLeftTextRight";
      eyebrow: string;
      title: string;
      body: string;
      mediaFile?: string;
      /** true のとき右にメディア・左にテキスト（モバイルはテキスト上） */
      reverse?: boolean;
    }
  | {
      sectionNumber?: number;
      type: "fullImageOverlay";
      eyebrow: string;
      title: string;
      body: string;
      mediaFile?: string;
      align?: "left" | "right";
    }
  | {
      sectionNumber?: number;
      type: "headlineBody";
      eyebrow: string;
      title: string;
      body: string;
    }
  | {
      sectionNumber?: number;
      type:
        | "quoteTwoLeft"
        | "quoteTwoRight"
        | "barStarOne"
        | "circleBarOne"
        | "doubleBarTwo"
        | "upOne"
        | "quoteOneRight"
        | "lOne"
        | "lineOne";
      eyebrow: string;
      title: string;
      body: string;
      mediaFile?: string;
      align?: "left" | "right";
    };

export type WorkDetailConfig = {
  hero: WorkDetailHero;
  blocks: WorkDetailBlock[];
};

/** 表示用セクション番号（ラベル・DOM id 用）。レイアウト種別とは無関係。 */
export function resolveWorkDetailSectionNumber(block: WorkDetailBlock, index: number): number {
  return block.sectionNumber ?? index + 1;
}

const DEFAULT_BLOCKS: WorkDetailBlock[] = [
  {
    type: "mediaTextTwoCol",
    eyebrow: "Design Approach",
    title: "2週間単位のデザインスプリントを11回実施",
    body:
      "セカンドビュー以降はテンプレートコンポーネントを指定して構築します。ここは共通テンプレートのダミーです。作品ごとに本文・画像・レイアウト種別を差し替え可能です。",
  },
];

const IDARE_DETAIL: WorkDetailConfig = {
  hero: {
    headline: "**楽しく貯める**\n**貯蓄体験**を\nデザインする",
    summary:
      "数十億円の残高を保有する貯蓄アプリ。\n残高を増加させることで、提供会社・ユーザーどちらにも\nメリットがより生まれるようにディレクションから\nUIUXデザインまでを一貫して支援。",
    date: "2024.9 - 2026.3",
    tags: ["APP", "Payment", "Renewal"],
    roles: ["UIUX Design", "Design Direction", "Information Architect"],
    mediaFile: "IDARE.mp4",
  },
  blocks: [
    {
      sectionNumber: 1,
      type: "quoteTwoLeft",
      eyebrow: "Design Approach",
      title: "継続につながる体験の骨格を定義する",
      body:
        "事業ゴールとユーザー心理の両面から、まず優先すべき体験と導線の整理から着手しました。",
      mediaFile: "IDARE.mp4",
    },
    {
      sectionNumber: 2,
      type: "quoteTwoRight",
      eyebrow: "My Role",
      title: "体験戦略から実装伴走までを一気通貫で担当",
      body:
        "リサーチ、体験設計、情報設計、UI デザインまでを横断。開発チームと短サイクルで意思決定し、仮説検証を高速に回しました。",
      mediaFile: "IDARE.mp4",
    },
    {
      sectionNumber: 3,
      type: "doubleBarTwo",
      eyebrow: "Research",
      title: "貯蓄動機と離脱要因の両面を可視化",
      body:
        "定量ログとインタビューを突き合わせ、いつ・なぜアプリを開くか／離れるかを整理。優先課題をスプリント単位で切り出し、検証可能な単位に落とし込みました。",
      mediaFile: "IDARE.mp4",
    },
    {
      sectionNumber: 5,
      /** 左上ラベル＋見出し／中央メディア／右下本文（`imageLeftTextRight` にすると2カラムになり誤りやすい） */
      type: "mediaTextTwoCol",
      eyebrow: "Design Approach",
      title: "貯蓄体験を継続させるUIを再設計",
      body:
        "日々の入出金導線を極力シンプルにしながら、利用動機を維持するフィードバックを画面内に配置。KPI とユーザー心理の両面で継続を設計しました。",
      mediaFile: "IDARE.mp4",
    },
  ],
};

const SHIKAZIKA_DETAIL: WorkDetailConfig = {
  hero: {
    headline: "課題を解き、\n体験価値を\n最大化する",
    summary:
      "この作品の詳細は順次実装予定です。\nファーストビューは共通レイアウトで統一し、\nセカンドビュー以降はテンプレートを指定して\n作品ごとに柔軟に構築していきます。",
    date: "2024.1 - 2025.12",
    tags: ["APP"],
    roles: ["UIUX Design"],
    mediaFile: "shikazika.mp4",
  },
  blocks: [
    {
      sectionNumber: 1,
      type: "mediaTextTwoCol",
      eyebrow: "Design Approach",
      title: "貯蓄体験を継続させるUIを再設計",
      body:
        "日々の入出金導線を極力シンプルにしながら、利用動機を維持するフィードバックを画面内に配置。KPI とユーザー心理の両面で継続を設計しました。",
      mediaFile: "shikazika.mp4",
    },
    {
      sectionNumber: 2,
      type: "lineOne",
      eyebrow: "Design Approach",
      title: "2週間単位のデザインスプリントを11回実施",
      body:
        "アプリ内の「料金プランの確認」などの体験をリサーチから再定義し、1年半かけて計11回の2週間単位のデザインスプリントを実施。延べ73名へのインタビューを通じて、利用動機と行動の変化を可視化しながら改善を進めました。",
      mediaFile: "shikazika.mp4",
    },
    {
      sectionNumber: 3,
      type: "quoteTwoRight",
      eyebrow: "Achievement",
      title: "』two テンプレート",
      body: "「two」の左右反転版。上部ストリップと本文の順序も反転。",
      mediaFile: "shikazika.mp4",
    },
  ],
};

const JA_KYOSAI_APP_DETAIL: WorkDetailConfig = {
  hero: {
    headline: "課題を解き、\n体験価値を\n最大化する",
    summary:
      "この作品の詳細は順次実装予定です。\nファーストビューは共通レイアウトで統一し、\nセカンドビュー以降はテンプレートを指定して\n作品ごとに柔軟に構築していきます。",
    date: "2024.1 - 2025.12",
    tags: ["APP"],
    roles: ["UIUX Design"],
    mediaFile: "JA.mp4",
  },
  blocks: [
    {
      sectionNumber: 1,
      type: "doubleBarTwo",
      eyebrow: "My Role",
      title: "｜｜two テンプレート",
      body: "左右 420 相当のメディアに中央テキストを置くタイプ。",
      mediaFile: "JA.mp4",
    },
    {
      sectionNumber: 2,
      type: "quoteTwoLeft",
      eyebrow: "Achievement",
      title: "「 two」テンプレート",
      body: "左に 520x600 メディア、右に 792 幅のテキストを配置する構成。",
      mediaFile: "JA.mp4",
    },
    {
      sectionNumber: 3,
      type: "lineOne",
      eyebrow: "Design Approach",
      title: "2週間単位のデザインスプリントを11回実施",
      body:
        "アプリ内の「料金プランの確認」などの体験をリサーチから再定義し、1年半かけて計11回の2週間単位のデザインスプリントを実施。延べ73名へのインタビューを通じて、利用動機と行動の変化を可視化しながら改善を進めました。",
      mediaFile: "JA.mp4",
    },
    {
      sectionNumber: 4,
      type: "mediaTextTwoCol",
      eyebrow: "Design Approach",
      title: "貯蓄体験を継続させるUIを再設計",
      body:
        "日々の入出金導線を極力シンプルにしながら、利用動機を維持するフィードバックを画面内に配置。KPI とユーザー心理の両面で継続を設計しました。",
      mediaFile: "JA.mp4",
    },
  ],
};

const SCRAMBERRY_WALLET_DETAIL: WorkDetailConfig = {
  hero: {
    headline: "課題を解き、\n体験価値を\n最大化する",
    summary:
      "この作品の詳細は順次実装予定です。\nファーストビューは共通レイアウトで統一し、\nセカンドビュー以降はテンプレートを指定して\n作品ごとに柔軟に構築していきます。",
    date: "2024.1 - 2025.12",
    tags: ["APP"],
    roles: ["UIUX Design"],
    mediaFile: "scramberry.mp4",
  },
  blocks: [
    {
      sectionNumber: 1,
      type: "lineOne",
      eyebrow: "Design Approach",
      title: "2週間単位のデザインスプリントを11回実施",
      body:
        "アプリ内の「料金プランの確認」などの体験をリサーチから再定義し、1年半かけて計11回の2週間単位のデザインスプリントを実施。延べ73名へのインタビューを通じて、利用動機と行動の変化を可視化しながら改善を進めました。",
      mediaFile: "scramberry.mp4",
    },
    {
      sectionNumber: 2,
      type: "quoteTwoLeft",
      eyebrow: "Achievement",
      title: "「 two」テンプレート",
      body: "左に 520x600 メディア、右に 792 幅のテキストを配置する構成。",
      mediaFile: "scramberry.mp4",
    },
    {
      sectionNumber: 3,
      type: "mediaTextTwoCol",
      eyebrow: "Design Approach",
      title: "貯蓄体験を継続させるUIを再設計",
      body:
        "日々の入出金導線を極力シンプルにしながら、利用動機を維持するフィードバックを画面内に配置。KPI とユーザー心理の両面で継続を設計しました。",
      mediaFile: "scramberry.mp4",
    },
  ],
};

const MY_AU_DETAIL: WorkDetailConfig = {
  hero: {
    headline: "課題を解き、\n体験価値を\n最大化する",
    summary:
      "この作品の詳細は順次実装予定です。\nファーストビューは共通レイアウトで統一し、\nセカンドビュー以降はテンプレートを指定して\n作品ごとに柔軟に構築していきます。",
    date: "2024.1 - 2025.12",
    tags: ["APP"],
    roles: ["UIUX Design"],
    mediaFile: "kddi.mp4",
  },
  blocks: [
    {
      sectionNumber: 1,
      type: "quoteTwoLeft",
      eyebrow: "Achievement",
      title: "「 two」テンプレート",
      body: "左に 520x600 メディア、右に 792 幅のテキストを配置する構成。",
      mediaFile: "kddi.mp4",
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
      type: "lineOne",
      eyebrow: "Design Approach",
      title: "2週間単位のデザインスプリントを11回実施",
      body:
        "アプリ内の「料金プランの確認」などの体験をリサーチから再定義し、1年半かけて計11回の2週間単位のデザインスプリントを実施。延べ73名へのインタビューを通じて、利用動機と行動の変化を可視化しながら改善を進めました。",
      mediaFile: "kddi.mp4",
    },
    {
      sectionNumber: 4,
      type: "mediaTextTwoCol",
      eyebrow: "Design Approach",
      title: "貯蓄体験を継続させるUIを再設計",
      body:
        "日々の入出金導線を極力シンプルにしながら、利用動機を維持するフィードバックを画面内に配置。KPI とユーザー心理の両面で継続を設計しました。",
      mediaFile: "kddi.mp4",
    },
    {
      sectionNumber: 5,
      type: "doubleBarTwo",
      eyebrow: "My Role",
      title: "｜｜two テンプレート",
      body: "左右 420 相当のメディアに中央テキストを置くタイプ。",
      mediaFile: "kddi.mp4",
    },
  ],
};

const PLAYADS_DETAIL: WorkDetailConfig = {
  hero: {
    headline: "課題を解き、\n体験価値を\n最大化する",
    summary:
      "この作品の詳細は順次実装予定です。\nファーストビューは共通レイアウトで統一し、\nセカンドビュー以降はテンプレートを指定して\n作品ごとに柔軟に構築していきます。",
    date: "2024.1 - 2025.12",
    tags: ["APP"],
    roles: ["UIUX Design"],
    mediaFile: "playads.mp4",
  },
  blocks: [
    {
      sectionNumber: 1,
      type: "mediaTextTwoCol",
      eyebrow: "Design Approach",
      title: "貯蓄体験を継続させるUIを再設計",
      body:
        "日々の入出金導線を極力シンプルにしながら、利用動機を維持するフィードバックを画面内に配置。KPI とユーザー心理の両面で継続を設計しました。",
      mediaFile: "playads.mp4",
    },
    {
      sectionNumber: 4,
      type: "lineOne",
      eyebrow: "Design Approach",
      title: "2週間単位のデザインスプリントを11回実施",
      body:
        "アプリ内の「料金プランの確認」などの体験をリサーチから再定義し、1年半かけて計11回の2週間単位のデザインスプリントを実施。延べ73名へのインタビューを通じて、利用動機と行動の変化を可視化しながら改善を進めました。",
      mediaFile: "playads.mp4",
    },
    {
      sectionNumber: 5,
      type: "quoteTwoLeft",
      eyebrow: "Achievement",
      title: "「 two」テンプレート",
      body: "左に 520x600 メディア、右に 792 幅のテキストを配置する構成。",
      mediaFile: "playads.mp4",
    },
  ],
};

export function getWorkDetailConfig(slug: string): WorkDetailConfig {
  if (slug === "idare") return IDARE_DETAIL;
  if (slug === "shikazika") return SHIKAZIKA_DETAIL;
  if (slug === "ja-kyosai-app") return JA_KYOSAI_APP_DETAIL;
  if (slug === "scramberry-wallet") return SCRAMBERRY_WALLET_DETAIL;
  if (slug === "my-au") return MY_AU_DETAIL;
  if (slug === "playads") return PLAYADS_DETAIL;

  return {
    hero: {
      headline: "課題を解き、\n体験価値を\n最大化する",
      summary:
        "この作品の詳細は順次実装予定です。\nファーストビューは共通レイアウトで統一し、\nセカンドビュー以降はテンプレートを指定して\n作品ごとに柔軟に構築していきます。",
      date: "2024.1 - 2025.12",
      tags: ["APP"],
      roles: ["UIUX Design"],
    },
    blocks: DEFAULT_BLOCKS,
  };
}
