'use client';
// @ts-nocheck

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';

export const Email = ({ element, children, onAction }: ComponentRenderProps) => {
  const {
    id,
    subject,
    from,
    to,
    preview,
    timestamp,
    isRead = true,
    hasAttachment = false,
    isStarred = false,
    style
  } = element.props;

  return (
    <div
      className={cn(
        'p-4 border rounded-lg bg-background hover:shadow-md transition-shadow cursor-pointer',
        !isRead && 'bg-primary/5 border-primary/20'
      )}
      onClick={() => onAction?.({ name: 'viewEmail', payload: { id } } as never)}
      style={style as React.CSSProperties}
    >
      <div className="flex items-start gap-3">
        <button
          onClick={(e) => { e.stopPropagation(); onAction?.({ name: 'toggleStar', payload: { id } } as never); }}
          className={cn(
            'mt-0.5',
            isStarred ? 'text-yellow-500' : 'text-muted-foreground hover:text-yellow-500'
          )}
        >
          <svg className="w-4 h-4" fill={isStarred ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
          </svg>
        </button>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2">
            <span className={cn('font-medium truncate', !isRead && 'font-semibold')}>
              {from as string}
            </span>
            <span className="text-xs text-muted-foreground whitespace-nowrap">
              {timestamp as string}
            </span>
          </div>
          <h4 className={cn('truncate', !isRead && 'font-medium')}>
            {subject as string}
          </h4>
          {preview && (
            <p className="text-sm text-muted-foreground truncate mt-1">
              {preview as string}
            </p>
          )}
          <div className="flex items-center gap-2 mt-2">
            {to && (
              <span className="text-xs text-muted-foreground">
                To: {Array.isArray(to) ? (to as string[]).join(', ') : to}
              </span>
            )}
            {hasAttachment && (
              <svg className="w-3 h-3 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
              </svg>
            )}
          </div>
        </div>
      </div>
      {children}
    </div>
  );
};
