'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';

export const CTA = ({ element, children }: ComponentRenderProps) => {
  const {
    title,
    description,
    align = 'center',
    size = 'md',
    className,
    style
  } = element.props;

  const sizeStyles = {
    sm: 'py-8 md:py-12',
    md: 'py-12 md:py-16',
    lg: 'py-16 md:py-24',
  };

  const alignStyles = {
    left: 'text-left items-start',
    center: 'text-center items-center',
    right: 'text-right items-end',
  };

  return (
    <div
      className={cn(
        'flex flex-col gap-6',
        sizeStyles[size as keyof typeof sizeStyles] || sizeStyles.md,
        alignStyles[align as keyof typeof alignStyles] || alignStyles.center,
        className
      )}
      style={style as React.CSSProperties}
    >
      {title && (
        <h2 className="text-2xl md:text-3xl font-bold text-foreground">
          {title as string}
        </h2>
      )}
      {description && (
        <p className="text-lg text-muted-foreground max-w-2xl">
          {description as string}
        </p>
      )}
      {children && (
        <div className={cn('flex flex-wrap gap-4', align === 'center' && 'justify-center')}>
          {children}
        </div>
      )}
    </div>
  );
};
