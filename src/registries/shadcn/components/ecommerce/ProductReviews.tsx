'use client';
// @ts-nocheck

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';
import { Star, ThumbsUp, ThumbsDown, CheckCircle } from 'lucide-react';

export const ProductReviews = ({ element, children, onAction }: ComponentRenderProps) => {
  const {
    reviews,
    averageRating,
    totalReviews,
    ratingDistribution,
    showSummary = true,
    showWriteReview = true,
    style,
  } = element.props;

  const reviewList = reviews as Array<{
    id: string;
    author: string;
    rating: number;
    title?: string;
    content: string;
    date: string;
    verified?: boolean;
    helpful?: number;
    notHelpful?: number;
  }> | undefined;

  const distribution = ratingDistribution as Record<string, number> | undefined;

  const handleWriteReview = () => {
    if (onAction) {
      onAction({ name: 'writeReview' });
    }
  };

  const handleHelpful = (reviewId: string, helpful: boolean) => {
    if (onAction) {
      onAction({ name: 'markHelpful', payload: { reviewId, helpful } } as never);
    }
  };

  return (
    <div className="space-y-6" style={style as React.CSSProperties}>
      {showSummary && (
        <div className="flex flex-col sm:flex-row gap-6 p-6 bg-muted/50 rounded-lg">
          <div className="text-center">
            <div className="text-5xl font-bold text-foreground">
              {Number(averageRating || 0).toFixed(1)}
            </div>
            <div className="flex justify-center mt-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={cn(
                    'h-5 w-5',
                    star <= Math.round(Number(averageRating || 0))
                      ? 'fill-yellow-400 text-yellow-400'
                      : 'fill-muted text-muted'
                  )}
                />
              ))}
            </div>
            <p className="text-sm text-muted-foreground mt-1">
              Based on {totalReviews || 0} reviews
            </p>
          </div>

          {distribution && (
            <div className="flex-1 space-y-2">
              {[5, 4, 3, 2, 1].map((rating) => {
                const count = distribution[rating] || 0;
                const percentage = totalReviews
                  ? Math.round((count / Number(totalReviews)) * 100)
                  : 0;
                return (
                  <div key={rating} className="flex items-center gap-2">
                    <span className="text-sm w-8">{rating} star</span>
                    <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-yellow-400 rounded-full"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                    <span className="text-sm text-muted-foreground w-12">
                      {percentage}%
                    </span>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {showWriteReview && (
        <button
          onClick={handleWriteReview}
          className="w-full sm:w-auto px-6 py-2 border border-primary text-primary rounded-md hover:bg-primary hover:text-primary-foreground transition-colors"
        >
          Write a Review
        </button>
      )}

      <div className="space-y-6">
        {reviewList?.map((review) => (
          <div key={review.id} className="border-b pb-6 last:border-b-0">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-medium">{review.author}</span>
                  {review.verified && (
                    <span className="flex items-center gap-1 text-xs text-green-600">
                      <CheckCircle className="h-3 w-3" />
                      Verified Purchase
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2 mt-1">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={cn(
                          'h-4 w-4',
                          star <= review.rating
                            ? 'fill-yellow-400 text-yellow-400'
                            : 'fill-muted text-muted'
                        )}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-muted-foreground">{review.date}</span>
                </div>
              </div>
            </div>
            {review.title && (
              <h4 className="font-semibold mt-3">{review.title}</h4>
            )}
            <p className="text-muted-foreground mt-2">{review.content}</p>
            <div className="flex items-center gap-4 mt-4">
              <span className="text-sm text-muted-foreground">Helpful?</span>
              <button
                onClick={() => handleHelpful(review.id, true)}
                className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
              >
                <ThumbsUp className="h-4 w-4" />
                {review.helpful || 0}
              </button>
              <button
                onClick={() => handleHelpful(review.id, false)}
                className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
              >
                <ThumbsDown className="h-4 w-4" />
                {review.notHelpful || 0}
              </button>
            </div>
          </div>
        ))}
      </div>

      {children}
    </div>
  );
};
