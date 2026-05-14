


Interview Radar AI 🚀
A recruiter-simulation engine that measures interview readiness in under 2 minutes.
Interview Radar AI is a rapid employability diagnostic system designed to help students identify interview weaknesses before facing real recruiters.
Instead of relying on generic mock interviews or coding-only assessments, the platform simulates recruiter-style evaluation across resumes, technical readiness, portfolio quality, and hiring risks — generating an actionable interview readiness report within minutes




Why This Exists
Most students realize they are underprepared only after failing interviews.
Interview Radar AI was built to expose hiring weaknesses before candidates face real recruiters.




Core Innovations
🧠 Recruiter Simulation Engine
Simulates evaluation from:
ATS Systems
HR Recruiters
Technical Interviewers
Hiring Managers
⚠ Hiring Risk Detection
Identifies critical employability risks such as:
weak project impact
missing deployment evidence
inflated skill claims
poor technical alignment
inconsistent portfolio quality
📊 Interview Readiness Scoring
Generates category-wise scoring across:
Resume Strength
Technical Depth
Portfolio Quality
Communication Readiness
Employability Confidence





Problem Statement
Students entering the job market often struggle to objectively evaluate:
whether their resume is recruiter-ready
whether their projects demonstrate real impact
whether their skills align with hiring expectations
whether they are actually interview prepared
Traditional preparation platforms focus heavily on coding practice while ignoring employability diagnostics.
Interview Radar AI bridges this gap through rapid recruiter-style evaluation and personalized improvement roadmaps.


Precision intelligence for your career. Get AI-powered resume analysis, readiness scoring, and actionable feedback in real-time.

## Project Structure

```
├── backend/           # FastAPI backend server
│   ├── app/
│   │   ├── main.py           # FastAPI app with endpoints
│   │   ├── analyzer.py        # Resume analysis with Gemini AI
│   │   └── ai_services.py     # Interview & JD matching services
│   └── requirements.txt
│
└── frontend/          # Next.js React app
    ├── app/           # App router pages
    ├── components/    # React components
    ├── styles/        # Tailwind CSS
    ├── data/          # Mock data
    └── utils/         # Utilities & wrappers
```

## Features

- **Resume Analysis**: AI-powered resume scanning with ATS scoring
- **Readiness Score**: Get your interview readiness score (0-100)
- **Mock Interview**: Practice with AI-generated questions based on your resume weaknesses
- **JD Matcher**: Match your resume against job descriptions
- **Bullet Rewriter**: Improve resume bullet points with AI suggestions

## Quick Start

### Backend

```bash
cd backend
python -m venv .venv
.\.venv\Scripts\activate          # Windows
# or
source .venv/bin/activate         # macOS/Linux

pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```

The API will be available at `http://localhost:8000` with docs at `http://localhost:8000/docs`.

### Frontend

```bash
cd frontend
npm install
npm run dev
```

The app will be available at `http://localhost:3000`.

## Environment Variables

Create a `.env.local` file in the `frontend/` directory:

```
NEXT_PUBLIC_API_URL=http://localhost:8000
```

Create a `.env` file in the `backend/` directory:

```
GEMINI_API_KEY=your-gemini-api-key
```

**⚠️ Important**: Never commit `.env` files. They are automatically ignored by `.gitignore`.

## API Endpoints

- `POST /upload` - Upload resume and get analysis
- `POST /interview/start` - Start a mock interview
- `POST /interview/answer` - Submit interview answer
- `POST /match` - Match resume against job description
- `POST /rewrite` - Rewrite resume bullet point

## Tech Stack

**Backend:**
- FastAPI
- Python 3.13
- Google Generative AI (Gemini)
- PyPDF2, python-docx

**Frontend:**
- Next.js 14
- React 18
- TypeScript
- Tailwind CSS
- Framer Motion
- Recharts

## Development

See individual READMEs in `backend/` and `frontend/` directories.

## Security

- API keys are stored in environment variables (not committed)
- Virtual environments are not committed
- Build outputs are not committed
- All sensitive files are covered by `.gitignore`

## License

MIT
