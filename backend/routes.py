from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from backend.database import SessionLocal
from backend.crud import create_clock_in, create_clock_out, get_records, update_record, delete_record
from datetime import datetime

router = APIRouter()

# DBセッション取得
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/clock-in")
def clock_in(user_id: str, db: Session = Depends(get_db)):
    record = create_clock_in(db, user_id)
    if not record:
        raise HTTPException(status_code=500, detail="Failed to create clock-in record")
    return {"id": record.id, "user_id": record.user_id, "timestamp": record.timestamp, "type": record.type}  # ✅ 修正！

@router.post("/clock-out")
def clock_out(user_id: str, db: Session = Depends(get_db)):
    record = create_clock_out(db, user_id)
    if not record:
        raise HTTPException(status_code=500, detail="Failed to create clock-out record")
    return {"id": record.id, "user_id": record.user_id, "timestamp": record.timestamp, "type": record.type}  # ✅ 修正！

@router.get("/records")
def records(user_id: str, db: Session = Depends(get_db)):
    records = get_records(db, user_id)
    if not records:
        raise HTTPException(status_code=404, detail="No records found for this user")
    return [{"id": r.id, "user_id": r.user_id, "timestamp": r.timestamp, "type": r.type} for r in records]  # ✅ 修正！

@router.put("/records/{record_id}")
def edit_record(record_id: int, timestamp: datetime, type: str, db: Session = Depends(get_db)):
    record = update_record(db, record_id, timestamp, type)
    if not record:
        raise HTTPException(status_code=404, detail="Record not found or update failed")
    return {"id": record.id, "user_id": record.user_id, "timestamp": record.timestamp, "type": record.type}  # ✅ 修正！

@router.delete("/records/{record_id}")
def remove_record(record_id: int, db: Session = Depends(get_db)):
    record = delete_record(db, record_id)
    if not record:
        raise HTTPException(status_code=404, detail="Record not found or delete failed")
    return {"message": "Record deleted successfully"}
