'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';

export const Thread = ({ element, children, onAction }: ComponentRenderProps) => {
  const {
    id,
    parentMessage,
    replyCount = 0,
    collapsed = false,
    style
  } = element.props;

  return (
    <div
      data-thread-id={id}
      className={cn(
        'border-l-2 border-muted pl-4 ml-4'
      )}
      style={style as React.CSSProperties}
    >
      {parentMessage && (
        <div className="text-xs text-muted-foreground mb-2 truncate">
          Replying to: {parentMessage as string}
        </div>
      )}
      {collapsed ? (
        <button
          onClick={() => onAction?.({ name: 'expandThread', payload: { id } } as never)}
          className="text-sm text-primary hover:underline"
        >
          Show {replyCount as number} {(replyCount as number) === 1 ? 'reply' : 'replies'}
        </button>
      ) : (
        <div className="space-y-2">{children}</div>
      )}
    </div>
  );
};
