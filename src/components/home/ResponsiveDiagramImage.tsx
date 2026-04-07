type Props = {
  /** デスクトップ用（md以上） */
  pcSrc: string;
  /** スマホ用（md未満）。未配置時は PC と同じパスを指定 */
  spSrc: string;
  alt: string;
};

/**
 * SP 用に別比率の JPG を出し分け。ファイルは public 配下に配置してください。
 * 例: my-speciality.jpg / my-speciality-sp.jpg
 */
export function ResponsiveDiagramImage({ pcSrc, spSrc, alt }: Props) {
  return (
    <div className="w-full bg-white">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={spSrc}
        alt={alt}
        width={1024}
        height={600}
        className="block h-auto w-full bg-white md:hidden"
        loading="lazy"
        decoding="async"
      />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={pcSrc}
        alt={alt}
        width={1024}
        height={484}
        className="hidden h-auto w-full bg-white md:block"
        loading="lazy"
        decoding="async"
      />
    </div>
  );
}
