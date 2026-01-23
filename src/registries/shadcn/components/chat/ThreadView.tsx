'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';

export const ThreadView = ({ element, children, onAction }: ComponentRenderProps) => {
  const {
    title,
    messageCount,
    participants,
    showClose = true,
    style
  } = element.props;

  return (
    <div
      className={cn(
        'flex flex-col h-full border-l'
      )}
      style={style as React.CSSProperties}
    >
      <div className="flex items-center justify-between px-4 py-3 border-b">
        <div>
          <h3 className="font-semibold text-sm">{title as string || 'Thread'}</h3>
          <p className="text-xs text-muted-foreground">
            {messageCount && `${messageCount} messages`}
            {participants && ` • ${(participants as string[]).length} participants`}
          </p>
        </div>
        {showClose && (
          <button
            onClick={() => onAction?.({ name: 'closeThread' })}
            className="p-1 hover:bg-muted rounded"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>
      <div className="flex-1 overflow-y-auto p-4">
        {children}
      </div>
    </div>
  );
};
