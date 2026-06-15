/**
 * `public/` 配下と同じパス（先頭 `/images/...` など）を、任意の CDN オリジンに差し替える。
 * 未設定時は従来どおり同一オリジン（Vercel から配信）。
 *
 * 例: `NEXT_PUBLIC_MEDIA_CDN_BASE=https://xxxx.r2.dev` のとき、
 * `/images/detail/Nafty/nafty-01.png` → `https://xxxx.r2.dev/images/detail/Nafty/nafty-01.png`
 * （R2 バケット portfolio-media 内は `images/` / `videos/` を public と同じ階層で配置）
 */
export function publicAssetUrl(path: string): string {
  const raw = path.trim();
  if (/^https?:\/\//i.test(raw)) return raw;

  const base = process.env.NEXT_PUBLIC_MEDIA_CDN_BASE?.trim().replace(/\/$/, "") ?? "";
  const normalized = raw.startsWith("/") ? raw : `/${raw}`;
  if (!base) return normalized;
  return `${base}${normalized}`;
}
