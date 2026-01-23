'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';

export const Label = ({ element, children }: ComponentRenderProps) => {
  const { text, htmlFor, required = false, optional = false, size = 'default', className, style } = element.props;

  const sizes = {
    sm: 'text-xs',
    default: 'text-sm',
    lg: 'text-base',
  };

  return (
    <label
      htmlFor={htmlFor as string}
      className={cn(
        'font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
        sizes[(size as keyof typeof sizes)] || sizes.default,
        className as string
      )}
      style={style as React.CSSProperties}
    >
      {(text as string) || children}
      {required && <span className="text-destructive ml-1">*</span>}
      {optional && <span className="text-muted-foreground ml-1 font-normal">(optional)</span>}
    </label>
  );
};
