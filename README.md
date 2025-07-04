# 楽器練習用音楽プレイヤー（仮称）

## 🎯 アプリケーションの目的

本アプリケーションは、楽器の練習において使用される教則本付属の音源ファイル（例：mp3, wav, flac）を、より効率的に再生・操作できる専用プレイヤーを提供することを目的としています。

ABループや波形表示、マーカー機能など、一般的な音楽プレイヤーには備わっていない、**楽器練習に特化した再生支援機能**を備えています。

---

## 👤 想定ユーザー

- 楽器練習中の個人ユーザー（初心者〜上級者）
- 音楽教室や教育機関の講師
- オンラインレッスンを行うプレイヤー・インストラクター
- 教則本の出版社や教育用コンテンツ制作者（BtoB展開も想定）

---

## 🪗 ユースケース（例）

- ギター教則本の3〜5トラックにまたがるフレーズを、繰り返し練習したい
- A地点（3曲目の中間）〜B地点（5曲目の頭）までをABリピート
- 波形を見ながら再生ポイントを直感的に調整したい
- 自分用にマーカーをつけて復習ポイントを明示したい
- モバイル環境やオフラインでもスムーズに使用したい

---

## 📂 ドキュメント構成

| ドキュメント名 | 内容 |
|----------------|------|
| [`docs/feature-spec.md`](docs/feature-spec.md) | 実装する機能の一覧と詳細（Phase 1/2） |
| [`docs/tech-spec.md`](docs/tech-spec.md) | 技術要件（技術スタック、再生エンジン、PWA対応など） |
| [`docs/ui-layout.md`](docs/ui-layout.md) | 全体の画面構成・レイアウト説明 |
| [`docs/ui-components.md`](docs/ui-components.md) | 各UIコンポーネントの詳細仕様（左パネル／右パネル） |
| [`docs/offline-storage.md`](docs/offline-storage.md) | 音源ファイル保存・オフライン対応の仕様 |

---

## ディレクトリ構成
practice-player/
├── .gitignore
├── package.json
├── next.config.js
├── tailwind.config.js
├── postcss.config.js
├── .eslintrc.js
├── README.md
├── SETUP.md
├── public/
│   ├── favicon.ico
│   ├── manifest.json
│   └── icons/
│       ├── icon-192x192.png
│       └── icon-512x512.png
├── app/                      # Next.js App Router 用ルート
│   ├── page.js               # トップページ
│   ├── layout.js             # 共通レイアウト
│   └── practiceplayer/       # basePath 用ディレクトリ
│       └── page.js
├── components/               # React コンポーネント
│   ├── LeftSidebar.jsx
│   ├── TrackEditor.jsx
│   ├── PlaybackControls.jsx
│   ├── ZoomSlider.jsx
│   └── …                    
├── lib/                      # WaveSurfer や IndexedDB ユーティリティ
│   ├── wavesurfer.js
│   └── idb.js
├── styles/
│   ├── globals.css
│   └── tailwind.css
├── docs/
│   ├── feature-spec.md
│   ├── tech-spec.md
│   ├── ui-layout.md
│   └── ui-components/
│       ├── left-sidebar.md
│       ├── logo.md
│       ├── playlist-list.md
│       ├── playlist-create-button.md
│       ├── usage-guide-modal.md
│       ├── track-editor.md
│       ├── playback-controls.md
│       ├── zoom-slider.md
│       ├── marker-bar.md
│       ├── track-list.md
│       ├── file-import.md
│       └── offline-storage.md
├── .env.example              # 環境変数サンプル
└── node_modules/             # Yarn install 後に生成



---

## 🛠 開発状況

- 現在：Phase 1 の仕様設計と技術選定を完了
- 次ステップ：画面スケルトンの設計／初期プロトタイピング

---

## 📘 ライセンス

未定（開発段階につき後日決定）

