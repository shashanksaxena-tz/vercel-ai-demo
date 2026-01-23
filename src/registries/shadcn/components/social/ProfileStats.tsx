'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';

export const ProfileStats = ({ element, onAction }: ComponentRenderProps) => {
  const {
    posts,
    followers,
    following,
    likes,
    style
  } = element.props;

  const formatCount = (count: number) => {
    if (count >= 1000000) return `${(count / 1000000).toFixed(1)}M`;
    if (count >= 1000) return `${(count / 1000).toFixed(1)}K`;
    return count.toString();
  };

  const stats = [
    { key: 'posts', value: posts, label: 'Posts' },
    { key: 'followers', value: followers, label: 'Followers', action: 'viewFollowers' },
    { key: 'following', value: following, label: 'Following', action: 'viewFollowing' },
    { key: 'likes', value: likes, label: 'Likes' },
  ].filter(s => s.value !== undefined);

  return (
    <div
      className={cn('flex items-center justify-around border-y py-3')}
      style={style as React.CSSProperties}
    >
      {stats.map((stat) => (
        <button
          key={stat.key}
          onClick={() => stat.action && onAction?.({ name: stat.action })}
          className={cn('text-center', stat.action && 'hover:bg-muted px-4 py-2 rounded-lg')}
          disabled={!stat.action}
        >
          <p className="text-xl font-bold">{formatCount(stat.value as number)}</p>
          <p className="text-sm text-muted-foreground">{stat.label}</p>
        </button>
      ))}
    </div>
  );
};
