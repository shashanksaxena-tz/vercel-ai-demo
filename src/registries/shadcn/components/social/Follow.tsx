'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';

export const Follow = ({ element }: ComponentRenderProps) => {
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
        <p>
          <span className="font-medium">{user as string}</span>
          <span className="text-muted-foreground"> started following you</span>
        </p>
        {timestamp && <p className="text-xs text-muted-foreground">{timestamp as string}</p>}
      </div>
    </div>
  );
};
