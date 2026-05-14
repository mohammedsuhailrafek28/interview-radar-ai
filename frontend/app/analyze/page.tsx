'use client'
import {useEffect, useState} from 'react'
import {useRouter} from 'next/navigation'
import {motion} from 'framer-motion'
import {analyzeResume} from '../../utils/mockGemini'

export default function Analyze(){
  const router = useRouter()
  const [progress, setProgress] = useState(6)
  const [lines, setLines] = useState<string[]>([])

  useEffect(()=>{
    const uploadRaw = typeof window !== 'undefined' ? sessionStorage.getItem('ir_upload') : null
    const upload = uploadRaw ? JSON.parse(uploadRaw) : {}

    // staged progress updates tied to analysis steps
    const messages = [
      'Parsing Resume...',
      'Running ATS Simulation...',
      'Analyzing Technical Depth...',
      'Scanning GitHub Activity...',
      'Detecting Hiring Risks...',
      'Generating Recruiter Insights...',
      'Building Recovery Roadmap...'
    ]

    let step = 0
    const logInterval = setInterval(()=>{
      setLines(prev=>[...prev, messages[step]])
      step++
      if(step>=messages.length) clearInterval(logInterval)
    }, 900)

    // start progress animation and run mock analysis (6-8s inside)
    analyzeResume(upload).then(res=>{
      // animate progress to 100
      const steps = [30,48,64,78,90,100]
      let i = 0
      const t = setInterval(()=>{
        setProgress(steps[i])
        i++
        if(i>=steps.length){
          clearInterval(t)
          setTimeout(()=> router.push('/results'), 700)
        }
      }, 900)
    })

    return ()=>{
      clearInterval(logInterval)
    }
  },[])

  return (
    <div className="container mx-auto py-24 px-6">
      <div className="glass p-8 flex items-center gap-6">
        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center pulse">
          <div className="w-12 h-12 rounded-full bg-black/40"></div>
        </div>
        <div className="flex-1">
          <h3 className="text-xl font-semibold">Scanning resume...</h3>
          <div className="text-sm text-gray-300 mt-2">
            {lines.map((l,i)=> <div key={i} className="font-mono text-xs">➜ {l}</div>)}
          </div>
          <div className="mt-4 bg-white/6 h-3 rounded overflow-hidden">
            <motion.div className="h-3 bg-gradient-to-r from-primary to-accent" style={{width:`${progress}%`}} layout transition={{duration:0.6}} />
          </div>
          <p className="text-xs text-gray-400 mt-2">{progress}%</p>
        </div>
      </div>
    </div>
  )
}
