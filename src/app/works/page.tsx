import { WorkCard } from "@/components/works/WorkCard";
import { WORKS } from "@/data/works";

export default function WorksPage() {
  return (
    <main className="mx-auto w-full max-w-[1512px] px-5 pb-16 pt-0 lg:px-[42px] md:pb-24">
      <div className="grid grid-cols-1 justify-items-center gap-10 lg:grid-cols-2 lg:gap-x-10 lg:gap-y-10">
        {WORKS.map((work) => (
          <WorkCard key={work.slug} work={work} />
        ))}
      </div>
    </main>
  );
}
