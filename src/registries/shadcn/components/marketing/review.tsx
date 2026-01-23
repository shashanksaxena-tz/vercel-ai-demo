'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';
import { Star, ThumbsUp } from 'lucide-react';

export const Review = ({ element, onAction }: ComponentRenderProps) => {
  const {
    title,
    content,
    rating,
    author,
    date,
    avatar,
    verified = false,
    helpful,
    variant = 'default',
    className,
    style
  } = element.props;

  const variantStyles = {
    default: 'border-b pb-6',
    card: 'bg-background border rounded-xl p-6',
    minimal: '',
  };

  const ratingNum = rating as number;

  return (
    <div
      className={cn(
        variantStyles[variant as keyof typeof variantStyles] || variantStyles.default,
        className
      )}
      style={style as React.CSSProperties}
    >
      <div className="flex items-start justify-between gap-4 mb-4">
        <div className="flex items-center gap-3">
          {avatar && (
            <img
              src={avatar as string}
              alt={author as string}
              className="h-10 w-10 rounded-full object-cover"
            />
          )}
          <div>
            <div className="flex items-center gap-2">
              <span className="font-medium text-foreground">{author as string}</span>
              {verified && (
                <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                  Verified
                </span>
              )}
            </div>
            {date && (
              <span className="text-sm text-muted-foreground">{date as string}</span>
            )}
          </div>
        </div>
        {ratingNum && (
          <div className="flex gap-0.5">
            {Array.from({ length: 5 }).map((_, idx) => (
              <Star
                key={idx}
                className={cn(
                  'h-4 w-4',
                  idx < ratingNum
                    ? 'text-yellow-500 fill-yellow-500'
                    : 'text-muted-foreground/30'
                )}
              />
            ))}
          </div>
        )}
      </div>

      {title && (
        <h4 className="font-semibold text-foreground mb-2">{title as string}</h4>
      )}

      {content && (
        <p className="text-muted-foreground">{content as string}</p>
      )}

      {helpful !== undefined && (
        <button
          className="flex items-center gap-2 mt-4 text-sm text-muted-foreground hover:text-foreground transition-colors"
          onClick={() => onAction?.({ name: 'markHelpful' })}
        >
          <ThumbsUp className="h-4 w-4" />
          <span>Helpful ({helpful as number})</span>
        </button>
      )}
    </div>
  );
};
