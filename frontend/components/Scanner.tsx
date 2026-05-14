export default function Scanner(){
  return (
    <div className="glass p-6 flex items-center gap-4">
      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent pulse"></div>
      <div>
        <div className="h-3 bg-white/6 rounded w-48 mb-2"></div>
        <div className="text-xs text-gray-400">Parsing resume, running simulations...</div>
      </div>
    </div>
  )
}
