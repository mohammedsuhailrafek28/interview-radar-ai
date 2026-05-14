export default function Roadmap({items}:{items:string[]}){
  return (
    <div className="mt-4 grid gap-3">
      {items.map((t,i)=> (
        <div key={i} className="glass p-3">{t}</div>
      ))}
    </div>
  )
}
