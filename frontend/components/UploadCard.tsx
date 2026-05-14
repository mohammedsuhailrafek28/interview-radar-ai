"use client"
import {useState} from 'react'
import {useRouter} from 'next/navigation'

export default function UploadCard(){
  const router = useRouter()
  const [fileName,setFileName] = useState<string>('')
  const [role,setRole] = useState<string>('')
  const [github,setGithub] = useState<string>('')
  const [portfolio,setPortfolio] = useState<string>('')

  function handleFile(e: any){
    const f = e.target.files && e.target.files[0]
    if(f) setFileName(f.name)
  }

  function handleSubmit(){
    const payload = { role, github, portfolio, filename: fileName }
    try{ sessionStorage.setItem('ir_upload', JSON.stringify(payload)) }catch(e){}
    router.push('/analyze')
  }

  return (
    <div className="space-y-4 mt-6">
      <label className="block">
        <input onChange={handleFile} type="file" className="block w-full text-sm text-gray-200" />
        {fileName && <div className="text-xs text-gray-400 mt-2">Selected: {fileName}</div>}
      </label>

      <label className="block">
        <span className="text-sm text-gray-300">Target Role</span>
        <input value={role} onChange={e=>setRole(e.target.value)} className="mt-1 block w-full p-3 rounded bg-transparent border border-gray-700" placeholder="e.g. Product ML Engineer" />
      </label>

      <label className="block">
        <span className="text-sm text-gray-300">GitHub URL</span>
        <input value={github} onChange={e=>setGithub(e.target.value)} className="mt-1 block w-full p-3 rounded bg-transparent border border-gray-700" placeholder="https://github.com/username" />
      </label>

      <label className="block">
        <span className="text-sm text-gray-300">Portfolio URL</span>
        <input value={portfolio} onChange={e=>setPortfolio(e.target.value)} className="mt-1 block w-full p-3 rounded bg-transparent border border-gray-700" placeholder="https://..." />
      </label>

      <button onClick={handleSubmit} className="px-4 py-2 rounded bg-gradient-to-r from-primary to-accent">Upload & Analyze</button>
    </div>
  )
}
