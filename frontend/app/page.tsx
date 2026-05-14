import Link from 'next/link'
import Hero from '../../components/Hero'

export default function Home(){
  return (
    <div className="container mx-auto py-24 px-6">
      <Hero />
      <div className="mt-12 flex gap-6">
        <Link href="/upload" className="glass p-6 card-hover">Start a Scan</Link>
        <Link href="/results" className="glass p-6 card-hover">View Example Results</Link>
      </div>
    </div>
  )
}
