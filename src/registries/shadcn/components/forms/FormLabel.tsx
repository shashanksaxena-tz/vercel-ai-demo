'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';

export const FormLabel = ({ element, children }: ComponentRenderProps) => {
  const {
    text,
    htmlFor,
    required = false,
    optional = false,
    tooltip,
    size = 'default',
    style
  } = element.props;

  const sizeStyles = {
    sm: 'text-xs',
    default: 'text-sm',
    lg: 'text-base',
  };

  return (
    <label
      htmlFor={htmlFor as string}
      className={cn(
        'font-medium leading-none',
        sizeStyles[(size as keyof typeof sizeStyles) || 'default']
      )}
      style={style as React.CSSProperties}
    >
      {text ? (text as string) : children}
      {required && !optional && (
        <span className="text-destructive ml-1">*</span>
      )}
      {optional && !required && (
        <span className="text-muted-foreground ml-1 font-normal">(optional)</span>
      )}
      {tooltip && (
        <span className="ml-1.5 inline-flex items-center">
          <span
            className="inline-flex items-center justify-center h-4 w-4 rounded-full bg-muted text-muted-foreground text-xs cursor-help"
            title={tooltip as string}
          >
            ?
          </span>
        </span>
      )}
    </label>
  );
};
