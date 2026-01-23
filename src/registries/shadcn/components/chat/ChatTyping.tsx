'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';

export const ChatTyping = ({ element }: ComponentRenderProps) => {
  const {
    name,
    style
  } = element.props;

  return (
    <div
      className={cn(
        'flex items-center gap-2 text-sm text-muted-foreground'
      )}
      style={style as React.CSSProperties}
    >
      <div className="flex gap-1">
        <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
        <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
        <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
      </div>
      {name && <span>{name as string} is typing...</span>}
    </div>
  );
};
