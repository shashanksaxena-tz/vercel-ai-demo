'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';

export const HeroSection = ({ element, children }: ComponentRenderProps) => {
  const {
    title,
    subtitle,
    description,
    align = 'center',
    size = 'lg',
    background = 'default',
    badge,
    className,
    style
  } = element.props;

  const sizeStyles = {
    sm: 'min-h-[400px] py-16',
    md: 'min-h-[500px] py-20',
    lg: 'min-h-[600px] py-24',
    xl: 'min-h-[700px] py-32',
    full: 'min-h-screen py-24',
  };

  const alignStyles = {
    left: 'text-left items-start',
    center: 'text-center items-center',
    right: 'text-right items-end',
  };

  const backgroundStyles = {
    default: 'bg-background',
    muted: 'bg-muted',
    gradient: 'bg-gradient-to-br from-primary/10 via-background to-secondary/10',
    dark: 'bg-zinc-900 text-white',
    primary: 'bg-primary text-primary-foreground',
  };

  return (
    <section
      className={cn(
        'relative w-full flex flex-col justify-center',
        sizeStyles[size as keyof typeof sizeStyles] || sizeStyles.lg,
        backgroundStyles[background as keyof typeof backgroundStyles] || backgroundStyles.default,
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
        {badge && (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20">
            {badge as string}
          </span>
        )}
        {subtitle && (
          <span className="text-sm md:text-base font-medium text-primary uppercase tracking-wider">
            {subtitle as string}
          </span>
        )}
        {title && (
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
            {title as string}
          </h1>
        )}
        {description && (
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl">
            {description as string}
          </p>
        )}
        {children && (
          <div className={cn('flex flex-wrap gap-4 mt-6', align === 'center' && 'justify-center')}>
            {children}
          </div>
        )}
      </div>
    </section>
  );
};
