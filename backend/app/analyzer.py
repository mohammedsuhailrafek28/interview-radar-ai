import os
import json
import asyncio
from typing import Dict, Any
import google.generativeai as genai
from dotenv import load_dotenv

load_dotenv()

genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

FALLBACK = {
    "score": 72,
    "title": "Mid-Level",
    "subtitle": "IMPROVEMENTS SUGGESTED",
    "radar": [
        {"name": "Technical", "value": 70},
        {"name": "ATS", "value": 60},
        {"name": "Communication", "value": 80},
        {"name": "Portfolio", "value": 50},
        {"name": "Confidence", "value": 75}
    ],
    "verdict": "Solid foundation detected, but key gaps in measurable impact and deployment proof.",
    "alerts": [
        "Resume lacks quantifiable achievements",
        "GitHub activity appears inconsistent",
        "Project descriptions missing business context"
    ],
    "roadmap": [
        "Add deployment links for at least 2 projects",
        "Quantify impact with metrics (users, traffic, revenue)",
        "Improve GitHub README quality and commit frequency"
    ]
}

JSON_SCHEMA = """{
    "score": <integer 0-100>,
    "title": "<Junior | Mid-Level | Senior | Expert>",
    "subtitle": "<INTERVIEW READY | IMPROVEMENTS SUGGESTED>",
    "radar": [
        {"name": "Technical", "value": <0-100>},
        {"name": "ATS", "value": <0-100>},
        {"name": "Communication", "value": <0-100>},
        {"name": "Portfolio", "value": <0-100>},
        {"name": "Confidence", "value": <0-100>}
    ],
    "verdict": "<one hard-hitting recruiter sentence>",
    "alerts": ["<risk 1>", "<risk 2>", "<risk 3>"],
    "roadmap": ["<action 1>", "<action 2>", "<action 3>"]
}"""

async def analyze_resume(data: Dict[str, Any]):
    resume_text = data.get('resume_text', '')
    role = data.get('role', 'Software Engineer')
    github = data.get('github', 'Not provided')
    portfolio = data.get('portfolio', 'Not provided')

    prompt = (
        "You are an expert technical recruiter and ATS optimization engine.\n"
        f"Analyze the following resume for the role of: {role}\n"
        f"GitHub: {github}\n"
        f"Portfolio: {portfolio}\n\n"
        "Resume Text:\n"
        f"{resume_text}\n\n"
        "Return ONLY valid JSON matching this exact schema:\n"
        + JSON_SCHEMA +
        "\n\nDo not include any text, markdown, or explanation outside the JSON."
    )

    try:
        model = genai.GenerativeModel('gemini-2.5-flash')
        loop = asyncio.get_event_loop()
        response = await loop.run_in_executor(None, lambda: model.generate_content(prompt))

        res_text = response.text.strip()

        # Strip markdown fences if present
        if res_text.startswith("```"):
            res_text = res_text.split("```")[1]
            if res_text.startswith("json"):
                res_text = res_text[4:]
        res_text = res_text.strip()

        result = json.loads(res_text)
        return result

    except Exception as e:
        print(f"[Gemini Error] {type(e).__name__}: {str(e)}")
        return FALLBACK
