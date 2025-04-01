from fastapi import APIRouter, Depends, HTTPException
from ..schemas import TaskCreate, TaskUpdate
import asyncpg
from database import get_db

router = APIRouter()

@router.get("/tasks")
async def read_tasks(db: asyncpg.Connection = Depends(get_db)):
    tasks = await db.fetch("""
        SELECT t.*, u.name as assignee_name, p.name as project_name
        FROM tasks t
        LEFT JOIN users u ONs t.assignee_id = u.id
        LEFT JOIN projects p ON t.project_id = p.id
    """)
    return [dict(task) for task in tasks]

@router.post("/tasks")
async def create_task(task: TaskCreate, db: asyncpg.Connection = Depends(get_db)):
    query = """
    INSERT INTO tasks (title, description, status, priority, assignee_id, due_date, project_id)
    VALUES ($1, $2, $3, $4, $5, $6, $7)
    RETURNING id
    """
    task_id = await db.fetchval(
        query, task.title, task.description, task.status, task.priority,
        task.assignee_id, task.due_date, task.project_id
    )
    return {"id": task_id}

@router.put("/tasks/{task_id}")
async def update_task(task_id: int, task: TaskUpdate, db: asyncpg.Connection = Depends(get_db)):
    update_fields = {k: v for k, v in task.dict().items() if v is not None}
    if not update_fields:
        raise HTTPException(status_code=400, detail="No fields to update")
    
    set_clause = ", ".join(f"{k} = ${i+2}" for i, k in enumerate(update_fields.keys()))
    query = f"UPDATE tasks SET {set_clause} WHERE id = $1"
    values = [task_id] + list(update_fields.values())
    
    await db.execute(query, *values)
    return {"message": "Task updated"}

@router.delete("/tasks/{task_id}")
async def delete_task(task_id: int, db: asyncpg.Connection = Depends(get_db)):
    result = await db.execute("DELETE FROM tasks WHERE id = $1", task_id)
    if result == "DELETE 0":
        raise HTTPException(status_code=404, detail="Task not found")
    return {"message": "Task deleted"}