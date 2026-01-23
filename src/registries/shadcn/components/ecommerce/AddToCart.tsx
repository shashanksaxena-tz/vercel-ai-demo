'use client';

import React, { useState } from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';
import { ShoppingCart, Minus, Plus, Loader2, Check } from 'lucide-react';

export const AddToCart = ({ element, onAction }: ComponentRenderProps) => {
  const {
    productId,
    quantity: initialQuantity = 1,
    maxQuantity = 99,
    minQuantity = 1,
    showQuantity = true,
    disabled = false,
    inStock = true,
    variant = 'default',
    size = 'md',
    label = 'Add to Cart',
    style,
  } = element.props;

  const [quantity, setQuantity] = useState(Number(initialQuantity) || 1);
  const [isLoading, setIsLoading] = useState(false);
  const [isAdded, setIsAdded] = useState(false);

  const variants = {
    default: 'bg-primary text-primary-foreground hover:bg-primary/90',
    outline: 'border border-primary text-primary hover:bg-primary hover:text-primary-foreground',
    secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
  };

  const sizes = {
    sm: 'h-8 px-3 text-sm',
    md: 'h-10 px-4 text-sm',
    lg: 'h-12 px-6 text-base',
    xl: 'h-14 px-8 text-lg',
  };

  const handleQuantityChange = (newQuantity: number) => {
    const min = Number(minQuantity) || 1;
    const max = Number(maxQuantity) || 99;
    const clamped = Math.min(Math.max(newQuantity, min), max);
    setQuantity(clamped);
  };

  const handleAddToCart = async () => {
    if (disabled || !inStock || isLoading) return;

    setIsLoading(true);
    try {
      if (onAction) {
        await onAction({
          name: 'addToCart',
          payload: { productId, quantity },
        });
      }
      setIsAdded(true);
      setTimeout(() => setIsAdded(false), 2000);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center gap-3" style={style as React.CSSProperties}>
      {showQuantity && inStock && (
        <div className="flex items-center border rounded-md">
          <button
            onClick={() => handleQuantityChange(quantity - 1)}
            disabled={quantity <= Number(minQuantity)}
            className="p-2 hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Minus className="h-4 w-4" />
          </button>
          <input
            type="number"
            value={quantity}
            onChange={(e) => handleQuantityChange(parseInt(e.target.value) || 1)}
            min={Number(minQuantity)}
            max={Number(maxQuantity)}
            className="w-12 text-center border-x bg-transparent py-2 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          />
          <button
            onClick={() => handleQuantityChange(quantity + 1)}
            disabled={quantity >= Number(maxQuantity)}
            className="p-2 hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>
      )}

      <button
        onClick={handleAddToCart}
        disabled={disabled || !inStock || isLoading}
        className={cn(
          'flex-1 inline-flex items-center justify-center gap-2 font-medium rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed',
          variants[variant as keyof typeof variants] || variants.default,
          sizes[size as keyof typeof sizes] || sizes.md
        )}
      >
        {isLoading ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : isAdded ? (
          <Check className="h-4 w-4" />
        ) : (
          <ShoppingCart className="h-4 w-4" />
        )}
        {!inStock ? 'Out of Stock' : isAdded ? 'Added!' : (label as string)}
      </button>
    </div>
  );
};
