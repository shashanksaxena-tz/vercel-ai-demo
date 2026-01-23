'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';

export const About = ({ element, children }: ComponentRenderProps) => {
  const {
    title,
    subtitle,
    content,
    image,
    imageAlt = 'About image',
    imagePosition = 'right',
    stats,
    className,
    style
  } = element.props;

  const statsArray = stats as Array<{
    value: string | number;
    label: string;
  }>;

  return (
    <div
      className={cn('grid gap-12 lg:gap-16 items-center', className)}
      style={style as React.CSSProperties}
    >
      {/* Content */}
      <div className={cn(imagePosition === 'left' && image && 'lg:order-2')}>
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
        {content && (
          <div className="mt-6 text-muted-foreground space-y-4">
            {Array.isArray(content) ? (
              (content as string[]).map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))
            ) : (
              <p>{content as string}</p>
            )}
          </div>
        )}

        {statsArray && statsArray.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-10">
            {statsArray.map((stat, idx) => (
              <div key={idx}>
                <p className="text-3xl md:text-4xl font-bold text-primary">{stat.value}</p>
                <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        )}

        {children && <div className="mt-8">{children}</div>}
      </div>

      {/* Image */}
      {image && (
        <div className={cn(imagePosition === 'left' && 'lg:order-1')}>
          <img
            src={image as string}
            alt={imageAlt as string}
            className="w-full h-auto rounded-2xl shadow-xl"
          />
        </div>
      )}
    </div>
  );
};
