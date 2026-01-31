'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';

export const Activity = ({ element, onAction }: ComponentRenderProps) => {
  const {
    id,
    type,
    title,
    description,
    user,
    timestamp,
    relatedTo,
    style
  } = element.props;

  const typeIcons = {
    call: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
      </svg>
    ),
    email: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    meeting: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
    note: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
      </svg>
    ),
    task: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
      </svg>
    ),
  };

  const typeColors = {
    call: 'bg-green-100 text-green-600',
    email: 'bg-blue-100 text-blue-600',
    meeting: 'bg-purple-100 text-purple-600',
    note: 'bg-yellow-100 text-yellow-600',
    task: 'bg-orange-100 text-orange-600',
  };

  return (
    <div
      className={cn(
        'flex gap-3 p-3 hover:bg-muted/50 rounded-lg cursor-pointer transition-colors'
      )}
      onClick={() => onAction?.({ name: 'viewActivity', payload: { id } } as never)}
      style={style as React.CSSProperties}
    >
      <div className={cn(
        'w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0',
        typeColors[type as keyof typeof typeColors] || 'bg-gray-100 text-gray-600'
      )}>
        {typeIcons[type as keyof typeof typeIcons] || typeIcons.note}
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-medium text-sm">{title as string}</p>
        {description && <p className="text-sm text-muted-foreground truncate">{description as string}</p>}
        <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
          {user && <span>{user as string}</span>}
          {timestamp && <span>{timestamp as string}</span>}
          {relatedTo && <span>• {relatedTo as string}</span>}
        </div>
      </div>
    </div>
  );
};
