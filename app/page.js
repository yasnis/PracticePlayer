// app/page.js
export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6">
      <h1 className="text-3xl font-bold mb-4">Practice Player</h1>
      <p className="text-lg mb-6">音楽練習のためのプレイヤーアプリケーション</p>
      <div className="max-w-lg text-center">
        <p>このアプリケーションでは、音楽ファイルの再生、ループ設定、速度調整などができます。</p>
        <p className="mt-4">使い方については、画面の指示に従ってください。</p>
      </div>
    </div>
  );
}