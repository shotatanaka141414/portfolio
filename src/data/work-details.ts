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
        "ユーザー中心は当たり前\nビジネスドリブンで進めた機能開発",
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
      type: "mediaTextTwoCol",
      eyebrow: "Design Approach",
      title: "貯蓄体験を継続させるUIを再設計",
      body:
        "日々の入出金導線を極力シンプルにしながら、利用動機を維持するフィードバックを画面内に配置。KPI とユーザー心理の両面で継続を設計しました。",
      mediaFile: "kddi.mp4",
    },
    {
      sectionNumber: 4,
      type: "imageLeftTextRight",
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
      type: "imageLeftTextRight",
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

/** セカンドビュー以降: templates §7 → §4 → §3 と同じレイアウト順 */
const HONDA_DESIGN_SYSTEM_DETAIL: WorkDetailConfig = {
  hero: {
    headline: "課題を解き、\n体験価値を\n最大化する",
    summary:
      "この作品の詳細は順次実装予定です。\nファーストビューは共通レイアウトで統一し、\nセカンドビュー以降はテンプレートを指定して\n作品ごとに柔軟に構築していきます。",
    date: "2024.1 - 2025.12",
    tags: ["APP"],
    roles: ["UIUX Design"],
    mediaFile: "honda.mp4",
  },
  blocks: [
    {
      sectionNumber: 1,
      type: "imageLeftTextRight",
      eyebrow: "Design Approach",
      title: "貯蓄体験を継続させるUIを再設計",
      body:
        "日々の入出金導線を極力シンプルにしながら、利用動機を維持するフィードバックを画面内に配置。KPI とユーザー心理の両面で継続を設計しました。",
      mediaFile: "honda.mp4",
    },
    {
      sectionNumber: 2,
      type: "lineOne",
      eyebrow: "Design Approach",
      title: "2週間単位のデザインスプリントを11回実施",
      body:
        "アプリ内の「料金プランの確認」などの体験をリサーチから再定義し、1年半かけて計11回の2週間単位のデザインスプリントを実施。延べ73名へのインタビューを通じて、利用動機と行動の変化を可視化しながら改善を進めました。",
      mediaFile: "honda.mp4",
    },
    {
      sectionNumber: 3,
      type: "doubleBarTwo",
      eyebrow: "My Role",
      title: "｜｜two テンプレート",
      body: "左右 420 相当のメディアに中央テキストを置くタイプ。",
      mediaFile: "honda.mp4",
    },
  ],
};

/** セカンドビュー以降: templates §3 → §6 → §4 と同じレイアウト順 */
const PEER_WORKER_DETAIL: WorkDetailConfig = {
  hero: {
    headline: "課題を解き、\n体験価値を\n最大化する",
    summary:
      "この作品の詳細は順次実装予定です。\nファーストビューは共通レイアウトで統一し、\nセカンドビュー以降はテンプレートを指定して\n作品ごとに柔軟に構築していきます。",
    date: "2024.1 - 2025.12",
    tags: ["APP"],
    roles: ["UIUX Design"],
    mediaFile: "peerworker.mp4",
  },
  blocks: [
    {
      sectionNumber: 1,
      type: "doubleBarTwo",
      eyebrow: "My Role",
      title: "｜｜two テンプレート",
      body: "左右 420 相当のメディアに中央テキストを置くタイプ。",
      mediaFile: "peerworker.mp4",
    },
    {
      sectionNumber: 2,
      type: "mediaTextTwoCol",
      eyebrow: "Design Approach",
      title: "貯蓄体験を継続させるUIを再設計",
      body:
        "日々の入出金導線を極力シンプルにしながら、利用動機を維持するフィードバックを画面内に配置。KPI とユーザー心理の両面で継続を設計しました。",
      mediaFile: "peerworker.mp4",
    },
    {
      sectionNumber: 3,
      type: "lineOne",
      eyebrow: "Design Approach",
      title: "2週間単位のデザインスプリントを11回実施",
      body:
        "アプリ内の「料金プランの確認」などの体験をリサーチから再定義し、1年半かけて計11回の2週間単位のデザインスプリントを実施。延べ73名へのインタビューを通じて、利用動機と行動の変化を可視化しながら改善を進めました。",
      mediaFile: "peerworker.mp4",
    },
  ],
};

/** セカンドビュー以降: templates §7 → §6 → §4 と同じレイアウト順 */
const YUCHO_PAY_DETAIL: WorkDetailConfig = {
  hero: {
    headline: "課題を解き、\n体験価値を\n最大化する",
    summary:
      "この作品の詳細は順次実装予定です。\nファーストビューは共通レイアウトで統一し、\nセカンドビュー以降はテンプレートを指定して\n作品ごとに柔軟に構築していきます。",
    date: "2024.1 - 2025.12",
    tags: ["APP"],
    roles: ["UIUX Design"],
    mediaFile: "yucho.mp4",
  },
  blocks: [
    {
      sectionNumber: 1,
      type: "imageLeftTextRight",
      eyebrow: "Design Approach",
      title: "貯蓄体験を継続させるUIを再設計",
      body:
        "日々の入出金導線を極力シンプルにしながら、利用動機を維持するフィードバックを画面内に配置。KPI とユーザー心理の両面で継続を設計しました。",
      mediaFile: "yucho.mp4",
    },
    {
      sectionNumber: 2,
      type: "mediaTextTwoCol",
      eyebrow: "Design Approach",
      title: "貯蓄体験を継続させるUIを再設計",
      body:
        "日々の入出金導線を極力シンプルにしながら、利用動機を維持するフィードバックを画面内に配置。KPI とユーザー心理の両面で継続を設計しました。",
      mediaFile: "yucho.mp4",
    },
    {
      sectionNumber: 3,
      type: "lineOne",
      eyebrow: "Design Approach",
      title: "2週間単位のデザインスプリントを11回実施",
      body:
        "アプリ内の「料金プランの確認」などの体験をリサーチから再定義し、1年半かけて計11回の2週間単位のデザインスプリントを実施。延べ73名へのインタビューを通じて、利用動機と行動の変化を可視化しながら改善を進めました。",
      mediaFile: "yucho.mp4",
    },
  ],
};

/** セカンドビュー以降: templates §3 → §2 → §7 と同じレイアウト順 */
const PLOOM_TECH_DETAIL: WorkDetailConfig = {
  hero: {
    headline: "課題を解き、\n体験価値を\n最大化する",
    summary:
      "この作品の詳細は順次実装予定です。\nファーストビューは共通レイアウトで統一し、\nセカンドビュー以降はテンプレートを指定して\n作品ごとに柔軟に構築していきます。",
    date: "2024.1 - 2025.12",
    tags: ["APP"],
    roles: ["UIUX Design"],
    mediaFile: "jt.mp4",
  },
  blocks: [
    {
      sectionNumber: 1,
      type: "doubleBarTwo",
      eyebrow: "My Role",
      title: "｜｜two テンプレート",
      body: "左右 420 相当のメディアに中央テキストを置くタイプ。",
      mediaFile: "jt.mp4",
    },
    {
      sectionNumber: 2,
      type: "quoteTwoRight",
      eyebrow: "Achievement",
      title: "』two テンプレート",
      body: "「two」の左右反転版。上部ストリップと本文の順序も反転。",
      mediaFile: "jt.mp4",
    },
    {
      sectionNumber: 3,
      type: "imageLeftTextRight",
      eyebrow: "Design Approach",
      title: "貯蓄体験を継続させるUIを再設計",
      body:
        "日々の入出金導線を極力シンプルにしながら、利用動機を維持するフィードバックを画面内に配置。KPI とユーザー心理の両面で継続を設計しました。",
      mediaFile: "jt.mp4",
    },
  ],
};

/** セカンドビュー以降: templates §3 → §6 と同じレイアウト順 */
const NISSAN_GT_R_DETAIL: WorkDetailConfig = {
  hero: {
    headline: "課題を解き、\n体験価値を\n最大化する",
    summary:
      "この作品の詳細は順次実装予定です。\nファーストビューは共通レイアウトで統一し、\nセカンドビュー以降はテンプレートを指定して\n作品ごとに柔軟に構築していきます。",
    date: "2024.1 - 2025.12",
    tags: ["APP"],
    roles: ["UIUX Design"],
    mediaFile: "nissan.mp4",
  },
  blocks: [
    {
      sectionNumber: 1,
      type: "doubleBarTwo",
      eyebrow: "My Role",
      title: "｜｜two テンプレート",
      body: "左右 420 相当のメディアに中央テキストを置くタイプ。",
      mediaFile: "nissan.mp4",
    },
    {
      sectionNumber: 2,
      type: "mediaTextTwoCol",
      eyebrow: "Design Approach",
      title: "貯蓄体験を継続させるUIを再設計",
      body:
        "日々の入出金導線を極力シンプルにしながら、利用動機を維持するフィードバックを画面内に配置。KPI とユーザー心理の両面で継続を設計しました。",
      mediaFile: "nissan.mp4",
    },
  ],
};

/** セカンドビュー以降: templates §5 → §4 → §6 と同じレイアウト順 */
const KUME_SEKKEI_DETAIL: WorkDetailConfig = {
  hero: {
    headline: "課題を解き、\n体験価値を\n最大化する",
    summary:
      "この作品の詳細は順次実装予定です。\nファーストビューは共通レイアウトで統一し、\nセカンドビュー以降はテンプレートを指定して\n作品ごとに柔軟に構築していきます。",
    date: "2024.1 - 2025.12",
    tags: ["APP"],
    roles: ["UIUX Design"],
    mediaFile: "kume.mp4",
  },
  blocks: [
    {
      sectionNumber: 1,
      type: "quoteTwoLeft",
      eyebrow: "Achievement",
      title: "「 two」テンプレート",
      body: "左に 520x600 メディア、右に 792 幅のテキストを配置する構成。",
      mediaFile: "kume.mp4",
    },
    {
      sectionNumber: 2,
      type: "lineOne",
      eyebrow: "Design Approach",
      title: "2週間単位のデザインスプリントを11回実施",
      body:
        "アプリ内の「料金プランの確認」などの体験をリサーチから再定義し、1年半かけて計11回の2週間単位のデザインスプリントを実施。延べ73名へのインタビューを通じて、利用動機と行動の変化を可視化しながら改善を進めました。",
      mediaFile: "kume.mp4",
    },
    {
      sectionNumber: 3,
      type: "mediaTextTwoCol",
      eyebrow: "Design Approach",
      title: "貯蓄体験を継続させるUIを再設計",
      body:
        "日々の入出金導線を極力シンプルにしながら、利用動機を維持するフィードバックを画面内に配置。KPI とユーザー心理の両面で継続を設計しました。",
      mediaFile: "kume.mp4",
    },
  ],
};

/** セカンドビュー以降: templates §4 → §3 → §7 と同じレイアウト順 */
const ATOM_INTERACTION_DETAIL: WorkDetailConfig = {
  hero: {
    headline: "課題を解き、\n体験価値を\n最大化する",
    summary:
      "この作品の詳細は順次実装予定です。\nファーストビューは共通レイアウトで統一し、\nセカンドビュー以降はテンプレートを指定して\n作品ごとに柔軟に構築していきます。",
    date: "2024.1 - 2025.12",
    tags: ["APP"],
    roles: ["UIUX Design"],
    mediaFile: "atom.mp4",
  },
  blocks: [
    {
      sectionNumber: 1,
      type: "lineOne",
      eyebrow: "Design Approach",
      title: "2週間単位のデザインスプリントを11回実施",
      body:
        "アプリ内の「料金プランの確認」などの体験をリサーチから再定義し、1年半かけて計11回の2週間単位のデザインスプリントを実施。延べ73名へのインタビューを通じて、利用動機と行動の変化を可視化しながら改善を進めました。",
      mediaFile: "atom.mp4",
    },
    {
      sectionNumber: 2,
      type: "doubleBarTwo",
      eyebrow: "My Role",
      title: "｜｜two テンプレート",
      body: "左右 420 相当のメディアに中央テキストを置くタイプ。",
      mediaFile: "atom.mp4",
    },
    {
      sectionNumber: 3,
      type: "imageLeftTextRight",
      eyebrow: "Design Approach",
      title: "貯蓄体験を継続させるUIを再設計",
      body:
        "日々の入出金導線を極力シンプルにしながら、利用動機を維持するフィードバックを画面内に配置。KPI とユーザー心理の両面で継続を設計しました。",
      mediaFile: "atom.mp4",
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
  if (slug === "honda-design-system") return HONDA_DESIGN_SYSTEM_DETAIL;
  if (slug === "peer-worker") return PEER_WORKER_DETAIL;
  if (slug === "yucho-pay") return YUCHO_PAY_DETAIL;
  if (slug === "ploom-tech") return PLOOM_TECH_DETAIL;
  if (slug === "nissan-gt-r") return NISSAN_GT_R_DETAIL;
  if (slug === "kume-sekkei") return KUME_SEKKEI_DETAIL;
  if (slug === "atom-interaction") return ATOM_INTERACTION_DETAIL;

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
