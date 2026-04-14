import Image from "next/image";
import Link from "next/link";

import { publicAssetUrl } from "@/lib/public-asset-url";

const strikeFromLeft =
  "relative inline-block after:pointer-events-none after:absolute after:left-0 after:top-1/2 after:h-px after:w-full after:-translate-y-1/2 after:origin-left after:scale-x-0 after:bg-current after:transition-transform after:duration-300 after:ease-out after:content-[''] hover:after:scale-x-100";

const navReg = `font-en text-xl font-normal leading-[1.4] text-[#242424] ${strikeFromLeft}`;
const navBold = `font-en text-xl font-bold leading-[1.4] text-[#242424] ${strikeFromLeft}`;

/** Figma works: 白背景・WORKS を Bold */
export function WorksHeader() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 h-20 bg-white/95 backdrop-blur-md">
      <div className="mx-auto flex h-full max-w-[1512px] items-center justify-between px-5 md:px-8">
        <Link
          href="/"
          className="flex h-10 w-10 items-center justify-center md:h-11 md:w-11"
        >
          <Image
            src={publicAssetUrl("/images/home/header-mark.svg")}
            alt="GUSHO"
            width={30}
            height={26}
            priority
          />
        </Link>
        <nav className="flex items-center gap-6 md:gap-8">
          <Link href="/" className={navReg}>
            ABOUT ME
          </Link>
          <Link href="/works" className={navBold} aria-current="page">
            WORKS
          </Link>
        </nav>
      </div>
    </header>
  );
}
