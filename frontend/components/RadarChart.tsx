import {Radar, RadarChart as RC, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer} from 'recharts'

export default function RadarChart({values}:{values:{name:string;value:number}[]}){
  return (
    <div style={{width:'100%', height:360}}>
      <ResponsiveContainer>
        <RC data={values}>
          <PolarGrid stroke="rgba(255,255,255,0.06)" />
          <PolarAngleAxis dataKey="name" stroke="#9CA3AF" />
          <PolarRadiusAxis angle={30} domain={[0,100]} tick={false} />
          <Radar name="score" dataKey="value" stroke="#7C4DFF" fill="#7C4DFF" fillOpacity={0.35} />
        </RC>
      </ResponsiveContainer>
    </div>
  )
}
