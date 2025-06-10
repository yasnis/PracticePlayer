// app/layout.js
import '../styles/globals.css';
import SidePanel from '../components/layout/SidePanel';
import SidePanelContent from '../components/layout/SidePanelContent';
import ModalContainer from '../components/ui/ModalContainer';

export const metadata = {
  title: 'Practice Player',
  description: 'A player for practicing music',
  icons: {
    icon: '/practiceplayer/favicon.ico',
    apple: [
      { url: '/practiceplayer/icons/icon-192x192.png', sizes: '192x192', type: 'image/png' },
      { url: '/practiceplayer/icons/icon-512x512.png', sizes: '512x512', type: 'image/png' },
    ],
  },
  manifest: '/practiceplayer/manifest.json',
  appleWebApp: {
    title: 'Practice Player',
    statusBarStyle: 'black-translucent',
    capable: true,
    startupImage: [
      { url: '/practiceplayer/icons/icon-512x512.png', media: '(device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2)' },
    ],
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
  },
  themeColor: '#1E1E1E',
  applicationName: 'Practice Player',
};

export default function RootLayout({ children }) {
  return (
    <html lang="ja">
      <body>
        <div className="flex">
          <SidePanel>
            <SidePanelContent />
          </SidePanel>
          <main className="flex-1 ml-0 md:ml-60 p-4">
            {children}
          </main>
        </div>
        {/* モーダルを画面全体に表示するためのコンテナ */}
        <ModalContainer />
      </body>
    </html>
  );
}
