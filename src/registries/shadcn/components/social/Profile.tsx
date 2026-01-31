'use client';
// @ts-nocheck

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';

export const Profile = ({ element, children, onAction }: ComponentRenderProps) => {
  const {
    username,
    displayName,
    avatar,
    coverImage,
    bio,
    followers,
    following,
    posts,
    isVerified,
    isOwnProfile,
    isFollowing,
    style
  } = element.props;

  return (
    <div
      className={cn('border rounded-lg bg-card overflow-hidden')}
      style={style as React.CSSProperties}
    >
      {coverImage && (
        <div
          className="h-32 bg-cover bg-center"
          style={{ backgroundImage: `url(${coverImage})` }}
        />
      )}
      <div className="p-4">
        <div className={cn('flex items-end gap-4', coverImage && '-mt-12')}>
          {avatar ? (
            <img
              src={avatar as string}
              alt={displayName as string}
              className="w-20 h-20 rounded-full border-4 border-background object-cover"
            />
          ) : (
            <div className="w-20 h-20 rounded-full border-4 border-background bg-primary/10 flex items-center justify-center text-2xl font-bold text-primary">
              {(displayName as string)?.charAt(0).toUpperCase()}
            </div>
          )}
          <div className="flex-1" />
          {!isOwnProfile ? (
            <button
              onClick={() => onAction?.({ name: isFollowing ? 'unfollow' : 'follow' })}
              className={cn(
                'px-4 py-1.5 rounded-full font-medium',
                isFollowing
                  ? 'border hover:bg-muted'
                  : 'bg-primary text-primary-foreground hover:bg-primary/90'
              )}
            >
              {isFollowing ? 'Following' : 'Follow'}
            </button>
          ) : (
            <button
              onClick={() => onAction?.({ name: 'editProfile' })}
              className="px-4 py-1.5 rounded-full border hover:bg-muted font-medium"
            >
              Edit Profile
            </button>
          )}
        </div>

        <div className="mt-4">
          <div className="flex items-center gap-1">
            <h2 className="text-xl font-bold">{displayName as string}</h2>
            {isVerified && (
              <svg className="w-5 h-5 text-primary" fill="currentColor" viewBox="0 0 24 24">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            )}
          </div>
          <p className="text-muted-foreground">@{username as string}</p>
          {bio && <p className="mt-2">{bio as string}</p>}

          <div className="flex items-center gap-4 mt-4">
            <button onClick={() => onAction?.({ name: 'viewFollowers' })} className="hover:underline">
              <span className="font-bold">{followers}</span>
              <span className="text-muted-foreground ml-1">Followers</span>
            </button>
            <button onClick={() => onAction?.({ name: 'viewFollowing' })} className="hover:underline">
              <span className="font-bold">{following}</span>
              <span className="text-muted-foreground ml-1">Following</span>
            </button>
            {posts !== undefined && (
              <span>
                <span className="font-bold">{posts}</span>
                <span className="text-muted-foreground ml-1">Posts</span>
              </span>
            )}
          </div>
        </div>

        {children}
      </div>
    </div>
  );
};
