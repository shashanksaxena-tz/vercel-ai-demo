'use client';

import React, { useState } from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';
import { Star, Heart, ThumbsUp, Circle } from 'lucide-react';

export const Rating = ({ element, onAction }: ComponentRenderProps) => {
  const {
    label,
    name,
    value,
    defaultValue = 0,
    max = 5,
    disabled = false,
    readOnly = false,
    required = false,
    icon = 'star',
    size = 'default',
    color = 'primary',
    allowHalf = false,
    showValue = false,
    error,
    helperText,
    style
  } = element.props;

  const [currentValue, setCurrentValue] = useState((value ?? defaultValue) as number);
  const [hoverValue, setHoverValue] = useState<number | null>(null);

  const iconComponents = {
    star: Star,
    heart: Heart,
    thumbsUp: ThumbsUp,
    circle: Circle,
  };

  const sizeStyles = {
    sm: 'h-4 w-4',
    default: 'h-6 w-6',
    lg: 'h-8 w-8',
    xl: 'h-10 w-10',
  };

  const colorStyles = {
    primary: 'text-primary fill-primary',
    yellow: 'text-yellow-400 fill-yellow-400',
    red: 'text-red-500 fill-red-500',
    pink: 'text-pink-500 fill-pink-500',
  };

  const IconComponent = iconComponents[(icon as keyof typeof iconComponents) || 'star'];
  const maxCount = max as number;

  const handleClick = (index: number) => {
    if (disabled || readOnly) return;
    const newValue = currentValue === index ? 0 : index;
    setCurrentValue(newValue);
    onAction?.({
      name: 'change',
      params: { name, value: newValue },
    });
  };

  const displayValue = hoverValue !== null ? hoverValue : currentValue;

  return (
    <div className="w-full" style={style as React.CSSProperties}>
      {label ? (
        <label className="block text-sm font-medium mb-2">
          {label as string}
          {(required as boolean) && <span className="text-destructive ml-1">*</span>}
        </label>
      ) : null}

      <div className={cn('flex items-center gap-1', (disabled || readOnly) && 'cursor-default')}>
        {Array.from({ length: maxCount }).map((_, index) => {
          const ratingValue = index + 1;
          const isFilled = ratingValue <= displayValue;
          const isHalf = allowHalf && ratingValue === Math.ceil(displayValue) && displayValue % 1 !== 0;

          return (
            <button
              key={index}
              type="button"
              className={cn(
                'relative transition-transform',
                !(disabled || readOnly) && 'hover:scale-110 cursor-pointer',
                (disabled || readOnly) && 'cursor-default',
                !!(disabled) && 'opacity-50'
              )}
              onClick={() => handleClick(ratingValue)}
              onMouseEnter={() => !disabled && !readOnly && setHoverValue(ratingValue)}
              onMouseLeave={() => setHoverValue(null)}
              disabled={disabled as boolean}
            >
              <IconComponent
                className={cn(
                  sizeStyles[(size as keyof typeof sizeStyles) || 'default'],
                  isFilled || isHalf
                    ? colorStyles[(color as keyof typeof colorStyles) || 'primary']
                    : 'text-muted-foreground'
                )}
                fill={isFilled ? 'currentColor' : 'none'}
              />
            </button>
          );
        })}
        {showValue && (
          <span className="ml-2 text-sm text-muted-foreground">
            {currentValue}/{maxCount}
          </span>
        )}
      </div>

      {(error || helperText) ? (
        <p className={cn('mt-1 text-sm', error ? 'text-destructive' : 'text-muted-foreground')}>
          {(error || helperText) as string}
        </p>
      ) : null}
    </div>
  );
};
