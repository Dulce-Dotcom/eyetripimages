/**
 * Get the correct asset path with basePath prefix for static exports
 */
export function getAssetPath(path: string): string {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || ''
  
  // If path already starts with basePath, return as is
  if (basePath && path.startsWith(basePath)) {
    return path
  }
  
  // If path starts with /, add basePath
  if (path.startsWith('/')) {
    return `${basePath}${path}`
  }
  
  // Otherwise add basePath and /
  return `${basePath}/${path}`
}

/**
 * Get the correct video path
 */
export function getVideoPath(filename: string): string {
  return getAssetPath(`/video/${filename}`)
}

/**
 * Get the correct image path from public/images
 */
export function getImagePath(filename: string): string {
  return getAssetPath(`/images/${filename}`)
}
