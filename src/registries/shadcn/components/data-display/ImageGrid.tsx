'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';

interface GridImage {
  src: string;
  alt?: string;
  span?: number;
  rowSpan?: number;
}

export const ImageGrid = ({ element }: ComponentRenderProps) => {
  const {
    images,
    columns = 3,
    gap = 'default',
    variant = 'default',
    masonry = false,
    style,
  } = element.props;

  const imagesArray = images as GridImage[];

  const gapStyles = {
    none: 'gap-0',
    sm: 'gap-1',
    default: 'gap-2',
    lg: 'gap-4',
  };

  if (!imagesArray?.length) {
    return (
      <div className="p-8 text-center text-muted-foreground border rounded-lg">
        No images available
      </div>
    );
  }

  if (masonry) {
    // Masonry layout using CSS columns
    return (
      <div
        className={cn(gapStyles[(gap as keyof typeof gapStyles) || 'default'])}
        style={{
          columnCount: columns as number,
          columnGap: gap === 'none' ? 0 : gap === 'sm' ? '0.25rem' : gap === 'lg' ? '1rem' : '0.5rem',
          ...style as React.CSSProperties,
        }}
      >
        {imagesArray.map((image, idx) => (
          <div
            key={idx}
            className={cn(
              'mb-2 overflow-hidden break-inside-avoid',
              variant === 'rounded' && 'rounded-lg',
              variant === 'card' && 'rounded-lg border shadow-sm'
            )}
          >
            <img
              src={image.src}
              alt={image.alt || `Image ${idx + 1}`}
              className="w-full h-auto object-cover"
            />
          </div>
        ))}
      </div>
    );
  }

  // Regular grid layout
  return (
    <div
      className={cn(
        'grid',
        gapStyles[(gap as keyof typeof gapStyles) || 'default']
      )}
      style={{
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
        ...style as React.CSSProperties,
      }}
    >
      {imagesArray.map((image, idx) => (
        <div
          key={idx}
          className={cn(
            'overflow-hidden',
            variant === 'rounded' && 'rounded-lg',
            variant === 'card' && 'rounded-lg border shadow-sm'
          )}
          style={{
            gridColumn: image.span ? `span ${image.span}` : undefined,
            gridRow: image.rowSpan ? `span ${image.rowSpan}` : undefined,
          }}
        >
          <img
            src={image.src}
            alt={image.alt || `Image ${idx + 1}`}
            className="w-full h-full object-cover"
          />
        </div>
      ))}
    </div>
  );
};
