
type Props = { 
  title: string
  subtitle?: string
}

export default function Header({ title, subtitle }: Props) {
  return (
    <div className="header">
      <div>
        <h1>{title}</h1>
      </div>
    </div>
  )
}