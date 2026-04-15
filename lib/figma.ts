export async function fetchFileThumbnail(fileKey: string): Promise<string | null> {
  const token = process.env.FIGMA_TOKEN
  if (!token) {
    console.warn(`[figma] FIGMA_TOKEN not set — thumbnail for "${fileKey}" will be null`)
    return null
  }

  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), 5000)

  try {
    const res = await fetch(`https://api.figma.com/v1/files/${fileKey}`, {
      headers: { 'X-Figma-Token': token },
      cache: 'force-cache',
      signal: controller.signal,
    })
    if (!res.ok) {
      console.warn(`[figma] API error ${res.status} for fileKey "${fileKey}"`)
      return null
    }
    const data = await res.json()
    const url = (data.thumbnailUrl as string) ?? (data.thumbnail_url as string) ?? null
    return url && url.trim() ? url : null
  } catch (err) {
    console.warn(`[figma] fetch failed for "${fileKey}":`, err instanceof Error ? err.message : err)
    return null
  } finally {
    clearTimeout(timeoutId)
  }
}
