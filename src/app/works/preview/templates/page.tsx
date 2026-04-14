import { WorkDetailBlocks } from "@/components/works/detail/WorkDetailBlocks";

import { PREVIEW_DETAIL_TEMPLATE_BLOCKS } from "./preview-detail-template-blocks";

/**
 * 作品詳細のテンプレ見本一覧。データは **`preview-detail-template-blocks.ts` のみ**（作品データと非連動）。
 * 必須レイアウトは同ファイルの `PREVIEW_REQUIRED_TEMPLATE_TYPES` でビルド時検証される。
 */
export default function WorksPreviewTemplatesPage() {
  return (
    <main className="bg-white">
      <div className="mx-auto w-full max-w-[1512px] px-5 pb-4 pt-8 md:px-20">
        <p className="font-en text-sm tracking-[0.12em] text-zinc-500">
          PREVIEW / Detail Templates
        </p>
      </div>
      <WorkDetailBlocks
        blocks={PREVIEW_DETAIL_TEMPLATE_BLOCKS}
        deferBlockMediaUntilVisible
      />
    </main>
  );
}
