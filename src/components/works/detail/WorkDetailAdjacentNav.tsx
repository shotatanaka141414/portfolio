import Link from "next/link";

import type { WorkItem } from "@/data/works";

const pillClass =
  "flex h-full min-h-[100px] w-full max-w-[668px] flex-1 flex-col justify-center rounded-none border border-[#242424] bg-white px-6 py-5 text-[#242424] transition-colors hover:bg-zinc-50 lg:h-[100px] lg:max-h-none lg:rounded-[30px] lg:flex-row lg:items-center lg:px-8 lg:py-0";

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
      <div className="grid w-full grid-cols-2 items-stretch gap-1 lg:flex lg:flex-row lg:items-stretch lg:gap-4">
        {prev ? (
          <Link href={`/works/${prev.slug}`} className={pillClass} prefetch={true}>
            <div className="flex w-full min-w-0 flex-col gap-2 lg:flex-row lg:items-center lg:justify-between lg:gap-4">
              <div className="flex min-w-0 flex-col gap-2 text-pretty lg:hidden">
                <span className="break-words font-sans text-[12px] font-normal leading-relaxed">
                  {prev.client}
                </span>
                <span className="break-words font-sans text-[14px] font-normal leading-[1.5]">{prev.title}</span>
              </div>
              <div className="hidden min-w-0 flex-1 items-center lg:flex">
                <span className="truncate font-sans text-[18px] font-normal leading-[1.5]">{prev.title}</span>
              </div>
              <span className="hidden max-w-[45%] shrink-0 truncate text-right font-sans text-[14px] font-normal leading-relaxed lg:inline">
                {prev.client}
              </span>
            </div>
          </Link>
        ) : (
          <div className="hidden min-h-0 flex-1 basis-0 lg:block lg:max-w-[668px]" aria-hidden />
        )}

        {next ? (
          <Link href={`/works/${next.slug}`} className={pillClass} prefetch={true}>
            <div className="flex w-full min-w-0 flex-col gap-2 lg:flex-row lg:items-center lg:justify-between lg:gap-4">
              <div className="flex min-w-0 flex-col items-end gap-2 text-pretty lg:hidden">
                <span className="break-words text-right font-sans text-[12px] font-normal leading-relaxed">
                  {next.client}
                </span>
                <span className="break-words text-right font-sans text-[14px] font-normal leading-[1.5]">
                  {next.title}
                </span>
              </div>
              <span className="hidden max-w-[45%] shrink-0 truncate font-sans text-[14px] font-normal leading-relaxed lg:inline">
                {next.client}
              </span>
              <div className="hidden min-w-0 flex-1 items-center justify-end lg:flex">
                <span className="truncate text-right font-sans text-[18px] font-normal leading-[1.5]">
                  {next.title}
                </span>
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
