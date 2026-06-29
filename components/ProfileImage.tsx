'use client';

import { useState } from 'react';
import Image from 'next/image';

const FALLBACK_IMG =
  'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTkyIiBoZWlnaHQ9IjE5MiIgdmlld0JveD0iMCAwIDE5MiAxOTIiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxOTIiIGhlaWdodD0iMTkyIiBmaWxsPSJ1cmwoI2dyYWRpZW50MCkiLz4KPHBhdGggZD0iTTE2IDdhNCA0IDAgMTEtOCAwIDQgNCAwIDAxOCAwWk0xMiAxNGE3IDcgMCAwMC03IDdoMTRhNyA3IDAgMDAtNy03eiIgZmlsbD0iIzYzNjZGMSIgZmlsbC1vcGFjaXR5PSIwLjUiLz4KPHRleHQgeD0iOTYiIHk9IjEwMCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0iIzYzNjZGMSIgZmlsbC1vcGFjaXR5PSIwLjciIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCI+UGhvdG88L3RleHQ+Cjwvc3ZnPgo=';

export function FallbackImage({
  src,
  alt,
  className,
  fallbackSrc,
  width = 400,
  height = 400,
}: {
  src: string;
  alt: string;
  className?: string;
  fallbackSrc?: string;
  width?: number;
  height?: number;
}) {
  const [imgSrc, setImgSrc] = useState(src);
  const [triedFallback, setTriedFallback] = useState(false);

  return (
    <Image
      className={className}
      src={imgSrc}
      alt={alt}
      width={width}
      height={height}
      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
      onError={() => {
        if (fallbackSrc && !triedFallback) {
          setTriedFallback(true);
          setImgSrc(fallbackSrc);
        } else {
          setImgSrc(FALLBACK_IMG);
        }
      }}
    />
  );
}
