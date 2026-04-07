export function ContactSection() {
  return (
    <section className="bg-[#242424] px-5 py-16 md:px-20 md:py-20">
      <div className="mx-auto flex max-w-[1512px] flex-col items-center gap-5 text-center">
        <h2 className="font-en text-[clamp(2rem,5vw,3.25rem)] font-bold leading-[1.3] text-white">
          CONTACT ME ANYTIME
        </h2>
        <a
          href="mailto:shota.tanaka@gusho.co"
          className="font-en text-[clamp(1.25rem,3vw,2.5rem)] font-light leading-[1.3] text-white underline-offset-4 transition hover:underline"
        >
          shota.tanaka@gusho.co
        </a>
      </div>
    </section>
  );
}
