# Interview Radar - Backend

Minimal FastAPI backend for the Interview Radar MVP.

Quick start:

```bash
cd backend
python -m venv .venv
.\.venv\Scripts\activate
pip install -r requirements.txt
uvicorn backend.app.main:app --reload --port 8000
```

Endpoint:
- `POST /upload` - multipart form with `file` (resume), `role`, `github`, `portfolio`. Returns analysis JSON.

CORS allows `http://localhost:3000` for local frontend development.
