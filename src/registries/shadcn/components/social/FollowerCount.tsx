'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';

export const FollowerCount = ({ element, onAction }: ComponentRenderProps) => {
  const {
    followers,
    following,
    showFollowing = true,
    style
  } = element.props;

  const formatCount = (count: number) => {
    if (count >= 1000000) return `${(count / 1000000).toFixed(1)}M`;
    if (count >= 1000) return `${(count / 1000).toFixed(1)}K`;
    return count.toString();
  };

  return (
    <div
      className={cn('flex items-center gap-4')}
      style={style as React.CSSProperties}
    >
      <button
        onClick={() => onAction?.({ name: 'viewFollowers' })}
        className="hover:underline"
      >
        <span className="font-bold">{formatCount(followers as number)}</span>
        <span className="text-muted-foreground ml-1">followers</span>
      </button>
      {showFollowing && (
        <button
          onClick={() => onAction?.({ name: 'viewFollowing' })}
          className="hover:underline"
        >
          <span className="font-bold">{formatCount(following as number)}</span>
          <span className="text-muted-foreground ml-1">following</span>
        </button>
      )}
    </div>
  );
};
