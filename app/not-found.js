import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4 text-center">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">404 - ページが見つかりません</h1>
        <p className="mb-4">お探しのページは存在しないか、移動した可能性があります。</p>
        <Link 
          href="/"
          className="inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
        >
          Practice Player へ移動
        </Link>
      </div>
    </div>
  );
}
