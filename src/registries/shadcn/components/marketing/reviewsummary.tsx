'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';
import { Star } from 'lucide-react';

export const ReviewSummary = ({ element }: ComponentRenderProps) => {
  const {
    averageRating,
    totalReviews,
    ratingDistribution,
    recommendationPercentage,
    variant = 'default',
    className,
    style
  } = element.props;

  const variantStyles = {
    default: '',
    card: 'bg-background border rounded-xl p-6',
    compact: '',
  };

  const distribution = ratingDistribution as { [key: number]: number } | undefined;

  const getBarWidth = (count: number) => {
    if (!distribution || !totalReviews) return 0;
    return (count / (totalReviews as number)) * 100;
  };

  return (
    <div
      className={cn(
        variantStyles[variant as keyof typeof variantStyles] || variantStyles.default,
        className
      )}
      style={style as React.CSSProperties}
    >
      {variant === 'compact' ? (
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1">
            <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
            <span className="text-lg font-bold text-foreground">{averageRating}</span>
          </div>
          <span className="text-sm text-muted-foreground">
            ({totalReviews} {(totalReviews as number) === 1 ? 'review' : 'reviews'})
          </span>
        </div>
      ) : (
        <div className="flex flex-col md:flex-row gap-8">
          {/* Average Rating */}
          <div className="text-center md:text-left">
            <div className="text-5xl font-bold text-foreground mb-2">{averageRating}</div>
            <div className="flex gap-0.5 justify-center md:justify-start mb-2">
              {Array.from({ length: 5 }).map((_, idx) => (
                <Star
                  key={idx}
                  className={cn(
                    'h-5 w-5',
                    idx < Math.round(averageRating as number)
                      ? 'text-yellow-500 fill-yellow-500'
                      : 'text-muted-foreground/30'
                  )}
                />
              ))}
            </div>
            <p className="text-sm text-muted-foreground">
              Based on {totalReviews} {(totalReviews as number) === 1 ? 'review' : 'reviews'}
            </p>
            {recommendationPercentage !== undefined && (
              <p className="text-sm font-medium text-green-600 mt-2">
                {recommendationPercentage}% would recommend
              </p>
            )}
          </div>

          {/* Rating Distribution */}
          {distribution && (
            <div className="flex-grow space-y-2">
              {[5, 4, 3, 2, 1].map((star) => (
                <div key={star} className="flex items-center gap-3">
                  <span className="text-sm text-muted-foreground w-6">{star}</span>
                  <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                  <div className="flex-grow h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-yellow-500 rounded-full transition-all duration-500"
                      style={{ width: `${getBarWidth(distribution[star] || 0)}%` }}
                    />
                  </div>
                  <span className="text-sm text-muted-foreground w-12 text-right">
                    {distribution[star] || 0}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
