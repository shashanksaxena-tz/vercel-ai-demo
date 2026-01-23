'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';

export const HeroSplit = ({ element, children }: ComponentRenderProps) => {
  const {
    title,
    subtitle,
    description,
    image,
    imageAlt = 'Hero image',
    contentPosition = 'left',
    contentBackground = 'default',
    imageBackground = 'muted',
    fullHeight = false,
    className,
    style
  } = element.props;

  const backgroundStyles = {
    default: 'bg-background',
    muted: 'bg-muted',
    primary: 'bg-primary text-primary-foreground',
    dark: 'bg-zinc-900 text-white',
    gradient: 'bg-gradient-to-br from-primary/10 to-secondary/10',
  };

  return (
    <section
      className={cn(
        'relative w-full',
        fullHeight && 'min-h-screen',
        className
      )}
      style={style as React.CSSProperties}
    >
      <div className="grid lg:grid-cols-2">
        {/* Content Side */}
        <div
          className={cn(
            'flex flex-col justify-center px-8 md:px-12 lg:px-16 py-16 md:py-24',
            backgroundStyles[contentBackground as keyof typeof backgroundStyles] || backgroundStyles.default,
            contentPosition === 'right' && 'lg:order-2'
          )}
        >
          <div className="max-w-xl">
            {subtitle && (
              <span className="text-sm md:text-base font-medium text-primary uppercase tracking-wider">
                {subtitle as string}
              </span>
            )}
            {title && (
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight mt-4">
                {title as string}
              </h1>
            )}
            {description && (
              <p className="text-lg text-muted-foreground mt-6">
                {description as string}
              </p>
            )}
            {children && (
              <div className="flex flex-wrap gap-4 mt-8">{children}</div>
            )}
          </div>
        </div>

        {/* Image Side */}
        <div
          className={cn(
            'relative min-h-[400px] lg:min-h-0',
            backgroundStyles[imageBackground as keyof typeof backgroundStyles] || backgroundStyles.muted,
            contentPosition === 'right' && 'lg:order-1'
          )}
        >
          {image ? (
            <img
              src={image as string}
              alt={imageAlt as string}
              className="absolute inset-0 w-full h-full object-cover"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-32 h-32 rounded-full bg-primary/10" />
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
