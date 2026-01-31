'use client';
// @ts-nocheck

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';

export const LikeCount = ({ element, onAction }: ComponentRenderProps) => {
  const {
    count = 0,
    users,
    showAvatars = true,
    maxAvatars = 3,
    style
  } = element.props;

  const userList = users as Array<{ name: string; avatar?: string }>;

  return (
    <button
      onClick={() => onAction?.({ name: 'viewLikes' })}
      className={cn('inline-flex items-center gap-2 hover:underline')}
      style={style as React.CSSProperties}
    >
      {showAvatars && userList && userList.length > 0 && (
        <div className="flex -space-x-2">
          {userList.slice(0, maxAvatars as number).map((user, i) => (
            user.avatar ? (
              <img
                key={i}
                src={user.avatar}
                alt={user.name}
                className="w-5 h-5 rounded-full border-2 border-background"
              />
            ) : (
              <div
                key={i}
                className="w-5 h-5 rounded-full bg-muted flex items-center justify-center text-xs border-2 border-background"
              >
                {user.name.charAt(0)}
              </div>
            )
          ))}
        </div>
      )}
      <span className="text-sm text-muted-foreground">
        {count} {(count as number) === 1 ? 'like' : 'likes'}
      </span>
    </button>
  );
};
