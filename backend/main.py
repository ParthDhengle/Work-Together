from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes import tasks, profile
import crud

app = FastAPI(title="Work-Together Backend")

# CORS for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routes
app.include_router(tasks.router, prefix="/api/tasks", tags=["Tasks"])
app.include_router(profile.router, prefix="/api/profile", tags=["Profile"])

# Startup and shutdown events for Prisma
@app.on_event("startup")
async def startup():
    await crud.connect_db()

@app.on_event("shutdown")
async def shutdown():
    await crud.disconnect_db()

@app.get("/")
async def read_root():
    return {"message": "Work-Together Backend is running"}