'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';

export const MessageGroup = ({ element, children }: ComponentRenderProps) => {
  const {
    sender,
    avatar,
    timestamp,
    isOwn = false,
    style
  } = element.props;

  return (
    <div
      className={cn(
        'flex gap-3',
        isOwn && 'flex-row-reverse'
      )}
      style={style as React.CSSProperties}
    >
      {avatar && (
        <img src={avatar as string} alt={sender as string || ''} className="w-8 h-8 rounded-full flex-shrink-0 self-end" />
      )}
      <div className={cn('flex flex-col gap-1', isOwn && 'items-end')}>
        {sender && (
          <span className="text-xs font-medium text-muted-foreground">{sender as string}</span>
        )}
        <div className="space-y-1">{children}</div>
        {timestamp && (
          <span className="text-xs text-muted-foreground">{timestamp as string}</span>
        )}
      </div>
    </div>
  );
};
