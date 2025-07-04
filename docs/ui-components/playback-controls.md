# ⏯️ UIコンポーネント仕様：Playback Controls（再生コントロール）

このドキュメントでは、楽器練習用音楽プレイヤーの再生操作を行う「再生コントロール」のUI仕様を定義します。

---

## 🧩 配置場所

* 右パネル下部に固定表示（波形エリアの下）
* ズームスライダーとは別枠

---

## 🖱️ 操作仕様

| ボタン        | 機能                            |
| ---------- | ----------------------------- |
| ▶ 再生       | プレイリスト全体または選択トラックの再生を開始       |
| ⏸ 一時停止     | 現在の再生を一時停止                    |
| ⏹ 停止       | 再生を完全に停止、位置を先頭に戻す             |
| 🔁 ループ切替   | ABループの有効／無効を切替（状態アイコンで明示）     |
| 📌 再生モード切替 | 「トラック単体再生」「プレイリスト全体再生」のモードトグル |

---

## 🔄 ABリピート連動

* ABループ範囲が設定されている場合、ループボタン有効でその範囲を繰り返す
* ループ解除で通常再生へ

---

## 🧩 状態表示

* 再生中／停止中／一時停止中の状態は、中央にアイコン表示
* 再生中トラック名や位置も補足表示（オプション）

---

## 🎨 スタイル仕様

* ボタンは等間隔・横並び
* アイコンサイズ：24〜32px（タップ操作を考慮）
* 押下時のハイライト、トグル状態は明確に表示

---

## 🧮 補足

* 各操作は WaveSurfer.js の複数インスタンス制御と連携
* 状態管理は useReducer または Zustand などで集中的に管理

---