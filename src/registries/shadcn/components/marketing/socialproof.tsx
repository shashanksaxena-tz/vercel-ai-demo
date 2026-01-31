'use client';
// @ts-nocheck

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';
import { Star, Users, Download, Award } from 'lucide-react';

export const SocialProof = ({ element, children }: ComponentRenderProps) => {
  const {
    rating,
    ratingCount,
    users,
    downloads,
    awards,
    avatars,
    text,
    variant = 'default',
    layout = 'inline',
    className,
    style
  } = element.props;

  const avatarsArray = avatars as string[];

  const variantStyles = {
    default: '',
    card: 'bg-muted rounded-xl p-4',
    bordered: 'border rounded-xl p-4',
  };

  const layoutStyles = {
    inline: 'flex flex-wrap items-center gap-6',
    stacked: 'flex flex-col gap-4',
    grid: 'grid grid-cols-2 md:grid-cols-4 gap-6',
  };

  return (
    <div
      className={cn(
        variantStyles[variant as keyof typeof variantStyles] || variantStyles.default,
        layoutStyles[layout as keyof typeof layoutStyles] || layoutStyles.inline,
        className
      )}
      style={style as React.CSSProperties}
    >
      {/* Rating */}
      {rating && (
        <div className="flex items-center gap-2">
          <div className="flex gap-0.5">
            {Array.from({ length: 5 }).map((_, idx) => (
              <Star
                key={idx}
                className={cn(
                  'h-4 w-4',
                  idx < Math.floor(rating as number)
                    ? 'text-yellow-500 fill-yellow-500'
                    : 'text-muted-foreground/30'
                )}
              />
            ))}
          </div>
          <span className="text-sm font-medium text-foreground">{rating}</span>
          {ratingCount && (
            <span className="text-sm text-muted-foreground">
              ({ratingCount} reviews)
            </span>
          )}
        </div>
      )}

      {/* Users */}
      {users && (
        <div className="flex items-center gap-2">
          <Users className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm text-foreground">
            <span className="font-medium">{users}</span> users
          </span>
        </div>
      )}

      {/* Downloads */}
      {downloads && (
        <div className="flex items-center gap-2">
          <Download className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm text-foreground">
            <span className="font-medium">{downloads}</span> downloads
          </span>
        </div>
      )}

      {/* Awards */}
      {awards && (
        <div className="flex items-center gap-2">
          <Award className="h-4 w-4 text-yellow-500" />
          <span className="text-sm text-foreground">{awards}</span>
        </div>
      )}

      {/* Avatars */}
      {avatarsArray && avatarsArray.length > 0 && (
        <div className="flex items-center">
          <div className="flex -space-x-3">
            {avatarsArray.slice(0, 5).map((avatar, idx) => (
              <img
                key={idx}
                src={avatar}
                alt={`User ${idx + 1}`}
                className="h-8 w-8 rounded-full border-2 border-background object-cover"
              />
            ))}
            {avatarsArray.length > 5 && (
              <div className="h-8 w-8 rounded-full border-2 border-background bg-muted flex items-center justify-center text-xs font-medium text-muted-foreground">
                +{avatarsArray.length - 5}
              </div>
            )}
          </div>
          {text && <span className="ml-3 text-sm text-muted-foreground">{text as string}</span>}
        </div>
      )}

      {children}
    </div>
  );
};
