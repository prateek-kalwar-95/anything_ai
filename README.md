# Primetrade Backend Internship Task

This repository contains the solution for the Primetrade Backend Developer Internship task. It includes a scalable REST API built with FastAPI and a React frontend to demonstrate the functionality.

**Live Demo**: [Deployed Link](https://anything-ai-eosin.vercel.app)

**Swagger API Docs**: [Swagger UI](https://anythingai-production.up.railway.app/docs)

## Tech Stack
- **Backend**: FastAPI, SQLAlchemy, SQLite (Development), Passlib, python-jose, Pydantic
- **Frontend**: React (Vite), React Router, Axios, Lucide React (Vanilla CSS for styling)

## Features Implemented
- **Authentication**: JWT-based login and registration with password hashing (bcrypt).
- **Role-Based Access**: Distinguishes between `user` and `admin` roles. Admins can view/edit all tasks, while regular users can only manage their own.
- **CRUD Operations**: Complete CRUD for a `Task` entity.
- **Validation**: Strict input and output schema validation using Pydantic.
- **API Documentation**: Auto-generated OpenAPI documentation accessible via `/docs` (Swagger UI).
- **Frontend UI**: A glassmorphism-themed simple interface to test the registration, login, and CRUD actions.

## Setup Instructions

### 1. Backend Setup
```bash
cd backend
python -m venv venv
# Activate virtual environment (Windows: .\venv\Scripts\activate, Linux/Mac: source venv/bin/activate)
pip install -r requirements.txt
```

Run the backend server:
```bash
uvicorn main:app --reload --port 8000
```
The API documentation will be available at: http://127.0.0.1:8000/docs

### 2. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```
The React frontend will be available at: http://localhost:5173

## Testing Guidelines
1. Open the frontend and register a new user.
2. Login with the created credentials.
3. Use the dashboard to create, edit, and delete tasks.
4. (Optional) Create an admin user to test role-based access control directly via the `/docs` endpoints.
