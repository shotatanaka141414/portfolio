import Image from "next/image";
import Link from "next/link";

export function WorksCtaSection() {
  return (
    <section className="relative w-full overflow-hidden bg-zinc-900">
      <Link
        href="/works"
        className="relative z-10 flex min-h-[220px] w-full items-center justify-between gap-8 px-6 py-12 transition hover:bg-white/5 sm:min-h-[280px] md:px-16 lg:px-24"
      >
        <div className="flex min-w-0 flex-col items-start gap-2 text-left text-white">
          <span className="font-en text-4xl font-bold leading-none tracking-tight sm:text-5xl lg:text-[52px]">
            WORKS
          </span>
          <span className="max-w-md text-sm leading-relaxed text-white sm:text-base">
            守秘義務のため一部画像をぼかしています。
          </span>
        </div>
        <span className="relative h-16 w-16 shrink-0 sm:h-20 sm:w-20">
          <Image
            src="/images/home/works-cta-button.svg"
            alt=""
            width={80}
            height={80}
            className="h-full w-full object-contain"
          />
        </span>
      </Link>
    </section>
  );
}
