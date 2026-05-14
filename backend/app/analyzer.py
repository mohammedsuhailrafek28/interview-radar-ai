import asyncio
import random
from typing import Dict, Any

async def analyze_resume(data: Dict[str, Any]):
    # simulate 2-4s server-side analysis
    await asyncio.sleep(2 + random.random()*2)
    role = data.get('role','')
    score = 60
    if data.get('github') and len(data.get('github'))>10: score += 8
    if data.get('portfolio') and len(data.get('portfolio'))>10: score += 6
    if 'engineer' in role.lower(): score += 4
    score = min(95, score + random.randint(0,8))

    results = {
        'score': score,
        'title': str(score),
        'subtitle': 'INTERVIEW READY' if score>75 else 'IMPROVEMENTS SUGGESTED',
        'radar': [
            {'name':'Technical', 'value': max(10, min(100, score - 4 + random.randint(0,8)))},
            {'name':'ATS', 'value': max(10, min(100, score - 10 + random.randint(0,12)))},
            {'name':'Communication', 'value': max(10, min(100, score - 2 + random.randint(0,10)))},
            {'name':'Portfolio', 'value': 60 + (20 if data.get('portfolio') else 0) + random.randint(0,10)},
            {'name':'Confidence', 'value': max(10, min(100, score + random.randint(0,6)))},
        ],
        'verdict': 'Strong project quality and technical understanding, but lacks production deployment proof and measurable impact.',
        'alerts': [
            'Resume claims AI skills without deployment evidence',
            'GitHub consistency appears low',
            'Project descriptions lack business impact'
        ],
        'roadmap': [
            'Add deployment links for at least 2 projects',
            'Add measurable impact bullets (metrics, traffic, revenue)',
            'Improve GitHub README and activity cadence'
        ]
    }
    return results
