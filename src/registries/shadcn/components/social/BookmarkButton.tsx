'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';

export const BookmarkButton = ({ element, onAction }: ComponentRenderProps) => {
  const {
    isBookmarked = false,
    size = 'md',
    style
  } = element.props;

  const sizes = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
  };

  return (
    <button
      onClick={() => onAction?.({ name: 'toggle' })}
      className={cn(
        'transition-colors',
        isBookmarked ? 'text-primary' : 'text-muted-foreground hover:text-primary'
      )}
      style={style as React.CSSProperties}
    >
      <svg
        className={sizes[size as keyof typeof sizes] || sizes.md}
        fill={isBookmarked ? 'currentColor' : 'none'}
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
      </svg>
    </button>
  );
};
