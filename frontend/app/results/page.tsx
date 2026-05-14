"use client"
import {useEffect, useState} from 'react'
import {motion} from 'framer-motion'
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
    </motion.div>
  )
}
