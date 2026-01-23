'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';

export const LikeButton = ({ element, onAction }: ComponentRenderProps) => {
  const {
    isLiked = false,
    count,
    showCount = true,
    size = 'md',
    variant = 'default',
    style
  } = element.props;

  const sizes = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
  };

  const variants = {
    default: isLiked ? 'text-red-500' : 'text-muted-foreground hover:text-red-500',
    outline: cn(
      'border rounded-full px-3 py-1',
      isLiked ? 'border-red-500 text-red-500' : 'hover:border-red-500 hover:text-red-500'
    ),
    filled: cn(
      'px-3 py-1 rounded-full',
      isLiked ? 'bg-red-500 text-white' : 'bg-muted hover:bg-red-100 hover:text-red-500'
    ),
  };

  return (
    <button
      onClick={() => onAction?.({ name: 'toggle' })}
      className={cn(
        'inline-flex items-center gap-1 transition-colors',
        variant !== 'default' && variants[variant as keyof typeof variants],
        variant === 'default' && variants.default
      )}
      style={style as React.CSSProperties}
    >
      <svg
        className={sizes[size as keyof typeof sizes] || sizes.md}
        fill={isLiked ? 'currentColor' : 'none'}
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
      {showCount && count !== undefined && (
        <span className="text-sm">{count as number}</span>
      )}
    </button>
  );
};
