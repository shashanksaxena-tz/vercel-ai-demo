'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';

export const ProfileHeader = ({ element, children, onAction }: ComponentRenderProps) => {
  const {
    username,
    displayName,
    avatar,
    coverImage,
    isVerified,
    style
  } = element.props;

  return (
    <div
      className={cn('relative')}
      style={style as React.CSSProperties}
    >
      {coverImage ? (
        <div
          className="h-48 bg-cover bg-center"
          style={{ backgroundImage: `url(${coverImage})` }}
        />
      ) : (
        <div className="h-48 bg-gradient-to-r from-primary/20 to-primary/40" />
      )}
      <div className="px-4">
        <div className="flex items-end justify-between -mt-16">
          {avatar ? (
            <img
              src={avatar as string}
              alt={displayName as string}
              className="w-32 h-32 rounded-full border-4 border-background object-cover"
            />
          ) : (
            <div className="w-32 h-32 rounded-full border-4 border-background bg-primary/10 flex items-center justify-center text-4xl font-bold text-primary">
              {(displayName as string)?.charAt(0).toUpperCase()}
            </div>
          )}
          <div className="mb-4">
            {children}
          </div>
        </div>
        <div className="mt-4">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold">{displayName as string}</h1>
            {isVerified && (
              <svg className="w-6 h-6 text-primary" fill="currentColor" viewBox="0 0 24 24">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            )}
          </div>
          <p className="text-muted-foreground">@{username as string}</p>
        </div>
      </div>
    </div>
  );
};
