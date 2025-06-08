// app/layout.js
import '../styles/globals.css';

export const metadata = {
  title: 'Practice Player',
  description: 'A player for practicing music',
};

export default function RootLayout({ children }) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}
