# 勤怠管理システム

このプロジェクトは、従業員の **出勤・退勤を記録** し、履歴を確認・管理できるシンプルな勤怠管理システムです。

## 主な機能
- **出勤・退勤の記録**（ボタンを押すだけ）
- **履歴の表示**（過去の出勤・退勤データを確認）
- **記録の編集・削除（CRUD）**（FastAPI の API を通じて実装）
- **データは SQLite に保存**（ローカル環境で管理可能）
- **Swagger UI で API の動作確認**（`http://127.0.0.1:8000/docs`）

---

## 技術スタック

| コンポーネント | 技術 |
|--------------|----------------|
| フロントエンド | HTML, CSS, JavaScript |
| バックエンド | FastAPI (Python) |
| データベース | SQLite |

---

## ディレクトリ構成

```
attendance_system/
│── backend/              # バックエンド（API）
│   │── main.py           # FastAPI のエントリーポイント
│   │── database.py       # データベース設定
│   │── models.py         # データベースのテーブル定義
│   │── crud.py           # データベース操作（CRUD処理）
│   │── routes.py         # API のルーティング設定
│   └── __init__.py       # Python のパッケージ識別ファイル
│
│── frontend/             # フロントエンド（UI）
│   │── index.html        # Webページのメイン
│   │── styles.css        # スタイルシート
│   │── script.js         # JavaScript (フロントエンドのロジック)
│
│── attendance.db         # SQLite のデータベースファイル
│── requirements.txt      # 必要な Python パッケージ
│── README.md             # プロジェクトの説明
│── venv/                 # Python 仮想環境（依存関係管理）
```

---

## インストール & 実行方法

### 1. 仮想環境のセットアップ
```sh
cd attendance_system
python -m venv venv
source venv/bin/activate  # Windowsなら `venv\Scripts\activate`
pip install -r requirements.txt
```

### 2. バックエンド（FastAPI）を起動
```sh
uvicorn backend.main:app --reload
```
`http://127.0.0.1:8000/docs` にアクセスし、Swagger UI で API を確認できます。

### 3. フロントエンドを起動
```sh
cd frontend
python -m http.server 8001
```
`http://127.0.0.1:8001/` にアクセスして、アプリを操作できます。

---

## API エンドポイント

| メソッド | エンドポイント | 説明 |
|----------|---------------|-----------------|
| POST | `/clock-in` | 出勤を記録 |
| POST | `/clock-out` | 退勤を記録 |
| GET  | `/records` | 指定したユーザーの履歴を取得 |
| PUT  | `/records/{id}` | 指定した記録を更新 |
| DELETE | `/records/{id}` | 指定した記録を削除 |

Swagger UI でテスト可能 → `http://127.0.0.1:8000/docs`

---

## 現在の実装状況

バックエンドでは CRUD 機能（作成・取得・更新・削除）をすべて実装していますが、フロントエンドでは一部の機能のみを実装しています。
- **実装済み:** 出勤・退勤の記録、履歴の取得
- **未実装:** 記録の編集・削除（これらはバックエンドの API には存在するが、フロントエンドの UI にはまだ組み込まれていません）

## CRUD の動作確認

| 機能 | 方法 |
|------|----------|
| 登録（Create） | 「出勤」ボタンを押す or `POST /clock-in` API 実行 |
| 取得（Read） | 「履歴を見る」ボタンを押す or `GET /records` API 実行 |
| 更新（Update） | Swagger UI で `PUT /records/{id}` を試す |
| 削除（Delete） | Swagger UI で `DELETE /records/{id}` を試す |

---

## まとめ
- ボタンを押すと → 出勤・退勤が記録される
- 履歴を見ると → 過去の出勤・退勤データが表示される
- CRUD 機能が動作し、データは SQLite に保存される

