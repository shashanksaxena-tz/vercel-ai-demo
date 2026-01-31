'use client';
// @ts-nocheck

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';

export const ProfileCard = ({ element, onAction }: ComponentRenderProps) => {
  const {
    username,
    displayName,
    avatar,
    bio,
    followers,
    isVerified,
    isFollowing,
    style
  } = element.props;

  return (
    <div
      className={cn('border rounded-lg bg-card p-4 hover:shadow-md transition-shadow cursor-pointer')}
      onClick={() => onAction?.({ name: 'viewProfile', payload: { username } } as never)}
      style={style as React.CSSProperties}
    >
      <div className="flex items-center gap-3 mb-3">
        {avatar ? (
          <img src={avatar as string} alt={displayName as string} className="w-12 h-12 rounded-full" />
        ) : (
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
            {(displayName as string)?.charAt(0).toUpperCase()}
          </div>
        )}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1">
            <h3 className="font-semibold truncate">{displayName as string}</h3>
            {isVerified && (
              <svg className="w-4 h-4 text-primary flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            )}
          </div>
          <p className="text-sm text-muted-foreground truncate">@{username as string}</p>
        </div>
      </div>
      {bio && <p className="text-sm line-clamp-2 mb-3">{bio as string}</p>}
      <div className="flex items-center justify-between">
        {followers !== undefined && (
          <span className="text-sm text-muted-foreground">{followers} followers</span>
        )}
        <button
          onClick={(e) => { e.stopPropagation(); onAction?.({ name: isFollowing ? 'unfollow' : 'follow', payload: { username } } as never); }}
          className={cn(
            'px-3 py-1 text-sm rounded-full',
            isFollowing
              ? 'border hover:bg-muted'
              : 'bg-primary text-primary-foreground hover:bg-primary/90'
          )}
        >
          {isFollowing ? 'Following' : 'Follow'}
        </button>
      </div>
    </div>
  );
};
