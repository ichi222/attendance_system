from sqlalchemy.orm import Session
from backend.models import Attendance
from datetime import datetime

# 出勤打刻
def create_clock_in(db: Session, user_id: str):
    record = Attendance(user_id=user_id, type="clock-in", timestamp=datetime.utcnow())
    db.add(record)
    db.commit()
    db.refresh(record)
    return record 

# 退勤打刻
def create_clock_out(db: Session, user_id: str):
    record = Attendance(user_id=user_id, type="clock-out", timestamp=datetime.utcnow())  # ✅ timestampを追加
    db.add(record)
    db.commit()
    db.refresh(record)  # ✅ 最新のデータを取得
    return record


# 勤怠履歴取得
def get_records(db: Session, user_id: str):
    return db.query(Attendance).filter(Attendance.user_id == user_id).all()

# 勤怠記録の更新
def update_record(db: Session, record_id: int, timestamp: datetime, type: str):
    record = db.query(Attendance).filter(Attendance.id == record_id).first()
    if record:
        record.timestamp = timestamp
        record.type = type
        db.commit()
    return record

# 勤怠記録の削除
def delete_record(db: Session, record_id: int):
    record = db.query(Attendance).filter(Attendance.id == record_id).first()
    if record:
        db.delete(record)
        db.commit()
    return record
