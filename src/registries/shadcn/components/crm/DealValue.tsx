'use client';
// @ts-nocheck

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';

export const DealValue = ({ element }: ComponentRenderProps) => {
  const {
    value,
    currency = '$',
    size = 'md',
    trend,
    trendValue,
    style
  } = element.props;

  const sizes = {
    sm: 'text-sm',
    md: 'text-lg',
    lg: 'text-2xl',
    xl: 'text-3xl',
  };

  return (
    <div
      className={cn('inline-flex items-center gap-2')}
      style={style as React.CSSProperties}
    >
      <span className={cn('font-bold', sizes[size as keyof typeof sizes] || sizes.md)}>
        {currency}{value as string}
      </span>
      {trend && (
        <span className={cn(
          'flex items-center text-xs',
          trend === 'up' ? 'text-green-600' : trend === 'down' ? 'text-red-600' : 'text-muted-foreground'
        )}>
          {trend === 'up' && (
            <svg className="w-3 h-3 mr-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
            </svg>
          )}
          {trend === 'down' && (
            <svg className="w-3 h-3 mr-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          )}
          {trendValue && <span>{trendValue as string}</span>}
        </span>
      )}
    </div>
  );
};
