/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    // Next.js App Router
    './app/**/*.{js,ts,jsx,tsx}',
    // React コンポーネント
    './components/**/*.{js,ts,jsx,tsx}',
    // ページ／API ルート（Pages Router を併用する場合）
    './pages/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      // 必要に応じてカスタムテーマを追加
    },
  },
  plugins: [
    // 例: require('@tailwindcss/forms'),
  ],
}
