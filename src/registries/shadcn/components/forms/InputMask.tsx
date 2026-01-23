'use client';

import React, { useState } from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';

export const InputMask = ({ element, onAction }: ComponentRenderProps) => {
  const {
    label,
    name,
    value,
    defaultValue,
    placeholder,
    mask, // e.g., '(999) 999-9999' or '99/99/9999'
    maskChar = '_',
    disabled = false,
    required = false,
    error,
    helperText,
    style
  } = element.props;

  const [inputValue, setInputValue] = useState((value || defaultValue || '') as string);

  const applyMask = (input: string, maskPattern: string): string => {
    const cleanInput = input.replace(/\D/g, '');
    let masked = '';
    let inputIndex = 0;

    for (let i = 0; i < maskPattern.length && inputIndex < cleanInput.length; i++) {
      const maskChar = maskPattern[i];
      if (maskChar === '9') {
        // 9 represents any digit
        if (/\d/.test(cleanInput[inputIndex])) {
          masked += cleanInput[inputIndex];
          inputIndex++;
        }
      } else if (maskChar === 'A') {
        // A represents any letter
        if (/[a-zA-Z]/.test(cleanInput[inputIndex])) {
          masked += cleanInput[inputIndex];
          inputIndex++;
        }
      } else if (maskChar === '*') {
        // * represents any character
        masked += cleanInput[inputIndex];
        inputIndex++;
      } else {
        // Literal character
        masked += maskChar;
      }
    }

    return masked;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value;
    const maskedValue = mask ? applyMask(rawValue, mask as string) : rawValue;

    setInputValue(maskedValue);
    onAction?.({
      name: 'change',
      params: {
        name,
        value: maskedValue,
        rawValue: rawValue.replace(/\D/g, ''),
      },
    });
  };

  const getPlaceholder = () => {
    if (placeholder) return placeholder as string;
    if (mask) {
      return (mask as string).replace(/9/g, maskChar as string).replace(/A/g, maskChar as string);
    }
    return '';
  };

  return (
    <div className="w-full" style={style as React.CSSProperties}>
      {label ? (
        <label className="block text-sm font-medium mb-2">
          {label as string}
          {(required as boolean) && <span className="text-destructive ml-1">*</span>}
        </label>
      ) : null}
      <input
        type="text"
        name={name as string}
        value={inputValue}
        placeholder={getPlaceholder()}
        disabled={disabled as boolean}
        className={cn(
          'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background',
          'placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
          'disabled:cursor-not-allowed disabled:opacity-50',
          !!(error) && 'border-destructive focus-visible:ring-destructive'
        )}
        onChange={handleChange}
      />
      {(error || helperText) ? (
        <p className={cn('mt-1 text-sm', error ? 'text-destructive' : 'text-muted-foreground')}>
          {(error || helperText) as string}
        </p>
      ) : null}
    </div>
  );
};
