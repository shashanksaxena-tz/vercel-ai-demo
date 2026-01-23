'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';

export const Hero = ({ element, children }: ComponentRenderProps) => {
  const {
    title,
    subtitle,
    description,
    align = 'center',
    size = 'lg',
    className,
    style
  } = element.props;

  const sizeStyles = {
    sm: 'py-12 md:py-16',
    md: 'py-16 md:py-20',
    lg: 'py-20 md:py-28',
    xl: 'py-28 md:py-36',
  };

  const alignStyles = {
    left: 'text-left items-start',
    center: 'text-center items-center',
    right: 'text-right items-end',
  };

  return (
    <section
      className={cn(
        'relative w-full',
        sizeStyles[size as keyof typeof sizeStyles] || sizeStyles.lg,
        className
      )}
      style={style as React.CSSProperties}
    >
      <div
        className={cn(
          'max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-6',
          alignStyles[align as keyof typeof alignStyles] || alignStyles.center
        )}
      >
        {subtitle && (
          <span className="text-sm md:text-base font-medium text-primary uppercase tracking-wider">
            {subtitle as string}
          </span>
        )}
        {title && (
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground">
            {title as string}
          </h1>
        )}
        {description && (
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl">
            {description as string}
          </p>
        )}
        {children && (
          <div className={cn('flex flex-wrap gap-4 mt-4', align === 'center' && 'justify-center')}>
            {children}
          </div>
        )}
      </div>
    </section>
  );
};
