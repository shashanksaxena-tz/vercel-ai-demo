'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';
import { ArrowUp, ArrowDown, Minus, Plus, ChevronUp, ChevronDown } from 'lucide-react';

export const ChangeIndicator = ({ element }: ComponentRenderProps) => {
  const {
    current,
    previous,
    format = 'percentage',
    showValue = true,
    showAbsolute = false,
    label,
    inverted = false,
    size = 'default',
    style,
  } = element.props;

  const currentNum = Number(current) || 0;
  const previousNum = Number(previous) || 0;
  const absoluteChange = currentNum - previousNum;
  const percentChange = previousNum !== 0 ? ((currentNum - previousNum) / previousNum) * 100 : 0;

  const isPositive = inverted ? absoluteChange < 0 : absoluteChange > 0;
  const isNegative = inverted ? absoluteChange > 0 : absoluteChange < 0;

  const getColorClasses = () => {
    if (isPositive) return { text: 'text-emerald-600', bg: 'bg-emerald-50' };
    if (isNegative) return { text: 'text-rose-600', bg: 'bg-rose-50' };
    return { text: 'text-muted-foreground', bg: 'bg-muted' };
  };

  const colors = getColorClasses();

  const getIcon = () => {
    if (absoluteChange > 0) return ChevronUp;
    if (absoluteChange < 0) return ChevronDown;
    return Minus;
  };

  const Icon = getIcon();

  const sizeStyles = {
    sm: { text: 'text-xs', icon: 'h-3 w-3', padding: 'px-1.5 py-0.5' },
    default: { text: 'text-sm', icon: 'h-4 w-4', padding: 'px-2 py-1' },
    lg: { text: 'text-base', icon: 'h-5 w-5', padding: 'px-2.5 py-1.5' },
  };

  const sizes = sizeStyles[(size as keyof typeof sizeStyles) || 'default'];

  const formatValue = () => {
    if (format === 'percentage') {
      return `${percentChange >= 0 ? '+' : ''}${percentChange.toFixed(1)}%`;
    }
    if (format === 'absolute') {
      return `${absoluteChange >= 0 ? '+' : ''}${absoluteChange.toLocaleString()}`;
    }
    return `${percentChange >= 0 ? '+' : ''}${percentChange.toFixed(1)}%`;
  };

  return (
    <div
      className={cn('inline-flex items-center gap-1', sizes.text)}
      style={style as React.CSSProperties}
    >
      <span className={cn('inline-flex items-center gap-0.5 font-medium rounded-full', colors.bg, colors.text, sizes.padding)}>
        <Icon className={sizes.icon} />
        {showValue && <span>{formatValue()}</span>}
      </span>
      {showAbsolute && format === 'percentage' && (
        <span className="text-muted-foreground">
          ({absoluteChange >= 0 ? '+' : ''}{absoluteChange.toLocaleString()})
        </span>
      )}
      {!!label && (
        <span className="text-muted-foreground">{label as React.ReactNode}</span>
      )}
    </div>
  );
};
