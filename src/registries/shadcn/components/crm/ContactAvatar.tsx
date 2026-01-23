'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';

export const ContactAvatar = ({ element }: ComponentRenderProps) => {
  const {
    src,
    name,
    size = 'md',
    status,
    showInitials = true,
    style
  } = element.props;

  const sizes = {
    xs: 'w-6 h-6 text-xs',
    sm: 'w-8 h-8 text-sm',
    md: 'w-10 h-10 text-base',
    lg: 'w-14 h-14 text-lg',
    xl: 'w-20 h-20 text-xl',
  };

  const statusSizes = {
    xs: 'w-1.5 h-1.5',
    sm: 'w-2 h-2',
    md: 'w-2.5 h-2.5',
    lg: 'w-3 h-3',
    xl: 'w-4 h-4',
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
      ) : showInitials ? (
        <div
          className={cn(
            'rounded-full bg-primary/10 text-primary flex items-center justify-center font-medium',
            sizes[size as keyof typeof sizes] || sizes.md
          )}
        >
          {initials}
        </div>
      ) : (
        <div
          className={cn(
            'rounded-full bg-muted flex items-center justify-center',
            sizes[size as keyof typeof sizes] || sizes.md
          )}
        >
          <svg className="w-1/2 h-1/2 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        </div>
      )}
      {status && (
        <span
          className={cn(
            'absolute bottom-0 right-0 rounded-full border-2 border-background',
            statusSizes[size as keyof typeof statusSizes] || statusSizes.md,
            statusColors[status as keyof typeof statusColors] || statusColors.offline
          )}
        />
      )}
    </div>
  );
};
