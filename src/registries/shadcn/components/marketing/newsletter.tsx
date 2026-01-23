'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';

export const Newsletter = ({ element, children }: ComponentRenderProps) => {
  const {
    title,
    subtitle,
    description,
    align = 'center',
    background = 'default',
    className,
    style
  } = element.props;

  const alignStyles = {
    left: 'text-left items-start',
    center: 'text-center items-center',
    right: 'text-right items-end',
  };

  const backgroundStyles = {
    default: 'bg-background',
    muted: 'bg-muted',
    gradient: 'bg-gradient-to-r from-primary/10 to-secondary/10',
    dark: 'bg-zinc-900 text-white',
    primary: 'bg-primary text-primary-foreground',
  };

  return (
    <section
      className={cn(
        'w-full py-16 md:py-24',
        backgroundStyles[background as keyof typeof backgroundStyles] || backgroundStyles.default,
        className
      )}
      style={style as React.CSSProperties}
    >
      <div
        className={cn(
          'max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-6',
          alignStyles[align as keyof typeof alignStyles] || alignStyles.center
        )}
      >
        {subtitle && (
          <span className="text-sm md:text-base font-medium text-primary uppercase tracking-wider">
            {subtitle as string}
          </span>
        )}
        {title && (
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            {title as string}
          </h2>
        )}
        {description && (
          <p className="text-lg text-muted-foreground">
            {description as string}
          </p>
        )}
        {children}
      </div>
    </section>
  );
};
