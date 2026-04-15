import { fetchFileThumbnail } from '@/lib/figma'
import { FigmaFileConfig, FigmaFileWithThumbnail } from '@/types'
import FileGrid from '@/components/FileGrid'
import filesConfig from '../figma-files.json'

// Force static generation — this page has no dynamic dependencies
export const dynamic = 'force-static'

export default async function Home() {
  const files: FigmaFileWithThumbnail[] = await Promise.all(
    (filesConfig as FigmaFileConfig[]).map(async (file) => ({
      ...file,
      thumbnailUrl: await fetchFileThumbnail(file.fileKey),
    }))
  )

  return (
    <main className="min-h-screen">
      {/* Header */}
      <header className="border-b border-neutral-800 px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center gap-3">
          <div className="w-7 h-7 rounded-lg bg-neutral-800 flex items-center justify-center shrink-0">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <rect x="1" y="1" width="5" height="5" rx="1" fill="currentColor" className="text-neutral-400"/>
              <rect x="8" y="1" width="5" height="5" rx="1" fill="currentColor" className="text-neutral-400"/>
              <rect x="1" y="8" width="5" height="5" rx="1" fill="currentColor" className="text-neutral-400"/>
              <rect x="8" y="8" width="5" height="5" rx="1" fill="currentColor" className="text-neutral-400"/>
            </svg>
          </div>
          <span className="font-semibold text-neutral-100 text-sm tracking-tight">
            Reyesoft Figma Hub
          </span>
        </div>
      </header>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-6 py-12 space-y-10">
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-bold text-neutral-100 tracking-tight">
            Archivos de diseño
          </h1>
          <p className="text-neutral-400 text-sm">
            Buscá por iniciativa, sección o keyword para encontrar el archivo de Figma que necesitás
          </p>
        </div>
        <FileGrid files={files} />
      </div>
    </main>
  )
}
