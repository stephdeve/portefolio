/**
 * Resolves an image reference to a usable src.
 * - Absolute URLs (Vercel Blob, https://…) are returned as-is.
 * - Relative paths (legacy local uploads) are prefixed with "/".
 */
export function assetUrl(path: string | null | undefined): string {
  if (!path) return '';
  if (/^https?:\/\//i.test(path)) return path;
  return `/${path.replace(/^\/+/, '')}`;
}
