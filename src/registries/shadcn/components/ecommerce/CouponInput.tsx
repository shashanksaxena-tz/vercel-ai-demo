'use client';
// @ts-nocheck

import React, { useState } from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';
import { Tag, Loader2, Check, X } from 'lucide-react';

export const CouponInput = ({ element, onAction }: ComponentRenderProps) => {
  const {
    value = '',
    appliedCoupon,
    discount,
    discountType = 'percentage',
    currency = '$',
    placeholder = 'Enter coupon code',
    error,
    isLoading = false,
    style,
  } = element.props;

  const [inputValue, setInputValue] = useState(value as string);

  const handleApply = () => {
    if (inputValue.trim() && onAction) {
      onAction({ name: 'applyCoupon', payload: { code: inputValue.trim() } } as never);
    }
  };

  const handleRemove = () => {
    if (onAction) {
      onAction({ name: 'removeCoupon' });
      setInputValue('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleApply();
    }
  };

  if (appliedCoupon) {
    const discountText =
      discountType === 'percentage'
        ? `${discount}% off`
        : `${currency}${Number(discount).toFixed(2)} off`;

    return (
      <div
        className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800 rounded-md"
        style={style as React.CSSProperties}
      >
        <div className="flex items-center gap-2">
          <Tag className="h-4 w-4 text-green-600" />
          <span className="font-mono font-medium">{appliedCoupon as string}</span>
          <span className="text-sm text-green-600">({discountText})</span>
        </div>
        <button
          onClick={handleRemove}
          className="text-muted-foreground hover:text-destructive transition-colors"
          aria-label="Remove coupon"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    );
  }

  return (
    <div style={style as React.CSSProperties}>
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Tag className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value.toUpperCase())}
            onKeyDown={handleKeyDown}
            placeholder={placeholder as string}
            disabled={isLoading}
            className={cn(
              'w-full pl-10 pr-4 py-2 border rounded-md bg-background font-mono uppercase',
              'focus:outline-none focus:ring-2 focus:ring-primary/50',
              error && 'border-destructive focus:ring-destructive/50'
            )}
          />
        </div>
        <button
          onClick={handleApply}
          disabled={!inputValue.trim() || isLoading}
          className="px-4 py-2 bg-primary text-primary-foreground rounded-md font-medium hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
        >
          {isLoading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            'Apply'
          )}
        </button>
      </div>
      {error && (
        <p className="text-sm text-destructive mt-1">{error as string}</p>
      )}
    </div>
  );
};
