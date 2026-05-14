export default function FeedbackCard({verdict, bullets}:{verdict:string; bullets:string[]}){
  return (
    <div className="space-y-4">
      {verdict && <p className="text-gray-400 italic text-sm mb-6 border-l-2 border-primary/30 pl-4">"{verdict}"</p>}
      <div className="space-y-3">
        {bullets.map((b,i)=> (
          <div key={i} className="flex items-start gap-3 p-4 bg-white/5 rounded-xl border border-white/5 group hover:border-danger/30 transition-colors">
            <span className="text-danger font-bold">⚠</span>
            <p className="text-sm text-gray-300 leading-relaxed group-hover:text-white transition-colors">{b}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
