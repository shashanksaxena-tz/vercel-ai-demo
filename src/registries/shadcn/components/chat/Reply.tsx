'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';

export const Reply = ({ element, children, onAction }: ComponentRenderProps) => {
  const {
    replyTo,
    replyToMessage,
    showCancel = true,
    style
  } = element.props;

  return (
    <div
      className={cn(
        'flex items-center gap-2 px-3 py-2 bg-muted/50 border-l-2 border-primary rounded-r'
      )}
      style={style as React.CSSProperties}
    >
      <div className="flex-1 min-w-0">
        {replyTo && (
          <p className="text-xs font-medium text-primary truncate">
            Replying to {replyTo as string}
          </p>
        )}
        {replyToMessage && (
          <p className="text-sm text-muted-foreground truncate">
            {replyToMessage as string}
          </p>
        )}
        {children}
      </div>
      {showCancel && (
        <button
          onClick={() => onAction?.({ name: 'cancelReply' })}
          className="p-1 hover:bg-muted rounded text-muted-foreground"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}
    </div>
  );
};
