'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';

export const DownloadButton = ({ element, onAction }: ComponentRenderProps) => {
  const {
    url,
    filename,
    label = 'Download',
    variant = 'default',
    size = 'md',
    isLoading = false,
    style
  } = element.props;

  const handleDownload = () => {
    if (isLoading) return;
    onAction?.({ name: 'download', payload: { url, filename } } as never);
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
      onClick={handleDownload}
      disabled={isLoading as boolean}
      className={cn(
        'inline-flex items-center gap-2 rounded font-medium transition-colors',
        sizes[size as keyof typeof sizes] || sizes.md,
        variants[variant as keyof typeof variants] || variants.default,
        isLoading && 'opacity-50 cursor-not-allowed'
      )}
      style={style as React.CSSProperties}
    >
      {isLoading ? (
        <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
      ) : (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
        </svg>
      )}
      {label as string}
    </button>
  );
};
