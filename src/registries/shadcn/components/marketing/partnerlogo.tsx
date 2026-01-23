'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';

export const PartnerLogo = ({ element, onAction }: ComponentRenderProps) => {
  const {
    name,
    logo,
    url,
    grayscale = true,
    size = 'md',
    className,
    style
  } = element.props;

  const sizeStyles = {
    sm: 'h-8',
    md: 'h-10',
    lg: 'h-12',
    xl: 'h-16',
  };

  const handleClick = () => {
    if (url) {
      onAction?.({ name: 'navigate', payload: { href: url } } as never);
    }
  };

  return (
    <div
      className={cn(
        'flex items-center justify-center p-4',
        url && 'cursor-pointer hover:opacity-100 transition-opacity',
        grayscale && 'opacity-60 hover:opacity-100 grayscale hover:grayscale-0 transition-all',
        className
      )}
      style={style as React.CSSProperties}
      onClick={url ? handleClick : undefined}
      title={name as string}
    >
      {logo ? (
        <img
          src={logo as string}
          alt={name as string}
          className={cn(
            'w-auto max-w-full object-contain',
            sizeStyles[size as keyof typeof sizeStyles] || sizeStyles.md
          )}
        />
      ) : (
        <span className="text-lg font-semibold text-muted-foreground">
          {name as string}
        </span>
      )}
    </div>
  );
};
