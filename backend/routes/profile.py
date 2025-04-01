from fastapi import APIRouter, Depends, HTTPException
from ..schemas import UserUpdate
import asyncpg
from database import get_db

router = APIRouter()

@router.get("/profile/{user_id}")
async def get_profile(user_id: int, db: asyncpg.Connection = Depends(get_db)):
    user = await db.fetchrow("SELECT * FROM users WHERE id = $1", user_id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return dict(user)

@router.put("/profile/{user_id}")
async def update_profile(user_id: int, user: UserUpdate, db: asyncpg.Connection = Depends(get_db)):
    update_fields = {k: v for k, v in user.dict().items() if v is not None}
    if not update_fields:
        raise HTTPException(status_code=400, detail="No fields to update")
    
    set_clause = ", ".join(f"{k} = ${i+2}" for i, k in enumerate(update_fields.keys()))
    query = f"UPDATE users SET {set_clause} WHERE id = $1"
    values = [user_id] + list(update_fields.values())
    
    result = await db.execute(query, *values)
    if result == "UPDATE 0":
        raise HTTPException(status_code=404, detail="User not found")
    return {"message": "Profile updated"}