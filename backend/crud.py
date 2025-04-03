from sqlalchemy.orm import Session
from config.database import get_db, Project, Task, User, Assignment, Log  # Updated Worker to User
from schemas import ProjectCreate, TaskCreate, UserCreate, AssignmentCreate, LogCreate  # Updated WorkerCreate to UserCreate
from typing import List
import uuid

# Project CRUD
async def create_project(db: Session, project: ProjectCreate):
    db_project = Project(id=str(uuid.uuid4()), **project.dict())
    db.add(db_project)
    db.commit()
    db.refresh(db_project)
    return db_project

async def get_projects(db: Session, skip: int = 0, limit: int = 100) -> List[Project]:
    return db.query(Project).offset(skip).limit(limit).all()

async def get_project(db: Session, project_id: str):
    return db.query(Project).filter(Project.id == project_id).first()

# Task CRUD
async def create_task(db: Session, task: TaskCreate):
    db_task = Task(id=str(uuid.uuid4()), project_id=str(task.project_id), **task.dict(exclude={"project_id"}))
    db.add(db_task)
    db.commit()
    db.refresh(db_task)
    return db_task

async def get_tasks(db: Session, skip: int = 0, limit: int = 100) -> List[Task]:
    return db.query(Task).offset(skip).limit(limit).all()

async def get_task(db: Session, task_id: str):
    return db.query(Task).filter(Task.id == task_id).first()

async def update_task(db: Session, task_id: str, task_update: TaskCreate):
    db_task = db.query(Task).filter(Task.id == task_id).first()
    if db_task:
        for key, value in task_update.dict(exclude={"project_id"}).items():
            setattr(db_task, key, value)
        db_task.project_id = str(task_update.project_id)
        db.commit()
        db.refresh(db_task)
    return db_task

async def delete_task(db: Session, task_id: str):
    db_task = db.query(Task).filter(Task.id == task_id).first()
    if db_task:
        db.delete(db_task)
        db.commit()
    return db_task

# User CRUD (Updated from Worker)
async def create_user(db: Session, user: UserCreate):
    db_user = User(
        id=str(uuid.uuid4()),
        teams=[team.value for team in user.teams],  # Convert to list of strings for JSON
        skills=user.skills,
        **user.dict(exclude={"teams", "skills"})
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

async def get_users(db: Session, skip: int = 0, limit: int = 100) -> List[User]:
    return db.query(User).offset(skip).limit(limit).all()

async def get_user(db: Session, user_id: str):
    return db.query(User).filter(User.id == user_id).first()

# Assignment CRUD
async def create_assignment(db: Session, assignment: AssignmentCreate):
    db_assignment = Assignment(
        id=str(uuid.uuid4()),
        task_id=str(assignment.task_id),
        worker_id=str(assignment.worker_id),
        **assignment.dict(exclude={"task_id", "worker_id"})
    )
    db.add(db_assignment)
    db.commit()
    db.refresh(db_assignment)
    return db_assignment

async def get_assignments(db: Session, task_id: str) -> List[Assignment]:
    return db.query(Assignment).filter(Assignment.task_id == task_id).all()

# Log CRUD
async def create_log(db: Session, log: LogCreate):
    db_log = Log(id=str(uuid.uuid4()), **log.dict())
    db.add(db_log)
    db.commit()
    db.refresh(db_log)
    return db_log

async def get_logs(db: Session, skip: int = 0, limit: int = 100) -> List[Log]:
    return db.query(Log).offset(skip).limit(limit).all()