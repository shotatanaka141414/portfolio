import fs from "node:fs";
import path from "node:path";

const IMAGE_EXT = /\.(png|jpe?g|gif|webp|svg)$/i;

/** ファイル名（拡張子なし）から簡易 alt テキスト */
function altFromFilename(base: string): string {
  return base
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}

/**
 * `public/images/home/clients/` 内の画像を列挙（.gitkeep 等は除外）
 * ビルド時・リクエスト時に fs で読み取り、追加ファイルはデプロイ／再ビルドで反映
 */
export function listClientLogos(): { src: string; alt: string }[] {
  const dir = path.join(process.cwd(), "public", "images", "home", "clients");
  if (!fs.existsSync(dir)) return [];

  return fs
    .readdirSync(dir)
    .filter((f) => IMAGE_EXT.test(f) && !f.startsWith("."))
    .sort((a, b) => a.localeCompare(b, "en"))
    .map((file) => {
      const base = path.basename(file, path.extname(file));
      return {
        src: `/images/home/clients/${file}`,
        alt: altFromFilename(base),
      };
    });
}
