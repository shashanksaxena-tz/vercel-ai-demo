'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';

export const Author = ({ element, onAction }: ComponentRenderProps) => {
  const {
    name,
    username,
    avatar,
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
      <button
        onClick={() => onAction?.({ name: 'viewProfile', payload: { username } } as never)}
        className="flex items-center gap-3"
      >
        {avatar ? (
          <img src={avatar as string} alt={name as string} className="w-10 h-10 rounded-full" />
        ) : (
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium">
            {(name as string)?.charAt(0).toUpperCase()}
          </div>
        )}
        <div>
          <div className="flex items-center gap-1">
            <span className="font-semibold hover:underline">{name as string}</span>
            {isVerified && (
              <svg className="w-4 h-4 text-primary" fill="currentColor" viewBox="0 0 24 24">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            )}
          </div>
          {username && <span className="text-sm text-muted-foreground">@{username as string}</span>}
        </div>
      </button>
      {showFollow && (
        <button
          onClick={() => onAction?.({ name: isFollowing ? 'unfollow' : 'follow', payload: { username } } as never)}
          className={cn(
            'px-3 py-1 text-sm rounded-full ml-auto',
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
