'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';

export const VideoMessage = ({ element }: ComponentRenderProps) => {
  const {
    src,
    poster,
    duration,
    autoplay = false,
    controls = true,
    style
  } = element.props;

  return (
    <div
      className={cn('max-w-sm relative rounded-lg overflow-hidden')}
      style={style as React.CSSProperties}
    >
      <video
        src={src as string}
        poster={poster as string}
        autoPlay={autoplay as boolean}
        controls={controls as boolean}
        className="w-full"
      />
      {duration && !controls && (
        <div className="absolute bottom-2 right-2 px-2 py-1 bg-black/70 text-white text-xs rounded">
          {duration as string}
        </div>
      )}
    </div>
  );
};
