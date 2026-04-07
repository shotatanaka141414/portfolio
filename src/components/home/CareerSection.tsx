import Image from "next/image";

const ENTRIES = [
  {
    period: "Today",
    org: "独立 / GUSHO",
    title: "合同会社GUSHO\nCEO/CDO",
    body: "2024年3月に法人を設立し、あらゆる企業のデザイン支援、ベンチャー企業のCDOとして活動している。",
    logoSrc: "/images/home/header-mark.svg" as string | undefined,
  },
  {
    period: "2019.9 ~ 2023.11",
    org: "Accenture inc.",
    title: "アクセンチュア株式会社\nインタラクションデザイナー",
    body: "インタラクションデザイナーとして、KDDI、Hondaの他、Web3.0、生成AI、金融、保険、化粧品など様々な業界の新規サービス・リニューアルを支援。UIUXのみならずサービスデザイン領域にも情熱を注ぎ、250人以上にユーザーテスト・インタビューを実施。ユーザーの潜在的なニーズを重要視したデザイン制作を心掛けた。",
    logoSrc: undefined as string | undefined,
    logoFallback: "accenture" as const,
  },
  {
    period: "2016.4 ~ 2019.9",
    org: "HAKUHODO I-STUDIO",
    title: "株式会社博報堂アイ・スタジオ\nUX/UIデザイナー",
    body: "NISSAN、JTの他、物流、建築、電器機器などのWEBサービスのUI・UXを担当。200~1000ページ強ある大型コーポレートサイトを多く担当し、 実装工数や運用面を考慮したデザインシステムの構築を得意分野として活動した。",
    logoSrc: undefined as string | undefined,
    logoFallback: "hakuhodo" as const,
  },
];

function CareerLogoFallback({ type }: { type: "accenture" | "hakuhodo" }) {
  if (type === "accenture") {
    return (
      <span className="font-en text-lg font-bold tracking-tight text-white sm:text-xl">
        &gt; Accenture
      </span>
    );
  }
  return (
    <span className="text-center font-en text-sm font-bold leading-tight text-white sm:text-base">
      HAKUHODO
      <br />
      <span className="text-xs font-normal">I-STUDIO</span>
    </span>
  );
}

function CareerLogoSlot({
  logoSrc,
  logoFallback,
}: {
  logoSrc?: string;
  logoFallback?: "accenture" | "hakuhodo";
}) {
  return (
    <div className="flex h-[72px] w-[200px] shrink-0 items-center justify-center p-3 sm:h-[80px] sm:w-[220px]">
      {logoSrc ? (
        <Image
          src={logoSrc}
          alt=""
          width={200}
          height={72}
          className="max-h-14 w-full object-contain brightness-0 invert"
        />
      ) : logoFallback ? (
        <CareerLogoFallback type={logoFallback} />
      ) : null}
    </div>
  );
}

export function CareerSection() {
  return (
    <section className="w-full bg-[#242424] text-white">
      <div className="flex flex-col gap-12 py-16 pl-5 md:gap-20 md:pl-20 md:py-20 lg:flex-row lg:items-start">
        <h2 className="shrink-0 pr-6 font-en text-[clamp(2rem,5vw,3.25rem)] font-bold leading-[1.3] md:pr-10">
          CAREER
        </h2>
        <div className="scrollbar-hide min-w-0 flex-1 overflow-x-auto overflow-y-visible pb-2 [-webkit-overflow-scrolling:touch]">
          <div className="flex w-max gap-8 pr-0 lg:gap-10">
            {ENTRIES.map((e) => (
              <article
                key={e.org}
                className="flex min-h-[28rem] w-[min(85vw,440px)] shrink-0 gap-4 sm:w-[400px] lg:w-[440px]"
              >
                <div className="flex w-4 shrink-0 flex-col items-center self-stretch pt-1">
                  <span
                    className="h-3 w-3 shrink-0 rounded-full border-2 border-white bg-transparent"
                    aria-hidden
                  />
                  <span className="mt-2 w-px flex-1 bg-white" />
                </div>
                <div className="flex min-w-0 flex-1 flex-col gap-8">
                  <div className="flex flex-col gap-3">
                    <p className="text-sm font-normal leading-relaxed text-white">
                      {e.period}
                    </p>
                    <p className="text-xl font-bold leading-snug">{e.org}</p>
                  </div>
                  <CareerLogoSlot
                    logoSrc={e.logoSrc}
                    logoFallback={
                      "logoFallback" in e ? e.logoFallback : undefined
                    }
                  />
                  <div className="flex max-w-[400px] flex-col gap-4">
                    <h3 className="whitespace-pre-line text-xl font-bold leading-snug">
                      {e.title}
                    </h3>
                    <p className="text-base font-normal leading-relaxed text-white">
                      {e.body}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
