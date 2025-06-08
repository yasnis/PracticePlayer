# 🖥️ UIレイアウト仕様書（全体構成）

このドキュメントでは、楽器練習用音楽プレイヤーの全体的な画面構成とUIのレイアウト方針を記載します。各コンポーネントの詳細仕様は別ファイル（`docs/ui-components/`以下）に分離します。

---

## 🧭 全体レイアウト構成

本アプリは、**2ペイン構成**を基本とします：

```
+-----------------------------+
|   左パネル    |    右パネル        |
+-----------------------------+
```
---

## 🔹 左パネル（ナビゲーションエリア）

| 要素 | 説明 | 仕様ファイル |
|------|------|--------------|
| ロゴ | アプリ名表示 | [logo.md](ui-components/logo.md) |
| プレイリスト一覧 | 作成済みプレイリストの表示 | [playlist-list.md](ui-components/playlist-list.md) |
| プレイリスト作成ボタン | プレイリストの新規作成 | [playlist-create-button.md](ui-components/playlist-create-button.md) |
| 使い方ガイドボタン | ガイドモーダルを起動 | [usage-guide-modal.md](ui-components/usage-guide-modal.md) |
| 左パネル全体 | 左サイドバー全体の仕様 | [left-sidebar.md](ui-components/left-sidebar.md) |

---

## 🔸 右パネル（メイン操作エリア）

| 要素 | 説明 | 仕様ファイル |
|------|------|--------------|
| トラック波形表示エリア | トラックの波形を横並びで表示 | [track-editor.md](ui-components/track-editor.md) |
| 再生コントロール | 再生／停止などの操作UI | [playback-controls.md](ui-components/playback-controls.md) |
| ズームスライダー | 波形の拡大／縮小を制御 | [zoom-slider.md](ui-components/zoom-slider.md) |
| マーカー表示・編集 | ABマーカーや任意マーカーの表示調整 | [marker-bar.md](ui-components/marker-bar.md) |
| ファイル一覧と順序調整 | プレイリスト内のファイル構成の操作 | [track-list.md](ui-components/track-list.md) |
| ファイルインポート | 音源ファイルのインポート機能 | [file-import.md](ui-components/file-import.md) |
| オフライン保存 | 音源や設定のローカル保存 | [offline-storage.md](ui-components/offline-storage.md) |

---

## 🧩 UI構成の特徴とルール

- 各トラックは個別に波形を持ち、プレイリスト構成順に並べる
- ABリピート範囲はトラックをまたいで指定可能
- マーカーは非表示を基本とし、マウスホバーでツールチップ表示
- トラックのレイアウトは折り返しあり（横幅限界を超えたら改行）
- 再生UIはプレイリスト全体に作用する（トラック単位再生モードは切替で実現）

---

## 🧪 モバイル対応（参考）

- 本設計はWeb/PWAを主とするが、将来的なモバイル対応を考慮し、レスポンシブな構成を前提とする
- 左パネルはハンバーガーメニュー化が可能な設計とする（詳細：[left-sidebar.md](ui-components/left-sidebar.md) 参照）

---

このレイアウトをベースに、次は `ui-components/` にて各UI部品の詳細仕様を定義していきます。
