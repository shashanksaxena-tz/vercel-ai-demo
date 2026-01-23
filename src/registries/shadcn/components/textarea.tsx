import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';

export const Textarea = ({ element, onAction }: ComponentRenderProps) => {
  const {
    label,
    placeholder,
    value,
    defaultValue,
    name,
    rows = 4,
    maxLength,
    required = false,
    disabled = false,
    error,
    helperText,
    resize = 'vertical',
    style
  } = element.props;

  const resizeStyles = {
    none: 'resize-none',
    vertical: 'resize-y',
    horizontal: 'resize-x',
    both: 'resize',
  };

  return (
    <div className="w-full" style={style as React.CSSProperties}>
      {label ? (
        <label className="block text-sm font-medium mb-2">
          {label as string}
          {(required as boolean) && <span className="text-red-500 ml-1">*</span>}
        </label>
      ) : null}
      <textarea
        name={name as string}
        placeholder={placeholder as string}
        defaultValue={(value || defaultValue) as string}
        rows={rows as number}
        maxLength={maxLength as number}
        required={required as boolean}
        disabled={disabled as boolean}
        className={cn(
          'flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
          !!(error) && 'border-red-500 focus-visible:ring-red-500',
          resizeStyles[(resize as keyof typeof resizeStyles) || 'vertical']
        )}
        onChange={(e) => {
          onAction?.({
            name: 'change',
            params: { name: name, value: e.target.value },
          });
        }}
      />
      {(error || helperText) ? (
        <p
          className={cn(
            'mt-1 text-sm',
            error ? 'text-red-500' : 'text-muted-foreground'
          )}
        >
          {(error || helperText) as string}
        </p>
      ) : null}
      {maxLength ? (
        <p className="mt-1 text-xs text-muted-foreground text-right">
          {((value as string)?.length || 0)}/{maxLength as number}
        </p>
      ) : null}
    </div>
  );
};
