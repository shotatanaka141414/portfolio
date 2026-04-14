import type { ReactNode } from "react";

type Props = {
  /** デスクトップ用（md以上） */
  pcSrc: string;
  alt: string;
  /** SP（md未満）で画像の代わりに表示する UI。指定時は `spSrc` の img は出さない */
  spContent?: ReactNode;
  /** SP 用画像。`spContent` 未指定のとき必須 */
  spSrc?: string;
};

/**
 * PC は常に `pcSrc` の画像。SP は `spContent` があればそちら、なければ `spSrc`。
 * SP 画像のみ使う例: MY SPECIALITY — `public/images/home/my-speciality-sp.jpg`
 */
export function ResponsiveDiagramImage({ pcSrc, spSrc, alt, spContent }: Props) {
  return (
    <div className="w-full bg-white">
      {spContent ? (
        <div className="min-w-0 md:hidden">{spContent}</div>
      ) : (
        /* eslint-disable-next-line @next/next/no-img-element */
        <img
          src={spSrc}
          alt={alt}
          width={1024}
          height={600}
          className="block h-auto w-full bg-white md:hidden"
          loading="lazy"
          decoding="async"
        />
      )}
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
