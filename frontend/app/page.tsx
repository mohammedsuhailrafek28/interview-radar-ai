'use client'
import Link from 'next/link'
import Hero from '../components/Hero'
import { motion } from '../utils/motion'

export default function Home(){
  return (
    <div className="container mx-auto py-32 px-6">
      <Hero />
      <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Link href="/upload" className="glass p-8 rounded-xl card-hover group block">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-2xl font-bold group-hover:text-gradient transition-all">Scan Your Resume</h3>
                <p className="text-gray-400 mt-2">Upload and get instant AI-powered analysis</p>
              </div>
              <span className="text-3xl">📄</span>
            </div>
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.8 }}
        >
          <Link href="/results" className="glass p-8 rounded-xl card-hover group block">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-2xl font-bold group-hover:text-gradient transition-all">View Results</h3>
                <p className="text-gray-400 mt-2">See example analysis and insights</p>
              </div>
              <span className="text-3xl">📊</span>
            </div>
          </Link>
        </motion.div>
      </div>
    </div>
  )
}
