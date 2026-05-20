# Anything AI — Task Manager

Full-stack task manager with JWT authentication and role-based access. Built with FastAPI and React (Vite).

**Repository**: [github.com/prateek-kalwar-95/anything_ai](https://github.com/prateek-kalwar-95/anything_ai)

## Live URLs

| Service | URL |
|---------|-----|
| **Frontend** | [anything-ai-eosin.vercel.app](https://anything-ai-eosin.vercel.app) |
| **Backend API** | [anything-ai-s7q3.onrender.com](https://anything-ai-s7q3.onrender.com) |
| **Swagger docs** | [anything-ai-s7q3.onrender.com/docs](https://anything-ai-s7q3.onrender.com/docs) |

## Tech Stack

- **Backend**: FastAPI, SQLAlchemy, SQLite, Passlib (bcrypt), python-jose, Pydantic
- **Frontend**: React (Vite), React Router, Axios, Tailwind CSS

## Features

- JWT-based registration and login with password hashing
- Role-based access (`user` vs `admin`)
- Full CRUD for tasks
- Pydantic validation (including email fields)
- OpenAPI docs at `/docs`
- Glassmorphism UI for testing auth and task flows

## Project Structure

```
anything_ai/
├── backend/     # FastAPI API
└── frontend/    # React (Vite) app
```

## Local Development

### Backend

```bash
cd backend
python -m venv venv
# Windows: .\venv\Scripts\activate
# macOS/Linux: source venv/bin/activate
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```

API docs: http://127.0.0.1:8000/docs

Optional `.env` in `backend/`:

```env
SECRET_KEY=your-local-dev-secret
FRONTEND_URL=http://localhost:5173
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

App: http://localhost:5173

By default the frontend calls `http://127.0.0.1:8000/api/v1`. To point at production, create `frontend/.env.local`:

```env
VITE_API_URL=https://anything-ai-s7q3.onrender.com/api/v1
```

## Deployment

Backend and frontend are deployed separately.

### Backend — [Render](https://render.com)

| Setting | Value |
|---------|--------|
| Root directory | `backend` |
| Start command | `uvicorn main:app --host 0.0.0.0 --port $PORT` |
| Python version | 3.11 (see `runtime.txt`) |

**Environment variables:**

| Variable | Description |
|----------|-------------|
| `SECRET_KEY` | Long random string for JWT signing (required in production) |
| `FRONTEND_URL` | Vercel app URL, e.g. `https://anything-ai-eosin.vercel.app` (recommended; `*.vercel.app` is also allowed in code) |

### Frontend — [Vercel](https://vercel.com)

| Setting | Value |
|---------|--------|
| Root directory | `frontend` |
| Framework | Vite |
| Build command | `npm run build` |
| Output directory | `dist` |

**Environment variable:**

| Variable | Value |
|----------|--------|
| `VITE_API_URL` | `https://anything-ai-s7q3.onrender.com/api/v1` |

Redeploy the frontend after changing `VITE_API_URL`.

## Testing

1. Open the [live frontend](https://anything-ai-eosin.vercel.app) or run locally.
2. Register a new user and log in.
3. Create, edit, and delete tasks from the dashboard.
4. (Optional) Use [Swagger](https://anything-ai-s7q3.onrender.com/docs) to test admin endpoints.

## Notes

- Production uses SQLite on Render; data may reset on redeploys or restarts. For persistent production data, migrate to PostgreSQL (see `Scalability_Note.md`).
- Never commit `SECRET_KEY` or `.env` files to Git.
