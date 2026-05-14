export default function FeedbackCard({verdict, bullets}:{verdict:string; bullets:string[]}){
  return (
    <div className="mt-4">
      <p className="text-gray-200">"{verdict}"</p>
      <ul className="mt-4 list-disc list-inside text-sm text-gray-300">
        {bullets.map((b,i)=> <li key={i}>{b}</li>)}
      </ul>
    </div>
  )
}
