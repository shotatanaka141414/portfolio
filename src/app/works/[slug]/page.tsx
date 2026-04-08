import { notFound } from "next/navigation";

import { WorkDetailAdjacentNav } from "@/components/works/detail/WorkDetailAdjacentNav";
import { WorkDetailBlocks } from "@/components/works/detail/WorkDetailBlocks";
import { WorkDetailHero } from "@/components/works/detail/WorkDetailHero";
import { getWorkDetailConfig } from "@/data/work-details";
import { getAdjacentWorks, getWorkBySlug, WORKS } from "@/data/works";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return WORKS.map((w) => ({ slug: w.slug }));
}

export default async function WorkDetailPage({ params }: Props) {
  const { slug } = await params;
  const work = getWorkBySlug(slug);

  if (!work) {
    notFound();
  }

  const detail = getWorkDetailConfig(slug);
  const { prev, next } = getAdjacentWorks(slug);

  return (
    <article className="bg-white">
      <WorkDetailHero work={work} hero={detail.hero} prev={prev} next={next} />
      <WorkDetailBlocks blocks={detail.blocks} />
      {(prev || next) && <WorkDetailAdjacentNav prev={prev} next={next} />}
    </article>
  );
}
