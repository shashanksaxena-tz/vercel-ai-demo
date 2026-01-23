'use client';

import React, { useState } from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';
import { Star } from 'lucide-react';

export const StarRating = ({ element, onAction }: ComponentRenderProps) => {
  const {
    label,
    name,
    value,
    defaultValue = 0,
    max = 5,
    disabled = false,
    readOnly = false,
    required = false,
    size = 'default',
    allowHalf = false,
    precision = 1,
    showLabel = false,
    labels,
    error,
    helperText,
    style
  } = element.props;

  const [currentValue, setCurrentValue] = useState((value ?? defaultValue) as number);
  const [hoverValue, setHoverValue] = useState<number | null>(null);

  const sizeStyles = {
    sm: 'h-5 w-5',
    default: 'h-7 w-7',
    lg: 'h-9 w-9',
  };

  const maxCount = max as number;
  const step = allowHalf ? 0.5 : (precision as number);
  const labelsArray = labels as string[] | undefined;

  const defaultLabels = ['Poor', 'Fair', 'Good', 'Very Good', 'Excellent'];
  const ratingLabels = labelsArray || defaultLabels;

  const handleMouseMove = (e: React.MouseEvent, index: number) => {
    if (disabled || readOnly) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const halfWidth = rect.width / 2;

    if (allowHalf && x < halfWidth) {
      setHoverValue(index + 0.5);
    } else {
      setHoverValue(index + 1);
    }
  };

  const handleClick = () => {
    if (disabled || readOnly || hoverValue === null) return;
    setCurrentValue(hoverValue);
    onAction?.({
      name: 'change',
      params: { name, value: hoverValue },
    });
  };

  const displayValue = hoverValue !== null ? hoverValue : currentValue;
  const labelIndex = Math.ceil(displayValue) - 1;
  const currentLabel = ratingLabels[labelIndex] || '';

  return (
    <div className="w-full" style={style as React.CSSProperties}>
      {label ? (
        <label className="block text-sm font-medium mb-2">
          {label as string}
          {(required as boolean) && <span className="text-destructive ml-1">*</span>}
        </label>
      ) : null}

      <div className="flex items-center gap-2">
        <div
          className={cn(
            'flex items-center',
            (disabled || readOnly) && 'cursor-default'
          )}
          onMouseLeave={() => setHoverValue(null)}
        >
          {Array.from({ length: maxCount }).map((_, index) => {
            const starValue = index + 1;
            const isFullFilled = displayValue >= starValue;
            const isHalfFilled = !isFullFilled && displayValue > index && displayValue < starValue;

            return (
              <div
                key={index}
                className={cn(
                  'relative',
                  !(disabled || readOnly) && 'cursor-pointer'
                )}
                onMouseMove={(e) => handleMouseMove(e, index)}
                onClick={handleClick}
              >
                {/* Background star */}
                <Star
                  className={cn(
                    sizeStyles[(size as keyof typeof sizeStyles) || 'default'],
                    'text-muted-foreground/30',
                    !!(disabled) && 'opacity-50'
                  )}
                />
                {/* Filled star overlay */}
                <div
                  className="absolute inset-0 overflow-hidden"
                  style={{ width: isFullFilled ? '100%' : isHalfFilled ? '50%' : '0%' }}
                >
                  <Star
                    className={cn(
                      sizeStyles[(size as keyof typeof sizeStyles) || 'default'],
                      'text-yellow-400 fill-yellow-400'
                    )}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {showLabel && displayValue > 0 && (
          <span className="text-sm font-medium">{currentLabel}</span>
        )}

        <span className="text-sm text-muted-foreground ml-1">
          ({displayValue.toFixed(allowHalf ? 1 : 0)})
        </span>
      </div>

      {(error || helperText) ? (
        <p className={cn('mt-1 text-sm', error ? 'text-destructive' : 'text-muted-foreground')}>
          {(error || helperText) as string}
        </p>
      ) : null}
    </div>
  );
};
