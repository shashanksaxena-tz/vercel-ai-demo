'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';

export const ReadReceipt = ({ element }: ComponentRenderProps) => {
  const {
    readers,
    time,
    showAvatars = true,
    maxAvatars = 3,
    style
  } = element.props;

  const readerList = readers as Array<{ name: string; avatar?: string }>;

  return (
    <div
      className={cn(
        'flex items-center gap-1 text-xs text-muted-foreground'
      )}
      style={style as React.CSSProperties}
    >
      {showAvatars && readerList && (
        <div className="flex -space-x-1">
          {readerList.slice(0, maxAvatars as number).map((reader, i) => (
            <img
              key={i}
              src={reader.avatar}
              alt={reader.name}
              className="w-4 h-4 rounded-full border border-background"
            />
          ))}
          {readerList.length > (maxAvatars as number) && (
            <span className="w-4 h-4 rounded-full bg-muted text-[10px] flex items-center justify-center">
              +{readerList.length - (maxAvatars as number)}
            </span>
          )}
        </div>
      )}
      <span>Read</span>
      {time && <span>at {time as string}</span>}
    </div>
  );
};
