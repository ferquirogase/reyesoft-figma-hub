export async function fetchFileThumbnail(
  fileKey: string
): Promise<{ thumbnailUrl: string | null; lastModified: string | null }> {
  const token = process.env.FIGMA_TOKEN
  if (!token) {
    console.warn(`[figma] FIGMA_TOKEN not set — thumbnail for "${fileKey}" will be null`)
    return { thumbnailUrl: null, lastModified: null }
  }

  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), 15000)

  try {
    const res = await fetch(`https://api.figma.com/v1/files/${fileKey}?depth=1`, {
      headers: { 'X-Figma-Token': token },
      cache: 'force-cache',
      signal: controller.signal,
    })
    if (!res.ok) {
      console.warn(`[figma] API error ${res.status} for fileKey "${fileKey}"`)
      return { thumbnailUrl: null, lastModified: null }
    }
    const data = await res.json()
    const rawUrl = (data.thumbnailUrl as string) ?? (data.thumbnail_url as string) ?? null
    const thumbnailUrl = rawUrl && rawUrl.trim() ? rawUrl : null
    const lastModified = (data.lastModified as string) ?? null
    return { thumbnailUrl, lastModified }
  } catch (err) {
    console.warn(`[figma] fetch failed for "${fileKey}":`, err instanceof Error ? err.message : err)
    return { thumbnailUrl: null, lastModified: null }
  } finally {
    clearTimeout(timeoutId)
  }
}
