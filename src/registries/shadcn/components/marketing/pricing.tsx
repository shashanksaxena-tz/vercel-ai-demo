'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';

export const Pricing = ({ element, children }: ComponentRenderProps) => {
  const {
    title,
    subtitle,
    description,
    align = 'center',
    background = 'default',
    className,
    style
  } = element.props;

  const backgroundStyles = {
    default: 'bg-background',
    muted: 'bg-muted',
    gradient: 'bg-gradient-to-b from-background to-muted',
  };

  const alignStyles = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  };

  return (
    <section
      className={cn(
        'relative w-full py-16 md:py-24',
        backgroundStyles[background as keyof typeof backgroundStyles] || backgroundStyles.default,
        className
      )}
      style={style as React.CSSProperties}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {(title || subtitle || description) && (
          <div
            className={cn(
              'max-w-3xl mb-12',
              alignStyles[align as keyof typeof alignStyles] || alignStyles.center,
              align === 'center' && 'mx-auto'
            )}
          >
            {subtitle && (
              <span className="text-sm md:text-base font-medium text-primary uppercase tracking-wider">
                {subtitle as string}
              </span>
            )}
            {title && (
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mt-2 text-foreground">
                {title as string}
              </h2>
            )}
            {description && (
              <p className="text-lg text-muted-foreground mt-4">
                {description as string}
              </p>
            )}
          </div>
        )}
        {children}
      </div>
    </section>
  );
};
