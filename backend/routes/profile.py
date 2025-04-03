from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from config.database import get_db
import crud
from schemas import UserCreate, UserResponse  # Updated from WorkerCreate, WorkerResponse
from typing import List

router = APIRouter()

@router.post("/", response_model=UserResponse)
async def create_user(user: UserCreate, db: Session = Depends(get_db)):
    return await crud.create_user(db, user)

@router.get("/", response_model=List[UserResponse])
async def read_users(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return await crud.get_users(db, skip, limit)

@router.get("/{user_id}", response_model=UserResponse)
async def read_user(user_id: str, db: Session = Depends(get_db)):
    user = await crud.get_user(db, user_id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user