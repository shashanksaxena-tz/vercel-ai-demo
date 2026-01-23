'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';

export const LogoCloud = ({ element, children }: ComponentRenderProps) => {
  const {
    title,
    logos,
    columns = 5,
    grayscale = true,
    variant = 'default',
    animate = false,
    className,
    style
  } = element.props;

  const logosArray = logos as Array<{
    name: string;
    logo: string;
    url?: string;
  }>;

  const variantStyles = {
    default: '',
    bordered: 'border rounded-xl p-8',
    filled: 'bg-muted rounded-xl p-8',
  };

  const columnStyles = {
    3: 'grid-cols-2 sm:grid-cols-3',
    4: 'grid-cols-2 sm:grid-cols-4',
    5: 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-5',
    6: 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-6',
  };

  return (
    <div
      className={cn(
        variantStyles[variant as keyof typeof variantStyles] || variantStyles.default,
        className
      )}
      style={style as React.CSSProperties}
    >
      {title && (
        <p className="text-center text-sm text-muted-foreground mb-8">
          {title as string}
        </p>
      )}

      {logosArray && logosArray.length > 0 ? (
        <div
          className={cn(
            'grid items-center justify-items-center gap-8',
            columnStyles[columns as keyof typeof columnStyles] || columnStyles[5],
            animate && 'overflow-hidden'
          )}
        >
          {logosArray.map((item, idx) => (
            <div
              key={idx}
              className={cn(
                'flex items-center justify-center p-2',
                grayscale && 'opacity-60 hover:opacity-100 grayscale hover:grayscale-0 transition-all',
                item.url && 'cursor-pointer'
              )}
              title={item.name}
            >
              <img
                src={item.logo}
                alt={item.name}
                className="h-8 md:h-10 w-auto max-w-full object-contain"
              />
            </div>
          ))}
        </div>
      ) : (
        <div
          className={cn(
            'grid items-center justify-items-center gap-8',
            columnStyles[columns as keyof typeof columnStyles] || columnStyles[5]
          )}
        >
          {children}
        </div>
      )}
    </div>
  );
};
