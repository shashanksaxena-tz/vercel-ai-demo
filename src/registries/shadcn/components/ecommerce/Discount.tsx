'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';
import { Tag, Percent, DollarSign } from 'lucide-react';

export const Discount = ({ element }: ComponentRenderProps) => {
  const {
    amount,
    type = 'percentage',
    originalPrice,
    discountedPrice,
    currency = '$',
    label,
    variant = 'badge',
    size = 'md',
    showSavings = true,
    style,
  } = element.props;

  const savings = originalPrice && discountedPrice
    ? Number(originalPrice) - Number(discountedPrice)
    : null;

  const percentOff = originalPrice && discountedPrice
    ? Math.round(((Number(originalPrice) - Number(discountedPrice)) / Number(originalPrice)) * 100)
    : type === 'percentage' ? Number(amount) : null;

  const sizes = {
    sm: { badge: 'px-1.5 py-0.5 text-xs', text: 'text-sm', icon: 'h-3 w-3' },
    md: { badge: 'px-2 py-1 text-sm', text: 'text-base', icon: 'h-4 w-4' },
    lg: { badge: 'px-3 py-1.5 text-base', text: 'text-lg', icon: 'h-5 w-5' },
  };

  const sizeConfig = sizes[size as keyof typeof sizes] || sizes.md;

  const discountLabel = label || (type === 'percentage' ? `${amount}% OFF` : `${currency}${amount} OFF`);

  if (variant === 'text') {
    return (
      <span
        className={cn('text-destructive font-medium', sizeConfig.text)}
        style={style as React.CSSProperties}
      >
        {type === 'percentage' ? (
          <>-{amount}%</>
        ) : (
          <>-{currency}{Number(amount).toFixed(2)}</>
        )}
      </span>
    );
  }

  if (variant === 'pill') {
    return (
      <span
        className={cn(
          'inline-flex items-center gap-1 bg-destructive text-destructive-foreground rounded-full font-semibold',
          sizeConfig.badge
        )}
        style={style as React.CSSProperties}
      >
        {type === 'percentage' ? (
          <>
            <Percent className={sizeConfig.icon} />
            {amount}% OFF
          </>
        ) : (
          <>
            <DollarSign className={sizeConfig.icon} />
            {Number(amount).toFixed(0)} OFF
          </>
        )}
      </span>
    );
  }

  if (variant === 'banner') {
    return (
      <div
        className="p-3 bg-destructive/10 border border-destructive/20 rounded-lg"
        style={style as React.CSSProperties}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Tag className="h-5 w-5 text-destructive" />
            <span className="font-semibold text-destructive">
              {discountLabel as React.ReactNode}
            </span>
          </div>
          {Boolean(showSavings && savings) && (
            <span className="text-sm text-muted-foreground">
              You save {currency}{(savings as number).toFixed(2)}
            </span>
          )}
        </div>
        {Boolean(originalPrice && discountedPrice) && (
          <div className="flex items-baseline gap-2 mt-2">
            <span className="text-2xl font-bold text-foreground">
              {currency}{Number(discountedPrice).toFixed(2)}
            </span>
            <span className="text-lg text-muted-foreground line-through">
              {currency}{Number(originalPrice).toFixed(2)}
            </span>
          </div>
        )}
      </div>
    );
  }

  // Default badge variant
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 bg-destructive text-destructive-foreground rounded font-semibold',
        sizeConfig.badge
      )}
      style={style as React.CSSProperties}
    >
      {type === 'percentage' ? (
        <>-{amount}%</>
      ) : (
        <>-{currency}{Number(amount).toFixed(0)}</>
      )}
    </span>
  );
};
