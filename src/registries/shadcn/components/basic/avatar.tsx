'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';

export const Avatar = ({ element }: ComponentRenderProps) => {
  const { src, alt, name, fallback, size = 'default', className, style } = element.props;

  const sizes = {
    xs: 'h-6 w-6 text-xs',
    sm: 'h-8 w-8 text-sm',
    default: 'h-10 w-10 text-base',
    lg: 'h-12 w-12 text-lg',
    xl: 'h-16 w-16 text-xl',
  };

  const altText = (alt || name || 'Avatar') as string;
  const fallbackText = (fallback as string) || altText.charAt(0).toUpperCase();

  return (
    <span
      className={cn(
        'relative flex shrink-0 overflow-hidden rounded-full',
        sizes[(size as keyof typeof sizes)] || sizes.default,
        className as string
      )}
      style={style as React.CSSProperties}
    >
      {src ? (
        <img
          src={src as string}
          alt={altText}
          className="aspect-square h-full w-full object-cover"
        />
      ) : (
        <span className="flex h-full w-full items-center justify-center rounded-full bg-muted font-medium">
          {fallbackText}
        </span>
      )}
    </span>
  );
};
