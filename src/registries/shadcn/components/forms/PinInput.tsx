'use client';

import React, { useState, useRef, useEffect } from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';

export const PinInput = ({ element, onAction }: ComponentRenderProps) => {
  const {
    label,
    name,
    value,
    length = 4,
    disabled = false,
    required = false,
    autoFocus = false,
    mask = true,
    size = 'default',
    error,
    helperText,
    style
  } = element.props;

  const inputLength = length as number;
  const [pin, setPin] = useState<string[]>(
    (value as string)?.split('').slice(0, inputLength) || new Array(inputLength).fill('')
  );
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const sizeStyles = {
    sm: 'w-8 h-10 text-sm',
    default: 'w-10 h-12 text-lg',
    lg: 'w-12 h-14 text-xl',
  };

  useEffect(() => {
    if (autoFocus && inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, [autoFocus]);

  const handleChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;

    // Only allow digits
    const digit = inputValue.slice(-1);
    if (!/^\d$/.test(digit) && digit !== '') return;

    const newPin = [...pin];
    newPin[index] = digit;
    setPin(newPin);

    const pinValue = newPin.join('');
    onAction?.({
      name: 'change',
      params: { name, value: pinValue, isComplete: newPin.every((v) => v !== '') },
    });

    // Move to next input
    if (digit && index < inputLength - 1) {
      inputRefs.current[index + 1]?.focus();
    }

    // Trigger complete action if all filled
    if (newPin.every((v) => v !== '')) {
      onAction?.({
        name: 'complete',
        params: { name, value: newPin.join('') },
      });
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace') {
      if (pin[index] === '' && index > 0) {
        inputRefs.current[index - 1]?.focus();
      } else {
        const newPin = [...pin];
        newPin[index] = '';
        setPin(newPin);
        onAction?.({
          name: 'change',
          params: { name, value: newPin.join(''), isComplete: false },
        });
      }
    } else if (e.key === 'ArrowLeft' && index > 0) {
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === 'ArrowRight' && index < inputLength - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text');

    // Only allow numeric paste
    if (!/^\d+$/.test(pastedData)) return;

    const digits = pastedData.split('').slice(0, inputLength);
    const newPin = [...pin];
    digits.forEach((digit, idx) => {
      if (idx < inputLength) {
        newPin[idx] = digit;
      }
    });
    setPin(newPin);

    const pinValue = newPin.join('');
    onAction?.({
      name: 'change',
      params: { name, value: pinValue, isComplete: newPin.every((v) => v !== '') },
    });

    if (newPin.every((v) => v !== '')) {
      onAction?.({
        name: 'complete',
        params: { name, value: newPin.join('') },
      });
    }

    // Focus last filled input or first empty
    const lastFilledIndex = Math.min(digits.length, inputLength) - 1;
    inputRefs.current[lastFilledIndex]?.focus();
  };

  return (
    <div className="w-full" style={style as React.CSSProperties}>
      {label ? (
        <label className="block text-sm font-medium mb-2">
          {label as string}
          {(required as boolean) && <span className="text-destructive ml-1">*</span>}
        </label>
      ) : null}

      <div className="flex items-center gap-2">
        {pin.map((digit, index) => (
          <input
            key={index}
            ref={(el) => { inputRefs.current[index] = el; }}
            type={mask ? 'password' : 'text'}
            inputMode="numeric"
            maxLength={1}
            value={digit}
            disabled={disabled as boolean}
            className={cn(
              'text-center font-semibold rounded-md border border-input bg-background',
              'focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
              'disabled:cursor-not-allowed disabled:opacity-50',
              sizeStyles[(size as keyof typeof sizeStyles) || 'default'],
              !!(error) && 'border-destructive focus:ring-destructive'
            )}
            onChange={(e) => handleChange(index, e)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            onPaste={handlePaste}
            autoComplete="off"
          />
        ))}
      </div>

      {(error || helperText) ? (
        <p className={cn('mt-2 text-sm', error ? 'text-destructive' : 'text-muted-foreground')}>
          {(error || helperText) as string}
        </p>
      ) : null}
    </div>
  );
};
