export default function Footer() {
  return (
    <footer className="relative z-10 py-20 px-6 border-t border-white/5 bg-black/20">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col md:flex-row justify-between items-center gap-12">
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-3 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <span className="text-sm">📡</span>
              </div>
              <span className="text-lg font-black tracking-tighter text-white uppercase font-space">
                Radar<span className="text-accent">AI</span>
              </span>
            </div>
            <p className="text-sm text-gray-500 max-w-xs leading-relaxed">
              The world's most advanced AI resume scanning engine for elite career intelligence.
            </p>
          </div>

          <div className="flex gap-12">
            <div className="flex flex-col gap-4">
              <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em]">Platform</h4>
              <ul className="text-sm text-gray-500 space-y-2">
                <li><a href="#" className="hover:text-white transition-colors">Analyzer</a></li>
                <li><a href="#" className="hover:text-white transition-colors">ATS Check</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
              </ul>
            </div>
            <div className="flex flex-col gap-4">
              <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em]">Social</h4>
              <ul className="text-sm text-gray-500 space-y-2">
                <li><a href="#" className="hover:text-white transition-colors">Twitter</a></li>
                <li><a href="#" className="hover:text-white transition-colors">GitHub</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Discord</a></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-20 pt-8 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4 text-[10px] font-bold text-gray-600 uppercase tracking-[0.2em]">
          <span>© 2026 Interview Radar AI. All rights reserved.</span>
          <div className="flex gap-6">
            <a href="#" className="hover:text-gray-400 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-gray-400 transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
