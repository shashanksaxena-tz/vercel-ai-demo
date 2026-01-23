import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';

export const FormField = ({ element, children }: ComponentRenderProps) => {
  const {
    label,
    name,
    required = false,
    error,
    helperText,
    style
  } = element.props;

  return (
    <div className="w-full space-y-2" style={style as React.CSSProperties}>
      {label ? (
        <label
          htmlFor={name as string}
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          {label as string}
          {(required as boolean) && <span className="text-red-500 ml-1">*</span>}
        </label>
      ) : null}
      {children}
      {(error || helperText) ? (
        <p
          className={cn(
            'text-sm',
            error ? 'text-red-500' : 'text-muted-foreground'
          )}
        >
          {(error || helperText) as string}
        </p>
      ) : null}
    </div>
  );
};
