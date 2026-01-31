'use client';
// @ts-nocheck

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';

export const EmailThread = ({ element, children, onAction }: ComponentRenderProps) => {
  const {
    subject,
    messageCount,
    participants,
    lastReply,
    style
  } = element.props;

  return (
    <div
      className={cn('border rounded-lg bg-background')}
      style={style as React.CSSProperties}
    >
      <div className="p-4 border-b">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-semibold text-lg">{subject as string}</h3>
            <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
              {messageCount !== undefined && <span>{messageCount} messages</span>}
              {participants && <span>• {(participants as string[]).length} participants</span>}
            </div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => onAction?.({ name: 'reply' })}
              className="px-3 py-1 text-sm border rounded hover:bg-muted"
            >
              Reply
            </button>
            <button
              onClick={() => onAction?.({ name: 'replyAll' })}
              className="px-3 py-1 text-sm border rounded hover:bg-muted"
            >
              Reply All
            </button>
          </div>
        </div>
        {lastReply && (
          <p className="text-xs text-muted-foreground mt-2">Last reply: {lastReply as string}</p>
        )}
      </div>
      <div className="divide-y">
        {children}
      </div>
    </div>
  );
};
