from fastapi import APIRouter, HTTPException
from typing import List
from schemas import TaskCreate, TaskResponse
from crud import create_task, get_tasks, get_task, update_task, delete_task

router = APIRouter()

@router.post("/", response_model=TaskResponse)
async def create_new_task(task: TaskCreate):
    return await create_task(task)

@router.get("/", response_model=List[TaskResponse])
async def read_tasks(skip: int = 0, limit: int = 100):
    return await get_tasks(skip=skip, limit=limit)

@router.get("/{task_id}", response_model=TaskResponse)
async def read_task(task_id: str):
    task = await get_task(task_id)
    if task is None:
        raise HTTPException(status_code=404, detail="Task not found")
    return task

@router.put("/{task_id}", response_model=TaskResponse)
async def update_existing_task(task_id: str, task: TaskCreate):
    updated_task = await update_task(task_id, task)
    if updated_task is None:
        raise HTTPException(status_code=404, detail="Task not found")
    return updated_task

@router.delete("/{task_id}")
async def delete_existing_task(task_id: str):
    task = await delete_task(task_id)
    if task is None:
        raise HTTPException(status_code=404, detail="Task not found")
    return {"message": "Task deleted"}