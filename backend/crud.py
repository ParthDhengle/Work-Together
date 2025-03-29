from prisma import Prisma
from schemas import ProjectCreate, WorkerCreate, TaskCreate, AssignmentCreate, LogCreate
from typing import List

# Initialize Prisma client (singleton)
db = Prisma()

async def connect_db():
    await db.connect()

async def disconnect_db():
    await db.disconnect()

# Project CRUD
async def create_project(project: ProjectCreate):
    return await db.project.create(data=project.dict())

async def get_projects(skip: int = 0, limit: int = 100) -> List:
    return await db.project.find_many(skip=skip, take=limit)

async def get_project(project_id: str):
    return await db.project.find_unique(where={"id": project_id})

# Worker CRUD
async def create_worker(worker: WorkerCreate):
    return await db.worker.create(data=worker.dict())

async def get_workers(skip: int = 0, limit: int = 100) -> List:
    return await db.worker.find_many(skip=skip, take=limit)

async def get_worker(worker_id: str):
    return await db.worker.find_unique(where={"id": worker_id})

# Task CRUD
async def create_task(task: TaskCreate):
    return await db.task.create(data=task.dict())

async def get_tasks(skip: int = 0, limit: int = 100) -> List:
    return await db.task.find_many(skip=skip, take=limit)

async def get_task(task_id: str):
    return await db.task.find_unique(where={"id": task_id})

async def update_task(task_id: str, task_update: TaskCreate):
    return await db.task.update(where={"id": task_id}, data=task_update.dict())

async def delete_task(task_id: str):
    return await db.task.delete(where={"id": task_id})

# Assignment CRUD
async def create_assignment(assignment: AssignmentCreate):
    return await db.assignment.create(data=assignment.dict())

async def get_assignments(task_id: str) -> List:
    return await db.assignment.find_many(where={"taskId": task_id})