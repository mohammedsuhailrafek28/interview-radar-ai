"use client"
import React, {useState} from 'react'
import {useRouter} from 'next/navigation'
import { motion } from 'framer-motion'

export default function UploadCard(){
  const router = useRouter()
  const [fileName,setFileName] = useState<string>('')
  const [role,setRole] = useState<string>('')
  const [github,setGithub] = useState<string>('')
  const [portfolio,setPortfolio] = useState<string>('')
  const [loading,setLoading] = useState(false)
  const fileInputRef = React.useRef<HTMLInputElement>(null)

  function handleFile(e: any){
    const f = e.target.files && e.target.files[0]
    if(f) setFileName(f.name)
  }

  async function handleSubmit(){
    if(!fileInputRef.current?.files?.[0]){
      alert('Please select a file')
      return
    }
    setLoading(true)
    try{
      const formData = new FormData()
      formData.append('file', fileInputRef.current.files[0])
      formData.append('role', role)
      formData.append('github', github)
      formData.append('portfolio', portfolio)

      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'
      const res = await fetch(`${apiUrl}/upload`, {
        method: 'POST',
        body: formData
      })
      if(!res.ok) throw new Error('Upload failed')
      const results = await res.json()
      try{ sessionStorage.setItem('ir_results', JSON.stringify(results)) }catch(e){}
      router.push('/analyze')
    }catch(e){
      alert('Error: ' + (e instanceof Error ? e.message : 'Unknown error'))
      setLoading(false)
    }
  }

  const containerVars = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { staggerChildren: 0.1, delayChildren: 0.3 }
    }
  }

  const itemVars = {
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0 }
  }

  return (
    <motion.div 
      variants={containerVars}
      initial="hidden"
      animate="visible"
      className="space-y-6 mt-8"
    >
      <motion.div variants={itemVars} className="group">
        <label className="block p-8 border-2 border-dashed border-gray-700 rounded-2xl cursor-pointer hover:border-primary/50 transition-colors bg-white/5">
          <input ref={fileInputRef} onChange={handleFile} type="file" className="hidden" />
          <div className="text-center">
            <span className="text-4xl mb-4 block">📤</span>
            <div className="text-gray-300 font-medium">{fileName || 'Drop your resume here or click to browse'}</div>
            <p className="text-xs text-gray-500 mt-1">PDF, DOCX up to 10MB</p>
          </div>
        </label>
      </motion.div>

      <motion.div variants={itemVars}>
        <label className="block">
          <span className="text-sm font-semibold text-gray-400 mb-2 block ml-1">Target Role</span>
          <input 
            value={role} 
            onChange={e=>setRole(e.target.value)} 
            className="w-full bg-white/5 border border-white/10 p-4 rounded-xl focus:ring-2 focus:ring-primary/50 outline-none transition-all placeholder:text-gray-600" 
            placeholder="e.g. Senior Frontend Engineer" 
          />
        </label>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <motion.div variants={itemVars}>
          <label className="block">
            <span className="text-sm font-semibold text-gray-400 mb-2 block ml-1">GitHub URL</span>
            <input 
              value={github} 
              onChange={e=>setGithub(e.target.value)} 
              className="w-full bg-white/5 border border-white/10 p-4 rounded-xl focus:ring-2 focus:ring-primary/50 outline-none transition-all placeholder:text-gray-600" 
              placeholder="github.com/username" 
            />
          </label>
        </motion.div>

        <motion.div variants={itemVars}>
          <label className="block">
            <span className="text-sm font-semibold text-gray-400 mb-2 block ml-1">Portfolio</span>
            <input 
              value={portfolio} 
              onChange={e=>setPortfolio(e.target.value)} 
              className="w-full bg-white/5 border border-white/10 p-4 rounded-xl focus:ring-2 focus:ring-primary/50 outline-none transition-all placeholder:text-gray-600" 
              placeholder="portfolio.me" 
            />
          </label>
        </motion.div>
      </div>

      <motion.button 
        variants={itemVars}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={handleSubmit} 
        disabled={loading} 
        className="w-full py-4 rounded-xl bg-gradient-to-r from-primary to-accent font-bold shadow-lg shadow-primary/20 disabled:opacity-50 transition-all text-lg"
      >
        {loading ? (
          <span className="flex items-center justify-center gap-2">
            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Analyzing Intelligence...
          </span>
        ) : 'Launch Radar Analysis'}
      </motion.button>
    </motion.div>
