# SETUP.md

プロジェクトをローカルで動かすためのセットアップ手順をまとめています。

---

## 1. 必要なツール

- **Node.js**（v18 LTS以上）  
  https://nodejs.org/
- **Yarn**（推奨）  
  https://classic.yarnpkg.com/en/docs/install/
- **Git**  
  https://git-scm.com/
- エディタ（例：VSCode）

---

## 2. プロジェクトの取得

```bash
# GitHub リポジトリをクローン
git clone https://github.com/your-org/practice-player.git
cd practice-player
```

> ※ 別のリポジトリ名／URLをご利用の場合は適宜読み替えてください。

---

## 3. 依存パッケージのインストール

```bash
yarn install
```

- `package.json`／`yarn.lock` に記載されたライブラリをすべて取得します。

---

## 4. 開発用サーバーの起動

```bash
yarn dev
```

- デフォルトで `http://localhost:3000/practiceplayer` が起動します。
- ブラウザでアクセスし、動作を確認してください。

---

## 5. 本番ビルドとサーバー起動

```bash
# ビルド
yarn build

# 本番モードで起動
yarn start
```

- `next-pwa` による Service Worker／キャッシュ設定も含めた実行環境が立ち上がります。
- インストール可能な PWA として動作するかどうかもテストしてください。

---

## 6. 推奨ディレクトリ構成（ローカル参照用）

```
practice-player/
├── .gitignore
├── package.json
├── yarn.lock
├── next.config.js
├── tailwind.config.js
├── postcss.config.js
├── .eslintrc.js
├── README.md
├── SETUP.md         ← このファイル
├── public/
│   ├── favicon.ico
│   ├── manifest.json
│   └── icons/
│       ├── icon-192x192.png
│       └── icon-512x512.png
├── app/
│   ├── layout.js
│   └── practiceplayer/
│       └── page.js
├── components/
├── lib/
├── styles/
└── docs/
```

---

## 7. 推奨開発ツール（任意）

- **ESLint + Prettier**：コード品質・フォーマット統一  
- **Tailwind IntelliSense**：VSCode 拡張  
- **GitHub Copilot / ChatGPT**：コーディング支援  

---

以上でセットアップは完了です。  
不足や質問があればお知らせください！
