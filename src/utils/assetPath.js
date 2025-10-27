/**
 * Asset Path Utility
 * Handles asset path generation for both development and production environments
 */

/**
 * Get the correct asset path based on the current environment
 * @param {string} path - The asset path relative to the public directory
 * @returns {string} The properly formatted asset path
 */
export function getAssetPath(path) {
  // Remove leading slash if present
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  
  // In development mode (Vite dev server), use the path as-is from root
  if (import.meta.env.DEV) {
    return `/${cleanPath}`;
  }
  
  // In production, assets are served from the base path
  // The base path is already included by Vite in production builds
  return `/${cleanPath}`;
}

/**
 * Get the correct asset URL for sharing and external use
 * @param {string} path - The asset path relative to the public directory
 * @returns {string} The full URL for the asset
 */
export function getAssetUrl(path) {
  const basePath = getAssetPath(path);
  return `${window.location.origin}${basePath}`;
}