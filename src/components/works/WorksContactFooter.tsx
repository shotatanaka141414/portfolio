/** Figma Frame 359: ダーク帯・中央揃え */
export function WorksContactFooter() {
  return (
    <section className="bg-[#242424] px-5 py-16 text-center text-white md:px-20 md:py-20">
      <h2 className="font-en text-[clamp(2rem,5vw,3.25rem)] font-bold leading-[1.3] tracking-tight">
        CONTACT ME ANYTIME
      </h2>
      <a
        href="mailto:shota.tanaka@gusho.co"
        className="font-en mt-5 block text-[clamp(1.5rem,4vw,2.5rem)] font-normal leading-[1.3] text-white/95 transition hover:text-white hover:underline"
      >
        shota.tanaka@gusho.co
      </a>
    </section>
  );
}
