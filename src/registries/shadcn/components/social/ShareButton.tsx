'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';

export const ShareButton = ({ element, onAction }: ComponentRenderProps) => {
  const {
    count,
    showCount = true,
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
      onClick={() => onAction?.({ name: 'share' })}
      className={cn('inline-flex items-center gap-1 text-muted-foreground hover:text-primary transition-colors')}
      style={style as React.CSSProperties}
    >
      <svg
        className={sizes[size as keyof typeof sizes] || sizes.md}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
      </svg>
      {showCount && count !== undefined && (
        <span className="text-sm">{count as number}</span>
      )}
    </button>
  );
};
