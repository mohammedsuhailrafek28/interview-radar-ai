import os
import json
from typing import Dict, Any
import google.generativeai as genai
from dotenv import load_dotenv

load_dotenv()
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))


async def run_gemini(prompt: str) -> str:
    import asyncio
    model = genai.GenerativeModel('gemini-2.5-flash')
    loop = asyncio.get_event_loop()
    response = await loop.run_in_executor(None, lambda: model.generate_content(prompt))
    return response.text.strip()


async def start_interview(resume_context: str, role: str, alerts: list) -> dict:
    """Generate the first interview question based on resume weaknesses."""
    weaknesses = "\n".join(alerts) if alerts else "general technical depth"
    prompt = (
        f"You are a tough but fair technical recruiter interviewing a candidate for: {role}\n\n"
        f"Resume Context:\n{resume_context}\n\n"
        f"Identified Weaknesses:\n{weaknesses}\n\n"
        "Generate ONE hard, specific interview question that probes the candidate's weaknesses. "
        "Return ONLY a JSON object:\n"
        '{"question": "<your question>", "topic": "<brief topic name>", "difficulty": "<Easy|Medium|Hard>"}'
    )
    text = await run_gemini(prompt)
    # clean markdown
    if "```" in text:
        text = text.split("```")[1].split("```")[0]
        if text.startswith("json"):
            text = text[4:]
    return json.loads(text.strip())


async def evaluate_answer(question: str, answer: str, role: str, question_num: int) -> dict:
    """Evaluate a candidate's interview answer and optionally return a follow-up."""
    prompt = (
        f"You are a tough technical recruiter for a {role} position.\n\n"
        f"Question asked: {question}\n"
        f"Candidate's answer: {answer}\n\n"
        "Evaluate this answer and return ONLY a JSON object:\n"
        "{\n"
        '  "score": <integer 0-10>,\n'
        '  "feedback": "<2-3 sentences of specific, actionable feedback>",\n'
        '  "strength": "<what they did well in one sentence>",\n'
        '  "improvement": "<what they should have said>",\n'
        f'  "next_question": <null if this is question {min(question_num, 4)} or higher, otherwise a new harder follow-up question string>\n'
        "}"
    )
    text = await run_gemini(prompt)
    if "```" in text:
        text = text.split("```")[1].split("```")[0]
        if text.startswith("json"):
            text = text[4:]
    return json.loads(text.strip())


async def match_jd(resume_text: str, job_description: str, role: str) -> dict:
    """Match a resume against a job description."""
    prompt = (
        f"You are an expert ATS and recruiter analyzing a candidate for: {role}\n\n"
        f"Job Description:\n{job_description}\n\n"
        f"Resume:\n{resume_text}\n\n"
        "Analyze the match and return ONLY a JSON object:\n"
        "{\n"
        '  "match_score": <integer 0-100>,\n'
        '  "matched_keywords": ["<keyword1>", "<keyword2>", ...up to 8],\n'
        '  "missing_keywords": ["<keyword1>", "<keyword2>", ...up to 8],\n'
        '  "verdict": "<one-sentence match verdict>",\n'
        '  "tips": ["<tip1>", "<tip2>", "<tip3>"]\n'
        "}"
    )
    text = await run_gemini(prompt)
    if "```" in text:
        text = text.split("```")[1].split("```")[0]
        if text.startswith("json"):
            text = text[4:]
    return json.loads(text.strip())


async def rewrite_bullet(bullet: str, role: str) -> dict:
    """Rewrite a resume bullet point to be stronger and more impactful."""
    prompt = (
        f"You are an expert resume coach for {role} positions.\n\n"
        f"Original bullet point:\n{bullet}\n\n"
        "Rewrite this bullet point to be stronger, more quantified, and more impactful. "
        "Use the STAR or XYZ format. Return ONLY a JSON object:\n"
        "{\n"
        '  "rewritten": "<the improved bullet point>",\n'
        '  "why": "<one sentence explaining what makes the new version better>"\n'
        "}"
    )
    text = await run_gemini(prompt)
    if "```" in text:
        text = text.split("```")[1].split("```")[0]
        if text.startswith("json"):
            text = text[4:]
    return json.loads(text.strip())
