'use client';

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
    minLength,
    required = false,
    disabled = false,
    readOnly = false,
    error,
    helperText,
    resize = 'vertical',
    showCount = false,
    style
  } = element.props;

  const [currentValue, setCurrentValue] = React.useState(
    ((value || defaultValue) as string) || ''
  );

  const resizeStyles = {
    none: 'resize-none',
    vertical: 'resize-y',
    horizontal: 'resize-x',
    both: 'resize',
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCurrentValue(e.target.value);
    onAction?.({
      name: 'change',
      params: { name, value: e.target.value },
    });
  };

  return (
    <div className="w-full" style={style as React.CSSProperties}>
      {label ? (
        <label className="block text-sm font-medium mb-2">
          {label as string}
          {(required as boolean) && <span className="text-destructive ml-1">*</span>}
        </label>
      ) : null}
      <textarea
        name={name as string}
        placeholder={placeholder as string}
        value={currentValue}
        rows={rows as number}
        maxLength={maxLength as number}
        minLength={minLength as number}
        required={required as boolean}
        disabled={disabled as boolean}
        readOnly={readOnly as boolean}
        className={cn(
          'flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background',
          'placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
          'disabled:cursor-not-allowed disabled:opacity-50',
          resizeStyles[(resize as keyof typeof resizeStyles) || 'vertical'],
          !!(error) && 'border-destructive focus-visible:ring-destructive'
        )}
        onChange={handleChange}
      />
      <div className="flex justify-between mt-1">
        {(error || helperText) ? (
          <p className={cn('text-sm', error ? 'text-destructive' : 'text-muted-foreground')}>
            {(error || helperText) as string}
          </p>
        ) : <span />}
        {showCount && maxLength ? (
          <p className="text-xs text-muted-foreground">
            {currentValue.length}/{maxLength as number}
          </p>
        ) : null}
      </div>
    </div>
  );
};
