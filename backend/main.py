from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
import asyncpg
from .database import get_db_pool
from routes.tasks import router as tasks_router
from routes.profile import router as profile_router
from routes.users import router as users_router

app = FastAPI()

# CORS configuration for frontend integration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Adjust to your frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

db_pool = None

@app.on_event("startup")
async def startup():
    global db_pool
    db_pool = await get_db_pool()
    async with db_pool.acquire() as conn:
        # Create tables if they don’t exist
        await conn.execute("""
        CREATE TABLE IF NOT EXISTS users (
            id SERIAL PRIMARY KEY,
            name VARCHAR(100),
            email VARCHAR(100) UNIQUE,
            password VARCHAR(100),
            role VARCHAR(50),
            bio TEXT,
            job_title VARCHAR(100),
            company VARCHAR(100),
            location VARCHAR(100),
            phone VARCHAR(20),
            website VARCHAR(200)
        );
        CREATE TABLE IF NOT EXISTS projects (
            id SERIAL PRIMARY KEY,
            name VARCHAR(100),
            description TEXT
        );
        CREATE TABLE IF NOT EXISTS tasks (
            id SERIAL PRIMARY KEY,
            title VARCHAR(200),
            description TEXT,
            status VARCHAR(20),
            priority VARCHAR(20),
            assignee_id INTEGER REFERENCES users(id),
            due_date DATE,
            project_id INTEGER REFERENCES projects(id)
        );
        """)

@app.on_event("shutdown")
async def shutdown():
    await db_pool.close()

# Dependency to get database connection
async def get_db():
    async with db_pool.acquire() as connection:
        yield connection

# Include route modules
app.include_router(tasks_router, prefix="/api")
app.include_router(profile_router, prefix="/api")
app.include_router(users_router, prefix="/api")