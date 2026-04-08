export type WorkAward = "gooddesign" | "reddot";

export type WorkItem = {
  slug: string;
  title: string;
  client: string;
  /** public/videos/works/<file>.mp4 — 未配置時はプレースホルダ */
  videoFile?: string;
  awards?: WorkAward[];
};

/**
 * Figma node 2484:5590（works）に準拠
 * サムネは全て動画を想定（videoFile 未設定時はグレー枠）
 */
export const WORKS: WorkItem[] = [
  {
    slug: "idare",
    title: "IDARE",
    client: "株式会社Fivot",
    videoFile: "IDARE.mp4",
  },
  {
    slug: "shikazika",
    title: "SHIKAZIKA",
    client: "株式会社KAKUKAKU",
    videoFile: "shikazika.mp4",
  },
  {
    slug: "ja-kyosai-app",
    title: "JA共済アプリ",
    client: "全国共済農業協同組合連合会",
    videoFile: "JA.mp4",
    awards: ["gooddesign", "reddot"],
  },
  {
    slug: "scramberry-wallet",
    title: "scramberry WALLET",
    client: "株式会社NTT Digital",
    videoFile: "scramberry.mp4",
  },
  {
    slug: "my-au",
    title: "My au",
    client: "KDDI株式会社",
    videoFile: "kddi.mp4",
    awards: ["gooddesign"],
  },
  {
    slug: "playads",
    title: "PlayAds",
    client: "GMOプレイアド株式会社",
    videoFile: "playads.mp4",
  },
  {
    slug: "honda-design-system",
    title: "Honda Design System",
    client: "本田技研工業株式会社",
    videoFile: "honda.mp4",
  },
  {
    slug: "peer-worker",
    title: "PEER WORKER",
    client: "アクセンチュア株式会社",
    videoFile: "peerworker.mp4",
  },
  {
    slug: "yucho-pay",
    title: "ゆうちょPay",
    client: "ゆうちょ銀行",
    videoFile: "yucho.mp4",
  },
  {
    slug: "ploom-tech",
    title: "Ploom TECH",
    client: "日本たばこ産業株式会社",
    videoFile: "jt.mp4",
  },
  {
    slug: "nissan-gt-r",
    title: "Nissan GT-R",
    client: "日産自動車株式会社",
    videoFile: "nissan.mp4",
  },
  {
    slug: "kume-sekkei",
    title: "久米設計コーポレートサイト",
    client: "株式会社久米設計",
    videoFile: "kume.mp4",
  },
  {
    slug: "atom-interaction",
    title: "atom Interaction",
    client: "自主活動",
    videoFile: "atom.mp4",
  },
];

export function getWorkBySlug(slug: string): WorkItem | undefined {
  return WORKS.find((w) => w.slug === slug);
}

/** 作品一覧 `WORKS` の並びで前後の作品を返す。先頭の前は末尾、末尾の次は先頭（ループ） */
export function getAdjacentWorks(slug: string): { prev: WorkItem | null; next: WorkItem | null } {
  const i = WORKS.findIndex((w) => w.slug === slug);
  if (i === -1) return { prev: null, next: null };
  const last = WORKS.length - 1;
  return {
    prev: i > 0 ? WORKS[i - 1]! : WORKS[last]!,
    next: i < last ? WORKS[i + 1]! : WORKS[0]!,
  };
}
