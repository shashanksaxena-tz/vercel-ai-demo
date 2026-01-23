'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';

export const Reply = ({ element, onAction }: ComponentRenderProps) => {
  const {
    id,
    author,
    avatar,
    content,
    timestamp,
    likes,
    isLiked = false,
    style
  } = element.props;

  return (
    <div
      className={cn('flex gap-2')}
      style={style as React.CSSProperties}
    >
      {avatar ? (
        <img src={avatar as string} alt={author as string} className="w-6 h-6 rounded-full flex-shrink-0" />
      ) : (
        <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xs font-medium flex-shrink-0">
          {(author as string)?.charAt(0).toUpperCase()}
        </div>
      )}
      <div className="flex-1">
        <div className="bg-muted rounded-lg px-3 py-2">
          <p className="font-semibold text-xs">{author as string}</p>
          <p className="text-sm">{content as string}</p>
        </div>
        <div className="flex items-center gap-3 mt-1 px-2">
          <span className="text-xs text-muted-foreground">{timestamp as string}</span>
          <button
            onClick={() => onAction?.({ name: 'like', payload: { id } })}
            className={cn('text-xs font-medium hover:text-primary', isLiked && 'text-primary')}
          >
            {isLiked ? 'Liked' : 'Like'} {likes !== undefined && likes > 0 && `(${likes})`}
          </button>
        </div>
      </div>
    </div>
  );
};
