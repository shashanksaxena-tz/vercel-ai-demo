'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';

export const TypingIndicator = ({ element }: ComponentRenderProps) => {
  const {
    users,
    showNames = true,
    variant = 'dots',
    style
  } = element.props;

  const userList = users as string[];
  const displayNames = () => {
    if (!userList || userList.length === 0) return '';
    if (userList.length === 1) return `${userList[0]} is typing`;
    if (userList.length === 2) return `${userList[0]} and ${userList[1]} are typing`;
    return `${userList[0]} and ${userList.length - 1} others are typing`;
  };

  return (
    <div
      className={cn(
        'flex items-center gap-2'
      )}
      style={style as React.CSSProperties}
    >
      {variant === 'dots' && (
        <div className="flex items-center gap-1 px-3 py-2 bg-muted rounded-full">
          <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
          <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
          <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
        </div>
      )}
      {variant === 'pulse' && (
        <div className="w-4 h-4 bg-muted-foreground/50 rounded-full animate-pulse" />
      )}
      {showNames && userList && userList.length > 0 && (
        <span className="text-xs text-muted-foreground">{displayNames()}</span>
      )}
    </div>
  );
};
