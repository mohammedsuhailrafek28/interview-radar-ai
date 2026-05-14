"use client"
import {useEffect, useState} from 'react'
import ScoreRing from '../../../components/ScoreRing'
import RadarChart from '../../../components/RadarChart'
import FeedbackCard from '../../../components/FeedbackCard'
import fallback from '../../../data/results'

export default function Results(){
  const [data, setData] = useState<any>(fallback)

  useEffect(()=>{
    try{
      const stored = sessionStorage.getItem('ir_results')
      if(stored) setData(JSON.parse(stored))
    }catch(e){}
  },[])

  return (
    <div className="container mx-auto py-16 px-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 glass p-8">
          <div className="flex items-center gap-8">
            <ScoreRing score={data.score} />
            <div>
              <h2 className="text-3xl font-semibold">{data.title}</h2>
              <p className="text-gray-300 mt-2">{data.subtitle}</p>
            </div>
          </div>

          <div className="mt-8">
            <h3 className="text-xl font-medium mb-4">Radar Overview</h3>
            <RadarChart values={data.radar} />
          </div>
        </div>

        <div className="glass p-8">
          <h3 className="text-lg font-medium">Recruiter Verdict</h3>
          <FeedbackCard verdict={data.verdict} bullets={data.alerts} />
        </div>
      </div>

      <div className="mt-8 glass p-6">
        <h3 className="text-lg font-medium">Improvement Roadmap</h3>
        <ul className="mt-4 list-disc list-inside">
          {data.roadmap.map((r:any,i:number)=> <li key={i} className="text-gray-300">{r}</li>)}
        </ul>
      </div>
    </div>
  )
}
