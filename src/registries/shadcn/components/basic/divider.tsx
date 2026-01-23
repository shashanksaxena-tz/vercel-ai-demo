'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';

export const Divider = ({ element }: ComponentRenderProps) => {
  const { orientation = 'horizontal', variant = 'default', label, className, style } = element.props;

  const isHorizontal = orientation === 'horizontal';

  const variants = {
    default: 'bg-border',
    muted: 'bg-muted',
    primary: 'bg-primary',
    gradient: 'bg-gradient-to-r from-transparent via-border to-transparent',
  };

  if (label) {
    return (
      <div
        className={cn(
          'flex items-center gap-4',
          isHorizontal ? 'w-full' : 'flex-col h-full',
          className as string
        )}
        style={style as React.CSSProperties}
      >
        <div
          className={cn(
            'flex-1',
            isHorizontal ? 'h-px' : 'w-px',
            variants[(variant as keyof typeof variants)] || variants.default
          )}
        />
        <span className="text-sm text-muted-foreground whitespace-nowrap">
          {label as string}
        </span>
        <div
          className={cn(
            'flex-1',
            isHorizontal ? 'h-px' : 'w-px',
            variants[(variant as keyof typeof variants)] || variants.default
          )}
        />
      </div>
    );
  }

  return (
    <div
      className={cn(
        isHorizontal ? 'h-px w-full my-4' : 'w-px h-full mx-4',
        variants[(variant as keyof typeof variants)] || variants.default,
        className as string
      )}
      style={style as React.CSSProperties}
      role="separator"
    />
  );
};
