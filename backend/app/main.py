from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from prometheus_fastapi_instrumentator import Instrumentator
from app.services.elasticsearch_service import create_index
from app.api.documents import router as documents_router
from app.api.search import router as search_router
app = FastAPI(title="University Search API", version="1.0.0")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
Instrumentator().instrument(app).expose(app)
app.include_router(documents_router)
app.include_router(search_router)
@app.get("/")
async def root():
    return {"message": "University Search API"}
@app.on_event("startup")
def startup_event():
    create_index()