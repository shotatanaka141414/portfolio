"use client";

import { usePathname } from "next/navigation";
import { type ReactNode, useLayoutEffect, useRef } from "react";

type Props = {
  children: ReactNode;
};

function collectRevealTargets(root: HTMLElement): HTMLElement[] {
  const seen = new Set<HTMLElement>();
  const out: HTMLElement[] = [];

  const push = (el: HTMLElement) => {
    if (seen.has(el)) return;
    seen.add(el);
    out.push(el);
  };

  root.querySelectorAll("section").forEach((node) => {
    if (!(node instanceof HTMLElement)) return;
    if (node.classList.contains("scroll-reveal-manual-target")) return;
    if (node.parentElement?.classList.contains("scroll-reveal")) return;
    if (node.parentElement?.closest("section")) return;
    push(node);
  });

  root.querySelectorAll("article").forEach((node) => {
    if (!(node instanceof HTMLElement)) return;
    const hasDirectSectionChild = [...node.children].some((c) => c.tagName === "SECTION");
    if (hasDirectSectionChild) return;
    push(node);
  });

  root.querySelectorAll("article > nav").forEach((node) => {
    if (!(node instanceof HTMLElement)) return;
    push(node);
  });

  root.querySelectorAll("main > div").forEach((node) => {
    if (!(node instanceof HTMLElement)) return;
    if (node.querySelector("section") || node.querySelector("article")) return;
    push(node);
  });

  return out;
}

/**
 * ページ内の主要ブロック（section / article / 作品詳細の article 直下 nav）に
 * スクロール連動のフェードアップを付与する。
 */
export function ScrollRevealAutoScope({ children }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useLayoutEffect(() => {
    const root = containerRef.current;
    if (!root) return;

    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const targets = collectRevealTargets(root);
    const cls = "scroll-reveal-vp";
    const visible = "scroll-reveal-vp--visible";

    if (reduced) {
      targets.forEach((el) => {
        el.classList.add(cls, visible);
      });
      return () => {
        targets.forEach((el) => {
          el.classList.remove(cls, visible);
        });
      };
    }

    targets.forEach((el) => {
      el.classList.add(cls);
    });

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const el = entry.target as HTMLElement;
          // 少し遅らせて visible を付け、初回判定が早すぎるときでも
          // スクロール時のフェードアップが視認できるようにする。
          window.setTimeout(() => {
            if (!el.isConnected) return;
            el.classList.add(visible);
          }, 70);
          io.unobserve(el);
        }
      },
      { rootMargin: "0px 0px -15% 0px", threshold: 0.2 },
    );

    const pending = { r1: 0, r2: 0 };
    pending.r1 = requestAnimationFrame(() => {
      pending.r2 = requestAnimationFrame(() => {
        targets.forEach((el) => io.observe(el));
      });
    });

    return () => {
      cancelAnimationFrame(pending.r1);
      cancelAnimationFrame(pending.r2);
      io.disconnect();
      targets.forEach((el) => {
        el.classList.remove(cls, visible);
      });
    };
  }, [pathname]);

  return (
    <div ref={containerRef} className="flex min-h-full flex-1 flex-col">
      {children}
    </div>
  );
}
