import Link from "next/link";

export default function WorksPage() {
  return (
    <div className="mx-auto flex min-h-full w-full max-w-5xl flex-col gap-8 px-4 py-12 sm:px-6 lg:px-8">
      <header className="space-y-2">
        <p className="text-sm text-zinc-500">Portfolio</p>
        <h1 className="text-3xl font-semibold tracking-tight text-zinc-900 sm:text-4xl">
          作品一覧
        </h1>
        <p className="max-w-2xl text-zinc-600">
          Figma（node 12:2383）に合わせて実装予定のプレースホルダーです。
        </p>
      </header>
      <ul className="grid gap-4 sm:grid-cols-2">
        <li>
          <Link
            href="/works/sample"
            className="block rounded-xl border border-zinc-200 bg-white p-6 transition hover:border-zinc-300 hover:shadow-sm"
          >
            <span className="font-medium text-zinc-900">サンプル作品</span>
            <p className="mt-1 text-sm text-zinc-500">/works/sample</p>
          </Link>
        </li>
      </ul>
      <p>
        <Link href="/" className="text-sm font-medium text-zinc-700 underline-offset-4 hover:underline">
          ← ホームへ
        </Link>
      </p>
    </div>
  );
}
