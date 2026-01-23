'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';

export const Card = ({ element, children }: ComponentRenderProps) => {
  const {
    title,
    description,
    image,
    footer,
    variant = 'default',
    padding = 'default',
    hoverable = false,
    clickable = false,
    style,
  } = element.props;

  const variantStyles = {
    default: 'border bg-card shadow-sm',
    elevated: 'border-0 bg-card shadow-lg',
    outline: 'border-2 bg-transparent shadow-none',
    ghost: 'border-0 bg-muted/30 shadow-none',
    filled: 'border-0 bg-muted shadow-none',
  };

  const paddingStyles = {
    none: '',
    sm: 'p-3',
    default: 'p-6',
    lg: 'p-8',
  };

  return (
    <div
      className={cn(
        'rounded-lg overflow-hidden',
        variantStyles[(variant as keyof typeof variantStyles) || 'default'],
        hoverable && 'hover:shadow-md transition-shadow duration-200',
        clickable && 'cursor-pointer'
      )}
      style={style as React.CSSProperties}
    >
      {image && (
        <div className="relative aspect-video">
          <img
            src={image as string}
            alt={title as string || ''}
            className="w-full h-full object-cover"
          />
        </div>
      )}
      <div className={cn(paddingStyles[(padding as keyof typeof paddingStyles) || 'default'])}>
        {(title || description) && (
          <div className="mb-4">
            {title && <h3 className="text-lg font-semibold tracking-tight">{title as string}</h3>}
            {description && (
              <p className="text-sm text-muted-foreground mt-1">{description as string}</p>
            )}
          </div>
        )}
        {children}
      </div>
      {footer && (
        <div className="px-6 py-4 border-t bg-muted/30">
          {typeof footer === 'string' ? (
            <p className="text-sm text-muted-foreground">{footer}</p>
          ) : (
            footer as React.ReactNode
          )}
        </div>
      )}
    </div>
  );
};
