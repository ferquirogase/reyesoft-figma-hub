import { FigmaFileWithThumbnail } from '@/types'

interface Props {
  file: FigmaFileWithThumbnail
}

function formatLastModified(dateString: string | null): string | null {
  if (!dateString) return null
  const date = new Date(dateString)
  const now = new Date()
  const diffDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24))
  if (diffDays === 0) return 'hoy'
  if (diffDays === 1) return 'ayer'
  if (diffDays < 7) return `hace ${diffDays} días`
  if (diffDays < 30) return `hace ${Math.floor(diffDays / 7)} sem.`
  if (diffDays < 365) return `hace ${Math.floor(diffDays / 30)} meses`
  return 'hace más de un año'
}

const PRODUCT_BADGE: Record<string, string> = {
  Saldoar: 'bg-emerald-500/10 text-emerald-400 ring-emerald-500/20',
  Reyesoft: 'bg-neutral-500/10 text-neutral-400 ring-neutral-500/20',
  Fisconexo: 'bg-blue-500/10 text-blue-400 ring-blue-500/20',
  Bookhap: 'bg-amber-500/10 text-amber-400 ring-amber-500/20',
  Multinexo: 'bg-violet-500/10 text-violet-400 ring-violet-500/20',
}

export default function FileCard({ file }: Props) {
  const badgeClass =
    PRODUCT_BADGE[file.product] ?? 'bg-neutral-500/10 text-neutral-400 ring-neutral-500/20'
  const updatedAt = formatLastModified(file.lastModified)

  return (
    <div className="group flex flex-col rounded-xl border border-neutral-800 bg-neutral-900 overflow-hidden hover:border-neutral-700 transition-colors duration-200">
      {/* Thumbnail */}
      <div className="aspect-video bg-neutral-800 relative overflow-hidden shrink-0">
        {file.thumbnailUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={file.thumbnailUrl}
            alt={`Preview de ${file.title}`}
            className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <svg
              width="24" height="24" viewBox="0 0 24 24" fill="none"
              className="text-neutral-600" aria-hidden="true"
            >
              <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="1.5"/>
              <path d="M3 9h18M9 21V9" stroke="currentColor" strokeWidth="1.5"/>
            </svg>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-4 gap-3">
        <div className="flex items-center justify-between gap-2">
          <span
            className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ring-1 ring-inset ${badgeClass}`}
          >
            {file.product}
          </span>
          {updatedAt && (
            <span className="text-xs text-neutral-600 shrink-0">
              {updatedAt}
            </span>
          )}
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-neutral-100 leading-snug mb-1">{file.title}</h3>
          <p className="text-sm text-neutral-400 line-clamp-2 leading-relaxed">{file.description}</p>
        </div>
        <a
          href={file.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 self-start text-sm font-medium text-neutral-200 bg-neutral-800 hover:bg-neutral-700 px-3 py-1.5 rounded-lg transition-colors duration-150"
        >
          Abrir en Figma
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
            <path
              d="M2 10L10 2M10 2H4M10 2V8"
              stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
            />
          </svg>
        </a>
      </div>
    </div>
  )
}
