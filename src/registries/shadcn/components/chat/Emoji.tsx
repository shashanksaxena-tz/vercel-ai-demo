'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';

export const Emoji = ({ element }: ComponentRenderProps) => {
  const {
    emoji,
    size = 'md',
    label,
    style
  } = element.props;

  const sizes = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-xl',
    xl: 'text-2xl',
  };

  return (
    <span
      role="img"
      aria-label={label as string}
      className={cn(
        'inline-block',
        sizes[size as keyof typeof sizes] || sizes.md
      )}
      style={style as React.CSSProperties}
    >
      {emoji as string}
    </span>
  );
};
