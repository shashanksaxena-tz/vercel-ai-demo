'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';

export const Legend = ({ element, children }: ComponentRenderProps) => {
  const {
    text,
    size = 'default',
    required = false,
    description,
    style
  } = element.props;

  const sizeStyles = {
    sm: 'text-sm',
    default: 'text-base',
    lg: 'text-lg',
  };

  return (
    <legend
      className={cn(
        'font-semibold',
        sizeStyles[(size as keyof typeof sizeStyles) || 'default']
      )}
      style={style as React.CSSProperties}
    >
      <span>
        {text ? (text as string) : children}
        {Boolean(required) && <span className="text-destructive ml-1">*</span>}
      </span>
      {description ? (
        <p className="text-sm text-muted-foreground font-normal mt-1">
          {description as string}
        </p>
      ) : null}
    </legend>
  );
};
