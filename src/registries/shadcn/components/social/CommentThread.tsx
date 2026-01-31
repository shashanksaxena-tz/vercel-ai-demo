'use client';
// @ts-nocheck

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';

export const CommentThread = ({ element, children, onAction }: ComponentRenderProps) => {
  const {
    replyCount,
    isExpanded = false,
    style
  } = element.props;

  return (
    <div
      className={cn('ml-11 border-l-2 border-muted pl-4 mt-2')}
      style={style as React.CSSProperties}
    >
      {!isExpanded && replyCount !== undefined && (replyCount as number) > 0 ? (
        <button
          onClick={() => onAction?.({ name: 'expand' })}
          className="text-sm text-primary hover:underline"
        >
          View {replyCount} {(replyCount as number) === 1 ? 'reply' : 'replies'}
        </button>
      ) : (
        <div className="space-y-3">{children}</div>
      )}
    </div>
  );
};
