'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';
import { Star } from 'lucide-react';

export const TestimonialCard = ({ element }: ComponentRenderProps) => {
  const {
    quote,
    author,
    role,
    company,
    avatar,
    rating,
    logo,
    variant = 'default',
    size = 'md',
    className,
    style
  } = element.props;

  const variantStyles = {
    default: 'bg-background border rounded-2xl',
    filled: 'bg-muted rounded-2xl',
    elevated: 'bg-background rounded-2xl shadow-xl',
    gradient: 'bg-gradient-to-br from-primary/10 to-secondary/10 rounded-2xl',
  };

  const sizeStyles = {
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  };

  const ratingNum = rating as number;

  return (
    <div
      className={cn(
        variantStyles[variant as keyof typeof variantStyles] || variantStyles.default,
        sizeStyles[size as keyof typeof sizeStyles] || sizeStyles.md,
        'flex flex-col h-full',
        className
      )}
      style={style as React.CSSProperties}
    >
      {logo && (
        <img
          src={logo as string}
          alt="Company logo"
          className="h-8 w-auto mb-4 opacity-60"
        />
      )}

      {ratingNum && ratingNum > 0 && (
        <div className="flex gap-0.5 mb-4">
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
      )}

      <blockquote className="text-foreground leading-relaxed flex-grow mb-6">
        "{quote as string}"
      </blockquote>

      <div className="flex items-center gap-4 pt-4 border-t">
        {avatar && (
          <img
            src={avatar as string}
            alt={author as string}
            className="h-12 w-12 rounded-full object-cover ring-2 ring-background"
          />
        )}
        <div className="min-w-0">
          <p className="font-semibold text-foreground truncate">{author as string}</p>
          {(role || company) && (
            <p className="text-sm text-muted-foreground truncate">
              {role && (role as string)}
              {role && company && ', '}
              {company && (company as string)}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
