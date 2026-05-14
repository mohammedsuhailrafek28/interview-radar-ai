'use client'
import { motion } from 'framer-motion'

export default function Hero(){
  return (
    <motion.section 
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="glass p-12 rounded-3xl relative overflow-hidden group"
    >
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-primary/20 blur-[80px] rounded-full group-hover:bg-primary/30 transition-colors"></div>
      
      <motion.h1 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
        className="text-6xl font-bold text-gradient mb-6 tracking-tight"
      >
        Interview Radar AI
      </motion.h1>
      
      <motion.p 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="text-xl text-gray-300 max-w-2xl leading-relaxed"
      >
        Precision intelligence for your career. Get AI-powered resume analysis, 
        readiness scoring, and actionable feedback in real-time.
      </motion.p>
      
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="mt-10 flex flex-wrap gap-8"
      >
        <div className="flex items-center gap-3">
          <div className="w-4 h-4 rounded-full bg-gradient-to-r from-primary to-accent shadow-[0_0_10px_rgba(124,77,255,0.5)]"></div>
          <span className="text-base font-medium text-gray-300">Instant Scan</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-4 h-4 rounded-full bg-gradient-to-r from-accent to-success shadow-[0_0_10px_rgba(0,209,255,0.5)]"></div>
          <span className="text-base font-medium text-gray-300">Recruiter Insights</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-4 h-4 rounded-full bg-gradient-to-r from-success to-primary shadow-[0_0_10px_rgba(0,230,118,0.5)]"></div>
          <span className="text-base font-medium text-gray-300">Readiness Score</span>
        </div>
      </motion.div>
    </motion.section>
  )
}
