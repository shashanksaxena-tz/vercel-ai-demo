'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';

export const Note = ({ element, children, onAction }: ComponentRenderProps) => {
  const {
    id,
    content,
    author,
    timestamp,
    isPinned = false,
    relatedTo,
    tags,
    style
  } = element.props;

  return (
    <div
      className={cn(
        'p-4 border rounded-lg bg-background hover:shadow-md transition-shadow',
        isPinned && 'border-yellow-300 bg-yellow-50 dark:bg-yellow-900/10'
      )}
      style={style as React.CSSProperties}
    >
      <div className="flex items-start justify-between mb-2">
        <div className="flex items-center gap-2">
          {author && <span className="font-medium text-sm">{author as string}</span>}
          {timestamp && <span className="text-xs text-muted-foreground">{timestamp as string}</span>}
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={() => onAction?.({ name: 'togglePin', payload: { id } })}
            className={cn('p-1 hover:bg-muted rounded', isPinned && 'text-yellow-600')}
          >
            <svg className="w-4 h-4" fill={isPinned ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
            </svg>
          </button>
          <button
            onClick={() => onAction?.({ name: 'editNote', payload: { id } })}
            className="p-1 hover:bg-muted rounded"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </button>
        </div>
      </div>
      <p className="text-sm whitespace-pre-wrap">{content as string}</p>
      {relatedTo && (
        <p className="text-xs text-muted-foreground mt-2">Related to: {relatedTo as string}</p>
      )}
      {tags && (
        <div className="flex flex-wrap gap-1 mt-2">
          {(tags as string[]).map((tag, i) => (
            <span key={i} className="px-2 py-0.5 bg-muted text-xs rounded">{tag}</span>
          ))}
        </div>
      )}
      {children}
    </div>
  );
};
