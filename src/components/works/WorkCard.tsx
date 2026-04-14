import Link from "next/link";

import type { WorkItem } from "@/data/works";

import { AwardBadges } from "./AwardBadges";
import { WorkThumbnailVideo } from "./WorkThumbnailVideo";

export function WorkCard({ work }: { work: WorkItem }) {
  return (
    <article className="flex w-full max-w-[694px] flex-col">
      <Link href={`/works/${work.slug}`} className="group flex flex-col gap-6">
        <div className="relative w-full overflow-hidden bg-zinc-100 transition-[border-radius] duration-300 ease-out group-hover:rounded-[32px]">
          <WorkThumbnailVideo slug={work.slug} videoFile={work.videoFile} />
          <AwardBadges awards={work.awards} />
        </div>
        <div className="flex min-w-0 flex-col items-start gap-1 md:flex-row md:flex-wrap md:items-center md:gap-5">
          <h2 className="shrink-0 font-sans text-2xl font-bold leading-[1.25] tracking-tight text-[#242424] md:order-1">
            {work.title}
          </h2>
          <p className="min-w-0 flex-1 font-sans text-base font-normal leading-[1.875] text-[#6D6D6D] md:order-2">
            {work.client}
          </p>
        </div>
      </Link>
    </article>
  );
}
