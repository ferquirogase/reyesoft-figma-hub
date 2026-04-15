'use client'

interface Props {
  value: string
  onChange: (value: string) => void
  resultCount: number
  totalCount: number
}

export default function SearchBar({ value, onChange, resultCount, totalCount }: Props) {
  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="relative">
        <svg
          className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500 pointer-events-none"
          width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"
        >
          <circle cx="6.5" cy="6.5" r="5" stroke="currentColor" strokeWidth="1.5"/>
          <path d="M10.5 10.5L14 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
        <input
          type="search"
          autoFocus
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Buscar archivo, iniciativa o keyword..."
          className="w-full bg-neutral-900 border border-neutral-800 rounded-xl pl-11 pr-4 py-3.5 text-neutral-100 placeholder:text-neutral-500 focus:outline-none focus:border-neutral-600 transition-colors duration-150 text-base"
        />
      </div>
      {value.trim() && (
        <p className="text-sm text-neutral-500 mt-2.5 text-center">
          {resultCount === 0
            ? 'No se encontraron archivos'
            : `${resultCount} de ${totalCount} archivo${totalCount !== 1 ? 's' : ''}`}
        </p>
      )}
    </div>
  )
}
