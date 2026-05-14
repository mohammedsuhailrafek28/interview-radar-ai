from fastapi import FastAPI, File, UploadFile, Form
from fastapi.middleware.cors import CORSMiddleware
import tempfile
import os
from .analyzer import analyze_resume

app = FastAPI(title='Interview Radar API')

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get('/')
async def root():
    return {'status':'ok'}

@app.post('/upload')
async def upload(file: UploadFile = File(...), role: str = Form(''), github: str = Form(''), portfolio: str = Form('')):
    # save to temp file
    suffix = os.path.splitext(file.filename)[1] if file.filename else ''
    tmp = tempfile.NamedTemporaryFile(delete=False, suffix=suffix)
    contents = await file.read()
    tmp.write(contents)
    tmp.flush()
    tmp.close()

    data = {'role': role, 'github': github, 'portfolio': portfolio, 'filename': file.filename}
    results = await analyze_resume(data)
    return results
