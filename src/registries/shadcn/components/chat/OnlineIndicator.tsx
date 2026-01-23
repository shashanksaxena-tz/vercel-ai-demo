'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';

export const OnlineIndicator = ({ element }: ComponentRenderProps) => {
  const {
    isOnline = false,
    showLabel = false,
    lastSeen,
    size = 'md',
    style
  } = element.props;

  const sizes = {
    sm: 'w-2 h-2',
    md: 'w-2.5 h-2.5',
    lg: 'w-3 h-3',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5'
      )}
      style={style as React.CSSProperties}
    >
      <span
        className={cn(
          'rounded-full',
          sizes[size as keyof typeof sizes] || sizes.md,
          isOnline ? 'bg-green-500' : 'bg-gray-400'
        )}
      />
      {showLabel && (
        <span className="text-xs text-muted-foreground">
          {isOnline ? 'Online' : lastSeen ? `Last seen ${lastSeen}` : 'Offline'}
        </span>
      )}
    </span>
  );
};
