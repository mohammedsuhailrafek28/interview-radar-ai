'use client'
import { Radar, RadarChart as RC, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts'

export default function RadarChart({values}:{values:{name:string;value:number}[]}){
  // Ensure we have the correct categories if not provided
  const displayData = values.length > 0 ? values : [
    { name: 'Technical', value: 80 },
    { name: 'ATS', value: 70 },
    { name: 'Communication', value: 85 },
    { name: 'Portfolio', value: 60 },
    { name: 'Confidence', value: 90 },
  ]

  return (
    <div className="w-full h-[400px] flex items-center justify-center">
      <ResponsiveContainer width="100%" height="100%">
        <RC data={displayData} cx="50%" cy="50%" outerRadius="70%">
          <PolarGrid stroke="rgba(124, 77, 255, 0.2)" gridType="polygon" />
          <PolarAngleAxis 
            dataKey="name" 
            tick={{ fill: '#9CA3AF', fontSize: 12, fontWeight: 600 }} 
          />
          <PolarRadiusAxis domain={[0, 100]} tick={false} axisLine={false} />
          <Radar
            name="Skills"
            dataKey="value"
            stroke="#00D1FF"
            strokeWidth={3}
            fill="url(#radarGradient)"
            fillOpacity={0.6}
          />
          <defs>
            <linearGradient id="radarGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#00D1FF" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#00D1FF" stopOpacity={0.8}/>
            </linearGradient>
          </defs>
        </RC>
      </ResponsiveContainer>
    </div>
  )
}
