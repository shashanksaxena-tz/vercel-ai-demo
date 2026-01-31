'use client';
// @ts-nocheck

import React, { useState } from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';
import { Zap, Loader2 } from 'lucide-react';

export const BuyNow = ({ element, onAction }: ComponentRenderProps) => {
  const {
    productId,
    quantity = 1,
    disabled = false,
    inStock = true,
    variant = 'default',
    size = 'md',
    label = 'Buy Now',
    showIcon = true,
    style,
  } = element.props;

  const [isLoading, setIsLoading] = useState(false);

  const variants = {
    default: 'bg-primary text-primary-foreground hover:bg-primary/90',
    secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
    accent: 'bg-yellow-500 text-yellow-950 hover:bg-yellow-400',
    outline: 'border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground',
  };

  const sizes = {
    sm: 'h-8 px-3 text-sm',
    md: 'h-10 px-4 text-sm',
    lg: 'h-12 px-6 text-base',
    xl: 'h-14 px-8 text-lg',
  };

  const handleBuyNow = async () => {
    if (disabled || !inStock || isLoading) return;

    setIsLoading(true);
    try {
      if (onAction) {
        await onAction({
          name: 'buyNow',
          payload: { productId, quantity: Number(quantity) },
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleBuyNow}
      disabled={disabled || !inStock || isLoading}
      className={cn(
        'w-full inline-flex items-center justify-center gap-2 font-semibold rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed',
        variants[variant as keyof typeof variants] || variants.default,
        sizes[size as keyof typeof sizes] || sizes.md
      )}
      style={style as React.CSSProperties}
    >
      {isLoading ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : showIcon ? (
        <Zap className="h-4 w-4" />
      ) : null}
      {!inStock ? 'Out of Stock' : (label as string)}
    </button>
  );
};
