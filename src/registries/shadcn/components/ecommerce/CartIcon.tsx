'use client';
// @ts-nocheck

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';
import { ShoppingCart, ShoppingBag } from 'lucide-react';

export const CartIcon = ({ element, onAction }: ComponentRenderProps) => {
  const {
    count = 0,
    variant = 'cart',
    size = 'md',
    showCount = true,
    maxCount = 99,
    style,
  } = element.props;

  const sizes = {
    sm: { button: 'h-8 w-8', icon: 'h-4 w-4', badge: 'h-4 w-4 text-[10px] -top-1 -right-1' },
    md: { button: 'h-10 w-10', icon: 'h-5 w-5', badge: 'h-5 w-5 text-xs -top-1 -right-1' },
    lg: { button: 'h-12 w-12', icon: 'h-6 w-6', badge: 'h-6 w-6 text-sm -top-2 -right-2' },
  };

  const sizeConfig = sizes[size as keyof typeof sizes] || sizes.md;
  const Icon = variant === 'bag' ? ShoppingBag : ShoppingCart;
  const displayCount = Number(count) > Number(maxCount) ? `${maxCount}+` : count;

  const handleClick = () => {
    if (onAction) {
      onAction({ name: 'openCart' });
    }
  };

  return (
    <button
      onClick={handleClick}
      className={cn(
        'relative inline-flex items-center justify-center rounded-full hover:bg-muted transition-colors',
        sizeConfig.button
      )}
      style={style as React.CSSProperties}
    >
      <Icon className={sizeConfig.icon} />
      {showCount && Number(count) > 0 && (
        <span
          className={cn(
            'absolute flex items-center justify-center rounded-full bg-primary text-primary-foreground font-medium',
            sizeConfig.badge
          )}
        >
          {displayCount}
        </span>
      )}
    </button>
  );
};
