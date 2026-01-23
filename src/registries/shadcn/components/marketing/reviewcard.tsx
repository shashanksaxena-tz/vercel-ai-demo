'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';
import { Star, ThumbsUp, ThumbsDown } from 'lucide-react';

export const ReviewCard = ({ element, onAction }: ComponentRenderProps) => {
  const {
    title,
    content,
    rating,
    author,
    date,
    avatar,
    verified = false,
    pros,
    cons,
    helpful,
    notHelpful,
    variant = 'default',
    className,
    style
  } = element.props;

  const variantStyles = {
    default: 'bg-background border rounded-xl p-6',
    filled: 'bg-muted rounded-xl p-6',
    elevated: 'bg-background rounded-xl p-6 shadow-lg',
  };

  const ratingNum = rating as number;
  const prosArray = pros as string[];
  const consArray = cons as string[];

  return (
    <div
      className={cn(
        variantStyles[variant as keyof typeof variantStyles] || variantStyles.default,
        className
      )}
      style={style as React.CSSProperties}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-4 mb-4">
        <div className="flex items-center gap-3">
          {avatar ? (
            <img
              src={avatar as string}
              alt={author as string}
              className="h-12 w-12 rounded-full object-cover"
            />
          ) : (
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
              <span className="text-lg font-semibold text-primary">
                {(author as string)?.[0]?.toUpperCase()}
              </span>
            </div>
          )}
          <div>
            <div className="flex items-center gap-2">
              <span className="font-semibold text-foreground">{author as string}</span>
              {verified && (
                <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                  Verified Purchase
                </span>
              )}
            </div>
            {date && (
              <span className="text-sm text-muted-foreground">{date as string}</span>
            )}
          </div>
        </div>
      </div>

      {/* Rating */}
      {ratingNum && (
        <div className="flex items-center gap-2 mb-4">
          <div className="flex gap-0.5">
            {Array.from({ length: 5 }).map((_, idx) => (
              <Star
                key={idx}
                className={cn(
                  'h-5 w-5',
                  idx < ratingNum
                    ? 'text-yellow-500 fill-yellow-500'
                    : 'text-muted-foreground/30'
                )}
              />
            ))}
          </div>
          <span className="font-semibold text-foreground">{ratingNum}/5</span>
        </div>
      )}

      {/* Title & Content */}
      {title && (
        <h4 className="text-lg font-semibold text-foreground mb-2">{title as string}</h4>
      )}
      {content && (
        <p className="text-muted-foreground mb-4">{content as string}</p>
      )}

      {/* Pros & Cons */}
      {(prosArray?.length > 0 || consArray?.length > 0) && (
        <div className="grid md:grid-cols-2 gap-4 mb-4">
          {prosArray?.length > 0 && (
            <div>
              <p className="text-sm font-medium text-green-600 mb-2">Pros</p>
              <ul className="space-y-1">
                {prosArray.map((pro, idx) => (
                  <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                    <span className="text-green-500">+</span> {pro}
                  </li>
                ))}
              </ul>
            </div>
          )}
          {consArray?.length > 0 && (
            <div>
              <p className="text-sm font-medium text-red-600 mb-2">Cons</p>
              <ul className="space-y-1">
                {consArray.map((con, idx) => (
                  <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                    <span className="text-red-500">-</span> {con}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      {/* Helpful Actions */}
      <div className="flex items-center gap-4 pt-4 border-t">
        <span className="text-sm text-muted-foreground">Was this helpful?</span>
        <button
          className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
          onClick={() => onAction?.({ name: 'markHelpful' })}
        >
          <ThumbsUp className="h-4 w-4" />
          {helpful !== undefined && <span>({helpful as number})</span>}
        </button>
        <button
          className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
          onClick={() => onAction?.({ name: 'markNotHelpful' })}
        >
          <ThumbsDown className="h-4 w-4" />
          {notHelpful !== undefined && <span>({notHelpful as number})</span>}
        </button>
      </div>
    </div>
  );
};
