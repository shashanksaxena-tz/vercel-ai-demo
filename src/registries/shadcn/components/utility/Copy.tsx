'use client';

import React, { useState } from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';

export const Copy = ({ element, children, onAction }: ComponentRenderProps) => {
  const {
    text,
    showFeedback = true,
    feedbackDuration = 2000,
    style
  } = element.props;

  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text as string);
      setCopied(true);
      onAction?.({ name: 'copied', payload: { text } } as never);
      if (showFeedback) {
        setTimeout(() => setCopied(false), feedbackDuration as number);
      }
    } catch (err) {
      onAction?.({ name: 'error', payload: { error: err } } as never);
    }
  };

  return (
    <div
      className={cn('inline-flex items-center gap-2')}
      style={style as React.CSSProperties}
    >
      {children || <span className="font-mono text-sm truncate">{text as string}</span>}
      <button
        onClick={handleCopy}
        className="p-1 hover:bg-muted rounded"
        title={copied ? 'Copied!' : 'Copy'}
      >
        {copied ? (
          <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        ) : (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
        )}
      </button>
    </div>
  );
};
