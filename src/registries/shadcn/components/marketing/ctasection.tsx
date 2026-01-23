'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';

export const CTASection = ({ element, children }: ComponentRenderProps) => {
  const {
    title,
    subtitle,
    description,
    align = 'center',
    background = 'default',
    backgroundImage,
    overlay = false,
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
    gradient: 'bg-gradient-to-r from-primary to-primary/80',
    dark: 'bg-zinc-900 text-white',
    primary: 'bg-primary text-primary-foreground',
  };

  return (
    <section
      className={cn(
        'relative w-full py-16 md:py-24',
        !backgroundImage && (backgroundStyles[background as keyof typeof backgroundStyles] || backgroundStyles.default),
        className
      )}
      style={{
        backgroundImage: backgroundImage ? `url(${backgroundImage})` : undefined,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        ...(style as React.CSSProperties),
      }}
    >
      {overlay && backgroundImage && (
        <div className="absolute inset-0 bg-black/60" />
      )}
      <div
        className={cn(
          'relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-6',
          alignStyles[align as keyof typeof alignStyles] || alignStyles.center
        )}
      >
        {subtitle && (
          <span className="text-sm md:text-base font-medium uppercase tracking-wider opacity-80">
            {subtitle as string}
          </span>
        )}
        {title && (
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">
            {title as string}
          </h2>
        )}
        {description && (
          <p className="text-lg md:text-xl opacity-90 max-w-2xl">
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
