'use client';

import React, { useState } from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';

export const ToggleGroup = ({ element, onAction }: ComponentRenderProps) => {
  const {
    label,
    name,
    options = [],
    value,
    defaultValue,
    disabled = false,
    type = 'single', // 'single' | 'multiple'
    variant = 'default',
    size = 'default',
    orientation = 'horizontal',
    error,
    style
  } = element.props;

  const [selectedValues, setSelectedValues] = useState<string | string[]>(
    (value || defaultValue || (type === 'multiple' ? [] : '')) as string | string[]
  );

  const optionsArray = options as Array<{
    value: string;
    label: string;
    icon?: string;
    disabled?: boolean;
  }>;

  const variantStyles = {
    default: 'bg-transparent hover:bg-muted hover:text-muted-foreground',
    outline: 'border border-input bg-transparent hover:bg-muted hover:text-muted-foreground',
  };

  const sizeStyles = {
    sm: 'h-8 px-2 text-xs',
    default: 'h-10 px-3 text-sm',
    lg: 'h-12 px-4 text-base',
  };

  const handleToggle = (optionValue: string) => {
    let newValue: string | string[];

    if (type === 'multiple') {
      const currentValues = selectedValues as string[];
      if (currentValues.includes(optionValue)) {
        newValue = currentValues.filter((v) => v !== optionValue);
      } else {
        newValue = [...currentValues, optionValue];
      }
    } else {
      newValue = selectedValues === optionValue ? '' : optionValue;
    }

    setSelectedValues(newValue);
    onAction?.({
      name: 'change',
      params: { name, value: newValue },
    });
  };

  const isSelected = (optionValue: string): boolean => {
    if (type === 'multiple') {
      return (selectedValues as string[]).includes(optionValue);
    }
    return selectedValues === optionValue;
  };

  return (
    <div className="w-full" style={style as React.CSSProperties}>
      {label ? (
        <label className="block text-sm font-medium mb-2">{label as string}</label>
      ) : null}
      <div
        className={cn(
          'inline-flex rounded-md',
          orientation === 'vertical' ? 'flex-col' : 'flex-row',
          variant === 'outline' && 'border border-input p-1'
        )}
      >
        {optionsArray.map((option, index) => (
          <button
            key={option.value}
            type="button"
            disabled={option.disabled || (disabled as boolean)}
            className={cn(
              'inline-flex items-center justify-center font-medium ring-offset-background transition-colors',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
              'disabled:pointer-events-none disabled:opacity-50',
              variantStyles[(variant as keyof typeof variantStyles) || 'default'],
              sizeStyles[(size as keyof typeof sizeStyles) || 'default'],
              isSelected(option.value) && 'bg-muted text-foreground',
              orientation === 'horizontal' && index === 0 && 'rounded-l-md',
              orientation === 'horizontal' && index === optionsArray.length - 1 && 'rounded-r-md',
              orientation === 'horizontal' && index !== 0 && index !== optionsArray.length - 1 && 'rounded-none',
              orientation === 'vertical' && index === 0 && 'rounded-t-md',
              orientation === 'vertical' && index === optionsArray.length - 1 && 'rounded-b-md',
              orientation === 'vertical' && index !== 0 && index !== optionsArray.length - 1 && 'rounded-none'
            )}
            onClick={() => handleToggle(option.value)}
          >
            {option.icon ? <span className={cn(option.label && 'mr-2')}>{option.icon}</span> : null}
            {option.label}
          </button>
        ))}
      </div>
      {error ? <p className="text-sm text-destructive mt-1">{error as string}</p> : null}
    </div>
  );
};
