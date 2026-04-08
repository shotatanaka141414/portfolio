"use client";

import { ImageWithFallback } from "./ImageWithFallback";

export type ClientLogo = { src: string; alt: string };

function LogoSlot({ src, alt }: ClientLogo) {
  return (
    <div className="flex h-[72px] w-[140px] shrink-0 items-center justify-center px-2 sm:h-[80px] sm:w-[160px]">
      <ImageWithFallback
        src={src}
        alt={alt}
        containerClassName="relative h-full w-full max-h-[72px] max-w-[140px] sm:max-h-[80px] sm:max-w-[160px]"
        className="object-center"
        fallback={
          <span className="text-center text-[11px] font-bold leading-tight text-zinc-500 sm:text-xs">
            {alt}
          </span>
        }
      />
    </div>
  );
}

export function ClientsMarqueeTrack({ logos }: { logos: ClientLogo[] }) {
  const doubled = [...logos, ...logos];

  if (logos.length === 0) {
    return (
      <section className="w-full overflow-hidden bg-white py-14 md:py-20" />
    );
  }

  return (
    <section className="w-full overflow-hidden bg-white py-14 md:py-20">
      <div className="flex w-max min-w-full animate-marquee-logos">
        {doubled.map((c, i) => (
          <LogoSlot key={`${c.src}-${i}`} src={c.src} alt={c.alt} />
        ))}
      </div>
    </section>
  );
}
