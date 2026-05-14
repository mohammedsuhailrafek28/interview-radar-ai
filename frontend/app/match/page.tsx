'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

type MatchResult = {
  match_score: number
  matched_keywords: string[]
  missing_keywords: string[]
  verdict: string
  tips: string[]
}

export default function JDMatchPage() {
  const [resumeText, setResumeText] = useState('')
  const [jobDescription, setJobDescription] = useState('')
  const [role, setRole] = useState('')
  const [result, setResult] = useState<MatchResult | null>(null)
  const [loading, setLoading] = useState(false)

  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000'

  async function handleMatch() {
    if (!resumeText.trim() || !jobDescription.trim()) {
      alert('Please paste both your resume and the job description.')
      return
    }
    setLoading(true)
    try {
      const res = await fetch(`${apiUrl}/match`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ resume_text: resumeText, job_description: jobDescription, role: role || 'Software Engineer' })
      })
      const data = await res.json()
      setResult(data)
    } catch (e) {
      alert('Match failed. Ensure the backend is running.')
    }
    setLoading(false)
  }

  const scoreColor = result
    ? result.match_score >= 75 ? '#00E676' : result.match_score >= 50 ? '#FFCA28' : '#FF5252'
    : '#7C4DFF'

  return (
    <div className="container mx-auto px-6 py-12 max-w-5xl">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="mb-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 text-accent text-xs font-black uppercase tracking-widest mb-6">
            📋 JD Match Engine
          </div>
          <h1 className="text-5xl font-black tracking-tighter text-gradient mb-3">Job Description Matcher</h1>
          <p className="text-gray-400">Paste your resume and any job post. Get an instant AI compatibility score.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <div className="glass p-6 rounded-2xl">
            <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-3">Your Resume Text</label>
            <textarea
              value={resumeText}
              onChange={e => setResumeText(e.target.value)}
              rows={12}
              className="w-full bg-white/5 border border-white/10 p-4 rounded-xl text-sm text-gray-300 focus:ring-2 focus:ring-primary/50 outline-none resize-none placeholder:text-gray-600"
              placeholder="Paste your full resume text here..."
            />
          </div>
          <div className="glass p-6 rounded-2xl">
            <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-3">Job Description</label>
            <textarea
              value={jobDescription}
              onChange={e => setJobDescription(e.target.value)}
              rows={12}
              className="w-full bg-white/5 border border-white/10 p-4 rounded-xl text-sm text-gray-300 focus:ring-2 focus:ring-primary/50 outline-none resize-none placeholder:text-gray-600"
              placeholder="Paste the full job description here..."
            />
          </div>
        </div>

        <div className="flex items-center gap-4 mb-10">
          <input
            value={role}
            onChange={e => setRole(e.target.value)}
            className="flex-1 bg-white/5 border border-white/10 p-4 rounded-xl focus:ring-2 focus:ring-primary/50 outline-none placeholder:text-gray-600"
            placeholder="Target Role (optional, e.g. Full Stack Developer)"
          />
          <button
            onClick={handleMatch}
            disabled={loading}
            className="px-10 py-4 rounded-xl bg-gradient-to-r from-accent to-primary font-black text-lg shadow-lg shadow-accent/20 hover:scale-105 transition-transform disabled:opacity-50 whitespace-nowrap"
          >
            {loading ? 'Analyzing...' : '⚡ Match Now'}
          </button>
        </div>

        <AnimatePresence>
          {result && (
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
              {/* Score Hero */}
              <div className="glass p-10 rounded-3xl flex flex-col md:flex-row items-center gap-10">
                <div className="relative w-48 h-48 flex-shrink-0">
                  <svg className="w-full h-full -rotate-90" viewBox="0 0 160 160">
                    <circle cx="80" cy="80" r="70" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="10" />
                    <motion.circle
                      cx="80" cy="80" r="70" fill="none" stroke={scoreColor} strokeWidth="10"
                      strokeLinecap="round"
                      strokeDasharray={2 * Math.PI * 70}
                      initial={{ strokeDashoffset: 2 * Math.PI * 70 }}
                      animate={{ strokeDashoffset: 2 * Math.PI * 70 * (1 - result.match_score / 100) }}
                      transition={{ duration: 1.5, ease: 'easeOut' }}
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-5xl font-black" style={{ color: scoreColor }}>{result.match_score}%</span>
                    <span className="text-xs text-gray-400 font-bold uppercase tracking-widest mt-1">Match</span>
                  </div>
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-200 mb-4">"{result.verdict}"</p>
                  <div className="flex flex-wrap gap-2">
                    {result.tips.map((tip, i) => (
                      <span key={i} className="px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-xs font-bold">
                        💡 {tip}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Keywords */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="glass p-6 rounded-2xl">
                  <h3 className="text-xs font-black text-success uppercase tracking-widest mb-4">✓ Matched Keywords</h3>
                  <div className="flex flex-wrap gap-2">
                    {result.matched_keywords.map((k, i) => (
                      <span key={i} className="px-3 py-1 rounded-full bg-success/10 border border-success/20 text-success text-xs font-bold">{k}</span>
                    ))}
                  </div>
                </div>
                <div className="glass p-6 rounded-2xl">
                  <h3 className="text-xs font-black text-danger uppercase tracking-widest mb-4">✗ Missing Keywords</h3>
                  <div className="flex flex-wrap gap-2">
                    {result.missing_keywords.map((k, i) => (
                      <span key={i} className="px-3 py-1 rounded-full bg-danger/10 border border-danger/20 text-danger text-xs font-bold">{k}</span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}
