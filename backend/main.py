from fastapi import FastAPI
from backend.routes import router
from backend.database import engine, Base
from fastapi.middleware.cors import CORSMiddleware

# DBテーブル作成
Base.metadata.create_all(bind=engine)

# FastAPIアプリ作成
app = FastAPI()

# ルーティング設定
app.include_router(router)

# 起動確認用エンドポイント
@app.get("/")
def root():
    return {"message": "勤怠管理システム API 起動中"}

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # すべてのオリジンを許可（セキュリティ的に制限したいなら特定のオリジンだけ許可）
    allow_credentials=True,
    allow_methods=["*"],  # すべてのHTTPメソッドを許可 (GET, POST, PUT, DELETE, etc.)
    allow_headers=["*"],  # すべてのヘッダーを許可
)