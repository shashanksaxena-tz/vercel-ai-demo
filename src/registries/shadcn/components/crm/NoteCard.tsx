'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';

export const NoteCard = ({ element, onAction }: ComponentRenderProps) => {
  const {
    id,
    content,
    author,
    timestamp,
    isPinned = false,
    color = 'default',
    style
  } = element.props;

  const colors = {
    default: 'bg-card border',
    yellow: 'bg-yellow-100 dark:bg-yellow-900/30 border-yellow-200',
    green: 'bg-green-100 dark:bg-green-900/30 border-green-200',
    blue: 'bg-blue-100 dark:bg-blue-900/30 border-blue-200',
    pink: 'bg-pink-100 dark:bg-pink-900/30 border-pink-200',
  };

  return (
    <div
      className={cn(
        'p-3 rounded-lg border cursor-pointer hover:shadow-md transition-all',
        colors[color as keyof typeof colors] || colors.default
      )}
      onClick={() => onAction?.({ name: 'viewNote', payload: { id } } as never)}
      style={style as React.CSSProperties}
    >
      {isPinned && (
        <div className="flex justify-end mb-1">
          <svg className="w-3 h-3 text-yellow-600" fill="currentColor" viewBox="0 0 24 24">
            <path d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
          </svg>
        </div>
      )}
      <p className="text-sm line-clamp-4">{content as string}</p>
      <div className="flex items-center justify-between mt-2 text-xs text-muted-foreground">
        {author && <span>{author as string}</span>}
        {timestamp && <span>{timestamp as string}</span>}
      </div>
    </div>
  );
};
