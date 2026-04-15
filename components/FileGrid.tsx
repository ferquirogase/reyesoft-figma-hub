'use client'

import { useState, useMemo } from 'react'
import Fuse from 'fuse.js'
import { FigmaFileWithThumbnail } from '@/types'
import FileCard from './FileCard'
import SearchBar from './SearchBar'

interface Props {
  files: FigmaFileWithThumbnail[]
}

export default function FileGrid({ files }: Props) {
  const [query, setQuery] = useState('')

  const filtered = useMemo(() => {
    if (!query.trim()) return files

    const fuse = new Fuse(files, {
      keys: [
        { name: 'title', weight: 2 },
        { name: 'keywords', weight: 2 },
        { name: 'description', weight: 1 },
      ],
      threshold: 0.4,
      includeScore: true,
    })

    return fuse.search(query).map((r) => r.item)
  }, [files, query])

  if (files.length === 0) {
    return (
      <div className="text-center py-24">
        <p className="text-neutral-400 text-lg font-medium">No hay archivos cargados</p>
        <p className="text-neutral-600 text-sm mt-1">
          Agregá entradas en{' '}
          <code className="font-mono text-neutral-500">figma-files.json</code>
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <SearchBar
        value={query}
        onChange={setQuery}
        resultCount={filtered.length}
        totalCount={files.length}
      />
{filtered.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-neutral-400 text-base">No se encontraron archivos</p>
          <p className="text-neutral-600 text-sm mt-1">Probá con otros términos</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((file) => (
            <FileCard key={file.id} file={file} />
          ))}
        </div>
      )}
    </div>
  )
}
