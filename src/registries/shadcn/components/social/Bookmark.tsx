'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';

export const Bookmark = ({ element, onAction }: ComponentRenderProps) => {
  const {
    id,
    title,
    thumbnail,
    author,
    savedAt,
    type,
    style
  } = element.props;

  return (
    <div
      className={cn('flex gap-3 p-3 border rounded-lg hover:shadow-md transition-shadow cursor-pointer')}
      onClick={() => onAction?.({ name: 'view', payload: { id } })}
      style={style as React.CSSProperties}
    >
      {thumbnail && (
        <img src={thumbnail as string} alt="" className="w-20 h-20 rounded object-cover flex-shrink-0" />
      )}
      <div className="flex-1 min-w-0">
        <h4 className="font-medium truncate">{title as string}</h4>
        {author && <p className="text-sm text-muted-foreground">{author as string}</p>}
        <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
          {type && <span className="capitalize">{type as string}</span>}
          {savedAt && <span>Saved {savedAt as string}</span>}
        </div>
      </div>
      <button
        onClick={(e) => { e.stopPropagation(); onAction?.({ name: 'remove', payload: { id } } as never); }}
        className="p-1 hover:bg-muted rounded self-start"
      >
        <svg className="w-4 h-4 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
};
