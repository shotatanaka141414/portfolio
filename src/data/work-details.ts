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
      mediaFiles?: string[];
      reverse?: boolean;
    }
  | {
      sectionNumber?: number;
      type: "imageLeftTextRight";
      eyebrow: string;
      title: string;
      body: string;
      mediaFile?: string;
      mediaFiles?: string[];
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
      mediaFiles?: string[];
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
      mediaFiles?: string[];
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

/**
 * セカンドビュー以降のメディアは作品ごと・セクションごとに別ファイルを割り当てる。
 * 実ファイル格納先（R2 バケット portfolio-media）:
 * - images/detail/Nafty/
 * - images/detail/Centillion System/
 * 公開 URL 例: NEXT_PUBLIC_MEDIA_CDN_BASE + /images/detail/Nafty/nafty-01.png
 *
 * ローカル fallback:
 * - /public/videos/works/detail
 * - /public/images/works/detail
 */
function withPerSectionDetailMedia(slug: string, blocks: WorkDetailBlock[]): WorkDetailBlock[] {
  if (slug === "idare") {
    const idareMediaByBlock = [
      ["images/detail/IDARE/idare-01.png", "images/detail/IDARE/idare-02.png"],
      ["images/detail/IDARE/idare-03.png", "images/detail/IDARE/idare-04.png"],
      ["images/detail/IDARE/idare-05.png", "images/detail/IDARE/idare-06.png"],
      ["images/detail/IDARE/idare-07.png"],
    ];
    return blocks.map((block, index) => {
      const files = idareMediaByBlock[index] ?? [];
      return {
        ...block,
        mediaFile: files[0],
        mediaFiles: files.length ? files : undefined,
      };
    });
  }

  if (slug === "nafty") {
    const naftyMediaByBlock = [
      ["images/detail/Nafty/nafty-01.png", "images/detail/Nafty/nafty-02.png"],
      ["images/detail/Nafty/nafty-03.png"],
      ["images/detail/Nafty/nafty-04.png"],
      ["images/detail/Nafty/nafty-05.png"],
    ];
    return blocks.map((block, index) => {
      const files = naftyMediaByBlock[index] ?? [];
      return {
        ...block,
        mediaFile: files[0],
        mediaFiles: files.length ? files : undefined,
      };
    });
  }

  if (slug === "creative-asset-production") {
    const centillionMediaByBlock = [
      [
        "images/detail/Centillion System/centillion-system-01.png",
        "images/detail/Centillion System/centillion-system-02.mov",
      ],
      ["images/detail/Centillion System/centillion-system-03.png"],
      [
        "images/detail/Centillion System/centillion-system-04.png",
        "images/detail/Centillion System/centillion-system-05.png",
      ],
      ["images/detail/Centillion System/centillion-system-06.png"],
    ];
    return blocks.map((block, index) => {
      const files = centillionMediaByBlock[index] ?? [];
      return {
        ...block,
        mediaFile: files[0],
        mediaFiles: files.length ? files : undefined,
      };
    });
  }

  if (slug === "shikazika") {
    const shikazikaMediaByBlock = [
      ["images/detail/SHIKAZIKA/shikazika-01.png"],
      ["images/detail/SHIKAZIKA/shikazika-02.png"],
      ["images/detail/SHIKAZIKA/shikazika-03.png", "images/detail/SHIKAZIKA/shikazika-04.png"],
    ];
    return blocks.map((block, index) => {
      const files = shikazikaMediaByBlock[index] ?? [];
      return {
        ...block,
        mediaFile: files[0],
        mediaFiles: files.length ? files : undefined,
      };
    });
  }

  if (slug === "my-au") {
    const myAuMediaByBlock = [
      ["images/detail/My au/myau-01.png", "images/detail/My au/myau-02.png"],
      ["images/detail/My au/myau-03.png", "images/detail/My au/myau-04.png"],
      ["images/detail/My au/myau-05.png"],
      ["images/detail/My au/myau-06.png"],
      ["images/detail/My au/myau-07.png", "images/detail/My au/myau-08.png"],
    ];
    return blocks.map((block, index) => {
      const files = myAuMediaByBlock[index] ?? [];
      return {
        ...block,
        mediaFile: files[0],
        mediaFiles: files.length ? files : undefined,
      };
    });
  }

  if (slug === "scramberry-wallet") {
    const scramberryMediaByBlock = [
      ["images/detail/scramberry WALLET/scramberry-01.mov"],
      [
        "images/detail/scramberry WALLET/scramberry-02.mov",
        "images/detail/scramberry WALLET/scramberry-03.png",
      ],
      ["images/detail/scramberry WALLET/scramberry-04.png"],
    ];
    return blocks.map((block, index) => {
      const files = scramberryMediaByBlock[index] ?? [];
      return {
        ...block,
        mediaFile: files[0],
        mediaFiles: files.length ? files : undefined,
      };
    });
  }

  if (slug === "ja-kyosai-app") {
    const jaMediaByBlock = [
      ["images/detail/JA/JAkyousai-01.png", "images/detail/JA/JAkyousai-02.png"],
      ["images/detail/JA/JAkyousai-03.png", "images/detail/JA/JAkyousai-04.png"],
      ["images/detail/JA/JAkyousai-05.png"],
      ["images/detail/JA/JAkyousai-06.png"],
    ];
    return blocks.map((block, index) => {
      const files = jaMediaByBlock[index] ?? [];
      return {
        ...block,
        mediaFile: files[0],
        mediaFiles: files.length ? files : undefined,
      };
    });
  }

  if (slug === "playads") {
    const playadsMediaByBlock = [
      ["images/detail/PlayAds/playads-01.png"],
      ["images/detail/PlayAds/playads-02.png"],
      ["images/detail/PlayAds/playads-03.png", "images/detail/PlayAds/playads-04.png"],
    ];
    return blocks.map((block, index) => {
      const files = playadsMediaByBlock[index] ?? [];
      return {
        ...block,
        mediaFile: files[0],
        mediaFiles: files.length ? files : undefined,
      };
    });
  }

  if (slug === "honda-design-system") {
    const hondaMediaByBlock = [
      ["images/detail/Honda Design System/honda-01.png"],
      ["images/detail/Honda Design System/honda-02.png"],
      ["images/detail/Honda Design System/honda-03.png", "images/detail/Honda Design System/honda-04.png"],
    ];
    return blocks.map((block, index) => {
      const files = hondaMediaByBlock[index] ?? [];
      return {
        ...block,
        mediaFile: files[0],
        mediaFiles: files.length ? files : undefined,
      };
    });
  }

  if (slug === "peer-worker") {
    const peerMediaByBlock = [
      ["images/detail/peerworker/peerworker-01.png", "images/detail/peerworker/peerworker-02.png"],
      ["images/detail/peerworker/peerworker-03.png"],
      ["images/detail/peerworker/peerworker-04.png"],
    ];
    return blocks.map((block, index) => {
      const files = peerMediaByBlock[index] ?? [];
      return {
        ...block,
        mediaFile: files[0],
        mediaFiles: files.length ? files : undefined,
      };
    });
  }

  if (slug === "yucho-pay") {
    const yuchoMediaByBlock = [
      ["images/detail/yucho/yucho-01.png"],
      ["images/detail/yucho/yucho-02.png"],
      ["images/detail/yucho/yucho-03.png"],
    ];
    return blocks.map((block, index) => {
      const files = yuchoMediaByBlock[index] ?? [];
      return {
        ...block,
        mediaFile: files[0],
        mediaFiles: files.length ? files : undefined,
      };
    });
  }

  if (slug === "ploom-tech") {
    const ploomMediaByBlock = [
      ["images/detail/ploomtech/ploomtech-01.png", "images/detail/ploomtech/ploomtech-02.png"],
      ["images/detail/ploomtech/ploomtech-03.png", "images/detail/ploomtech/ploomtech-04.png"],
      ["images/detail/ploomtech/ploomtech-05.png"],
    ];
    return blocks.map((block, index) => {
      const files = ploomMediaByBlock[index] ?? [];
      return {
        ...block,
        mediaFile: files[0],
        mediaFiles: files.length ? files : undefined,
      };
    });
  }

  if (slug === "nissan-gt-r") {
    const nissanMediaByBlock = [
      ["images/detail/Nissan GT-R/nissangtr-01.png", "images/detail/Nissan GT-R/nissangtr-02.png"],
      ["images/detail/Nissan GT-R/nissangtr-03.png"],
    ];
    return blocks.map((block, index) => {
      const files = nissanMediaByBlock[index] ?? [];
      return {
        ...block,
        mediaFile: files[0],
        mediaFiles: files.length ? files : undefined,
      };
    });
  }

  if (slug === "kume-sekkei") {
    const kumeMediaByBlock = [
      ["images/detail/kume-sekkei/kumesekkei-01.png", "images/detail/kume-sekkei/kumesekkei-02.png"],
      ["images/detail/kume-sekkei/kumesekkei-03.png"],
      ["images/detail/kume-sekkei/kumesekkei-04.png"],
    ];
    return blocks.map((block, index) => {
      const files = kumeMediaByBlock[index] ?? [];
      return {
        ...block,
        mediaFile: files[0],
        mediaFiles: files.length ? files : undefined,
      };
    });
  }

  if (slug === "atom-interaction") {
    const atomMediaByBlock = [
      ["images/detail/atom/atom-01.png"],
      ["images/detail/atom/atom-02.mov", "images/detail/atom/atom-03.mov"],
      ["images/detail/atom/atom-04.mov"],
    ];
    return blocks.map((block, index) => {
      const files = atomMediaByBlock[index] ?? [];
      return {
        ...block,
        mediaFile: files[0],
        mediaFiles: files.length ? files : undefined,
      };
    });
  }

  return blocks.map((block, index) => ({
    ...block,
    mediaFile: `${slug}-detail-${String(index + 1).padStart(2, "0")}.mp4`,
  }));
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

/** サムネ・本文・画像を後から入れる作品用 */
const PLACEHOLDER_DETAIL_BLOCKS: WorkDetailBlock[] = [
  {
    type: "headlineBody",
    eyebrow: "Overview",
    title: "準備中",
    body: "サムネイル・画像・説明文は追って追加予定です。",
  },
];

const NAFTY_DETAIL: WorkDetailConfig = {
  hero: {
    headline: "**医療・看護の**\n**独自シフト作成**を\nデザインする",
    summary:
      "医療現場のシフト作成は、複雑な条件を整理しながら調整を繰り返す必要があり、多くの現場で毎月2〜3日を要していました。Naftyでは、Generative AIと数理最適化を組み合わせ、人の意図をそのまま制約条件へと変換することで、シフト作成のプロセス自体をリデザインした。",
    date: "2025.5 - 2025.9",
    tags: ["ShiftUI", "Nurseism", "Time-reduction"],
    roles: ["UIUX Design", "Service Design", "Information Architect"],
    mediaFile: "Nafty.mp4",
  },
  blocks: [
    {
      sectionNumber: 3,
      type: "doubleBarTwo",
      eyebrow: "Background",
      title: "シフトはスタッフのスキルや家庭事情などの複雑な状況を捉えた上で作成される",
      body:
        "医療現場におけるシフト作成は、単なるスケジュール調整ではなく、勤務希望、スキルバランス、法的制約、連勤・夜勤の連続性など、多数の条件が複雑に絡み合う制約充足問題であった。その結果、多くの現場ではシフト作成に毎月2〜3日を費やし、担当者の大きな負担となっている。一方で、数理最適化を用いたシステムも存在するが、設定の難易度が高く、現場への導入率は10%未満に留まっている。つまり課題は「効率化ツールがないこと」ではなく、「人が扱える形で複雑さを扱えていないこと」にあった。",
    },
    {
      sectionNumber: 4,
      type: "lineOne",
      eyebrow: "Architecture",
      title: "数式を扱うのではなく、\n意図を扱う設計へ",
      body:
        "従来の「条件を設定して最適化する」というアプローチを見直し、「人の意図を起点にシフトを生成する」設計へと転換。ユーザーは複雑な条件を入力する代わりに、「子供が小さいから夜遅くのシフトは入れたくない」「この人とこの人は基本セットで勤務させたい」といった自然言語で意図を伝えるだけで、AIが制約へと変換し、最適なシフトを生成。AIと数理最適化を接続し、「人の思考プロセス」と「アルゴリズムの処理」を橋渡しする体験設計を行った。",
    },
    {
      sectionNumber: 6,
      type: "mediaTextTwoCol",
      eyebrow: "Experience",
      title: "シフト作成を、\n対話する体験へ",
      body:
        "Naftyの体験は、従来のシステムのような入力作業ではなく、AIとの対話を通じて進行。シフトはワンクリックで自動生成され、その後の調整も「もう少し均等にしたい」「この週は人を厚くしたい」といった曖昧なリクエストを伝えるだけで反映・編集できるような体験を構築した。さらに、現場の看護師はモバイルアプリから希望提出や確認ができ、シフト作成者と現場の間にあったコミュニケーションコストも大きく削減された。",
    },
    {
      sectionNumber: 7,
      type: "imageLeftTextRight",
      eyebrow: "Experience",
      title: "3日かかっていた業務を、30分へ",
      body:
        "Naftyの導入により、シフト作成にかかる時間は従来の約3日から、最短30分まで短縮。また、導入した医療機関では継続率100%を記録しており、「精神的な負担が大きく軽減された」という声も多く寄せられている。さらに、本プロジェクトは iF Design Award を受賞し、その革新性と社会的意義が国際的にも評価された。単なる効率化にとどまらず、医療現場における働き方そのものを改善するプロダクトとして成果を上げている。",
    },
  ],
};

const CREATIVE_ASSET_PRODUCTION_DETAIL: WorkDetailConfig = {
  hero: {
    headline: "**クラウド・AIを**\n**伝わるカタチ**に\nデザインする",
    summary:
      "クラウド活用やAI導入は、多くの企業にとって必要不可欠でありながら、その価値や活用イメージは十分に伝わっていないケースが多く存在する。本プロジェクトでは、センティリオンシステムの提供価値を、抽象から具体へと自然につながる構造として設計し、サービス理解から問い合わせへとつながる体験を構築。",
    date: "2025.6 - Now",
    tags: ["Cloud", "AI-Transformation", "Intangible-services"],
    roles: ["UIUX Design", "Service Design", "Information Architect"],
    mediaFile: "Centillion-system.mp4",
  },
  blocks: [
    {
      sectionNumber: 2,
      type: "quoteTwoRight",
      eyebrow: "Background",
      title: "無形サービスを、理解される状態へ",
      body:
        "無形サービスを提供する企業にとって、「何をしている会社なのか」「依頼すると何が実現できるのか」は伝わりづらい。センティリオンシステムも例外ではなく、クラウド・AIという専門性の高さゆえに、サービスの価値や提供範囲が直感的に理解されにくく、情報を見ても自分ごと化されにくい状態にあった。従来の構成ではサービスの羅列に留まり、理解される前に離脱される構造になっていたため、本プロジェクトでは単なるデザイン刷新ではなく、“無形サービスを伝わる体験へ再設計すること”を目的に、情報設計から見直しを行った。",
    },
    {
      sectionNumber: 6,
      type: "mediaTextTwoCol",
      eyebrow: "Approach",
      title: "抽象から具体へ、\n意思決定を導く\n構造設計",
      body:
        "UIやビジュアルの前に、まず「理解される構造」を設計することから着手した。ユーザーは最初からサービス詳細を理解できるわけではないため、VisionやValueといった抽象情報からServiceやCaseといった具体情報へ自然に遷移する体験を設計し、情報の順序そのものを再構築した。また、コンバージョンに至る心理プロセスを「共感・期待・行動」の3ステップに分解し、それぞれに必要な情報を定義して全チャネルに一貫して適用。さらに、専門性の高い内容をそのまま提示するのではなく、概念と具体事例を往復させることで理解負荷を下げ、「読めばわかる」ではなく「見れば理解できる」状態を目指した。",
    },
    {
      sectionNumber: 5,
      type: "quoteTwoLeft",
      eyebrow: "Experience",
      title: "すべての接点を、体験に変える",
      body:
        "コーポレートサイト単体ではなく、複数の接点を横断した体験として設計した。Webサイトでは初回訪問ユーザーに対して共感から期待、行動へとスムーズに遷移する導線を構築し、情報の粒度と順序を最適化。サービス資料やパンフレットでは課題の言語化から提供価値の理解、事例による納得までを一貫した流れとして設計し、「読む資料」ではなく意思決定を後押しする体験へと再構築した。さらにイベントブースでは、遠目で興味を引き、内容を理解し、対話へとつなげる流れを空間として設計し、壁面・展示台それぞれに役割を持たせることで短時間でも価値が伝わる構造を実現。これらすべてを「粒子=知の集合」というビジュアルコンセプトで統一し、チャネルを横断して一貫したブランド体験を構築した。",
    },
    {
      sectionNumber: 4,
      type: "lineOne",
      eyebrow: "My Role",
      title: "戦略から実装まで、\n体験を一貫して設計",
      body:
        "体験設計からアウトプットまでを一貫して担当し、単一制作物ではなく複数チャネルを横断した設計として統合した。具体的には、UX設計および情報設計、サイトマップと導線設計、デザインコンセプトの策定、ビジュアルデザイン（Web・サービス資料・パンフレット・イベントブース）、コンテンツ構成およびコピー設計までを担当し、戦略から表現までを一貫して設計することで、無形サービスを「理解される状態」に変換した。",
    },
  ],
};

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
      eyebrow: "Background",
      title:
        "IDAREならではの貯蓄体験で\nユーザー層の拡大、総残高向上を目指した",
      body:
        "リニューアル前は残高に対して年率2%還元するメリット以外でIDAREを使うユーザーが少なかった。そのためメインユーザーはポイ活ユーザーになっており、ユーザー数/総残高が伸びにくくなっていた。同時に銀行が金利を上げていく中で価格競争だけではないIDAREならではの体験が必要になり、大型リニューアルを行った。",
      mediaFile: "IDARE.mp4",
    },
    {
      sectionNumber: 2,
      type: "quoteTwoRight",
      eyebrow: "Approach",
      title:
        "ユーザー中心は当たり前、\nビジネスドリブンで進めた機能開発",
      body:
        "IDAREの残高は別サービスのFlex Capitalという融資サービスの資金源となり、そこで生まれた利益がIDAREのユーザーにボーナスとして還元される仕組みになっている。そのためIDAREの残高を増やせば増やすほど、運営会社の売上が上がり、ボーナスとしてIDAREユーザーに還元ができるため、ユーザー中心設計は当たり前で考えつつ、ビジネスとしてどう残高を増やすのかを考えた機能開発を行なった。",
      mediaFile: "IDARE.mp4",
    },
    {
      sectionNumber: 3,
      type: "doubleBarTwo",
      eyebrow: "Experience",
      title:
        "貯まる実感と\nつかう喜びを\n体現した情報設計",
      body:
        "ユーザーインタビューでは「推し活のためにコツコツ積立ていたら、毎月1000円分のボーナスを獲得でき、推し活に使えるお金が増えた」など残高が増えることで喜びを感じ、IDAREを利用し続けてくれるユーザーが多かった。そして貯めた残高を何かの支払いに使うことによってIDAREで貯蓄してきてよかったと価値を感じていることがわかった。そのため「ためる」と「つかう」を分けて情報設計し、貯める行動とつかう行動を明確に分けてそれぞれに集中できるような設計をデザインした。",
      mediaFile: "IDARE.mp4",
    },
    {
      sectionNumber: 5,
      type: "imageLeftTextRight",
      eyebrow: "Interface",
      title:
        "お金が貯まったちょっと先の未来を\n想像しながら貯められるUIデザイン",
      body:
        "窓の結露を拭うと少し先の未来の情景が見えるようなイラストで、意味を持たないお金に、ユーザーそれぞれの意味を持たせながら貯めていけるようにデザイン。開くたびに増えた残高とその残高をつかうイメージを持ち、日常にワクワク感を醸成することを目指したUIをデザインした。",
      mediaFile: "IDARE.mp4",
    },
  ],
};

const SHIKAZIKA_DETAIL: WorkDetailConfig = {
  hero: {
    headline: "**企業Date Base**\n**AI Platform**を\nデザインする",
    summary:
      "企業ごとにAIプラットフォームを作成し、外部に漏れることなく秘匿データをAIが学習し、企業独自のAIが育ち、業務効率化できるサービスをデザイン。",
    date: "2024.10 - 2025.02",
    tags: ["WebService", "AI Platform", "Enterprise"],
    roles: ["UIUX Design", "Information Architect"],
    mediaFile: "shikazika.mp4",
  },
  blocks: [
    {
      sectionNumber: 1,
      type: "imageLeftTextRight",
      eyebrow: "Background",
      title: "セキュリティを気にせず利用できる\nAI Platformの開発",
      body:
        "秘匿性の高いデータはセキュリティの関係上、既存のAIプラットフォームにはアップロードできない。そのため地方の会社では特にAI化が進んでいない。またデータではなく紙を使ったデータ保持をしていることが多いため、簡単にはAI活用ができず、業務効率が難しい状態である。そのためSHIKAZIKAではセキュリティを気にせず、紙書類も手間なくデータ化し、AIとコミュニケーションを取ることで、今まで業務効率を諦めていた業界の手助けとなるサービスを目指した。",
      mediaFile: "shikazika.mp4",
    },
    {
      sectionNumber: 2,
      type: "mediaTextTwoCol",
      eyebrow: "Experience",
      title: "AIと会話しながら\nデータを深掘り",
      body:
        "会社全体の数あるデータをAIが探してくれたり、一緒にデータを深掘りできるように設計。現在AIがどのデータを見ながらユーザーと会話しているのか理解しながら利用できるようになっている。またデータ化しづらい紙書類もスキャンするだけで自動的に構造化し、検索・深掘りが可能となっている。説明書がなくてもAIと会話していけば自然と使いこなせていけるサービス体験を実現した。",
      mediaFile: "shikazika.mp4",
    },
    {
      sectionNumber: 3,
      type: "quoteTwoRight",
      eyebrow: "Interface",
      title: "使い慣れたChat GPTを\n想起させるUIデザイン",
      body:
        "AIプラットフォームで一番利用されているChat GPTのレイアウトをあえて使うことで、初めてSHIKAZIKAを触ったユーザーも学習コストなく利用できるように設計。",
      mediaFile: "shikazika.mp4",
    },
  ],
};

const JA_KYOSAI_APP_DETAIL: WorkDetailConfig = {
  hero: {
    headline: "**安心がいつでも**\n**手元にある体験を**\nデザインする",
    summary:
      "JA共済加入者が共済内容の確認、もしもの時に備えた家族との情報共有、共済金請求など今までわかりづらかったデザインや導線を全体的に一新するために、既存ユーザーへのヒアリング、UIUXデザイン設計を支援。",
    date: "2023.7 - 2023.12",
    tags: ["APP", "Insurance", "Renewal"],
    roles: ["UIUX Design", "Service Design", "Design Research"],
    mediaFile: "JA.mp4",
  },
  blocks: [
    {
      sectionNumber: 1,
      type: "doubleBarTwo",
      eyebrow: "Background",
      title: "相互扶助の精神を\nJA共済アプリで\n体現する",
      body:
        "約100年前、賀川豊彦が掲げた相互扶助の精神。\n彼の志は、人々の生活を守り、助け合いを繁栄させるための基盤を築くことだった。\nデジタルの時代において、相互扶助のあり方を今一度考える局面に来ており、\n生活者は今の時代にあった体験を望んでいたが、JA共済ではそれができていなかった。リニューアルで賀川豊彦の遺志を継承し、さらに進化させることを目的としてプロジェクトが始まった。単純に新しい技術をアプリに組み込むのではなく、\n社会的な取り組み、予測、予防、対応の仕組みを構築し人々の暮らしをより強固にケア・繋げるための新しい共済の形を創り上げることを目指した。",
      mediaFile: "JA.mp4",
    },
    {
      sectionNumber: 2,
      type: "quoteTwoLeft",
      eyebrow: "Research",
      title: "そもそもJA共済利用者は\nJA共済アプリに何を望んでいるのか",
      body:
        "そもそもの保険に対する意識や、JA共済全体の体験、JA共済アプリの体験という観点から、定量200人、定性12人の調査を実施した。その結果、JA共済利用者の中には、家族に農業従事者がいて「アプリを使わなくてもJA担当者に任せているため、すべてをデジタル化されると逆に面倒」と感じる人もいれば、地域によってはJA担当者との接点が少なく、「アプリで共済金請求や契約内容の確認ができないと困る」という人もいることがわかった。このように、ユーザーの置かれている状況によってニーズはさまざまであり、言語化されていなかったインサイトを整理し、マインドセットとしてユーザー像を明確にした。",
      mediaFile: "JA.mp4",
    },
    {
      sectionNumber: 3,
      type: "lineOne",
      eyebrow: "Experience",
      title: "JA共済アプリで重要な４つの体験",
      body:
        "インサイトやマインドセットから重要な４つの体験を定義し、ジャーニーマップに落とし込んだ。それぞれの体験アイデアも需要性を調査し、Desiability,Feasibility,Viabilityの３つの観点で評価をすることで優先順位づけを行なった。",
      mediaFile: "JA.mp4",
    },
    {
      sectionNumber: 4,
      type: "mediaTextTwoCol",
      eyebrow: "Interface",
      title: "JA共済らしい\n相互扶助の精神で\n寄り添い支え合う\n形を表現した\nインターフェース",
      body:
        "JA共済はこれまで、人々が支え合って生きていくことをサポートしてきた歴史がある。人と人、JA共済と人、大地と地域。それぞれが、お互いを支え合うことで成り立ってきた。この関係は、「寄り添うこと」が前提になっている。寄り添いがなければ、形として成立しない。一見すると単純で特徴のない形でも、いくつかが集まり、寄り添うことで、新しい表現が生まれる。そうした変化やつながりを、視覚的に表現したUIをデザインした。",
      mediaFile: "JA.mp4",
    },
  ],
};

const SCRAMBERRY_WALLET_DETAIL: WorkDetailConfig = {
  hero: {
    headline: "**誰でも使える**\n**WEB3.0体験を**\nデザインする",
    summary:
      "誰もが安心してWEB3.0体験ができる環境を実現するために誕生したWalletアプリ。WEB3.0特有の難解な用語と操作は使用せず、現状世に出ているファイナンス系アプリを利用していれば簡単に使えるような体験設計でデザインした。",
    date: "2022.11 - 2023.04",
    tags: ["APP", "WEB3", "Blockchain"],
    roles: ["Experience Design", "Information Architect"],
    mediaFile: "scramberry.mp4",
  },
  blocks: [
    {
      sectionNumber: 1,
      type: "lineOne",
      eyebrow: "Background",
      title: "浸透しづらいWEB3.0を一般化する",
      body:
        "仮想通貨やNFTを取り扱う既存のWalletアプリは難解で心理的安全性も低く、自分の状況をコントロールしづらいため、Dapps事業者はビギナーに対してオススメできるウォレットがなく、生活者に浸透しづらい状況だったため、安心安全で利用でき、初心者でも使いやすい体験を目指した。",
      mediaFile: "scramberry.mp4",
    },
    {
      sectionNumber: 2,
      type: "quoteTwoLeft",
      eyebrow: "Experience",
      title: "“WEB3.0だからこの体験”はなく、\n使い慣れたアプリ体験のまま、\nWEB3.0の世界に入り込む",
      body:
        "ブロックチェーン独自のトランザクションやDapps利用などWEB3.0特有の体験を既存のファイナンス系アプリと同様な使い方で利用できるように設計。また資産ごとにチェーンが分断されて自分の全資産がいくらあるのかわかりづらい問題も解決するために、ブロックチェーンを意識しなくても利用できるような情報設計を行なった。",
      mediaFile: "scramberry.mp4",
    },
    {
      sectionNumber: 3,
      type: "mediaTextTwoCol",
      eyebrow: "Achievement",
      title: "情報設計・UIが\n高く評価されている",
      body:
        "現在(2025年6月時点)ストアの評価は4.5。ログイン関連のシステム障害で評価を落としている部分はあるが、情報設計・UIの評価は高く、シンプルで難しい操作はなく、利用しやすいという声を多く獲得している。",
      mediaFile: "scramberry.mp4",
    },
  ],
};

const MY_AU_DETAIL: WorkDetailConfig = {
  hero: {
    headline: "My auの\n**未来の顧客体験を**\nデザインする",
    summary:
      '1,050万MAUを誇るauブランドの公式アプリ。"My au"の未来の顧客体験をデザインするために、サービスデザインからUIUXデザインまでを一貫して支援。',
    date: "2019.2 - 2021.8",
    tags: ["APP", "DesignSprints", "DesignAwards"],
    roles: ["UIUX Design", "Service Design", "Information Architect"],
    mediaFile: "kddi.mp4",
  },
  blocks: [
    {
      sectionNumber: 1,
      type: "quoteTwoLeft",
      eyebrow: "Background",
      title: "人々の生活をシームレスにつなぐ\nMy auの挑戦",
      body:
        "auは遠く離れた場所を回線でつなぐだけではなく、人々の命を、暮らしを、心をつないでいる。その中でMy auは「auサービス窓口」として、お客さまが目的を迷わず完結できるよう日常的につなぐことが求められた。オンラインでの操作に不安を覚えられる方や、コロナ禍で来店が制限された方など、幅広い層のお客さまが直感的に目的を完結でき、自然な気づきにより必要な情報を得られるようなUIUX設計をお客さま起点で行い、アプリ体験を刷新した。",
      mediaFile: "kddi.mp4",
    },
    {
      sectionNumber: 2,
      type: "quoteTwoRight",
      eyebrow: "Process",
      title: "自分たちだけでは考えない\n本当の顧客視点をプロセスに導入",
      body:
        "全プロセスで「顧客との対話」を貫徹。まず始めに既存顧客の日常生活のニーズやペインを理解し「お客さまに主導権を戻す」という明確なビジョンを描いた。その後の制作プロセスでは18~65歳の70名以上のユーザーにプロトタイプテストを実施。デザイナー・エンジニア・事業担当で共創チームを立ち上げ、新機能のコンセプトからUIUXまでデザインスプリントを高速回転、ユーザーの声を聞きながら仮説の検証・改善を繰り返した。",
      mediaFile: "kddi.mp4",
    },
    {
      sectionNumber: 3,
      type: "mediaTextTwoCol",
      eyebrow: "Design Approach",
      title: "2週間単位の\nデザインスプリントを\n11回実施",
      body:
        "auユーザーが最も利用する「契約プランを確認する」「毎月の支払額・請求予定額を確認する」などのアプリ上の体験をリサーチを元に再定義。定義後2週間で体験設計・情報設計・プロトタイプ制作・ユーザーテストを全て行うデザインスプリントを設計し、それを1年半掛けて11回実施。70名以上のインタビューを行った。",
      mediaFile: "kddi.mp4",
    },
    {
      sectionNumber: 4,
      type: "imageLeftTextRight",
      eyebrow: "Achievement",
      title: "デザインアプローチが評価され、\nGood Design賞を受賞",
      body:
        "KDDI社内にデザイン文化を醸成したデザインアプローチが評価され、Good Design賞を受賞。利用率の向上、オンラインストアの売上増加だけではなく、KDDI社内にデザイン文化が醸成され、現在はKDDI社員メンバーがデザイン思考に基づいたワークショップ設計を実施するまでとなった。またMy auで作成したガイドラインはデザインシステムとして社内展開を予定しており、今後はMy auだけでなく他プロダクトでも一貫した体験を提供予定。",
      mediaFile: "kddi.mp4",
    },
    {
      sectionNumber: 5,
      type: "doubleBarTwo",
      eyebrow: "My Role",
      title: "クライアントへの\nデザイン文化の醸成",
      body:
        "ファシリテーター・ユーザーテスト設計・プロトタイプ制作などチーム編成によって私の役割は流動的に変化し、臨機応変に幅広く活動。クライアントとの共創を積極的に行い、2020年にはクライアントへのデザイン文化構築が評価され、Accenture Interactive(元Accenture Song)社内1,000人以上の中から最も優れた活躍をした５名に選出された。",
      mediaFile: "kddi.mp4",
    },
  ],
};

const PLAYADS_DETAIL: WorkDetailConfig = {
  hero: {
    headline: "**探求心を**\n**根付かせる体験を**\nデザインする",
    summary:
      "国内3,000万人/全世界5,500万人と連携し、CM動画を公開前にユーザー検証が行えるWEBサービス。情報設計・UIUXなどのデザイン全体を支援。",
    date: "2021.5 - Now",
    tags: ["Research", "WebService", "DesignOnboarding"],
    roles: ["UIUX Design", "Information Architect"],
    mediaFile: "playads.mp4",
  },
  blocks: [
    {
      sectionNumber: 1,
      type: "imageLeftTextRight",
      eyebrow: "About Service",
      title:
        "データ主導のCM動画制作を牽引し、\nレガシーな制作工程に変革をもたらす\nWEBサービス",
      body:
        "今まで制作側の感覚値で制作されていたCM動画を数値でユーザーの反応を算出し、スムーズで的確な改善・それに伴うコスト削減・公開後の炎上回避を実現。CM動画のレガシーな制作工程に変革をもたらすサービスを展開している。",
      mediaFile: "playads.mp4",
    },
    {
      sectionNumber: 4,
      type: "lineOne",
      eyebrow: "Design Concept",
      title: "“探究への導き”がもたらす効果的な\nユーザーエクスペリエンス",
      body:
        "社員へのヒアリングをワークショップ形式で実施、また旧画面のエキスパートレビューを通じて、新たなUIUXコンセプトである\"探究への導き\"を策定。情報設計とUI設計を担当し、多層的で複雑な情報を専門家でなくとも誰でもわかる形に整理。認知負荷を最小限に抑えつつ、ユーザーにとって必要な情報へのアクセスがよりスムーズになるよう設計を行った。",
      mediaFile: "playads.mp4",
    },
    {
      sectionNumber: 5,
      type: "quoteTwoLeft",
      eyebrow: "Result",
      title: "売上向上にも繋がった\nデザインリニューアル",
      body:
        "新しいデザインコンセプトの元に情報設計・UI設計を行ったことで、認知負荷が劇的に削減され、ユーザーは迅速かつ効果的に情報にアクセスできるようになり、倍以上の売上向上に繋がった。\"探究への導き\"の理念に基づくUI設計は、ユーザーが深掘りしたい情報を見つける手助けとなり、全体的な使いやすさを向上させた。現在も運用・大型アップデートなどに関する継続的なサポートを提供している。",
      mediaFile: "playads.mp4",
    },
  ],
};

/** セカンドビュー以降: templates §7 → §4 → §3 と同じレイアウト順 */
const HONDA_DESIGN_SYSTEM_DETAIL: WorkDetailConfig = {
  hero: {
    headline: "**アプリの品質を**\n**上げる仕組み**を\nデザインする",
    summary:
      "Hondaが公開しているアプリ、または今後公開するアプリの品質担保を図るためにユーザビリティ・アクセシビリティを考慮したデザインシステムを構築。デザイン設計に関するルールやツールをまとめて体系化。",
    date: "2021.9 - 2021.12",
    tags: ["Usability", "Guideline", "DesignSystem"],
    roles: ["UIUX Design", "Service Design"],
    mediaFile: "honda.mp4",
  },
  blocks: [
    {
      sectionNumber: 1,
      type: "imageLeftTextRight",
      eyebrow: "Mission",
      title: "Hondaが提供する\n全アプリの品質を\n向上させる",
      body:
        "Hondaが提供するアプリは各部署・各国が独自に開発をしており、アクセシビリティ・ユーザビリティが担保されていない状態で公開されていた。そのためほとんどのアプリの評価は低く、ブランドとしての価値を落としている可能性があったためデザインシステムを導入し、一定の品質担保を提供する仕組みをデザインした。",
      mediaFile: "honda.mp4",
    },
    {
      sectionNumber: 2,
      type: "lineOne",
      eyebrow: "Design Approach",
      title: "長期的な運用を促す\nデザインシステムを\n構築するためのアプローチ",
      body:
        "デザインシステムの考え方の普及、アプローチ設計、インタビュー設計、コンポーネントガイドラインの制作を実行。長期的に育てていくデザインシステムの第一歩として品質を守るための最低限のルールを定めたアクセシビリティや各デザインコンポーネントの使い方を設計した。",
      mediaFile: "honda.mp4",
    },
    {
      sectionNumber: 3,
      type: "doubleBarTwo",
      eyebrow: "Result",
      title: "Honda内部にデザイン\nシステムが浸透し、\n継続して改善・運用",
      body:
        "デザイン開発の指針を定め、開発の効率化、品質の一元化を実現。長期的に一貫した顧客体験を提供するために現在もHondaチームが改善・運用を進め、アプリ開発に役立てている。",
      mediaFile: "honda.mp4",
    },
  ],
};

/** セカンドビュー以降: templates §3 → §6 → §4 と同じレイアウト順 */
const PEER_WORKER_DETAIL: WorkDetailConfig = {
  hero: {
    headline: "**GenAIとの**\n**新たな働き方を**\nデザインする",
    summary:
      "社員が書いたプロンプトを社内に共有・活用できるプラットフォームサービス。PEER WORKERがユーザーの「第２の脳」「第３の手」となり、日常業務に欠かせない体験を構築。",
    date: "2023.4 - 2023.7",
    tags: ["GenAI", "WebService", "PromptPlatform"],
    roles: ["UIUX Design", "Service Design", "Information Architect"],
    mediaFile: "peerworker.mp4",
  },
  blocks: [
    {
      sectionNumber: 1,
      type: "doubleBarTwo",
      eyebrow: "Design Approach",
      title: "AIが社内の独自データを学び、\n業務の効率を高めた\n社内クラウドの体験構築",
      body:
        "社外秘が格納されているクラウドにもアクセスし、無数に存在する提案書やレポートをAIが学習する。それを行うことで今まで事例収集やリサーチに費やしていた時間は軽減。プロジェクトの引き継ぎや業界理解などのインプットはPEER WORKERと会話をすることで、人員を費やすことなく可能になった。",
      mediaFile: "peerworker.mp4",
    },
    {
      sectionNumber: 2,
      type: "mediaTextTwoCol",
      eyebrow: "UX Principle",
      title: "ユーザーの目的に\n応じた３つの\n体験定義",
      body:
        "ユーザーアクションを「探す」「使う」「作る」の三つに分類し、三つそれぞれの体験ゴールを定義した上で、情報設計を行い、最短アクションでユーザーの目的が達成できるように設計した。",
      mediaFile: "peerworker.mp4",
    },
    {
      sectionNumber: 3,
      type: "lineOne",
      eyebrow: "My Role",
      title: "米国アクセンチュア本社を動かした\nアウトプット",
      body:
        "デザインアプローチ計画、体験設計、情報設計、ビジュアル設計、UI設計を現場リーダーとして手を動かしながらディレクションを行なった。プロジェクトが認められ、アメリカアクセンチュア本社社長配下のプロジェクトになった。",
      mediaFile: "peerworker.mp4",
    },
  ],
};

/** セカンドビュー以降: templates §7 → §6 → §4 と同じレイアウト順 */
const YUCHO_PAY_DETAIL: WorkDetailConfig = {
  hero: {
    headline: "**ゆうちょ銀行**\n**ならではの安心**を\nデザインする",
    summary:
      "ゆうちょ銀行が公開しているペイメントアプリ。短い期間でデザインスプリントを設計し、体験設計・情報設計・プロトタイプ制作・ユーザーテスト(20名)を実施し、デザインを支援。",
    date: "2019.12 - 2020.2",
    tags: ["App", "Payment", "DesignSprints"],
    roles: ["UIUX Design", "Service Design", "Information Architect"],
    mediaFile: "yucho.mp4",
  },
  blocks: [
    {
      sectionNumber: 1,
      type: "imageLeftTextRight",
      eyebrow: "Experience",
      title: "瞬時の引き落としと\n口座残高の見える化で\n安心感のある利用体験",
      body:
        "ゆうちょ銀行口座と連携することで事前チャージの必要なく、即時引き落としが可能。ご利用上限金額設定ができるため使いすぎることなく、コントロールできる。またワンタップで口座残高が確認できるため支払い時も安心して使用できる。",
      mediaFile: "yucho.mp4",
    },
    {
      sectionNumber: 2,
      type: "mediaTextTwoCol",
      eyebrow: "Design Approach",
      title: "2ヶ月で4回の\nDesign Sprintを実施し\n20人の声を即時反映",
      body:
        "1週間で体験設計・情報設計・プロトタイプ制作・ユーザーテストを全て行うデザインスプリントを設計し、それを2ヶ月で４回実施。スプリントでは主に体験フロー設計、プロトタイプ制作、インタビュー実施を行い、スピーディーかつ短期間で20人の声を拾い上げ、体験やUIデザインに反映した。",
      mediaFile: "yucho.mp4",
    },
    {
      sectionNumber: 3,
      type: "lineOne",
      eyebrow: "Result",
      title: "Accenture初のデザインスプリント",
      body:
        "Accenture Interactive(現Accenture Song)では初のデザインスプリントを実施し、それを参考に数々のプロジェクトがデザインスプリントのアプローチを実践した。",
      mediaFile: "yucho.mp4",
    },
  ],
};

/** セカンドビュー以降: templates §3 → §2 → §7 と同じレイアウト順 */
const PLOOM_TECH_DETAIL: WorkDetailConfig = {
  hero: {
    headline: "**Ploomブランドの**\n**ロイヤリティを**\nデザインする",
    summary:
      "JTのPloom TECHは数多くのデジタルコミュニケーションを行っている。”Ploomブランドサイト”、Ploomの会員限定サービス”Ploom Owner's club”や各国の柄をテーマにした”Ploom TECH Cross The Border”などのPloom関連のUIデザインを支援。",
    date: "2018.3 - 2019.1",
    tags: ["Web", "Loyalty", "DigitalCommunication"],
    roles: ["UI Design"],
    mediaFile: "jt.mp4",
  },
  blocks: [
    {
      sectionNumber: 1,
      type: "doubleBarTwo",
      eyebrow: "Ploom Brand Site",
      title: "生活に溶け込んだ\nPloom TECH",
      body:
        "Ploom TECHの利用者はもちろん、未利用者に対しても横串でWEBサイトを展開している。Ploom TECHが持つプロダクトの洗練さ、人々の生活の中に溶け込みやすいデザインをPloomブランドサイトでは表現し、未利用者でも入り込みやすいデザインで制作。",
      mediaFile: "jt.mp4",
    },
    {
      sectionNumber: 2,
      type: "quoteTwoRight",
      eyebrow: "Cross The Border",
      title: "各国の都市を想起する\nPloom TECH",
      body:
        "各国の都市を柄にして販売したPloom TECH Cross The Borderのスペシャルサイト。生活に溶け込むノーマルなPloom TECHとは違い、殻に閉じ込まず、世界を横断する人を後押しする製品コンセプトをUIで表現。各国の柄やフォントを大胆にレイアウトし、グリッドにハマらないデザインで制作。",
      mediaFile: "jt.mp4",
    },
    {
      sectionNumber: 3,
      type: "imageLeftTextRight",
      eyebrow: "Ploom Owner's club",
      title: "利用者のロイヤリティを高め、\n日々の利用に優越感を与えるデザイン",
      body:
        "Ploom TECH利用者限定の会員サイト。ロイヤリティプログラムを採用しているため特別感を醸成していくために3Dのゴールドコインや実際にスタンプを作成したものをデザインに入れ、平面の中にリアルな高級感を感じる表現になるように制作。",
      mediaFile: "jt.mp4",
    },
  ],
};

/** セカンドビュー以降: templates §3 → §6 と同じレイアウト順 */
const NISSAN_GT_R_DETAIL: WorkDetailConfig = {
  hero: {
    headline: "**GT-Rの**\n**細かなギミックを**\nUIに吹き込む",
    summary:
      "日産GT-Rのコアファンに向けたスペシャルサイト。UIデザイナーとして参画。GT-Rが「組み上がるまでの工場内」と「テスト走行を繰り返して走りを磨き上げる」２つの顔をサイト全体で表現した。",
    date: "2016.9 - 2016.12",
    tags: ["Web", "GT-R", "UIGimmick"],
    roles: ["UI Design"],
    mediaFile: "nissan.mp4",
  },
  blocks: [
    {
      sectionNumber: 1,
      type: "doubleBarTwo",
      eyebrow: "Design Direction",
      title: "GT-R独自の製法と共に\nGT-Rならではの\nUIギミックで楽しむ\nデザイン",
      body:
        "GT-Rのエンジンは手作りで製作されており、日本でたった５人しか製法を知らない。エンジンを組み上げた後、栃木工場内のテストコースで加速とブレーキを繰り返し、ブレーキを焼きながら磨き上げる工程を経てGT-Rはお客様の手に渡っている。その工程をGT-Rならではの細かなギミックUIと共に楽しめるようにデザインした。",
      mediaFile: "nissan.mp4",
    },
    {
      sectionNumber: 2,
      type: "mediaTextTwoCol",
      eyebrow: "UI Design",
      title: "GT-Rファンなら\nわかるUIデザイン",
      body:
        "GT-Rアローやリアライトページャーなどを開発。こあくまでUIのディテールの一部だが、GT-Rファンならば発見・高揚できるようにデザイン。その微細なUIに込めた情熱とこだわりが、GT-Rを特別な存在へと昇華するようにデザイン。",
      mediaFile: "nissan.mp4",
    },
  ],
};

/** セカンドビュー以降: templates §5 → §4 → §6 と同じレイアウト順 */
const KUME_SEKKEI_DETAIL: WorkDetailConfig = {
  hero: {
    headline: "**ルーツから紐解く**\n**建築ストーリーを**\nデザインする",
    summary:
      "久米設計のコーポレートサイトリニューアル。設計会社というジャンルの枠を超え、生活や街をより豊かにするために、建築(モノ)という目に見えるものから目に見えない人々の体験(コト)や空間をデザインしている集団であることを伝えていくためのUXを支援。",
    date: "2018.8 - 2018.12",
    tags: ["LifeStory", "CorporateSite", "ArchitecturalNarrative"],
    roles: ["Service Design", "Information Architect"],
    mediaFile: "kume.mp4",
  },
  blocks: [
    {
      sectionNumber: 1,
      type: "quoteTwoLeft",
      eyebrow: "Design Approach",
      title: "クライアントと協業し、\n承認スピードを上げたワークショップ設計",
      body:
        "サイトの基本方針を決めるためのワークショップの実施と設計・コンセプトメイキング・情報設計を担当。ワークショップでは社長を含めたステークホルダーが社内で大切にしていることをBull's-eye DiagrammingやWhat's on Your Radar?などのメソッドで明らかにし、バラバラだった意識を可視化した。その後Concept PosterやRound Robinで久米設計が大切にしていることをどのように表現すれば伝わるのかをクライアントともにワークショップ内で考え、コンセプトメイキングまで行った。",
      mediaFile: "kume.mp4",
    },
    {
      sectionNumber: 2,
      type: "lineOne",
      eyebrow: "Site Story",
      title: "久米設計のルーツが織りなす\n建築ストーリー",
      body:
        "久米設計は都市面開発、耐震・防災技術、ホスピタリティの３つのルーツを創業者から引き継いでいる。その大事にしてきたルーツが色濃く反映された事例を例にとって、実際に建物が出来上がり人々の生活に馴染むまでの物語を表現。",
      mediaFile: "kume.mp4",
    },
    {
      sectionNumber: 3,
      type: "mediaTextTwoCol",
      eyebrow: "Achievement",
      title: "営業ツールとなった\nコーポレートサイト",
      body:
        "今までほとんどアクセスがなかったコーポレートサイトからのお問い合わせ件数が増え、営業ツールとしてもコーポレートサイトが役立てられている。",
      mediaFile: "kume.mp4",
    },
  ],
};

/** セカンドビュー以降: templates §4 → §3 → §7 と同じレイアウト順 */
const ATOM_INTERACTION_DETAIL: WorkDetailConfig = {
  hero: {
    headline: "**マイクロ**\n**インタラクション**\nを科学する",
    summary:
      "“マイクロインタラクションには、ユーザーの目的と行動によって一定のパターンが存在するのではないか？”という仮説を元に、個々の感性でデザインされているインタラクションを言語化。ある一定の性質を発見することで、デザイナーとノンデザイナーが同じ視点でデザインできる世界を目指したルールブック。",
    date: "2022.8 - 2023.9",
    tags: ["TouchGesture", "MicroInteraction", "ForNonDesigner"],
    roles: ["UIUX Design", "Service Design"],
    mediaFile: "atom.mp4",
  },
  blocks: [
    {
      sectionNumber: 1,
      type: "lineOne",
      eyebrow: "About",
      title: "デザイナーの感覚で作られている\nインタラクションを言語化",
      body:
        "インタラクションをObject / Trigger / Response / Purposeの４要素に分解し、23種類のタッチジェスチャーで生じるインタラクションを言語化・ルール化した。",
      mediaFile: "atom.mp4",
    },
    {
      sectionNumber: 2,
      type: "doubleBarTwo",
      eyebrow: "Design Approach",
      title: "世の中の\nインタラクションを\n収集し表現の中に\n隠されたルールを抽出",
      body:
        "チームリーダーとして企画・進行・デザインを担当。世の中に無数に存在するインタラクション事例を網羅的に洗い出すための足掛かりとして、タッチジェスチャーを中心にインタラクション事例を収集。インタラクションとユーザーの目的を紐付けて事例を分類し、４要素から各インタラクションの特性を抽出。基本的なインタラクションルールとモデルアニメーションを作成した。",
      mediaFile: "atom.mp4",
    },
    {
      sectionNumber: 3,
      type: "lineOne",
      eyebrow: "Future Activities",
      title: "Figmaのイベントや\n千葉大学での講義に活用",
      body:
        "Figmaの大規模なイベントに登壇、また千葉大学にインタラクションの知識を広めるために活用している。",
      mediaFile: "atom.mp4",
    },
  ],
};

export function getWorkDetailConfig(slug: string): WorkDetailConfig {
  let base: WorkDetailConfig;
  if (slug === "idare") base = IDARE_DETAIL;
  else if (slug === "shikazika") base = SHIKAZIKA_DETAIL;
  else if (slug === "ja-kyosai-app") base = JA_KYOSAI_APP_DETAIL;
  else if (slug === "scramberry-wallet") base = SCRAMBERRY_WALLET_DETAIL;
  else if (slug === "my-au") base = MY_AU_DETAIL;
  else if (slug === "playads") base = PLAYADS_DETAIL;
  else if (slug === "honda-design-system") base = HONDA_DESIGN_SYSTEM_DETAIL;
  else if (slug === "peer-worker") base = PEER_WORKER_DETAIL;
  else if (slug === "yucho-pay") base = YUCHO_PAY_DETAIL;
  else if (slug === "ploom-tech") base = PLOOM_TECH_DETAIL;
  else if (slug === "nissan-gt-r") base = NISSAN_GT_R_DETAIL;
  else if (slug === "kume-sekkei") base = KUME_SEKKEI_DETAIL;
  else if (slug === "atom-interaction") base = ATOM_INTERACTION_DETAIL;
  else if (slug === "nafty") base = NAFTY_DETAIL;
  else if (slug === "creative-asset-production") base = CREATIVE_ASSET_PRODUCTION_DETAIL;
  else
    base = {
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

  return {
    ...base,
    blocks: withPerSectionDetailMedia(slug, base.blocks),
  };
}
