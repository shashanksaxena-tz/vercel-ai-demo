'use client';
// @ts-nocheck

import React, { useState } from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';
import { Heart, Loader2 } from 'lucide-react';

export const WishlistButton = ({ element, onAction }: ComponentRenderProps) => {
  const {
    productId,
    isWishlisted = false,
    variant = 'icon',
    size = 'md',
    label = 'Add to Wishlist',
    labelWishlisted = 'Remove from Wishlist',
    showLabel = false,
    style,
  } = element.props;

  const [isLoading, setIsLoading] = useState(false);
  const [wishlisted, setWishlisted] = useState(Boolean(isWishlisted));

  const sizes = {
    sm: 'h-8 w-8',
    md: 'h-10 w-10',
    lg: 'h-12 w-12',
  };

  const iconSizes = {
    sm: 'h-4 w-4',
    md: 'h-5 w-5',
    lg: 'h-6 w-6',
  };

  const handleToggle = async () => {
    if (isLoading) return;

    setIsLoading(true);
    try {
      const newState = !wishlisted;
      setWishlisted(newState);
      if (onAction) {
        await onAction({
          name: newState ? 'addToWishlist' : 'removeFromWishlist',
          payload: { productId },
        });
      }
    } catch {
      setWishlisted(wishlisted);
    } finally {
      setIsLoading(false);
    }
  };

  if (variant === 'button') {
    return (
      <button
        onClick={handleToggle}
        disabled={isLoading}
        className={cn(
          'inline-flex items-center gap-2 px-4 py-2 rounded-md border transition-colors',
          wishlisted
            ? 'bg-pink-50 border-pink-200 text-pink-600 hover:bg-pink-100'
            : 'bg-background border-input text-foreground hover:bg-muted'
        )}
        style={style as React.CSSProperties}
      >
        {isLoading ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <Heart
            className={cn(
              'h-4 w-4',
              wishlisted && 'fill-pink-500 text-pink-500'
            )}
          />
        )}
        <span className="text-sm font-medium">
          {wishlisted ? (labelWishlisted as string) : (label as string)}
        </span>
      </button>
    );
  }

  return (
    <button
      onClick={handleToggle}
      disabled={isLoading}
      className={cn(
        'inline-flex items-center justify-center rounded-full transition-colors',
        variant === 'outline'
          ? 'border bg-background hover:bg-muted'
          : 'bg-background/80 hover:bg-background shadow-sm',
        sizes[size as keyof typeof sizes] || sizes.md
      )}
      style={style as React.CSSProperties}
      title={wishlisted ? (labelWishlisted as string) : (label as string)}
    >
      {isLoading ? (
        <Loader2
          className={cn(
            'animate-spin',
            iconSizes[size as keyof typeof iconSizes] || iconSizes.md
          )}
        />
      ) : (
        <Heart
          className={cn(
            iconSizes[size as keyof typeof iconSizes] || iconSizes.md,
            wishlisted
              ? 'fill-pink-500 text-pink-500'
              : 'text-muted-foreground hover:text-pink-500'
          )}
        />
      )}
      {showLabel && (
        <span className="sr-only">
          {wishlisted ? (labelWishlisted as string) : (label as string)}
        </span>
      )}
    </button>
  );
};
