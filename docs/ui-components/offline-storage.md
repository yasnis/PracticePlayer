# 💾 機能仕様：Offline Storage（オフライン保存）

このドキュメントでは、音源ファイルやユーザー設定をオフライン環境でも保持・再利用できるようにする「オフライン保存」機能の仕様を定義します。

---

## 🎯 目的

* インポートした音源ファイルをブラウザ上に保存
* ネットワーク非接続状態でもプレイリストを再生・編集可能
* ABループ、マーカー、トラック順などの設定情報も保存

---

## 🛠 保存対象

| 種別         | 保存内容                  | 保存先                       |
| ---------- | --------------------- | ------------------------- |
| 音源ファイル     | AudioBuffer相当のバイナリ    | IndexedDB                 |
| プレイリスト情報   | 名前、順序、トラック構成          | localStorage or IndexedDB |
| マーカー情報     | 位置、ラベル、種類（A/B/custom） | localStorage or IndexedDB |
| ガイド表示済みフラグ | 初回起動時チェック用            | localStorage              |

---

## 🗂 データ構造例

```ts
interface StoredTrack {
  id: string;
  fileName: string;
  audioBlob: Blob;
  duration: number;
  markers: Marker[];
}

interface PlaylistMeta {
  id: string;
  name: string;
  trackIds: string[];
  createdAt: number;
}
```

---

## 🔄 保存タイミング

* 音源ファイルインポート時に即保存
* マーカー変更、順序変更など設定更新時に都度保存
* localStorageは軽量データ、IndexedDBは音源データ

---

## ♻️ 復元フロー

1. アプリ起動時にIndexedDBをスキャン
2. 保存済みのトラックとプレイリスト構成を読み出す
3. メモリ上にAudioBufferとして展開
4. WaveSurfer表示や再生制御に連携

---

## 🧹 クリーンアップ

* 音源削除時にはIndexedDBから該当Blobも削除
* 「すべてのデータを消去」ボタンで初期化可能（Phase 2想定）

---

## ⚠️ 注意点

* ブラウザ容量制限に注意（概ね100〜200MBが目安）
* モバイルSafariなど一部環境では制限が厳しい場合あり

---

以上がオフライン保存の仕様です。
