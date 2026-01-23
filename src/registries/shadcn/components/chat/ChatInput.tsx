'use client';

import React, { useState } from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';

export const ChatInput = ({ element, onAction }: ComponentRenderProps) => {
  const {
    placeholder = 'Type a message...',
    showSend = true,
    showAttach = false,
    showEmoji = false,
    disabled = false,
    style
  } = element.props;

  const [value, setValue] = useState('');

  const handleSend = () => {
    if (value.trim()) {
      onAction?.({ name: 'send', payload: { message: value } } as never);
      setValue('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div
      className={cn(
        'flex items-center gap-2'
      )}
      style={style as React.CSSProperties}
    >
      {showAttach && (
        <button
          onClick={() => onAction?.({ name: 'attach' })}
          className="p-2 hover:bg-muted rounded-full text-muted-foreground hover:text-foreground"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
          </svg>
        </button>
      )}
      <div className="flex-1 relative">
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder as string}
          disabled={disabled as boolean}
          className={cn(
            'w-full px-4 py-2 rounded-full border bg-background focus:outline-none focus:ring-2 focus:ring-primary',
            disabled && 'opacity-50 cursor-not-allowed'
          )}
        />
      </div>
      {showEmoji && (
        <button
          onClick={() => onAction?.({ name: 'emoji' })}
          className="p-2 hover:bg-muted rounded-full text-muted-foreground hover:text-foreground"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </button>
      )}
      {showSend && (
        <button
          onClick={handleSend}
          disabled={!value.trim() || (disabled as boolean)}
          className={cn(
            'p-2 rounded-full bg-primary text-primary-foreground hover:bg-primary/90',
            (!value.trim() || disabled) && 'opacity-50 cursor-not-allowed'
          )}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
          </svg>
        </button>
      )}
    </div>
  );
};
