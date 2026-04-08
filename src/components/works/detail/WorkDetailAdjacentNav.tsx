import Image from "next/image";
import Link from "next/link";

import type { WorkItem } from "@/data/works";

const arrowBackSrc = "/images/detail/common/arrow_large_back.svg";
const arrowForwardSrc = "/images/detail/common/arrow_large_forward.svg";

function ArrowBack40({ className }: { className?: string }) {
  return (
    <Image
      src={arrowBackSrc}
      alt=""
      width={40}
      height={40}
      className={className}
      aria-hidden
    />
  );
}

function ArrowForward40({ className }: { className?: string }) {
  return (
    <Image
      src={arrowForwardSrc}
      alt=""
      width={40}
      height={40}
      className={className}
      aria-hidden
    />
  );
}

const pillClass =
  "flex h-[100px] w-full max-w-[668px] flex-1 items-center rounded-[30px] border border-[#242424] bg-white px-8 text-[#242424] transition-colors hover:bg-zinc-50";

type Props = {
  prev: WorkItem | null;
  next: WorkItem | null;
};

/**
 * 作品詳細の前後作品へ移動するナビ（Figma node 2504:1822 に準拠した 2 カラム pill）
 */
export function WorkDetailAdjacentNav({ prev, next }: Props) {
  return (
    <nav
      className="mx-auto mt-[160px] w-full max-w-[1512px] px-5 pb-20 md:px-20"
      aria-label="他の作品へ移動"
    >
      <div className="flex w-full flex-col gap-4 lg:flex-row lg:items-stretch lg:gap-4">
        {prev ? (
          <Link href={`/works/${prev.slug}`} className={pillClass} prefetch={true}>
            <div className="flex w-full min-w-0 items-center justify-between gap-4">
              <div className="flex min-w-0 flex-1 items-center gap-4">
                <ArrowBack40 className="h-10 w-10 shrink-0 text-[#242424]" />
                <span className="truncate font-sans text-[18px] font-normal leading-[1.5]">{prev.title}</span>
              </div>
              <span className="max-w-[45%] shrink-0 truncate text-right font-sans text-[14px] font-normal leading-relaxed">
                {prev.client}
              </span>
            </div>
          </Link>
        ) : (
          <div className="hidden min-h-0 flex-1 basis-0 lg:block lg:max-w-[668px]" aria-hidden />
        )}

        {next ? (
          <Link href={`/works/${next.slug}`} className={pillClass} prefetch={true}>
            <div className="flex w-full min-w-0 items-center justify-between gap-4">
              <span className="max-w-[45%] shrink-0 truncate font-sans text-[14px] font-normal leading-relaxed">
                {next.client}
              </span>
              <div className="flex min-w-0 flex-1 items-center justify-end gap-4">
                <span className="truncate text-right font-sans text-[18px] font-normal leading-[1.5]">
                  {next.title}
                </span>
                <ArrowForward40 className="h-10 w-10 shrink-0 text-[#242424]" />
              </div>
            </div>
          </Link>
        ) : (
          <div className="hidden min-h-0 flex-1 basis-0 lg:block lg:max-w-[668px]" aria-hidden />
        )}
      </div>
    </nav>
  );
}
