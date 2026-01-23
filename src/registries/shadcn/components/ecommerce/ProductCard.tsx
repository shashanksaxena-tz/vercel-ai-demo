'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';
import { Heart, ShoppingCart, Star } from 'lucide-react';

export const ProductCard = ({ element, children, onAction }: ComponentRenderProps) => {
  const {
    name,
    price,
    originalPrice,
    image,
    rating,
    reviewCount,
    badge,
    inStock = true,
    variant = 'default',
    showWishlist = true,
    showQuickAdd = true,
    style,
  } = element.props;

  const variants = {
    default: 'border rounded-lg overflow-hidden bg-card hover:shadow-lg transition-shadow',
    minimal: 'group',
    featured: 'border rounded-xl overflow-hidden bg-card shadow-md hover:shadow-xl transition-all',
  };

  const handleAddToCart = () => {
    if (onAction) {
      onAction({ name: 'addToCart', payload: { productId: element.props.id, quantity: 1 } } as never);
    }
  };

  const handleWishlist = () => {
    if (onAction) {
      onAction({ name: 'toggleWishlist', payload: { productId: element.props.id } } as never);
    }
  };

  const discount = originalPrice
    ? Math.round(((Number(originalPrice) - Number(price)) / Number(originalPrice)) * 100)
    : null;

  return (
    <div
      className={cn(variants[variant as keyof typeof variants] || variants.default)}
      style={style as React.CSSProperties}
    >
      <div className="relative aspect-square overflow-hidden bg-muted">
        {image && (
          <img
            src={image as string}
            alt={name as string}
            className="h-full w-full object-cover transition-transform group-hover:scale-105"
          />
        )}
        {badge && (
          <span className="absolute top-2 left-2 px-2 py-1 text-xs font-semibold rounded bg-primary text-primary-foreground">
            {badge as string}
          </span>
        )}
        {discount && (
          <span className="absolute top-2 right-2 px-2 py-1 text-xs font-semibold rounded bg-destructive text-destructive-foreground">
            -{discount}%
          </span>
        )}
        {showWishlist && (
          <button
            onClick={handleWishlist}
            className="absolute top-2 right-2 p-2 rounded-full bg-background/80 hover:bg-background transition-colors"
          >
            <Heart className="h-4 w-4" />
          </button>
        )}
        {showQuickAdd && inStock && (
          <button
            onClick={handleAddToCart}
            className="absolute bottom-2 left-1/2 -translate-x-1/2 px-4 py-2 bg-primary text-primary-foreground rounded-md opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-2 text-sm font-medium"
          >
            <ShoppingCart className="h-4 w-4" />
            Quick Add
          </button>
        )}
      </div>
      <div className="p-4 space-y-2">
        {name && (
          <h3 className="font-medium text-foreground line-clamp-2">{name as string}</h3>
        )}
        {rating !== undefined && (
          <div className="flex items-center gap-1">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={cn(
                    'h-4 w-4',
                    star <= Number(rating)
                      ? 'fill-yellow-400 text-yellow-400'
                      : 'fill-muted text-muted'
                  )}
                />
              ))}
            </div>
            {reviewCount !== undefined && (
              <span className="text-xs text-muted-foreground">({reviewCount})</span>
            )}
          </div>
        )}
        <div className="flex items-center gap-2">
          <span className="text-lg font-bold text-foreground">
            ${Number(price).toFixed(2)}
          </span>
          {originalPrice && (
            <span className="text-sm text-muted-foreground line-through">
              ${Number(originalPrice).toFixed(2)}
            </span>
          )}
        </div>
        {!inStock && (
          <span className="text-sm text-destructive font-medium">Out of Stock</span>
        )}
        {children}
      </div>
    </div>
  );
};
