import {useEffect, useState} from 'react'
import {motion} from 'framer-motion'

export default function ScoreRing({score}:{score:number}){
  const [val,setVal] = useState(0)
  useEffect(()=>{
    let i=0;
    const t = setInterval(()=>{
      i+=1
      setVal(prev=> Math.min(score, prev+Math.ceil(score/20)))
      if(i>40) clearInterval(t)
    },40)
    return ()=> clearInterval(t)
  },[score])

  return (
    <div className="flex items-center gap-4">
      <div className="w-40 h-40 rounded-full flex items-center justify-center bg-gradient-to-br from-primary to-accent">
        <motion.div initial={{scale:0.9}} animate={{scale:1}} className="w-32 h-32 rounded-full bg-black/40 flex items-center justify-center">
          <div className="text-3xl font-bold">{val}</div>
        </motion.div>
      </div>
      <div>
        <div className="text-sm text-gray-300">INTERVIEW READY</div>
      </div>
    </div>
  )
}
