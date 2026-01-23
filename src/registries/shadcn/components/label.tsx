import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';

export const Label = ({ element, children }: ComponentRenderProps) => {
  const {
    text,
    htmlFor,
    required = false,
    optional = false,
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
        'font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
        sizeStyles[(size as keyof typeof sizeStyles) || 'default']
      )}
      style={style as React.CSSProperties}
    >
      {(text as string) || children}
      {(required as boolean) && <span className="text-red-500 ml-1">*</span>}
      {(optional as boolean) && (
        <span className="text-muted-foreground ml-1 font-normal">(optional)</span>
      )}
    </label>
  );
};
