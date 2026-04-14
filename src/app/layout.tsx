import type { Metadata } from "next";
import { Geist, Geist_Mono, Noto_Sans_JP } from "next/font/google";

import { ScrollRevealAutoScope } from "@/components/ScrollRevealAutoScope";

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const notoSansJp = Noto_Sans_JP({
  variable: "--font-noto",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "GUSHO — Portfolio",
    template: "%s — GUSHO",
  },
  description: "ポートフォリオサイト",
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
      "max-image-preview": "none",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ja"
      className={`${geistSans.variable} ${geistMono.variable} ${notoSansJp.variable} h-full antialiased`}
    >
      <body
        className={`flex min-h-full flex-col ${notoSansJp.className}`}
      >
        <ScrollRevealAutoScope>{children}</ScrollRevealAutoScope>
      </body>
    </html>
  );
}
