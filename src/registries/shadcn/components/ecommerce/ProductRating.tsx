'use client';
// @ts-nocheck

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';
import { Star, StarHalf } from 'lucide-react';

export const ProductRating = ({ element, onAction }: ComponentRenderProps) => {
  const {
    rating,
    maxRating = 5,
    reviewCount,
    showValue = true,
    showReviewCount = true,
    size = 'md',
    interactive = false,
    style,
  } = element.props;

  const sizes = {
    sm: { star: 'h-3 w-3', text: 'text-xs' },
    md: { star: 'h-4 w-4', text: 'text-sm' },
    lg: { star: 'h-5 w-5', text: 'text-base' },
    xl: { star: 'h-6 w-6', text: 'text-lg' },
  };

  const sizeConfig = sizes[size as keyof typeof sizes] || sizes.md;
  const ratingValue = Number(rating) || 0;
  const max = Number(maxRating) || 5;

  const handleStarClick = (value: number) => {
    if (interactive && onAction) {
      onAction({ name: 'rateProduct', payload: { rating: value } } as never);
    }
  };

  const handleReviewClick = () => {
    if (onAction) {
      onAction({ name: 'viewReviews' });
    }
  };

  const renderStar = (index: number) => {
    const filled = index < Math.floor(ratingValue);
    const half = !filled && index < ratingValue && ratingValue % 1 >= 0.5;

    if (half) {
      return (
        <div className="relative">
          <Star className={cn(sizeConfig.star, 'fill-muted text-muted')} />
          <StarHalf className={cn(sizeConfig.star, 'absolute top-0 left-0 fill-yellow-400 text-yellow-400')} />
        </div>
      );
    }

    return (
      <Star
        className={cn(
          sizeConfig.star,
          filled ? 'fill-yellow-400 text-yellow-400' : 'fill-muted text-muted'
        )}
      />
    );
  };

  return (
    <div className="flex items-center gap-2" style={style as React.CSSProperties}>
      <div className={cn('flex gap-0.5', interactive && 'cursor-pointer')}>
        {Array.from({ length: max }, (_, i) => (
          <button
            key={i}
            onClick={() => handleStarClick(i + 1)}
            disabled={!interactive}
            className={cn(
              'focus:outline-none',
              interactive && 'hover:scale-110 transition-transform'
            )}
          >
            {renderStar(i)}
          </button>
        ))}
      </div>
      {showValue && (
        <span className={cn('font-medium text-foreground', sizeConfig.text)}>
          {ratingValue.toFixed(1)}
        </span>
      )}
      {showReviewCount && reviewCount !== undefined && (
        <button
          onClick={handleReviewClick}
          className={cn(
            'text-muted-foreground hover:text-foreground transition-colors',
            sizeConfig.text
          )}
        >
          ({reviewCount} reviews)
        </button>
      )}
    </div>
  );
};
