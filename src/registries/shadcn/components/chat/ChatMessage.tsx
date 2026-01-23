'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';

export const ChatMessage = ({ element, children }: ComponentRenderProps) => {
  const {
    position = 'left',
    avatar,
    name,
    timestamp,
    status,
    style
  } = element.props;

  const isRight = position === 'right';

  return (
    <div
      className={cn(
        'flex gap-3',
        isRight && 'flex-row-reverse'
      )}
      style={style as React.CSSProperties}
    >
      {avatar && (
        <img src={avatar as string} alt={name as string || ''} className="w-8 h-8 rounded-full flex-shrink-0" />
      )}
      <div className={cn('flex flex-col gap-1', isRight && 'items-end')}>
        {name && (
          <span className="text-xs font-medium text-muted-foreground">{name as string}</span>
        )}
        {children}
        <div className={cn('flex items-center gap-2', isRight && 'flex-row-reverse')}>
          {timestamp && (
            <span className="text-xs text-muted-foreground">{timestamp as string}</span>
          )}
          {status && (
            <span className="text-xs text-muted-foreground">{status as string}</span>
          )}
        </div>
      </div>
    </div>
  );
};
