from fastapi import APIRouter, HTTPException
from schemas import WorkerCreate, WorkerResponse
from crud import create_worker, get_worker

router = APIRouter()

@router.post("/", response_model=WorkerResponse)
async def create_profile(worker: WorkerCreate):
    return await create_worker(worker)

@router.get("/{worker_id}", response_model=WorkerResponse)
async def read_profile(worker_id: str):
    worker = await get_worker(worker_id)
    if worker is None:
        raise HTTPException(status_code=404, detail="Worker not found")
    return worker