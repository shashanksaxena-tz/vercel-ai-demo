'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';

export const Feed = ({ element, children, onAction }: ComponentRenderProps) => {
  const {
    showCreatePost = true,
    isLoading = false,
    hasMore = false,
    style
  } = element.props;

  return (
    <div
      className={cn('space-y-4')}
      style={style as React.CSSProperties}
    >
      {showCreatePost && (
        <div className="border rounded-lg p-4 bg-card">
          <button
            onClick={() => onAction?.({ name: 'createPost' })}
            className="w-full text-left px-4 py-2 bg-muted rounded-full text-muted-foreground hover:bg-muted/80"
          >
            What&apos;s on your mind?
          </button>
        </div>
      )}

      {children}

      {isLoading && (
        <div className="flex justify-center py-4">
          <svg className="w-6 h-6 animate-spin text-primary" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
        </div>
      )}

      {hasMore && !isLoading && (
        <button
          onClick={() => onAction?.({ name: 'loadMore' })}
          className="w-full py-2 text-primary hover:bg-muted rounded-lg"
        >
          Load more
        </button>
      )}
    </div>
  );
};
