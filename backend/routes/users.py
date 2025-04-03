from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
import uuid
from config.database import get_db, User
from schemas import UserCreate, UserResponse,Role
import bcrypt  # For password hashing
import logging  # Add logging
router = APIRouter()

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

def hash_password(password: str) -> str:
    salt = bcrypt.gensalt()
    return bcrypt.hashpw(password.encode("utf-8"), salt).decode("utf-8")

@router.post("/signup", response_model=UserResponse)
async def signup(user: UserCreate, db: Session = Depends(get_db)):
    
    logger.info(f"Received signup request: {user.dict()}")  # Log incoming data
    
    # Check if email already exists
    existing_user = db.query(User).filter(User.email == user.email).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    # Hash the password
    hashed_password = hash_password(user.password)
    
    teams = user.teams if user.teams is not None else ["FULLSTACK_DEVELOPMENT"]
    skills = user.skills if user.skills is not None else ["General"]
    
    # Create new user with defaults for missing fields
    db_user = User(
        id=str(uuid.uuid4()),
        name=user.name,
        role=user.role,
        status="AVAILABLE",  # Default status
        capacity=4,          # Default capacity
        teams=teams,  # Pass list directly (SQLAlchemy will serialize to JSON)
        skills=skills,            # Default skill if not provided
        email=user.email,
        password=hashed_password,
        last_health_check=None
    )
    try:
        db.add(db_user)
        db.commit()
        db.refresh(db_user)
    except Exception as e:
        db.rollback()
        logger.error(f"Database error: {str(e)}")
        raise HTTPException(status_code=500, detail="Internal server error")
    return db_user