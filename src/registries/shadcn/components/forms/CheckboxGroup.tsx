'use client';

import React, { useState } from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';

export const CheckboxGroup = ({ element, onAction }: ComponentRenderProps) => {
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

  const [selectedValues, setSelectedValues] = useState<string[]>(
    ((value || defaultValue) as string[]) || []
  );

  const optionsArray = options as Array<{
    value: string;
    label: string;
    description?: string;
    disabled?: boolean;
  }>;

  const handleToggle = (optionValue: string) => {
    let newValues: string[];
    if (selectedValues.includes(optionValue)) {
      newValues = selectedValues.filter((v) => v !== optionValue);
    } else {
      newValues = [...selectedValues, optionValue];
    }
    setSelectedValues(newValues);
    onAction?.({
      name: 'change',
      params: { name, value: newValues },
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
          const isChecked = selectedValues.includes(option.value);
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
                  type="checkbox"
                  name={`${name}[]`}
                  value={option.value}
                  checked={isChecked}
                  disabled={option.disabled || (disabled as boolean)}
                  className="sr-only peer"
                  onChange={() => handleToggle(option.value)}
                />
                <div
                  className={cn(
                    'flex h-4 w-4 items-center justify-center rounded border border-primary ring-offset-background transition-colors cursor-pointer',
                    'peer-focus-visible:ring-2 peer-focus-visible:ring-ring peer-focus-visible:ring-offset-2',
                    'peer-disabled:cursor-not-allowed',
                    isChecked && 'bg-primary text-primary-foreground'
                  )}
                  onClick={() => !option.disabled && !(disabled as boolean) && handleToggle(option.value)}
                >
                  {isChecked && <Check className="h-3 w-3" />}
                </div>
              </div>
              <div className="ml-3">
                <label
                  className="text-sm font-medium leading-none cursor-pointer"
                  onClick={() => !option.disabled && !(disabled as boolean) && handleToggle(option.value)}
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
