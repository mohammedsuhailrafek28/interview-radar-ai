import UploadCard from '../../../components/UploadCard'

export default function UploadPage(){
  return (
    <div className="container mx-auto py-24 px-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="glass p-8">
          <h2 className="text-2xl font-semibold">Upload Resume</h2>
          <UploadCard />
        </div>
        <div className="glass p-8">
          <h3 className="text-lg font-medium mb-4">Quick Inputs</h3>
          <div className="space-y-4">
            <label className="block">
              <span className="text-sm text-gray-300">Target Role</span>
              <input className="mt-1 block w-full p-3 rounded bg-transparent border border-gray-700" placeholder="e.g. Product ML Engineer" />
            </label>
            <label className="block">
              <span className="text-sm text-gray-300">GitHub URL</span>
              <input className="mt-1 block w-full p-3 rounded bg-transparent border border-gray-700" placeholder="https://github.com/username" />
            </label>
            <label className="block">
              <span className="text-sm text-gray-300">Portfolio URL</span>
              <input className="mt-1 block w-full p-3 rounded bg-transparent border border-gray-700" placeholder="https://..." />
            </label>
          </div>
        </div>
      </div>
    </div>
  )
}
