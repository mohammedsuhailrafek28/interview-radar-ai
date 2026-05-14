import '../styles/globals.css'
import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export const metadata = {
  title: 'Interview Radar AI | Elite Resume Intelligence',
  description: 'The world\'s most advanced AI resume scanning engine for elite career intelligence. Get real-time ATS scoring and recruiter feedback.',
  keywords: 'AI, Resume, Analysis, ATS, Interview, Career, Intelligence',
  openGraph: {
    title: 'Interview Radar AI',
    description: 'Elite Resume Intelligence & ATS Scanning',
    url: 'https://interview-radar.ai',
    siteName: 'Interview Radar AI',
    locale: 'en_US',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }){
  return (
    <html lang="en">
      <body>
        <div className="min-h-screen relative overflow-hidden flex flex-col" style={{backgroundColor:'#0B1020'}}>
          <Navbar />
          
          {/* Animated gradient blobs */}
          <div className="blob blob--one"></div>
          <div className="blob blob--two"></div>
          
          {/* Radar grid background */}
          <div className="radar-grid fixed top-0 left-0 w-full h-full pointer-events-none"></div>
          
          {/* Particles */}
          <div className="particles">
            {[...Array(12)].map((_, i) => <div key={i} className="particle"></div>)}
          </div>
          
          <main className="relative z-10 flex-grow pt-32">
            {children}
          </main>

          <Footer />
        </div>
      </body>
    </html>
  )
}
