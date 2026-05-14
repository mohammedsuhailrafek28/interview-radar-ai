import './globals.css'
import React from 'react'

export const metadata = {
  title: 'Interview Radar AI',
  description: 'Resume analysis and readiness dashboard',
}

export default function RootLayout({ children }: { children: React.ReactNode }){
  return (
    <html lang="en">
      <body>
        <div className="min-h-screen relative overflow-hidden" style={{backgroundColor:'#0B1020'}}>
          <div className="blob blob--one"></div>
          <div className="blob blob--two"></div>
          <main className="relative z-10">
            {children}
          </main>
        </div>
      </body>
    </html>
  )
}
