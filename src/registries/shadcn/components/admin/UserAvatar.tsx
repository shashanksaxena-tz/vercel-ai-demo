'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';

export const UserAvatar = ({ element }: ComponentRenderProps) => {
  const {
    src,
    name,
    size = 'md',
    status,
    showBadge = false,
    badgeCount,
    style
  } = element.props;

  const sizes = {
    xs: 'w-6 h-6 text-xs',
    sm: 'w-8 h-8 text-sm',
    md: 'w-10 h-10 text-base',
    lg: 'w-12 h-12 text-lg',
    xl: 'w-16 h-16 text-xl',
  };

  const statusColors = {
    online: 'bg-green-500',
    offline: 'bg-gray-400',
    busy: 'bg-red-500',
    away: 'bg-yellow-500',
  };

  const initials = (name as string)?.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase() || '?';

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
            'rounded-full bg-primary/10 text-primary flex items-center justify-center font-medium',
            sizes[size as keyof typeof sizes] || sizes.md
          )}
        >
          {initials}
        </div>
      )}
      {status && (
        <span
          className={cn(
            'absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-background',
            statusColors[status as keyof typeof statusColors] || statusColors.offline
          )}
        />
      )}
      {showBadge && badgeCount !== undefined && (badgeCount as number) > 0 && (
        <span className="absolute -top-1 -right-1 w-5 h-5 bg-destructive text-destructive-foreground text-xs rounded-full flex items-center justify-center">
          {(badgeCount as number) > 9 ? '9+' : badgeCount as React.ReactNode}
        </span>
      )}
    </div>
  );
};
