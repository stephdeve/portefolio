/**
 * Resolves an image reference to a usable src.
 * - Absolute URLs (Vercel Blob, https://…) are returned as-is.
 * - Blob pathnames (uploads/…) are proxied via the API route.
 * - Relative paths are prefixed with "/".
 */
export function assetUrl(path: string | null | undefined): string {
  if (!path) return '';
  if (/^https?:\/\//i.test(path)) return path;
  if (path.startsWith('uploads/')) {
    return `/api/blob?pathname=${encodeURIComponent(path)}`;
  }
  return `/${path.replace(/^\/+/, '')}`;
}
