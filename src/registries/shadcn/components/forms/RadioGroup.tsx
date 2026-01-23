'use client';

import React, { useState } from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';

export const RadioGroup = ({ element, onAction }: ComponentRenderProps) => {
  const {
    label,
    name,
    options = [],
    value,
    defaultValue,
    required = false,
    disabled = false,
    orientation = 'vertical',
    error,
    helperText,
    style
  } = element.props;

  const [selectedValue, setSelectedValue] = useState((value || defaultValue) as string);

  const optionsArray = options as Array<{
    value: string;
    label: string;
    description?: string;
    disabled?: boolean;
  }>;

  const handleChange = (optionValue: string) => {
    setSelectedValue(optionValue);
    onAction?.({
      name: 'change',
      params: { name, value: optionValue },
    });
  };

  return (
    <fieldset
      className="w-full"
      style={style as React.CSSProperties}
      disabled={disabled as boolean}
    >
      {label ? (
        <legend className="text-sm font-medium mb-3">
          {label as string}
          {(required as boolean) && <span className="text-destructive ml-1">*</span>}
        </legend>
      ) : null}
      <div
        className={cn(
          'flex gap-3',
          orientation === 'vertical' ? 'flex-col' : 'flex-row flex-wrap'
        )}
      >
        {optionsArray.map((option) => {
          const isSelected = selectedValue === option.value;
          return (
            <div
              key={option.value}
              className={cn(
                'flex items-start',
                !!(option.disabled || disabled) && 'opacity-50 cursor-not-allowed'
              )}
            >
              <div className="relative flex items-center">
                <input
                  type="radio"
                  name={name as string}
                  value={option.value}
                  checked={isSelected}
                  disabled={option.disabled || (disabled as boolean)}
                  className="sr-only peer"
                  onChange={() => handleChange(option.value)}
                />
                <div
                  className={cn(
                    'flex h-4 w-4 items-center justify-center rounded-full border border-primary ring-offset-background transition-colors cursor-pointer',
                    'peer-focus-visible:ring-2 peer-focus-visible:ring-ring peer-focus-visible:ring-offset-2',
                    'peer-disabled:cursor-not-allowed'
                  )}
                  onClick={() => !option.disabled && !(disabled as boolean) && handleChange(option.value)}
                >
                  {isSelected && <div className="h-2 w-2 rounded-full bg-primary" />}
                </div>
              </div>
              <div className="ml-3">
                <label
                  className="text-sm font-medium leading-none cursor-pointer"
                  onClick={() => !option.disabled && !(disabled as boolean) && handleChange(option.value)}
                >
                  {option.label}
                </label>
                {option.description ? (
                  <p className="text-xs text-muted-foreground mt-1">{option.description}</p>
                ) : null}
              </div>
            </div>
          );
        })}
      </div>
      {(error || helperText) ? (
        <p className={cn('mt-2 text-sm', error ? 'text-destructive' : 'text-muted-foreground')}>
          {(error || helperText) as string}
        </p>
      ) : null}
    </fieldset>
  );
};
