'use client'
import {useEffect, useState} from 'react'
import {useRouter} from 'next/navigation'
import {motion, AnimatePresence} from '../../utils/motion'

const MotionDiv = motion.div
const MotionSpan = motion.span

export default function Analyze(){
  const router = useRouter()
  const [progress, setProgress] = useState(0)
  const [lines, setLines] = useState<string[]>([])
  const [status, setStatus] = useState('Initializing Core...')

  useEffect(()=>{
    const messages = [
      { text: 'Parsing Resume Structure...', delay: 500, prog: 15 },
      { text: 'Extracting Technical Metadata...', delay: 1200, prog: 25 },
      { text: 'Running ATS Simulation...', delay: 2000, prog: 40 },
      { text: 'Analyzing GitHub Repository Depth...', delay: 3000, prog: 55 },
      { text: 'Evaluating Project Business Impact...', delay: 4000, prog: 70 },
      { text: 'Detecting Hiring Risks & Red Flags...', delay: 5000, prog: 85 },
      { text: 'Generating Recruiter Insights...', delay: 6000, prog: 95 },
      { text: 'Finalizing Readiness Roadmap...', delay: 6500, prog: 100 }
    ]

    messages.forEach((msg, i) => {
      setTimeout(() => {
        setLines(prev => [...prev, msg.text])
        setStatus(msg.text)
        setProgress(msg.prog)
      }, msg.delay)
    })

    // Wait 7.5 seconds before redirecting to Results
    const timer = setTimeout(() => {
      router.push('/results')
    }, 7500)

    return () => clearTimeout(timer)
  },[router])

  return (
    <div className="container mx-auto py-32 px-6 flex flex-col items-center justify-center min-h-[80vh]">
      <div className="relative mb-16">
        {/* Pulsing AI Orb */}
        <div className="absolute inset-0 bg-primary/20 blur-[100px] rounded-full animate-pulse"></div>
        <MotionDiv 
          className="relative w-40 h-40 rounded-full border-2 border-primary/30 flex items-center justify-center overflow-hidden glass"
          animate={{ rotate: 360 }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20"></div>
          <MotionDiv 
            className="w-24 h-24 rounded-full bg-gradient-to-r from-primary to-accent blur-md"
            animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </MotionDiv>
        
        {/* Scanning Line */}
        <MotionDiv 
          className="absolute top-0 left-0 w-full h-[2px] bg-accent shadow-[0_0_15px_#00D1FF]"
          animate={{ top: ['0%', '100%', '0%'] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <MotionDiv 
        className="glass p-8 rounded-3xl max-w-2xl w-full border border-white/5"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex justify-between items-end mb-4">
          <div>
            <h3 className="text-xl font-bold text-white mb-1">{status}</h3>
            <p className="text-xs text-gray-500 uppercase tracking-widest">Neural Processor Active</p>
          </div>
          <div className="text-2xl font-mono text-accent font-bold">{progress}%</div>
        </div>

        <div className="progress-bar mb-8 h-2">
          <MotionDiv 
            className="progress-bar-fill" 
            initial={{ width: '0%' }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>

        <div className="bg-black/40 rounded-xl p-6 font-mono text-xs h-48 overflow-hidden relative">
          <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/60 to-transparent pointer-events-none"></div>
          <div className="space-y-2">
            <AnimatePresence>
              {lines.map((line, i) => (
                <MotionDiv 
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex items-center gap-3 text-gray-400"
                >
                  <span className="text-accent font-bold">»</span>
                  <span>{line}</span>
                  <MotionSpan 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-[10px] text-success/50"
                  >[SUCCESS]</MotionSpan>
                </MotionDiv>
              ))}
            </AnimatePresence>
            <MotionDiv 
              animate={{ opacity: [0, 1] }} 
              transition={{ repeat: Infinity, duration: 0.8 }}
              className="w-2 h-4 bg-accent/50 inline-block align-middle"
            />
          </div>
        </div>
      </MotionDiv>
    </div>
  )
}
