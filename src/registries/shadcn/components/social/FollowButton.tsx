'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';

export const FollowButton = ({ element, onAction }: ComponentRenderProps) => {
  const {
    isFollowing = false,
    size = 'md',
    variant = 'default',
    style
  } = element.props;

  const sizes = {
    sm: 'px-3 py-1 text-xs',
    md: 'px-4 py-1.5 text-sm',
    lg: 'px-5 py-2 text-base',
  };

  const variants = {
    default: isFollowing
      ? 'border hover:bg-muted hover:border-destructive hover:text-destructive'
      : 'bg-primary text-primary-foreground hover:bg-primary/90',
    outline: isFollowing
      ? 'border border-muted-foreground hover:border-destructive hover:text-destructive'
      : 'border border-primary text-primary hover:bg-primary hover:text-primary-foreground',
    ghost: isFollowing
      ? 'hover:bg-destructive/10 hover:text-destructive'
      : 'hover:bg-primary/10 text-primary',
  };

  return (
    <button
      onClick={() => onAction?.({ name: isFollowing ? 'unfollow' : 'follow' })}
      className={cn(
        'rounded-full font-medium transition-colors',
        sizes[size as keyof typeof sizes] || sizes.md,
        variants[variant as keyof typeof variants] || variants.default
      )}
      style={style as React.CSSProperties}
    >
      {isFollowing ? 'Following' : 'Follow'}
    </button>
  );
};
