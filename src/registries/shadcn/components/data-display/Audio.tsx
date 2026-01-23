'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';
import { Music } from 'lucide-react';

export const Audio = ({ element }: ComponentRenderProps) => {
  const {
    src,
    title,
    artist,
    album,
    cover,
    autoPlay = false,
    loop = false,
    controls = true,
    preload = 'metadata',
    variant = 'default',
    style,
  } = element.props;

  if (variant === 'minimal') {
    return (
      <audio
        src={src as string}
        autoPlay={autoPlay as boolean}
        loop={loop as boolean}
        controls={controls as boolean}
        preload={preload as string}
        style={style as React.CSSProperties}
        className="w-full"
      >
        Your browser does not support the audio element.
      </audio>
    );
  }

  return (
    <div
      className={cn(
        'border rounded-lg overflow-hidden',
        variant === 'card' && 'bg-card shadow-sm'
      )}
      style={style as React.CSSProperties}
    >
      <div className="flex items-center gap-4 p-4">
        {cover ? (
          <img
            src={cover as string}
            alt={title as string || 'Album cover'}
            className="w-16 h-16 rounded-md object-cover flex-shrink-0"
          />
        ) : (
          <div className="w-16 h-16 rounded-md bg-muted flex items-center justify-center flex-shrink-0">
            <Music className="h-8 w-8 text-muted-foreground" />
          </div>
        )}
        <div className="flex-1 min-w-0">
          {title && <p className="font-medium truncate">{title as string}</p>}
          {artist && <p className="text-sm text-muted-foreground truncate">{artist as string}</p>}
          {album && <p className="text-xs text-muted-foreground truncate">{album as string}</p>}
        </div>
      </div>
      {controls && (
        <div className="px-4 pb-4">
          <audio
            src={src as string}
            autoPlay={autoPlay as boolean}
            loop={loop as boolean}
            controls
            preload={preload as string}
            className="w-full h-10"
          >
            Your browser does not support the audio element.
          </audio>
        </div>
      )}
    </div>
  );
};
