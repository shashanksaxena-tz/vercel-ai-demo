'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';

export const HeroWithImage = ({ element, children }: ComponentRenderProps) => {
  const {
    title,
    subtitle,
    description,
    image,
    imageAlt = 'Hero image',
    imagePosition = 'right',
    overlay = false,
    backgroundImage,
    className,
    style
  } = element.props;

  // Layout with background image
  if (backgroundImage) {
    return (
      <section
        className={cn(
          'relative w-full min-h-[600px] flex items-center',
          className
        )}
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          ...(style as React.CSSProperties),
        }}
      >
        {overlay && <div className="absolute inset-0 bg-black/60" />}
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="max-w-2xl text-white">
            {subtitle && (
              <span className="text-sm md:text-base font-medium uppercase tracking-wider opacity-90">
                {subtitle as string}
              </span>
            )}
            {title && (
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mt-4">
                {title as string}
              </h1>
            )}
            {description && (
              <p className="text-lg md:text-xl opacity-90 mt-6 max-w-xl">
                {description as string}
              </p>
            )}
            {children && (
              <div className="flex flex-wrap gap-4 mt-8">{children}</div>
            )}
          </div>
        </div>
      </section>
    );
  }

  // Side-by-side layout with image
  return (
    <section
      className={cn('relative w-full py-16 md:py-24', className)}
      style={style as React.CSSProperties}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={cn(
            'grid gap-12 lg:gap-16 items-center',
            imagePosition === 'left' ? 'lg:grid-cols-2' : 'lg:grid-cols-2'
          )}
        >
          <div className={cn(imagePosition === 'left' && 'lg:order-2')}>
            {subtitle && (
              <span className="text-sm md:text-base font-medium text-primary uppercase tracking-wider">
                {subtitle as string}
              </span>
            )}
            {title && (
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight mt-4 text-foreground">
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
          <div className={cn(imagePosition === 'left' && 'lg:order-1')}>
            {image && (
              <img
                src={image as string}
                alt={imageAlt as string}
                className="w-full h-auto rounded-2xl shadow-2xl"
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
