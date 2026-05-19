import os
from dotenv import load_dotenv
load_dotenv()  # Loads .env for local dev; no-op in Railway (env vars already set)

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import models
import database
from routers import auth, tasks

# Create database tables
models.Base.metadata.create_all(bind=database.engine)

app = FastAPI(
    title="Primetrade Backend API",
    description="Scalable REST API with Authentication & Role-Based Access",
    version="1.0.0"
)

# Configure CORS — FRONTEND_URL env var is set on Railway to the Vercel deployment URL
_frontend_url = os.getenv("FRONTEND_URL", "")
origins = [
    "http://localhost",
    "http://localhost:5173",
    "http://127.0.0.1:5173",
]
if _frontend_url:
    origins.append(_frontend_url)

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router)
app.include_router(tasks.router)

@app.get("/")
def read_root():
    return {"message": "Welcome to Primetrade Backend API. Visit /docs for API documentation."}
