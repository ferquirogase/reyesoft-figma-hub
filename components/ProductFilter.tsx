'use client'

interface Props {
  selected: string | null
  onChange: (product: string | null) => void
  availableProducts: string[]
}

export default function ProductFilter({ selected, onChange, availableProducts }: Props) {
  if (availableProducts.length === 0) return null

  return (
    <div className="flex flex-wrap gap-2 justify-center">
      <button
        onClick={() => onChange(null)}
        className={`px-3.5 py-1.5 rounded-full text-sm font-medium transition-colors duration-150 ${
          selected === null
            ? 'bg-neutral-100 text-neutral-900'
            : 'bg-neutral-800 text-neutral-400 hover:bg-neutral-700 hover:text-neutral-200'
        }`}
      >
        Todos
      </button>
      {availableProducts.map((product) => (
        <button
          key={product}
          onClick={() => onChange(selected === product ? null : product)}
          className={`px-3.5 py-1.5 rounded-full text-sm font-medium transition-colors duration-150 ${
            selected === product
              ? 'bg-neutral-100 text-neutral-900'
              : 'bg-neutral-800 text-neutral-400 hover:bg-neutral-700 hover:text-neutral-200'
          }`}
        >
          {product}
        </button>
      ))}
    </div>
  )
}
