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
  },
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
