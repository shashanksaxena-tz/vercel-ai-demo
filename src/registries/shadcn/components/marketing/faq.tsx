'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';

export const FAQ = ({ element, children }: ComponentRenderProps) => {
  const {
    title,
    subtitle,
    description,
    align = 'center',
    layout = 'single',
    className,
    style
  } = element.props;

  const alignStyles = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  };

  return (
    <section
      className={cn('w-full py-16 md:py-24', className)}
      style={style as React.CSSProperties}
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {(title || subtitle || description) && (
          <div
            className={cn(
              'mb-12',
              alignStyles[align as keyof typeof alignStyles] || alignStyles.center
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
              <p className="text-lg text-muted-foreground mt-4 max-w-2xl mx-auto">
                {description as string}
              </p>
            )}
          </div>
        )}
        <div
          className={cn(
            layout === 'two-column' && 'grid md:grid-cols-2 gap-6'
          )}
        >
          {children}
        </div>
      </div>
    </section>
  );
};
