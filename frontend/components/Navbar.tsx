'use client'
import Link from 'next/link'
import { motion } from '../utils/motion'

export default function Navbar() {
  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 flex justify-center p-6"
    >
      <div className="glass px-8 py-4 rounded-2xl flex items-center justify-between w-full max-w-6xl border border-white/10 backdrop-blur-xl">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg shadow-primary/20 group-hover:scale-110 transition-transform">
            <span className="text-xl">📡</span>
          </div>
          <span className="text-xl font-black tracking-tighter text-white uppercase font-space">
            Radar<span className="text-accent">AI</span>
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-8 text-sm font-bold tracking-widest text-gray-400 uppercase">
          <Link href="/upload" className="hover:text-white transition-colors">Scanner</Link>
          <Link href="/match" className="hover:text-white transition-colors">JD Match</Link>
          <Link href="/interview" className="hover:text-white transition-colors">Interview</Link>
          <Link href="/results" className="hover:text-white transition-colors">Results</Link>
        </div>

        <div className="flex items-center gap-4">
          <span className="hidden sm:inline-block px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-[10px] font-black text-primary uppercase tracking-[0.2em]">
            Beta 0.1
          </span>
          <Link href="/login" className="px-4 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest text-gray-300 hover:text-white transition-colors hidden sm:block">
            Sign In
          </Link>
          <Link href="/upload" className="px-5 py-2.5 rounded-xl bg-white text-black text-xs font-black uppercase tracking-widest hover:bg-accent hover:text-white transition-all">
            Start Analysis
          </Link>
        </div>
      </div>
    </motion.nav>
  )
}
