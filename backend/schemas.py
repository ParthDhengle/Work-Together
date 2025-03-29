from pydantic import BaseModel, UUID4, EmailStr
from datetime import datetime
from typing import Optional

# Enums (manually defined to match Prisma schema)
class ProjectStatus(str):
    PENDING = "PENDING"
    IN_PROGRESS = "IN_PROGRESS"
    COMPLETED = "COMPLETED"

class TaskStatus(str):
    PENDING = "PENDING"
    IN_PROGRESS = "IN_PROGRESS"
    COMPLETED = "COMPLETED"

class Priority(str):
    LOW = "LOW"
    MEDIUM = "MEDIUM"
    HIGH = "HIGH"

class Team(str):
    ENGINEERING = "ENGINEERING"
    DESIGN = "DESIGN"
    PRODUCT = "PRODUCT"
    MANAGEMENT = "MANAGEMENT"

class WorkerStatus(str):
    AVAILABLE = "AVAILABLE"
    BUSY = "BUSY"
    OFFLINE = "OFFLINE"

# Base schemas
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

# Response schemas
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

# Request schemas
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