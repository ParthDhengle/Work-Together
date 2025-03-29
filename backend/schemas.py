from pydantic import BaseModel, UUID4, EmailStr
from datetime import datetime
from typing import Optional
from enum import Enum  # Import Enum

# Enums (corrected to inherit from Enum)
class ProjectStatus(Enum):
    PENDING = "PENDING"
    IN_PROGRESS = "IN_PROGRESS"
    COMPLETED = "COMPLETED"

class TaskStatus(Enum):
    PENDING = "PENDING"
    IN_PROGRESS = "IN_PROGRESS"
    COMPLETED = "COMPLETED"

class Priority(Enum):
    LOW = "LOW"
    MEDIUM = "MEDIUM"
    HIGH = "HIGH"

class Team(Enum):
    ENGINEERING = "ENGINEERING"
    DESIGN = "DESIGN"
    PRODUCT = "PRODUCT"
    MANAGEMENT = "MANAGEMENT"

class WorkerStatus(Enum):
    AVAILABLE = "AVAILABLE"
    BUSY = "BUSY"
    OFFLINE = "OFFLINE"

# Base schemas (unchanged)
class ProjectBase(BaseModel):
    name: str
    description: Optional[str] = None
    startDate: datetime
    endDate: datetime
    status: ProjectStatus = ProjectStatus.PENDING

class WorkerBase(BaseModel):
    name: str
    email: EmailStr
    role: Optional[str] = None
    team: Team
    status: WorkerStatus = WorkerStatus.AVAILABLE

class TaskBase(BaseModel):
    projectId: UUID4
    title: str
    description: Optional[str] = None
    status: TaskStatus = TaskStatus.PENDING
    priority: Priority = Priority.MEDIUM
    dueDate: Optional[datetime] = None

class AssignmentBase(BaseModel):
    taskId: UUID4
    workerId: UUID4

class LogBase(BaseModel):
    workerId: UUID4
    action: str
    details: Optional[str] = None

# Response schemas (unchanged)
class ProjectResponse(ProjectBase):
    id: UUID4
    createdAt: datetime
    updatedAt: datetime
    class Config:
        from_attributes = True

class WorkerResponse(WorkerBase):
    id: UUID4
    createdAt: datetime
    updatedAt: datetime
    class Config:
        from_attributes = True

class TaskResponse(TaskBase):
    id: UUID4
    createdAt: datetime
    updatedAt: datetime
    class Config:
        from_attributes = True

class AssignmentResponse(AssignmentBase):
    id: UUID4
    assignedAt: datetime
    class Config:
        from_attributes = True

class LogResponse(LogBase):
    id: UUID4
    timestamp: datetime
    class Config:
        from_attributes = True

# Request schemas (unchanged)
class ProjectCreate(ProjectBase):
    pass

class WorkerCreate(WorkerBase):
    pass

class TaskCreate(TaskBase):
    pass

class AssignmentCreate(AssignmentBase):
    pass

class LogCreate(LogBase):
    pass