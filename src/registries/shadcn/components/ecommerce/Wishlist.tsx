'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';
import { Heart, Trash2 } from 'lucide-react';

export const Wishlist = ({ element, children, onAction }: ComponentRenderProps) => {
  const {
    items,
    emptyMessage = 'Your wishlist is empty',
    showRemove = true,
    showAddToCart = true,
    style,
  } = element.props;

  const wishlistItems = items as Array<{
    id: string;
    name: string;
    price: number;
    originalPrice?: number;
    image: string;
    inStock?: boolean;
  }> | undefined;

  const handleRemove = (itemId: string) => {
    if (onAction) {
      onAction({ name: 'removeFromWishlist', payload: { itemId } } as never);
    }
  };

  const handleAddToCart = (item: typeof wishlistItems extends Array<infer T> ? T : never) => {
    if (onAction) {
      onAction({ name: 'addToCartFromWishlist', payload: { itemId: item.id } } as never);
    }
  };

  const handleClearAll = () => {
    if (onAction) {
      onAction({ name: 'clearWishlist' });
    }
  };

  if (!wishlistItems || wishlistItems.length === 0) {
    return (
      <div
        className="flex flex-col items-center justify-center py-12 text-center"
        style={style as React.CSSProperties}
      >
        <Heart className="h-16 w-16 text-muted-foreground mb-4" />
        <p className="text-lg text-muted-foreground">{emptyMessage as string}</p>
        {children}
      </div>
    );
  }

  return (
    <div className="space-y-4" style={style as React.CSSProperties}>
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">
          Wishlist ({wishlistItems.length} {wishlistItems.length === 1 ? 'item' : 'items'})
        </h2>
        <button
          onClick={handleClearAll}
          className="text-sm text-muted-foreground hover:text-destructive transition-colors"
        >
          Clear All
        </button>
      </div>

      <div className="divide-y">
        {wishlistItems.map((item) => (
          <div key={item.id} className="py-4 flex gap-4">
            <div className="w-24 h-24 rounded-md overflow-hidden bg-muted flex-shrink-0">
              <img
                src={item.image}
                alt={item.name}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-medium truncate">{item.name}</h3>
              <div className="flex items-center gap-2 mt-1">
                <span className="font-bold">${item.price.toFixed(2)}</span>
                {item.originalPrice && item.originalPrice > item.price && (
                  <span className="text-sm text-muted-foreground line-through">
                    ${item.originalPrice.toFixed(2)}
                  </span>
                )}
              </div>
              {item.inStock === false && (
                <span className="text-sm text-destructive">Out of Stock</span>
              )}
              <div className="flex gap-2 mt-3">
                {showAddToCart && item.inStock !== false && (
                  <button
                    onClick={() => handleAddToCart(item)}
                    className="text-sm px-3 py-1 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
                  >
                    Add to Cart
                  </button>
                )}
                {showRemove && (
                  <button
                    onClick={() => handleRemove(item.id)}
                    className="text-sm px-3 py-1 text-muted-foreground hover:text-destructive transition-colors"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      {children}
    </div>
  );
};
