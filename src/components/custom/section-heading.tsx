interface SectionHeadingProps {
  title: string
  subtitle: string
  lightMode?: boolean
}

export function SectionHeading({ 
  title, 
  subtitle, 
  lightMode = false 
}: SectionHeadingProps) {
  return (
    <div className={`space-y-2 ${lightMode ? 'text-white' : 'text-primary'}`}>
      <span className="font-medium uppercase tracking-widest text-accent">
        {subtitle}
      </span>
      <h2 className="font-serif text-4xl font-bold">{title}</h2>
    </div>
  )
}