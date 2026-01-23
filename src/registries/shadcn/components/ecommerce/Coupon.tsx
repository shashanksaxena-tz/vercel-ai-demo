'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';
import { Tag, Copy, Check, Clock } from 'lucide-react';

export const Coupon = ({ element, onAction }: ComponentRenderProps) => {
  const {
    code,
    discount,
    discountType = 'percentage',
    description,
    expiresAt,
    minPurchase,
    maxDiscount,
    currency = '$',
    isApplied = false,
    variant = 'default',
    style,
  } = element.props;

  const [copied, setCopied] = React.useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code as string);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    if (onAction) {
      onAction({ name: 'copyCoupon', payload: { code } } as never);
    }
  };

  const handleApply = () => {
    if (onAction) {
      onAction({ name: 'applyCoupon', payload: { code } } as never);
    }
  };

  const discountText =
    discountType === 'percentage'
      ? `${discount}% OFF`
      : `${currency}${Number(discount).toFixed(2)} OFF`;

  if (variant === 'compact') {
    return (
      <div
        className={cn(
          'inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-sm',
          isApplied ? 'bg-green-50 border-green-200 text-green-700' : 'bg-muted'
        )}
        style={style as React.CSSProperties}
      >
        <Tag className="h-3.5 w-3.5" />
        <span className="font-mono font-medium">{code as string}</span>
        <span className="text-muted-foreground">-</span>
        <span className="font-semibold">{discountText}</span>
        {!isApplied && (
          <button
            onClick={handleCopy}
            className="ml-1 hover:text-primary transition-colors"
          >
            {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
          </button>
        )}
      </div>
    );
  }

  if (variant === 'ticket') {
    return (
      <div
        className={cn(
          'relative overflow-hidden rounded-lg border bg-card',
          isApplied && 'ring-2 ring-green-500'
        )}
        style={style as React.CSSProperties}
      >
        <div className="flex">
          <div className="flex-shrink-0 w-24 bg-primary text-primary-foreground flex flex-col items-center justify-center p-4">
            <span className="text-2xl font-bold">{discount}</span>
            <span className="text-xs uppercase">
              {discountType === 'percentage' ? '% OFF' : currency + ' OFF'}
            </span>
          </div>
          <div className="flex-1 p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="font-mono text-lg font-bold">{code as string}</span>
              <button
                onClick={handleCopy}
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              </button>
            </div>
            {description && (
              <p className="text-sm text-muted-foreground mb-2">{description as string}</p>
            )}
            <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
              {minPurchase && (
                <span>Min. purchase: {currency}{Number(minPurchase).toFixed(2)}</span>
              )}
              {maxDiscount && (
                <span>Max discount: {currency}{Number(maxDiscount).toFixed(2)}</span>
              )}
              {expiresAt && (
                <span className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  Expires: {expiresAt as string}
                </span>
              )}
            </div>
          </div>
        </div>
        <div className="absolute top-0 -left-3 h-full flex flex-col justify-around py-2">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="w-6 h-6 bg-background rounded-full" />
          ))}
        </div>
        <div className="absolute top-0 -right-3 h-full flex flex-col justify-around py-2">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="w-6 h-6 bg-background rounded-full" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        'p-4 border rounded-lg bg-card',
        isApplied && 'border-green-500 bg-green-50/50 dark:bg-green-950/20'
      )}
      style={style as React.CSSProperties}
    >
      <div className="flex items-start justify-between mb-2">
        <div className="flex items-center gap-2">
          <Tag className="h-5 w-5 text-primary" />
          <span className="font-mono text-lg font-bold">{code as string}</span>
        </div>
        <span className="text-xl font-bold text-primary">{discountText}</span>
      </div>

      {description && (
        <p className="text-sm text-muted-foreground mb-3">{description as string}</p>
      )}

      <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground mb-4">
        {minPurchase && (
          <span>Min. purchase: {currency}{Number(minPurchase).toFixed(2)}</span>
        )}
        {maxDiscount && (
          <span>Max discount: {currency}{Number(maxDiscount).toFixed(2)}</span>
        )}
        {expiresAt && (
          <span className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            Expires: {expiresAt as string}
          </span>
        )}
      </div>

      <div className="flex gap-2">
        <button
          onClick={handleCopy}
          className="flex-1 flex items-center justify-center gap-2 py-2 border rounded-md hover:bg-muted transition-colors"
        >
          {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
          {copied ? 'Copied!' : 'Copy Code'}
        </button>
        {!isApplied && (
          <button
            onClick={handleApply}
            className="flex-1 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors font-medium"
          >
            Apply
          </button>
        )}
      </div>

      {isApplied && (
        <p className="text-sm text-green-600 font-medium mt-2 flex items-center gap-1">
          <Check className="h-4 w-4" />
          Coupon applied successfully!
        </p>
      )}
    </div>
  );
};
