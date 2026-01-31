'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';

export const PricingToggle = ({ element, onAction }: ComponentRenderProps) => {
  const {
    options = ['Monthly', 'Annually'],
    value,
    discount,
    className,
    style
  } = element.props;

  const optionsArray = options as string[];
  const selectedIndex = value ? optionsArray.indexOf(value as string) : 0;

  const handleToggle = (option: string, index: number) => {
    onAction?.({
      name: 'toggle',
      payload: { value: option, index },
    } as never);
  };

  return (
    <div
      className={cn('flex items-center justify-center gap-4', className)}
      style={style as React.CSSProperties}
    >
      <div className="inline-flex items-center p-1 bg-muted rounded-full">
        {optionsArray.map((option, idx) => (
          <button
            key={option}
            onClick={() => handleToggle(option, idx)}
            className={cn(
              'px-6 py-2 text-sm font-medium rounded-full transition-all',
              selectedIndex === idx
                ? 'bg-background text-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            )}
          >
            {option}
          </button>
        ))}
      </div>
      {discount && selectedIndex === 1 && (
        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
          Save {discount as string}
        </span>
      )}
    </div>
  );
};
