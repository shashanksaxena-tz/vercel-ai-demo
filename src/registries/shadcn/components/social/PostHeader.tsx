'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';

export const PostHeader = ({ element, onAction }: ComponentRenderProps) => {
  const {
    author,
    avatar,
    timestamp,
    location,
    isVerified,
    showFollow = false,
    isFollowing = false,
    style
  } = element.props;

  return (
    <div
      className={cn('flex items-center gap-3')}
      style={style as React.CSSProperties}
    >
      {avatar ? (
        <img src={avatar as string} alt={author as string} className="w-10 h-10 rounded-full" />
      ) : (
        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium">
          {(author as string)?.charAt(0).toUpperCase()}
        </div>
      )}
      <div className="flex-1">
        <div className="flex items-center gap-1">
          <span className="font-semibold">{author as string}</span>
          {isVerified && (
            <svg className="w-4 h-4 text-primary" fill="currentColor" viewBox="0 0 24 24">
              <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          )}
        </div>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          {timestamp && <span>{timestamp as string}</span>}
          {location && (
            <>
              <span>•</span>
              <span>{location as string}</span>
            </>
          )}
        </div>
      </div>
      {showFollow && (
        <button
          onClick={() => onAction?.({ name: isFollowing ? 'unfollow' : 'follow', payload: { author } })}
          className={cn(
            'px-3 py-1 text-sm rounded-full',
            isFollowing
              ? 'border hover:bg-muted'
              : 'bg-primary text-primary-foreground hover:bg-primary/90'
          )}
        >
          {isFollowing ? 'Following' : 'Follow'}
        </button>
      )}
    </div>
  );
};
