from sqlalchemy import create_engine, Column, String, Integer, DateTime, ForeignKey, Enum, JSON
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, relationship
import os
from dotenv import load_dotenv
from datetime import datetime
import enum

# Load environment variables
load_dotenv()

# MySQL connection string
DB_USER = os.getenv("DB_USER", "root")
DB_PASSWORD = os.getenv("DB_PASSWORD", "rootpassword")
DB_HOST = os.getenv("DB_HOST", "localhost")
DB_NAME = os.getenv("DB_NAME", "myapp")
DATABASE_URL = f"mysql+mysqlconnector://{DB_USER}:{DB_PASSWORD}@{DB_HOST}/{DB_NAME}"

# Create SQLAlchemy engine
engine = create_engine(DATABASE_URL, echo=True)  # echo=True for debugging

# Base class for models
Base = declarative_base()

# Session factory
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Define Enums
class ProjectStatus(enum.Enum):
    PENDING = "PENDING"
    IN_PROGRESS = "IN_PROGRESS"
    COMPLETED = "COMPLETED"

class TaskStatus(enum.Enum):
    PENDING = "PENDING"
    ASSIGNED = "ASSIGNED"
    IN_PROGRESS = "IN_PROGRESS"
    COMPLETED = "COMPLETED"
    FAILED = "FAILED"

class WorkerStatus(enum.Enum):
    AVAILABLE = "AVAILABLE"
    BUSY = "BUSY"
    OFFLINE = "OFFLINE"

class Priority(enum.Enum):
    HIGH = "HIGH"
    MEDIUM = "MEDIUM"
    LOW = "LOW"

class Team(enum.Enum):
    BUSINESS_AND_MANAGEMENT = "BUSINESS_AND_MANAGEMENT"
    DESIGN_AND_ARCHITECTURE = "DESIGN_AND_ARCHITECTURE"
    FRONTEND_DEVELOPMENT = "FRONTEND_DEVELOPMENT"
    BACKEND_DEVELOPMENT = "BACKEND_DEVELOPMENT"
    DATABASE_DEVELOPMENT = "DATABASE_DEVELOPMENT"
    FULLSTACK_DEVELOPMENT = "FULLSTACK_DEVELOPMENT"
    SUPPORT_FOR_TESTING_AND_DEPLOYMENT = "SUPPORT_FOR_TESTING_AND_DEPLOYMENT"

class Role(enum.Enum):  # Added Role enum
    MANAGER = "MANAGER"
    LEADER = "LEADER"
    WORKER = "WORKER"

# Define Models
class Project(Base):
    __tablename__ = "projects"
    
    id = Column(String(36), primary_key=True)  # UUID as string
    name = Column(String(255), nullable=False)
    description = Column(String(500))
    start_date = Column(DateTime, nullable=False)
    end_date = Column(DateTime, nullable=False)
    status = Column(Enum(ProjectStatus), default=ProjectStatus.PENDING, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    tasks = relationship("Task", back_populates="project")

class Task(Base):
    __tablename__ = "tasks"
    
    id = Column(String(36), primary_key=True)  # UUID as string
    project_id = Column(String(36), ForeignKey("projects.id", ondelete="CASCADE"), nullable=False)
    name = Column(String(255), nullable=False)
    description = Column(String(500))
    skill_requirement = Column(String(100))
    priority = Column(Enum(Priority), default=Priority.MEDIUM, nullable=False)
    estimated_duration = Column(Integer, nullable=False)
    deadline = Column(DateTime, nullable=False)
    assigned_team = Column(Enum(Team), nullable=False)
    status = Column(Enum(TaskStatus), default=TaskStatus.PENDING, nullable=False)
    assigned_worker_id = Column(String(36), ForeignKey("users.id", ondelete="SET NULL"))  # Updated to "users"
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    project = relationship("Project", back_populates="tasks")
    assigned_worker = relationship("User", back_populates="tasks")  # Updated to "User"
    assignments = relationship("Assignment", back_populates="task")

class User(Base):  # Renamed from Worker to User
    __tablename__ = "users"
    
    id = Column(String(36), primary_key=True)  # UUID as string
    name = Column(String(100), nullable=False)
    role = Column(Enum(Role), nullable=False)
    status = Column(Enum(WorkerStatus), default=WorkerStatus.AVAILABLE, nullable=False)
    capacity = Column(Integer, default=4, nullable=False)
    teams = Column(JSON, nullable=False)  # e.g., ["FRONTEND_DEVELOPMENT"]
    skills = Column(JSON, nullable=False)  # e.g., ["React", "Python"]
    email = Column(String(100), unique=True, nullable=False)
    password = Column(String(255), nullable=False)  # Hashed
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    last_health_check = Column(DateTime)
    
    tasks = relationship("Task", back_populates="assigned_worker")
    assignments = relationship("Assignment", back_populates="worker")

class Assignment(Base):
    __tablename__ = "assignments"
    
    id = Column(String(36), primary_key=True)  # UUID as string
    task_id = Column(String(36), ForeignKey("tasks.id", ondelete="CASCADE"), nullable=False)
    worker_id = Column(String(36), ForeignKey("users.id", ondelete="CASCADE"), nullable=False)  # Updated to "users"
    assigned_at = Column(DateTime, default=datetime.utcnow, nullable=False)
    completed_at = Column(DateTime)
    status = Column(Enum(TaskStatus), default=TaskStatus.ASSIGNED, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    task = relationship("Task", back_populates="assignments")
    worker = relationship("User", back_populates="assignments")  # Updated to "User"

class Log(Base):
    __tablename__ = "logs"
    
    id = Column(String(36), primary_key=True)  # UUID as string
    timestamp = Column(DateTime, default=datetime.utcnow, nullable=False)
    level = Column(String(20), nullable=False)  # e.g., "info", "warning", "error"
    message = Column(String(500), nullable=False)
    component = Column(String(50), nullable=False)  # e.g., "scheduler", "worker"
    created_at = Column(DateTime, default=datetime.utcnow)

# Initialize the database
def init_db():
    Base.metadata.create_all(bind=engine)
    print("Database tables created successfully!")

# Database session dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

if __name__ == "__main__":
    init_db()