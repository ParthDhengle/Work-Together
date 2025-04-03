from pydantic import BaseModel, UUID4
from datetime import datetime
from typing import Optional, List
from enum import Enum

# Enums
class ProjectStatus(str, Enum):
    PENDING = "PENDING"
    IN_PROGRESS = "IN_PROGRESS"
    COMPLETED = "COMPLETED"

class TaskStatus(str, Enum):
    PENDING = "PENDING"
    ASSIGNED = "ASSIGNED"
    IN_PROGRESS = "IN_PROGRESS"
    COMPLETED = "COMPLETED"
    FAILED = "FAILED"

class WorkerStatus(str, Enum):
    AVAILABLE = "AVAILABLE"
    BUSY = "BUSY"
    OFFLINE = "OFFLINE"

class Priority(str, Enum):
    HIGH = "HIGH"
    MEDIUM = "MEDIUM"
    LOW = "LOW"

class Team(str, Enum):
    BUSINESS_AND_MANAGEMENT = "BUSINESS_AND_MANAGEMENT"
    DESIGN_AND_ARCHITECTURE = "DESIGN_AND_ARCHITECTURE"
    FRONTEND_DEVELOPMENT = "FRONTEND_DEVELOPMENT"
    BACKEND_DEVELOPMENT = "BACKEND_DEVELOPMENT"
    DATABASE_DEVELOPMENT = "DATABASE_DEVELOPMENT"
    FULLSTACK_DEVELOPMENT = "FULLSTACK_DEVELOPMENT"
    SUPPORT_FOR_TESTING_AND_DEPLOYMENT = "SUPPORT_FOR_TESTING_AND_DEPLOYMENT"

class Role(str, Enum):  # Added Role enum
    MANAGER = "MANAGER"
    LEADER = "LEADER"
    WORKER = "WORKER"

# Base schemas
class ProjectBase(BaseModel):
    name: str
    description: Optional[str] = None
    start_date: datetime
    end_date: datetime
    status: ProjectStatus = ProjectStatus.PENDING

class TaskBase(BaseModel):
    project_id: UUID4
    name: str
    description: Optional[str] = None
    skill_requirement: Optional[str] = None
    priority: Priority = Priority.MEDIUM
    estimated_duration: int
    deadline: datetime
    assigned_team: Team
    status: TaskStatus = TaskStatus.PENDING

class UserBase(BaseModel):  # Renamed from WorkerBase
    name: str
    role: Role = Role.WORKER
    status: WorkerStatus = WorkerStatus.AVAILABLE
    capacity: int = 4
    teams: List[Team]
    skills: List[str]
    email: str
    password: str  # Plaintext here; hash in CRUD

class AssignmentBase(BaseModel):
    task_id: UUID4
    worker_id: UUID4  # Still called worker_id for consistency with Assignment table
    status: TaskStatus = TaskStatus.ASSIGNED

class LogBase(BaseModel):
    level: str
    message: str
    component: str

# Response schemas
class ProjectResponse(ProjectBase):
    id: UUID4
    created_at: datetime
    updated_at: datetime
    class Config:
        from_attributes = True

class TaskResponse(TaskBase):
    id: UUID4
    assigned_worker_id: Optional[UUID4] = None
    created_at: datetime
    updated_at: datetime
    class Config:
        from_attributes = True

class UserResponse(UserBase):  # Renamed from WorkerResponse
    id: UUID4
    last_health_check: Optional[datetime] = None
    created_at: datetime
    updated_at: datetime
    password: Optional[str] = None  # Exclude password from response
    class Config:
        from_attributes = True

class AssignmentResponse(AssignmentBase):
    id: UUID4
    assigned_at: datetime
    completed_at: Optional[datetime] = None
    created_at: datetime
    updated_at: datetime
    class Config:
        from_attributes = True

class LogResponse(LogBase):
    id: UUID4
    timestamp: datetime
    created_at: datetime
    class Config:
        from_attributes = True
        
class UserCreate(BaseModel):  # Updated
    name: str
    email: str
    password: str
    role: Role
    teams: Optional[List[Team]] = None  # Optional for signup
    skills: Optional[List[str]] = None  # Optional for signup

# Create schemas
class ProjectCreate(ProjectBase):
    pass

class TaskCreate(TaskBase):
    pass

class UserCreate(UserBase):  # Renamed from WorkerCreate
    pass

class AssignmentCreate(AssignmentBase):
    pass

class LogCreate(LogBase):
    pass