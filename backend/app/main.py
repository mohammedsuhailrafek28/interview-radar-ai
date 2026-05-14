from fastapi import FastAPI, File, UploadFile, Form
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
import tempfile
import os
import PyPDF2
import docx
from .analyzer import analyze_resume
from .ai_services import start_interview, evaluate_answer, match_jd, rewrite_bullet

app = FastAPI(title='Interview Radar API')

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get('/')
async def root():
    return {'status':'ok'}

# ---------- Pydantic Models ----------
class InterviewStartRequest(BaseModel):
    resume_context: str
    role: str
    alerts: List[str] = []

class InterviewAnswerRequest(BaseModel):
    question: str
    answer: str
    role: str
    question_num: int = 1

class MatchRequest(BaseModel):
    resume_text: str
    job_description: str
    role: str = "Software Engineer"

class RewriteRequest(BaseModel):
    bullet: str
    role: str = "Software Engineer"

# ---------- Upload & Analyze ----------
@app.post('/upload')
async def upload(
    file: UploadFile = File(...),
    role: str = Form(''),
    github: str = Form(''),
    portfolio: str = Form(''),
    job_description: str = Form('')
):
    suffix = os.path.splitext(file.filename)[1] if file.filename else ''
    tmp = tempfile.NamedTemporaryFile(delete=False, suffix=suffix)
    contents = await file.read()
    tmp.write(contents)
    tmp.flush()
    tmp.close()

    text_content = ""
    if suffix.lower() == '.pdf':
        try:
            with open(tmp.name, 'rb') as f:
                reader = PyPDF2.PdfReader(f)
                for page in reader.pages:
                    text_content += page.extract_text()
        except Exception as e:
            text_content = f"Error extracting PDF: {str(e)}"
    elif suffix.lower() == '.docx':
        try:
            doc = docx.Document(tmp.name)
            text_content = "\n".join([para.text for para in doc.paragraphs])
        except Exception as e:
            text_content = f"Error extracting DOCX: {str(e)}"
    else:
        text_content = contents.decode('utf-8', errors='ignore')

    data = {
        'role': role,
        'github': github,
        'portfolio': portfolio,
        'filename': file.filename,
        'resume_text': text_content
    }

    results = await analyze_resume(data)

    # Add JD match if provided
    if job_description.strip():
        try:
            jd_match = await match_jd(text_content, job_description, role)
            results['jd_match'] = jd_match
        except Exception as e:
            print(f"JD match error: {e}")

    # Store resume context for interview feature
    results['resume_context'] = text_content[:3000]

    try: os.unlink(tmp.name)
    except: pass

    return results

# ---------- Mock Interview ----------
@app.post('/interview/start')
async def interview_start(req: InterviewStartRequest):
    return await start_interview(req.resume_context, req.role, req.alerts)

@app.post('/interview/answer')
async def interview_answer(req: InterviewAnswerRequest):
    return await evaluate_answer(req.question, req.answer, req.role, req.question_num)

# ---------- JD Matcher ----------
@app.post('/match')
async def jd_match(req: MatchRequest):
    return await match_jd(req.resume_text, req.job_description, req.role)

# ---------- Bullet Rewriter ----------
@app.post('/rewrite')
async def bullet_rewrite(req: RewriteRequest):
    return await rewrite_bullet(req.bullet, req.role)
