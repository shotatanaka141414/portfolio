import type { MetadataRoute } from "next";

/** 検索エンジンのクロールを全体的に抑制する。 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      disallow: "/",
    },
  };
}
