import UploadCard from '../../components/UploadCard'

export default function UploadPage(){
  return (
    <div className="container mx-auto py-20 px-6">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8 fade-up">
          <h2 className="text-4xl font-bold text-gradient mb-2">Resume Scan</h2>
          <p className="text-gray-400">Upload your resume and let AI analyze your interview readiness</p>
        </div>
        
        <div className="glass p-8 rounded-2xl card-hover">
          <UploadCard />
        </div>
      </div>
    </div>
  )
}
