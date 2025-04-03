from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from config.database import init_db
from routes import tasks, profile, users  # Add users

app = FastAPI(title="Work-Together Backend")

# CORS middleware to allow frontend communication
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Adjust if your frontend runs elsewhere
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include API routes
app.include_router(tasks.router, prefix="/api/tasks", tags=["Tasks"])
app.include_router(profile.router, prefix="/api/profile", tags=["Profile"])
app.include_router(users.router, prefix="/api/users", tags=["Users"])  # Add this line

# Initialize database tables on startup
@app.on_event("startup")
def startup():
    init_db()

@app.get("/")
async def read_root():
    return {"message": "Work-Together Backend is running"}