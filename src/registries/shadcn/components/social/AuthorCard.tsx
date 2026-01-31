'use client';
// @ts-nocheck

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';

export const AuthorCard = ({ element, onAction }: ComponentRenderProps) => {
  const {
    name,
    username,
    avatar,
    bio,
    followers,
    posts,
    isVerified,
    isFollowing,
    style
  } = element.props;

  return (
    <div
      className={cn('border rounded-lg bg-card p-4 hover:shadow-md transition-shadow')}
      style={style as React.CSSProperties}
    >
      <div className="flex items-start gap-3">
        <button onClick={() => onAction?.({ name: 'viewProfile', payload: { username } } as never)}>
          {avatar ? (
            <img src={avatar as string} alt={name as string} className="w-14 h-14 rounded-full" />
          ) : (
            <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center text-xl font-semibold text-primary">
              {(name as string)?.charAt(0).toUpperCase()}
            </div>
          )}
        </button>
        <div className="flex-1 min-w-0">
          <button
            onClick={() => onAction?.({ name: 'viewProfile', payload: { username } } as never)}
            className="text-left"
          >
            <div className="flex items-center gap-1">
              <h3 className="font-semibold hover:underline">{name as string}</h3>
              {isVerified && (
                <svg className="w-4 h-4 text-primary" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              )}
            </div>
            <p className="text-sm text-muted-foreground">@{username as string}</p>
          </button>
          {bio && <p className="text-sm mt-1 line-clamp-2">{bio as string}</p>}
          <div className="flex items-center gap-3 mt-2 text-sm text-muted-foreground">
            {followers !== undefined && <span>{followers} followers</span>}
            {posts !== undefined && <span>{posts} posts</span>}
          </div>
        </div>
      </div>
      <button
        onClick={() => onAction?.({ name: isFollowing ? 'unfollow' : 'follow', payload: { username } } as never)}
        className={cn(
          'w-full mt-3 py-1.5 rounded-full font-medium',
          isFollowing
            ? 'border hover:bg-muted'
            : 'bg-primary text-primary-foreground hover:bg-primary/90'
        )}
      >
        {isFollowing ? 'Following' : 'Follow'}
      </button>
    </div>
  );
};
