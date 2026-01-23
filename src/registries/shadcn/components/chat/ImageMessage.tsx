'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';

export const ImageMessage = ({ element, onAction }: ComponentRenderProps) => {
  const {
    src,
    alt,
    caption,
    aspectRatio = 'auto',
    style
  } = element.props;

  const aspectRatios = {
    auto: '',
    square: 'aspect-square',
    video: 'aspect-video',
    portrait: 'aspect-[3/4]',
  };

  return (
    <div
      className={cn('max-w-xs')}
      style={style as React.CSSProperties}
    >
      <button
        onClick={() => onAction?.({ name: 'openImage', payload: { src, alt } })}
        className="block rounded-lg overflow-hidden"
      >
        <img
          src={src as string}
          alt={alt as string || ''}
          className={cn(
            'object-cover w-full hover:opacity-90 transition-opacity',
            aspectRatios[aspectRatio as keyof typeof aspectRatios]
          )}
        />
      </button>
      {caption && (
        <p className="text-sm text-muted-foreground mt-1">{caption as string}</p>
      )}
    </div>
  );
};
