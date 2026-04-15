export type Product = 'Saldoar' | 'Reyesoft' | 'Fisconexo' | 'Bookhap' | 'Multinexo'

export interface FigmaFileConfig {
  id: string
  title: string
  url: string
  fileKey: string
  description: string
  product: Product
  keywords: string[]
}

export interface FigmaFileWithThumbnail extends FigmaFileConfig {
  thumbnailUrl: string | null
  lastModified: string | null
}
