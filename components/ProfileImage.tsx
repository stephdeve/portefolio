'use client';

const FALLBACK_IMG =
  'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTkyIiBoZWlnaHQ9IjE5MiIgdmlld0JveD0iMCAwIDE5MiAxOTIiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxOTIiIGhlaWdodD0iMTkyIiBmaWxsPSJ1cmwoI2dyYWRpZW50MCkiLz4KPHBhdGggZD0iTTE2IDdhNCA0IDAgMTEtOCAwIDQgNCAwIDAxOCAwWk0xMiAxNGE3IDcgMCAwMC03IDdoMTRhNyA3IDAgMDAtNy03eiIgZmlsbD0iIzYzNjZGMSIgZmlsbC1vcGFjaXR5PSIwLjUiLz4KPHRleHQgeD0iOTYiIHk9IjEwMCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0iIzYzNjZGMSIgZmlsbC1vcGFjaXR5PSIwLjciIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCI+UGhvdG88L3RleHQ+Cjwvc3ZnPgo=';

/**
 * <img> with a graceful fallback when the source fails to load.
 * Optionally falls back to `fallbackSrc` first (e.g. a *_thumb.jpg variant),
 * then to an inline placeholder, mirroring the PHP onerror behaviour.
 */
export function FallbackImage({
  src,
  alt,
  className,
  fallbackSrc,
}: {
  src: string;
  alt: string;
  className?: string;
  fallbackSrc?: string;
}) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      className={className}
      src={src}
      alt={alt}
      onError={(e) => {
        const img = e.currentTarget;
        if (fallbackSrc && img.src.indexOf(fallbackSrc) === -1 && !img.dataset.triedFallback) {
          img.dataset.triedFallback = '1';
          img.src = fallbackSrc;
          return;
        }
        img.onerror = null;
        img.src = FALLBACK_IMG;
      }}
    />
  );
}
