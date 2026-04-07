import Link from "next/link";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function WorkDetailPage({ params }: Props) {
  const { slug } = await params;

  if (!slug) {
    notFound();
  }

  return (
    <article className="mx-auto flex min-h-full w-full max-w-3xl flex-col gap-8 px-4 py-12 sm:px-6 lg:px-8">
      <header className="space-y-2">
        <p className="text-sm text-zinc-500">Work</p>
        <h1 className="text-3xl font-semibold tracking-tight text-zinc-900 sm:text-4xl">
          作品詳細
        </h1>
        <p className="font-mono text-sm text-zinc-500">slug: {slug}</p>
        <p className="text-zinc-600">
          Figma（node 2033:2355 系）に合わせて実装予定のプレースホルダーです。
        </p>
      </header>
      <nav className="flex flex-wrap gap-4 text-sm">
        <Link href="/works" className="font-medium text-zinc-700 underline-offset-4 hover:underline">
          ← 作品一覧
        </Link>
        <Link href="/" className="font-medium text-zinc-700 underline-offset-4 hover:underline">
          ホーム
        </Link>
      </nav>
    </article>
  );
}
