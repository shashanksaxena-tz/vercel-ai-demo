'use client';

import React, { useState } from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';

export const CommentInput = ({ element, onAction }: ComponentRenderProps) => {
  const {
    placeholder = 'Write a comment...',
    avatar,
    replyTo,
    style
  } = element.props;

  const [value, setValue] = useState('');

  const handleSubmit = () => {
    if (value.trim()) {
      onAction?.({ name: 'submit', payload: { content: value, replyTo } } as never);
      setValue('');
    }
  };

  return (
    <div
      className={cn('flex items-start gap-3')}
      style={style as React.CSSProperties}
    >
      {avatar && (
        <img src={avatar as string} alt="" className="w-8 h-8 rounded-full flex-shrink-0" />
      )}
      <div className="flex-1 relative">
        {replyTo && (
          <div className="text-xs text-muted-foreground mb-1">
            Replying to <span className="font-medium">@{replyTo}</span>
            <button
              onClick={() => onAction?.({ name: 'cancelReply' })}
              className="ml-2 hover:text-foreground"
            >
              Cancel
            </button>
          </div>
        )}
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
            placeholder={placeholder as string}
            className="flex-1 px-4 py-2 bg-muted rounded-full focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <button
            onClick={handleSubmit}
            disabled={!value.trim()}
            className={cn(
              'p-2 rounded-full text-primary',
              value.trim() ? 'hover:bg-primary/10' : 'opacity-50 cursor-not-allowed'
            )}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};
