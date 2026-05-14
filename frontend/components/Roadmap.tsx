import { motion } from 'framer-motion'

export default function Roadmap({steps}:{steps:string[]}){
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {steps.map((step, i) => (
        <motion.div 
          key={i}
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.1 }}
          className="relative p-6 rounded-2xl bg-white/5 border border-white/10 group hover:border-primary/50 transition-all"
        >
          <div className="absolute -top-3 -left-3 w-8 h-8 rounded-full bg-gradient-to-r from-primary to-accent flex items-center justify-center text-xs font-bold text-white shadow-lg shadow-primary/30">
            {i + 1}
          </div>
          <div className="flex items-start gap-4">
            <div className="mt-1 text-success text-xl">✓</div>
            <p className="text-gray-300 font-medium leading-relaxed group-hover:text-white transition-colors">{step}</p>
          </div>
        </motion.div>
      ))}
    </div>
  )
}
