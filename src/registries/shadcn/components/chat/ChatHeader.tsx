'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';

export const ChatHeader = ({ element, children, onAction }: ComponentRenderProps) => {
  const {
    title,
    subtitle,
    avatar,
    status,
    showClose = false,
    showMinimize = false,
    style
  } = element.props;

  const statusColors = {
    online: 'bg-green-500',
    offline: 'bg-gray-400',
    busy: 'bg-red-500',
    away: 'bg-yellow-500',
  };

  return (
    <div
      className={cn(
        'flex items-center justify-between px-4 py-3 border-b bg-muted/30'
      )}
      style={style as React.CSSProperties}
    >
      <div className="flex items-center gap-3">
        {avatar && (
          <div className="relative">
            <img src={avatar as string} alt="" className="w-10 h-10 rounded-full" />
            {status && (
              <span
                className={cn(
                  'absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-background',
                  statusColors[status as keyof typeof statusColors] || statusColors.offline
                )}
              />
            )}
          </div>
        )}
        <div>
          {title && <h3 className="font-semibold text-sm">{title as string}</h3>}
          {subtitle && <p className="text-xs text-muted-foreground">{subtitle as string}</p>}
        </div>
      </div>
      <div className="flex items-center gap-2">
        {children}
        {showMinimize && (
          <button
            onClick={() => onAction?.({ name: 'minimize' })}
            className="p-1 hover:bg-muted rounded"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
            </svg>
          </button>
        )}
        {showClose && (
          <button
            onClick={() => onAction?.({ name: 'close' })}
            className="p-1 hover:bg-muted rounded"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
};
