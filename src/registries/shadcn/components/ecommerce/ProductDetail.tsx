'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';
import { Star, Truck, Shield, RotateCcw } from 'lucide-react';

export const ProductDetail = ({ element, children, onAction }: ComponentRenderProps) => {
  const {
    name,
    price,
    originalPrice,
    description,
    rating,
    reviewCount,
    sku,
    inStock = true,
    stockCount,
    features,
    showFeatures = true,
    style,
  } = element.props;

  const discount = originalPrice
    ? Math.round(((Number(originalPrice) - Number(price)) / Number(originalPrice)) * 100)
    : null;

  const featuresList = features as string[] | undefined;

  return (
    <div className="space-y-6" style={style as React.CSSProperties}>
      <div className="space-y-2">
        {sku && (
          <p className="text-sm text-muted-foreground">SKU: {sku as string}</p>
        )}
        {name && (
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            {name as string}
          </h1>
        )}
        {rating !== undefined && (
          <div className="flex items-center gap-2">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={cn(
                    'h-5 w-5',
                    star <= Number(rating)
                      ? 'fill-yellow-400 text-yellow-400'
                      : 'fill-muted text-muted'
                  )}
                />
              ))}
            </div>
            <span className="text-sm font-medium">{Number(rating).toFixed(1)}</span>
            {reviewCount !== undefined && (
              <button
                onClick={() => onAction?.({ name: 'viewReviews' })}
                className="text-sm text-primary hover:underline"
              >
                ({reviewCount} reviews)
              </button>
            )}
          </div>
        )}
      </div>

      <div className="space-y-1">
        <div className="flex items-baseline gap-3">
          <span className="text-3xl font-bold text-foreground">
            ${Number(price).toFixed(2)}
          </span>
          {originalPrice && (
            <>
              <span className="text-xl text-muted-foreground line-through">
                ${Number(originalPrice).toFixed(2)}
              </span>
              <span className="text-sm font-semibold text-destructive">
                Save {discount}%
              </span>
            </>
          )}
        </div>
        {inStock ? (
          <p className="text-sm text-green-600 font-medium">
            In Stock {stockCount ? `(${stockCount} available)` : ''}
          </p>
        ) : (
          <p className="text-sm text-destructive font-medium">Out of Stock</p>
        )}
      </div>

      {description && (
        <p className="text-muted-foreground leading-relaxed">
          {description as string}
        </p>
      )}

      {showFeatures && featuresList && featuresList.length > 0 && (
        <ul className="space-y-2">
          {featuresList.map((feature, index) => (
            <li key={index} className="flex items-center gap-2 text-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              {feature}
            </li>
          ))}
        </ul>
      )}

      {children}

      <div className="grid grid-cols-3 gap-4 pt-4 border-t">
        <div className="flex items-center gap-2 text-sm">
          <Truck className="h-5 w-5 text-muted-foreground" />
          <span>Free Shipping</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <Shield className="h-5 w-5 text-muted-foreground" />
          <span>2 Year Warranty</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <RotateCcw className="h-5 w-5 text-muted-foreground" />
          <span>30 Day Returns</span>
        </div>
      </div>
    </div>
  );
};
