'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';

export const Story = ({ element, onAction }: ComponentRenderProps) => {
  const {
    id,
    user,
    avatar,
    image,
    video,
    duration,
    isSeen = false,
    isOwn = false,
    style
  } = element.props;

  return (
    <button
      onClick={() => onAction?.({ name: 'viewStory', payload: { id, user } })}
      className={cn('flex flex-col items-center gap-1')}
      style={style as React.CSSProperties}
    >
      <div className={cn(
        'relative w-16 h-16 rounded-full p-0.5',
        !isSeen && !isOwn && 'bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-600',
        isSeen && !isOwn && 'bg-muted',
        isOwn && 'bg-transparent'
      )}>
        <div className="w-full h-full rounded-full overflow-hidden bg-background p-0.5">
          {avatar ? (
            <img src={avatar as string} alt={user as string} className="w-full h-full rounded-full object-cover" />
          ) : (
            <div className="w-full h-full rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium">
              {(user as string)?.charAt(0).toUpperCase()}
            </div>
          )}
        </div>
        {isOwn && (
          <div className="absolute bottom-0 right-0 w-5 h-5 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs border-2 border-background">
            +
          </div>
        )}
      </div>
      <span className="text-xs truncate max-w-16">{isOwn ? 'Your story' : user as string}</span>
    </button>
  );
};
