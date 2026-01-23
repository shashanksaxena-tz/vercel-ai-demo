'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';

export const ProductPrice = ({ element }: ComponentRenderProps) => {
  const {
    price,
    originalPrice,
    currency = '$',
    size = 'md',
    showDiscount = true,
    discountStyle = 'percentage',
    style,
  } = element.props;

  const sizes = {
    sm: { price: 'text-lg', original: 'text-sm', discount: 'text-xs' },
    md: { price: 'text-2xl', original: 'text-base', discount: 'text-sm' },
    lg: { price: 'text-3xl', original: 'text-lg', discount: 'text-base' },
    xl: { price: 'text-4xl', original: 'text-xl', discount: 'text-lg' },
  };

  const sizeConfig = sizes[size as keyof typeof sizes] || sizes.md;

  const discount = originalPrice && Number(originalPrice) > Number(price)
    ? Math.round(((Number(originalPrice) - Number(price)) / Number(originalPrice)) * 100)
    : null;

  const savings = originalPrice && Number(originalPrice) > Number(price)
    ? Number(originalPrice) - Number(price)
    : null;

  return (
    <div className="flex flex-wrap items-baseline gap-2" style={style as React.CSSProperties}>
      <span className={cn('font-bold text-foreground', sizeConfig.price)}>
        {currency}{Number(price).toFixed(2)}
      </span>
      {originalPrice && Number(originalPrice) > Number(price) && (
        <>
          <span className={cn('text-muted-foreground line-through', sizeConfig.original)}>
            {currency}{Number(originalPrice).toFixed(2)}
          </span>
          {showDiscount && discount && (
            <span className={cn('font-semibold text-destructive', sizeConfig.discount)}>
              {discountStyle === 'percentage' ? (
                <>-{discount}%</>
              ) : (
                <>Save {currency}{savings?.toFixed(2)}</>
              )}
            </span>
          )}
        </>
      )}
    </div>
  );
};
