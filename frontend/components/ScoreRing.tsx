'use client'
import {useEffect, useState} from 'react'
import {motion} from '../utils/motion'

export default function ScoreRing({score}:{score:number}){
  const [val,setVal] = useState(0)
  
  useEffect(()=>{
    let start = 0
    const end = score
    const duration = 2000
    const increment = end / (duration / 16)
    
    const timer = setInterval(() => {
      start += increment
      if (start >= end) {
        setVal(end)
        clearInterval(timer)
      } else {
        setVal(Math.floor(start))
      }
    }, 16)
    
    return () => clearInterval(timer)
  },[score])

  const circumference = 2 * Math.PI * 70
  const targetOffset = circumference - (score / 100) * circumference

  return (
    <div className="relative w-64 h-64 flex flex-col items-center justify-center">
      <svg className="w-full h-full -rotate-90" viewBox="0 0 160 160">
        {/* Background Track */}
        <circle 
          cx="80" cy="80" r="70" 
          fill="none" 
          stroke="rgba(255,255,255,0.05)" 
          strokeWidth="10" 
        />
        {/* Progress Ring */}
        <motion.circle 
          cx="80" cy="80" r="70" 
          fill="none" 
          stroke="url(#ringGradient)" 
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: targetOffset }}
          transition={{ duration: 2, ease: "easeOut" }}
        />
        <defs>
          <linearGradient id="ringGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#7C4DFF" />
            <stop offset="100%" stopColor="#00D1FF" />
          </linearGradient>
        </defs>
      </svg>

      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <motion.span 
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-7xl font-bold text-white tracking-tighter"
        >
          {val}
        </motion.span>
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="text-sm font-black text-accent tracking-[0.2em] mt-2"
        >
          INTERVIEW READY
        </motion.div>
      </div>
      
      {/* Outer Glow */}
      <div className="absolute inset-0 bg-primary/10 blur-[40px] rounded-full -z-10 animate-pulse"></div>
    </div>
  )
}

