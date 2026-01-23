'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';

export const Like = ({ element }: ComponentRenderProps) => {
  const {
    user,
    avatar,
    timestamp,
    style
  } = element.props;

  return (
    <div
      className={cn('flex items-center gap-3 py-2')}
      style={style as React.CSSProperties}
    >
      {avatar ? (
        <img src={avatar as string} alt={user as string} className="w-10 h-10 rounded-full" />
      ) : (
        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium">
          {(user as string)?.charAt(0).toUpperCase()}
        </div>
      )}
      <div className="flex-1">
        <p className="font-medium">{user as string}</p>
        {timestamp && <p className="text-xs text-muted-foreground">{timestamp as string}</p>}
      </div>
      <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 24 24">
        <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    </div>
  );
};
