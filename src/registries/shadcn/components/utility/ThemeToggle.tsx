'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';

export const ThemeToggle = ({ element, onAction }: ComponentRenderProps) => {
  const {
    theme = 'light',
    size = 'md',
    style
  } = element.props;

  const isDark = theme === 'dark';

  const sizes = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
  };

  const iconSizes = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
  };

  return (
    <button
      onClick={() => onAction?.({ name: 'toggle', payload: { theme: isDark ? 'light' : 'dark' } })}
      className={cn(
        'rounded-full border hover:bg-muted flex items-center justify-center transition-colors',
        sizes[size as keyof typeof sizes] || sizes.md
      )}
      style={style as React.CSSProperties}
      title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {isDark ? (
        <svg className={iconSizes[size as keyof typeof iconSizes] || iconSizes.md} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ) : (
        <svg className={iconSizes[size as keyof typeof iconSizes] || iconSizes.md} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
        </svg>
      )}
    </button>
  );
};
