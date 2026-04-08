import { notFound } from "next/navigation";

import { WorkDetailHero } from "@/components/works/detail/WorkDetailHero";
import { getWorkDetailConfig } from "@/data/work-details";
import { getAdjacentWorks, getWorkBySlug } from "@/data/works";

export default function WorksPreviewHeroPage() {
  const work = getWorkBySlug("idare");
  if (!work) notFound();

  const detail = getWorkDetailConfig("idare");
  const { prev, next } = getAdjacentWorks("idare");

  return (
    <main className="bg-white">
      <WorkDetailHero work={work} hero={detail.hero} prev={prev} next={next} />
    </main>
  );
}
