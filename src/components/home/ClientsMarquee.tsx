const CLIENTS = [
  "KDDI",
  "docomo",
  "NISSAN",
  "HONDA",
  "GMO",
  "JP BANK",
  "JT",
  "KUME SEKKEI",
  "Yamato",
  "KIRIN",
  "Alcon",
  "MIZUHO",
] as const;

function LogoSlot({ name }: { name: string }) {
  return (
    <div className="flex h-[72px] w-[140px] shrink-0 items-center justify-center px-2 sm:h-[80px] sm:w-[160px]">
      {/* ロゴ画像は /images/home/clients/<slug>.png を同名で配置可能にする場合はここで img を追加 */}
      <span className="text-center text-[11px] font-bold leading-tight text-zinc-500 sm:text-xs">
        {name}
      </span>
    </div>
  );
}

export function ClientsMarquee() {
  const doubled = [...CLIENTS, ...CLIENTS];

  return (
    <section className="w-full overflow-hidden bg-white py-14 md:py-20">
      <div className="flex w-max min-w-full animate-marquee-logos">
        {doubled.map((name, i) => (
          <LogoSlot key={`${name}-${i}`} name={name} />
        ))}
      </div>
    </section>
  );
}
