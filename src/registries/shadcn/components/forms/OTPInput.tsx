'use client';

import React, { useState, useRef, useEffect } from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';

export const OTPInput = ({ element, onAction }: ComponentRenderProps) => {
  const {
    label,
    name,
    value,
    length = 6,
    disabled = false,
    required = false,
    autoFocus = false,
    type = 'numeric', // 'numeric' | 'alphanumeric'
    masked = false,
    separator,
    separatorPosition = 3,
    error,
    helperText,
    style
  } = element.props;

  const inputLength = length as number;
  const [otp, setOtp] = useState<string[]>(
    (value as string)?.split('').slice(0, inputLength) || new Array(inputLength).fill('')
  );
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (autoFocus && inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, [autoFocus]);

  const handleChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    const pattern = type === 'numeric' ? /^\d$/ : /^[a-zA-Z0-9]$/;

    // Take only the last character if multiple characters are typed
    const char = inputValue.slice(-1);

    if (!pattern.test(char) && char !== '') return;

    const newOtp = [...otp];
    newOtp[index] = char.toUpperCase();
    setOtp(newOtp);

    const otpValue = newOtp.join('');
    onAction?.({
      name: 'change',
      params: { name, value: otpValue, isComplete: otpValue.length === inputLength },
    });

    // Move to next input
    if (char && index < inputLength - 1) {
      inputRefs.current[index + 1]?.focus();
    }

    // Trigger complete action if all filled
    if (newOtp.every((v) => v !== '')) {
      onAction?.({
        name: 'complete',
        params: { name, value: newOtp.join('') },
      });
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace') {
      if (otp[index] === '' && index > 0) {
        inputRefs.current[index - 1]?.focus();
      } else {
        const newOtp = [...otp];
        newOtp[index] = '';
        setOtp(newOtp);
        onAction?.({
          name: 'change',
          params: { name, value: newOtp.join(''), isComplete: false },
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
    const pattern = type === 'numeric' ? /^\d+$/ : /^[a-zA-Z0-9]+$/;

    const chars = pastedData.split('').slice(0, inputLength);
    if (!chars.every((c) => pattern.test(c) || c === '')) return;

    const newOtp = [...otp];
    chars.forEach((char, idx) => {
      if (idx < inputLength) {
        newOtp[idx] = char.toUpperCase();
      }
    });
    setOtp(newOtp);

    const otpValue = newOtp.join('');
    onAction?.({
      name: 'change',
      params: { name, value: otpValue, isComplete: otpValue.length === inputLength },
    });

    if (newOtp.every((v) => v !== '')) {
      onAction?.({
        name: 'complete',
        params: { name, value: newOtp.join('') },
      });
    }

    // Focus last filled input
    const lastFilledIndex = Math.min(chars.length, inputLength) - 1;
    inputRefs.current[lastFilledIndex]?.focus();
  };

  const shouldShowSeparator = (index: number) => {
    if (!separator) return false;
    return (index + 1) % (separatorPosition as number) === 0 && index < inputLength - 1;
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
        {otp.map((digit, index) => (
          <React.Fragment key={index}>
            <input
              ref={(el) => { inputRefs.current[index] = el; }}
              type={masked ? 'password' : 'text'}
              inputMode={type === 'numeric' ? 'numeric' : 'text'}
              maxLength={1}
              value={digit}
              disabled={disabled as boolean}
              className={cn(
                'w-12 h-14 text-center text-xl font-semibold rounded-md border border-input bg-background',
                'focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
                'disabled:cursor-not-allowed disabled:opacity-50',
                !!(error) && 'border-destructive focus:ring-destructive'
              )}
              onChange={(e) => handleChange(index, e)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              onPaste={handlePaste}
              autoComplete="one-time-code"
            />
            {shouldShowSeparator(index) && (
              <span className="text-muted-foreground">{separator as string}</span>
            )}
          </React.Fragment>
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
