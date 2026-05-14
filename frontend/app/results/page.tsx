"use client"
import {useEffect, useState} from 'react'
import {motion} from '../../utils/motion'
import Link from 'next/link'
import ScoreRing from '../../components/ScoreRing'
import RadarChart from '../../components/RadarChart'
import FeedbackCard from '../../components/FeedbackCard'
import Roadmap from '../../components/Roadmap'
import fallback from '../../data/results'

export default function Results(){
  const [data, setData] = useState<any>(fallback)

  useEffect(()=>{
    try{
      const stored = sessionStorage.getItem('ir_results')
      if(stored) setData(JSON.parse(stored))
    }catch(e){}
  },[])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.3 }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.2, 0.65, 0.3, 0.9] } }
  }

  return (
    <motion.div 
      className="container mx-auto py-24 px-6 max-w-7xl"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* SECTION 1 — SCORE HERO */}
      <motion.div variants={itemVariants} className="mb-20">
        <div className="glass p-12 md:p-20 rounded-[3rem] relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 blur-[120px] rounded-full -mr-20 -mt-20"></div>
          <div className="flex flex-col lg:flex-row items-center justify-between gap-16 relative z-10">
            <div className="flex flex-col items-center gap-8">
              <ScoreRing score={data.score} />
              <Link href="/upload" className="px-6 py-2 rounded-full border border-white/10 hover:bg-white/5 transition-colors text-[10px] font-black uppercase tracking-widest text-gray-500">
                New Analysis
              </Link>
            </div>
            <div className="flex-1 text-center lg:text-left">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 }}
              >
                <h1 className="text-6xl md:text-7xl font-black text-gradient mb-6 tracking-tighter uppercase">
                  {data.title || "Elite Readiness"}
                </h1>
                <p className="text-2xl text-gray-400 font-medium mb-8">
                  {data.subtitle || "Your profile is in the top 5% for this role."}
                </p>
                <div className="flex flex-wrap justify-center lg:justify-start gap-4">
                  <span className="px-4 py-2 rounded-full bg-success/10 border border-success/20 text-success text-xs font-bold tracking-widest uppercase">Verified ATS Path</span>
                  <span className="px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold tracking-widest uppercase">Technical Mastered</span>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* SECTION 2 — RECRUITER VERDICT */}
      <motion.div variants={itemVariants} className="mb-12">
        <div className="bg-white/5 border border-white/10 p-10 rounded-[2rem]">
          <h3 className="text-xs font-black text-accent tracking-[0.3em] uppercase mb-6">Recruiter Verdict</h3>
          <p className="text-3xl md:text-4xl font-bold text-gray-200 leading-tight">
            “{data.verdict}”
          </p>
        </div>
      </motion.div>

      {/* SECTION 3 — RADAR & RISKS GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-20">
        <motion.div variants={itemVariants} className="lg:col-span-8 glass p-10 rounded-[2.5rem]">
          <div className="flex items-center justify-between mb-10">
            <h3 className="text-2xl font-bold">Intelligence Radar</h3>
            <div className="flex gap-2">
              <div className="w-2 h-2 rounded-full bg-primary"></div>
              <div className="w-2 h-2 rounded-full bg-accent"></div>
            </div>
          </div>
          <RadarChart values={data.radar} />
        </motion.div>

        <motion.div variants={itemVariants} className="lg:col-span-4 glass p-10 rounded-[2.5rem] border-danger/10">
          <h3 className="text-2xl font-bold mb-8 flex items-center gap-3 text-danger">
            Hiring Risks
          </h3>
          <FeedbackCard verdict="" bullets={data.alerts} />
        </motion.div>
      </div>

      {/* SECTION 4 — ROADMAP */}
      <motion.div variants={itemVariants}>
        <div className="glass p-12 rounded-[3rem]">
          <div className="mb-12">
            <h3 className="text-3xl font-bold mb-3 text-white">Recovery Roadmap</h3>
            <p className="text-gray-400">Critical actions to reach 95+ readiness score.</p>
          </div>
          <Roadmap steps={data.roadmap} />
        </div>
      </motion.div>

      {/* SECTION 5 — BULLET REWRITER */}
      <motion.div variants={itemVariants}>
        <BulletRewriter role={data.title || 'Software Engineer'} />
      </motion.div>

      {/* SECTION 6 — NEXT STEPS CTA */}
      <motion.div variants={itemVariants}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link href="/interview" className="group glass p-10 rounded-[2.5rem] border border-danger/10 hover:border-danger/40 transition-all block">
            <div className="text-4xl mb-4">🎤</div>
            <h3 className="text-2xl font-black mb-2 group-hover:text-danger transition-colors">Mock Interview</h3>
            <p className="text-gray-400 text-sm mb-6">Face AI-generated questions based on your exact resume weaknesses. Get scored and coached in real-time.</p>
            <span className="text-xs font-black text-danger uppercase tracking-widest">Start Now →</span>
          </Link>
          <Link href="/match" className="group glass p-10 rounded-[2.5rem] border border-accent/10 hover:border-accent/40 transition-all block">
            <div className="text-4xl mb-4">📋</div>
            <h3 className="text-2xl font-black mb-2 group-hover:text-accent transition-colors">JD Match Engine</h3>
            <p className="text-gray-400 text-sm mb-6">Paste any job description and get a real-time AI compatibility score with keyword gap analysis.</p>
            <span className="text-xs font-black text-accent uppercase tracking-widest">Match Now →</span>
          </Link>
        </div>
      </motion.div>
    </motion.div>
  )
}

// ---- Inline Bullet Rewriter Component ----
function BulletRewriter({ role }: { role: string }) {
  const [bullet, setBullet] = useState('')
  const [result, setResult] = useState<{rewritten: string; why: string} | null>(null)
  const [loading, setLoading] = useState(false)
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000'

  async function rewrite() {
    if (!bullet.trim()) return
    setLoading(true)
    try {
      const res = await fetch(`${apiUrl}/rewrite`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ bullet, role })
      })
      setResult(await res.json())
    } catch (e) { alert('Rewrite failed.') }
    setLoading(false)
  }

  return (
    <div className="glass p-10 rounded-[2.5rem]">
      <div className="mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-black uppercase tracking-widest mb-4">✍ AI Resume Rewriter</div>
        <h3 className="text-3xl font-bold mb-2">Bullet Point Optimizer</h3>
        <p className="text-gray-400">Paste any weak resume bullet and Gemini will rewrite it to be stronger, more quantified, and more impactful.</p>
      </div>
      <textarea
        value={bullet}
        onChange={e => setBullet(e.target.value)}
        rows={3}
        className="w-full bg-black/30 border border-white/10 p-5 rounded-2xl text-sm text-gray-300 focus:ring-2 focus:ring-primary/50 outline-none resize-none placeholder:text-gray-600 mb-4"
        placeholder="e.g. 'Worked on the company website and fixed some bugs'"
      />
      <button
        onClick={rewrite}
        disabled={loading || !bullet.trim()}
        className="px-8 py-3 rounded-xl bg-gradient-to-r from-primary to-accent font-black text-sm hover:scale-105 transition-transform disabled:opacity-50 mb-6"
      >
        {loading ? 'Rewriting with AI...' : '✨ Rewrite Bullet'}
      </button>
      {result && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 rounded-2xl bg-danger/5 border border-danger/20">
              <p className="text-[10px] font-black text-danger/60 uppercase tracking-widest mb-2">Before</p>
              <p className="text-gray-400 text-sm leading-relaxed">{bullet}</p>
            </div>
            <div className="p-5 rounded-2xl bg-success/5 border border-success/20">
              <p className="text-[10px] font-black text-success/60 uppercase tracking-widest mb-2">After</p>
              <p className="text-white text-sm leading-relaxed font-medium">{result.rewritten}</p>
            </div>
          </div>
          <p className="text-xs text-accent">💡 {result.why}</p>
        </motion.div>
      )}
    </div>
  )
}
