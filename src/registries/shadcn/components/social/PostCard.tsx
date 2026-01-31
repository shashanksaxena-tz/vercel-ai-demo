'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';

export const PostCard = ({ element, onAction }: ComponentRenderProps) => {
  const {
    id,
    author,
    avatar,
    content,
    image,
    timestamp,
    likes,
    style
  } = element.props;

  return (
    <div
      className={cn('border rounded-lg bg-card overflow-hidden hover:shadow-md transition-shadow cursor-pointer')}
      onClick={() => onAction?.({ name: 'viewPost', payload: { id } } as never)}
      style={style as React.CSSProperties}
    >
      {image && (
        <img src={image as string} alt="" className="w-full h-48 object-cover" />
      )}
      <div className="p-4">
        <div className="flex items-center gap-2 mb-2">
          {avatar ? (
            <img src={avatar as string} alt={author as string} className="w-8 h-8 rounded-full" />
          ) : (
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary text-sm font-medium">
              {(author as string)?.charAt(0).toUpperCase()}
            </div>
          )}
          <div>
            <p className="font-medium text-sm">{author as string}</p>
            {timestamp && <p className="text-xs text-muted-foreground">{timestamp as string}</p>}
          </div>
        </div>
        {content && (
          <p className="text-sm line-clamp-3">{content as string}</p>
        )}
        {likes !== undefined && (
          <div className="flex items-center gap-1 mt-3 text-sm text-muted-foreground">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            <span>{likes as number}</span>
          </div>
        )}
      </div>
    </div>
  );
};
