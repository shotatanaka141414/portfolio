"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const navBold =
  "font-en text-xl font-bold leading-[1.4] text-white hover:line-through";
const navReg =
  "font-en text-xl font-normal leading-[1.4] text-white hover:line-through";
const navBoldLight =
  "font-en text-xl font-bold leading-[1.4] text-[#242424] hover:line-through";
const navRegLight =
  "font-en text-xl font-normal leading-[1.4] text-[#242424] hover:line-through";

export function HomeHeader() {
  const [onLight, setOnLight] = useState(false);

  useEffect(() => {
    const heroEnd = () => window.innerHeight * 0.88;
    const tick = () => setOnLight(window.scrollY > heroEnd());
    tick();
    window.addEventListener("scroll", tick, { passive: true });
    window.addEventListener("resize", tick);
    return () => {
      window.removeEventListener("scroll", tick);
      window.removeEventListener("resize", tick);
    };
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 h-20 transition-colors duration-300 ${
        onLight ? "bg-white/90 text-[#242424] backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-full max-w-[1512px] items-center justify-between px-5 md:px-8">
        <Link
          href="/"
          className="flex h-10 w-10 items-center justify-center md:h-11 md:w-11"
        >
          <Image
            src="/images/home/header-mark.svg"
            alt="GUSHO"
            width={30}
            height={26}
            className={onLight ? "" : "brightness-0 invert"}
            priority
          />
        </Link>
        <nav className="flex items-center gap-6 md:gap-8">
          <span className={onLight ? navBoldLight : navBold}>ABOUT ME</span>
          <Link href="/works" className={onLight ? navRegLight : navReg}>
            WORKS
          </Link>
        </nav>
      </div>
    </header>
  );
}
