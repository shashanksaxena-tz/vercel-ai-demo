'use client';

import React, { useState } from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';

export const CopyButton = ({ element, onAction }: ComponentRenderProps) => {
  const {
    text,
    label = 'Copy',
    copiedLabel = 'Copied!',
    variant = 'default',
    size = 'md',
    style
  } = element.props;

  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text as string);
      setCopied(true);
      onAction?.({ name: 'copied', payload: { text } } as never);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      onAction?.({ name: 'error', payload: { error: err } } as never);
    }
  };

  const sizes = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1.5 text-sm',
    lg: 'px-4 py-2 text-base',
  };

  const variants = {
    default: 'bg-primary text-primary-foreground hover:bg-primary/90',
    outline: 'border hover:bg-muted',
    ghost: 'hover:bg-muted',
  };

  return (
    <button
      onClick={handleCopy}
      className={cn(
        'inline-flex items-center gap-2 rounded font-medium transition-colors',
        sizes[size as keyof typeof sizes] || sizes.md,
        variants[variant as keyof typeof variants] || variants.default,
        copied && 'bg-green-500 text-white hover:bg-green-500'
      )}
      style={style as React.CSSProperties}
    >
      {copied ? (
        <>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          {copiedLabel as string}
        </>
      ) : (
        <>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
          {label as string}
        </>
      )}
    </button>
  );
};
