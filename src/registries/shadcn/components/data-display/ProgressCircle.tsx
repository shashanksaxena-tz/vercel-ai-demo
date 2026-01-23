'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';

export const ProgressCircle = ({ element }: ComponentRenderProps) => {
  const {
    value = 0,
    max = 100,
    label,
    showValue = true,
    size = 120,
    strokeWidth = 8,
    color = 'primary',
    trackColor = '#e5e7eb',
    animated = false,
    style,
  } = element.props;

  const percentage = Math.min(100, Math.max(0, ((value as number) / (max as number)) * 100));
  const sizeNum = size as number;
  const strokeNum = strokeWidth as number;

  const radius = (sizeNum - strokeNum) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  const colorStyles: Record<string, string> = {
    primary: '#3b82f6',
    secondary: '#6b7280',
    success: '#22c55e',
    warning: '#eab308',
    error: '#ef4444',
    info: '#0ea5e9',
  };

  const strokeColor = colorStyles[color as string] || (color as string) || colorStyles.primary;

  return (
    <div
      className="relative inline-flex items-center justify-center"
      style={{ width: sizeNum, height: sizeNum, ...style as React.CSSProperties }}
    >
      <svg
        className={cn('transform -rotate-90', animated && 'animate-spin')}
        width={sizeNum}
        height={sizeNum}
      >
        {/* Background circle */}
        <circle
          cx={sizeNum / 2}
          cy={sizeNum / 2}
          r={radius}
          fill="none"
          stroke={trackColor as string}
          strokeWidth={strokeNum}
        />
        {/* Progress circle */}
        <circle
          cx={sizeNum / 2}
          cy={sizeNum / 2}
          r={radius}
          fill="none"
          stroke={strokeColor}
          strokeWidth={strokeNum}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          className="transition-all duration-500 ease-out"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        {showValue && (
          <span className={cn('font-bold', sizeNum < 80 ? 'text-sm' : sizeNum < 120 ? 'text-xl' : 'text-2xl')}>
            {percentage.toFixed(0)}%
          </span>
        )}
        {label && (
          <span className={cn('text-muted-foreground', sizeNum < 80 ? 'text-[10px]' : 'text-xs')}>
            {label as string}
          </span>
        )}
      </div>
    </div>
  );
};
