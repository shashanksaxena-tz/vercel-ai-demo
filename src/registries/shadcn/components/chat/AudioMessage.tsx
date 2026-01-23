'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';

export const AudioMessage = ({ element }: ComponentRenderProps) => {
  const {
    src,
    duration,
    style
  } = element.props;

  return (
    <div
      className={cn(
        'flex items-center gap-3 p-3 bg-muted rounded-lg max-w-xs'
      )}
      style={style as React.CSSProperties}
    >
      <audio src={src as string} controls className="w-full h-8" />
      {duration && (
        <span className="text-xs text-muted-foreground whitespace-nowrap">{duration as string}</span>
      )}
    </div>
  );
};
