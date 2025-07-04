# 📥 機能仕様：File Import（音源ファイルのインポート）

このドキュメントでは、ユーザーがアプリに音源ファイルを取り込むための「ファイルインポート」機能の仕様を定義します。

---

## 🧩 インポート手段

### ローカルファイルのドラッグ＆ドロップ

* 右パネルに直接ドロップ
* 対応形式：`.mp3`, `.wav`, `.flac`
* 複数ファイルを一括で読み込み可

### ファイル選択ダイアログ

* 明示的な「ファイルを追加」ボタン（右パネル上部）
* ボタンクリックでファイルピッカー起動

### クラウドストレージ連携（Phase 2）

* Dropbox、Google Drive などからの選択機能を想定

---

## 🧾 取り込み後の処理

| 処理       | 内容                                        |
| -------- | ----------------------------------------- |
| ファイル検証   | 拡張子、MIMEタイプ、再生可能性をチェック                    |
| デコード     | Web Audio API により `AudioBuffer` に変換       |
| プレイリスト追加 | `Track` オブジェクトとして `Playlist.tracks[]` に追加 |
| メタ情報抽出   | 再生時間、ファイル名を取得し表示                          |

---

## 🗂️ データ構造（Track 追加）

```ts
interface Track {
  id: string;
  fileName: string;
  duration: number;
  audioBuffer: AudioBuffer;
  markers: Marker[];
}
```

---

## ⚠️ エラーハンドリング

| ケース       | 対応                            |
| --------- | ----------------------------- |
| 非対応ファイル形式 | アラートで警告を表示し、スキップ              |
| 読み込み失敗    | 該当ファイルのみスキップ、理由表示             |
| ファイルサイズ上限 | 1ファイルあたり100MBを超える場合はエラー表示（目安） |

---

## 💾 保存と同期

* インポートされたファイルは localStorage/IndexedDB に記録
* オフラインでも継続利用可能（詳細は `offline-storage.md` 参照）

---
