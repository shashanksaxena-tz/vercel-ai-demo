'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';

export const ChatAvatar = ({ element }: ComponentRenderProps) => {
  const {
    src,
    name,
    size = 'md',
    status,
    style
  } = element.props;

  const sizes = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-10 h-10',
    xl: 'w-12 h-12',
  };

  const statusColors = {
    online: 'bg-green-500',
    offline: 'bg-gray-400',
    busy: 'bg-red-500',
    away: 'bg-yellow-500',
  };

  const statusSizes = {
    sm: 'w-2 h-2',
    md: 'w-2.5 h-2.5',
    lg: 'w-3 h-3',
    xl: 'w-3.5 h-3.5',
  };

  const fallback = (name as string)?.charAt(0).toUpperCase() || '?';

  return (
    <div className="relative inline-block" style={style as React.CSSProperties}>
      {src ? (
        <img
          src={src as string}
          alt={name as string || ''}
          className={cn(
            'rounded-full object-cover',
            sizes[size as keyof typeof sizes] || sizes.md
          )}
        />
      ) : (
        <div
          className={cn(
            'rounded-full bg-muted flex items-center justify-center text-muted-foreground font-medium',
            sizes[size as keyof typeof sizes] || sizes.md
          )}
        >
          <span className="text-xs">{fallback}</span>
        </div>
      )}
      {status && (
        <span
          className={cn(
            'absolute bottom-0 right-0 rounded-full border-2 border-background',
            statusColors[status as keyof typeof statusColors] || statusColors.offline,
            statusSizes[size as keyof typeof statusSizes] || statusSizes.md
          )}
        />
      )}
    </div>
  );
};
