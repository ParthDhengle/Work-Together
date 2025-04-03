from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from config.database import get_db
import crud
from schemas import TaskCreate, TaskResponse
from typing import List  # Import List from typing

router = APIRouter()

@router.post("/", response_model=TaskResponse)
async def create_task(task: TaskCreate, db: Session = Depends(get_db)):
    return await crud.create_task(db, task)

@router.get("/", response_model=List[TaskResponse])  # Use List here
async def read_tasks(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return await crud.get_tasks(db, skip, limit)

@router.get("/{task_id}", response_model=TaskResponse)
async def read_task(task_id: str, db: Session = Depends(get_db)):
    task = await crud.get_task(db, task_id)
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    return task

@router.put("/{task_id}", response_model=TaskResponse)
async def update_task(task_id: str, task_update: TaskCreate, db: Session = Depends(get_db)):
    task = await crud.update_task(db, task_id, task_update)
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    return task

@router.delete("/{task_id}")
async def delete_task(task_id: str, db: Session = Depends(get_db)):
    task = await crud.delete_task(db, task_id)
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    return {"message": "Task deleted"}