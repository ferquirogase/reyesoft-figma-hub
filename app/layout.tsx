import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import './globals.css'

export const metadata: Metadata = {
  title: 'Reyesoft Figma Hub',
  description: 'Panel de archivos de diseño de Reyesoft para el equipo de desarrollo',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className="dark">
      <body className={`${GeistSans.className} bg-neutral-950 text-neutral-100 min-h-screen antialiased`}>
        {children}
      </body>
    </html>
  )
}
