import type { NextConfig } from "next";

function mediaCdnRemotePatterns() {
  const raw = process.env.NEXT_PUBLIC_MEDIA_CDN_BASE?.trim();
  if (!raw) return [];
  try {
    const u = new URL(raw);
    const entry: {
      protocol: "http" | "https";
      hostname: string;
      pathname: string;
      port?: string;
    } = {
      protocol: u.protocol.replace(":", "") as "http" | "https",
      hostname: u.hostname,
      pathname: "/**",
    };
    if (u.port) entry.port = u.port;
    return [entry];
  } catch {
    return [];
  }
}

const nextConfig: NextConfig = {
  images: {
    remotePatterns: mediaCdnRemotePatterns(),
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "X-Robots-Tag",
            value: "noindex, nofollow, noarchive",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
