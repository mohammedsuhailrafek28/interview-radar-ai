export type UploadData = {
  role?: string
  github?: string
  portfolio?: string
  filename?: string
}

function scoreFromData(d: UploadData){
  let score = 60
  if(d.github && d.github.length>10) score += 8
  if(d.portfolio && d.portfolio.length>10) score += 6
  if(d.role && d.role.toLowerCase().includes('engineer')) score += 4
  if(d.filename && d.filename.toLowerCase().includes('senior')) score += 2
  return Math.min(92, score + Math.floor(Math.random()*8))
}

export async function analyzeResume(data: UploadData){
  // Simulate varied async analysis (6-8s)
  const wait = 6000 + Math.floor(Math.random()*2000)
  await new Promise(r=> setTimeout(r, wait))

  const score = scoreFromData(data)
  const results = {
    score,
    title: String(score),
    subtitle: score>75? 'INTERVIEW READY' : 'IMPROVEMENTS SUGGESTED',
    radar: [
      {name:'Technical', value: Math.min(100, score - 4 + Math.floor(Math.random()*8))},
      {name:'ATS', value: Math.min(100, score - 10 + Math.floor(Math.random()*12))},
      {name:'Communication', value: Math.min(100, score - 2 + Math.floor(Math.random()*10))},
      {name:'Portfolio', value: data.portfolio? (60 + Math.floor(Math.random()*30)) : 50},
      {name:'Confidence', value: Math.min(100, score + Math.floor(Math.random()*6))}
    ],
    verdict: 'Strong project quality and technical understanding, but lacks production deployment proof and measurable impact.',
    alerts: [
      'Resume claims AI skills without deployment evidence',
      'GitHub consistency appears low',
      'Project descriptions lack business impact'
    ],
    roadmap: [
      'Add deployment links for at least 2 projects',
      'Add measurable impact bullets (metrics, traffic, revenue)',
      'Improve GitHub README and activity cadence'
    ]
  }

  try{ sessionStorage.setItem('ir_results', JSON.stringify(results)) }catch(e){}
  return results
}
