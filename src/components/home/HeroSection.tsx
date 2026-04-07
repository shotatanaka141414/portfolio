"use client";

import { useEffect, useRef, useState } from "react";

import { HomeHeader } from "./HomeHeader";

const HERO_VIDEO_SRC = "/videos/hero.mp4";

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [heroFade, setHeroFade] = useState(1);

  useEffect(() => {
    const update = () => {
      const el = sectionRef.current;
      if (!el) return;
      const h = el.offsetHeight;
      const y = window.scrollY;
      const fadeRange = Math.max(h * 0.35, 1);
      const t = Math.min(1, y / fadeRange);
      setHeroFade(1 - t);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-[100svh] min-h-[100svh] w-full overflow-hidden bg-black"
    >
      <video
        className="absolute inset-0 z-0 h-full w-full object-cover transition-[opacity] duration-300 ease-out"
        style={{ opacity: heroFade }}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        aria-hidden
      >
        <source src={HERO_VIDEO_SRC} type="video/mp4" />
      </video>
      <HomeHeader />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-10 hidden pr-5 transition-[opacity] duration-300 ease-out md:flex md:justify-end md:pr-10"
        style={{ opacity: heroFade }}
        aria-hidden
      >
        <div className="flex flex-col items-center gap-2">
          <span className="font-en text-base font-normal tracking-[0.2em] text-white">
            SCROLL
          </span>
          <span className="block h-16 w-px shrink-0 bg-white md:h-20" />
        </div>
      </div>
    </section>
  );
}
