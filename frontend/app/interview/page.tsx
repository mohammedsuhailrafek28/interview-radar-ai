'use client'
import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'

type Message = {
  role: 'ai' | 'user'
  content: string
  score?: number
  feedback?: string
  strength?: string
  improvement?: string
}

export default function InterviewPage() {
  const [started, setStarted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [currentQuestion, setCurrentQuestion] = useState('')
  const [answer, setAnswer] = useState('')
  const [questionNum, setQuestionNum] = useState(1)
  const [finished, setFinished] = useState(false)
  const [totalScore, setTotalScore] = useState(0)
  const [scoreCount, setScoreCount] = useState(0)
  const [resumeContext, setResumeContext] = useState('')
  const [role, setRole] = useState('Software Engineer')
  const [alerts, setAlerts] = useState<string[]>([])
  const bottomRef = useRef<HTMLDivElement>(null)

  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000'

  useEffect(() => {
    try {
      const stored = sessionStorage.getItem('ir_results')
      if (stored) {
        const data = JSON.parse(stored)
        setResumeContext(data.resume_context || '')
        setAlerts(data.alerts || [])
      }
    } catch (e) {}
  }, [])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  async function startInterview() {
    setLoading(true)
    try {
      const res = await fetch(`${apiUrl}/interview/start`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ resume_context: resumeContext, role, alerts })
      })
      const data = await res.json()
      setCurrentQuestion(data.question)
      setMessages([{ role: 'ai', content: data.question }])
      setStarted(true)
    } catch (e) {
      alert('Failed to start interview. Is the backend running?')
    }
    setLoading(false)
  }

  async function submitAnswer() {
    if (!answer.trim()) return
    const userMsg: Message = { role: 'user', content: answer }
    setMessages(prev => [...prev, userMsg])
    setAnswer('')
    setLoading(true)

    try {
      const res = await fetch(`${apiUrl}/interview/answer`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: currentQuestion,
          answer,
          role,
          question_num: questionNum
        })
      })
      const data = await res.json()
      setTotalScore(prev => prev + (data.score || 0))
      setScoreCount(prev => prev + 1)

      const aiMsg: Message = {
        role: 'ai',
        content: data.next_question || "That concludes your mock interview! Great effort.",
        score: data.score,
        feedback: data.feedback,
        strength: data.strength,
        improvement: data.improvement
      }
      setMessages(prev => [...prev, aiMsg])

      if (data.next_question && questionNum < 4) {
        setCurrentQuestion(data.next_question)
        setQuestionNum(prev => prev + 1)
      } else {
        setFinished(true)
      }
    } catch (e) {
      alert('Error evaluating answer.')
    }
    setLoading(false)
  }

  const avgScore = scoreCount > 0 ? Math.round((totalScore / scoreCount) * 10) : 0

  return (
    <div className="container mx-auto px-6 py-12 max-w-4xl">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        {/* Header */}
        <div className="mb-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-danger/10 border border-danger/20 text-danger text-xs font-black uppercase tracking-widest mb-6">
            🎤 Live Mock Interview
          </div>
          <h1 className="text-5xl font-black tracking-tighter text-gradient mb-3">AI Interview Simulator</h1>
          <p className="text-gray-400">Gemini plays the recruiter. Your weaknesses become the questions.</p>
        </div>

        {!started ? (
          <motion.div className="glass p-12 rounded-3xl text-center" initial={{ scale: 0.95 }} animate={{ scale: 1 }}>
            <div className="text-8xl mb-8">🤖</div>
            <h2 className="text-3xl font-bold mb-4">Ready to face your weaknesses?</h2>
            <p className="text-gray-400 mb-8 max-w-md mx-auto">
              The AI will ask you 4 targeted questions based on your resume's identified risks and gaps. Each answer is scored 1–10.
            </p>
            <div className="mb-8">
              <input
                value={role}
                onChange={e => setRole(e.target.value)}
                className="w-full max-w-sm mx-auto block bg-white/5 border border-white/10 p-4 rounded-xl text-center focus:ring-2 focus:ring-primary/50 outline-none"
                placeholder="Target Role (e.g. Full Stack Developer)"
              />
            </div>
            {alerts.length > 0 && (
              <div className="mb-8 space-y-2 max-w-md mx-auto text-left">
                <p className="text-xs text-gray-500 uppercase tracking-widest mb-3">Questions will probe these weaknesses:</p>
                {alerts.map((a, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm text-danger/80">
                    <span>⚠</span><span>{a}</span>
                  </div>
                ))}
              </div>
            )}
            <button
              onClick={startInterview}
              disabled={loading}
              className="px-10 py-4 rounded-xl bg-gradient-to-r from-danger to-primary font-black text-lg shadow-lg shadow-danger/20 hover:scale-105 transition-transform disabled:opacity-50"
            >
              {loading ? 'Initializing AI Recruiter...' : 'Start Interview'}
            </button>
          </motion.div>
        ) : (
          <div className="space-y-6">
            {/* Progress */}
            <div className="glass p-4 rounded-2xl flex items-center justify-between">
              <span className="text-xs text-gray-400 uppercase tracking-widest font-bold">Question {Math.min(questionNum, 4)} of 4</span>
              <div className="flex gap-2">
                {[1,2,3,4].map(n => (
                  <div key={n} className={`w-3 h-3 rounded-full transition-colors ${n <= questionNum ? 'bg-primary' : 'bg-white/10'}`} />
                ))}
              </div>
              {scoreCount > 0 && (
                <span className="text-xs font-black text-accent">Avg Score: {avgScore}/100</span>
              )}
            </div>

            {/* Chat */}
            <div className="glass rounded-3xl p-6 space-y-6 max-h-[500px] overflow-y-auto">
              <AnimatePresence>
                {messages.map((msg, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
                  >
                    <div className={`w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center text-lg ${msg.role === 'ai' ? 'bg-gradient-to-br from-primary to-accent' : 'bg-white/10'}`}>
                      {msg.role === 'ai' ? '🤖' : '👤'}
                    </div>
                    <div className={`flex-1 ${msg.role === 'user' ? 'text-right' : ''}`}>
                      <div className={`inline-block p-4 rounded-2xl text-sm leading-relaxed max-w-[85%] ${msg.role === 'ai' ? 'bg-white/5 border border-white/10 text-left' : 'bg-primary/20 border border-primary/30'}`}>
                        {msg.content}
                      </div>
                      {msg.score !== undefined && (
                        <div className="mt-3 space-y-2 text-left max-w-[85%]">
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-gray-500 uppercase tracking-widest">Score</span>
                            <div className="flex-1 bg-white/5 rounded-full h-2">
                              <div className="h-2 rounded-full bg-gradient-to-r from-primary to-accent" style={{width: `${msg.score * 10}%`}} />
                            </div>
                            <span className="text-accent font-bold text-sm">{msg.score}/10</span>
                          </div>
                          {msg.strength && <p className="text-xs text-success">✓ {msg.strength}</p>}
                          {msg.improvement && <p className="text-xs text-danger/80">↑ {msg.improvement}</p>}
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
              <div ref={bottomRef} />
            </div>

            {/* Input */}
            {!finished ? (
              <div className="flex gap-4">
                <textarea
                  value={answer}
                  onChange={e => setAnswer(e.target.value)}
                  onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); submitAnswer() }}}
                  disabled={loading}
                  rows={3}
                  className="flex-1 bg-white/5 border border-white/10 p-4 rounded-2xl focus:ring-2 focus:ring-primary/50 outline-none resize-none text-sm placeholder:text-gray-600 disabled:opacity-50"
                  placeholder="Type your answer... (Enter to submit, Shift+Enter for new line)"
                />
                <button
                  onClick={submitAnswer}
                  disabled={loading || !answer.trim()}
                  className="px-6 py-4 rounded-2xl bg-gradient-to-r from-primary to-accent font-bold disabled:opacity-50 hover:scale-105 transition-transform"
                >
                  {loading ? '⏳' : '→'}
                </button>
              </div>
            ) : (
              <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="glass p-10 rounded-3xl text-center">
                <div className="text-6xl mb-4">🏆</div>
                <h2 className="text-3xl font-black mb-2">Interview Complete!</h2>
                <p className="text-gray-400 mb-6">Your average interview performance score</p>
                <div className="text-7xl font-black text-gradient mb-8">{avgScore}<span className="text-3xl text-gray-400">/100</span></div>
                <div className="flex gap-4 justify-center">
                  <Link href="/results" className="px-6 py-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors font-bold text-sm">
                    View Resume Analysis
                  </Link>
                  <button onClick={() => { setStarted(false); setMessages([]); setQuestionNum(1); setFinished(false); setTotalScore(0); setScoreCount(0) }}
                    className="px-6 py-3 rounded-xl bg-gradient-to-r from-primary to-accent font-bold text-sm hover:scale-105 transition-transform">
                    Retry Interview
                  </button>
                </div>
              </motion.div>
            )}
          </div>
        )}
      </motion.div>
    </div>
  )
}
