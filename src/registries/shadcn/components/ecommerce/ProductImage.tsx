'use client';

import React, { useState } from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';
import { ZoomIn, ImageOff } from 'lucide-react';

export const ProductImage = ({ element, onAction }: ComponentRenderProps) => {
  const {
    src,
    alt,
    aspectRatio = 'square',
    objectFit = 'cover',
    showZoom = false,
    badge,
    fallback,
    style,
  } = element.props;

  const [hasError, setHasError] = useState(false);

  const aspectRatios = {
    square: 'aspect-square',
    portrait: 'aspect-[3/4]',
    landscape: 'aspect-[4/3]',
    wide: 'aspect-video',
  };

  const objectFits = {
    cover: 'object-cover',
    contain: 'object-contain',
    fill: 'object-fill',
  };

  const handleZoom = () => {
    if (onAction) {
      onAction({ name: 'zoomImage', payload: { src, alt } } as never);
    }
  };

  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-lg bg-muted group',
        aspectRatios[aspectRatio as keyof typeof aspectRatios] || aspectRatios.square
      )}
      style={style as React.CSSProperties}
    >
      {!hasError && src ? (
        <img
          src={src as string}
          alt={alt as string || 'Product image'}
          className={cn(
            'h-full w-full transition-transform group-hover:scale-105',
            objectFits[objectFit as keyof typeof objectFits] || objectFits.cover
          )}
          onError={() => setHasError(true)}
        />
      ) : (
        <div className="h-full w-full flex items-center justify-center">
          {fallback ? (
            <img
              src={fallback as string}
              alt={alt as string || 'Product image'}
              className={cn(
                'h-full w-full',
                objectFits[objectFit as keyof typeof objectFits] || objectFits.cover
              )}
            />
          ) : (
            <ImageOff className="h-12 w-12 text-muted-foreground" />
          )}
        </div>
      )}
      {badge && (
        <span className="absolute top-2 left-2 px-2 py-1 text-xs font-semibold rounded bg-primary text-primary-foreground">
          {badge as string}
        </span>
      )}
      {showZoom && !hasError && src && (
        <button
          onClick={handleZoom}
          className="absolute bottom-2 right-2 p-2 rounded-full bg-background/80 hover:bg-background transition-colors opacity-0 group-hover:opacity-100"
        >
          <ZoomIn className="h-4 w-4" />
        </button>
      )}
    </div>
  );
};
