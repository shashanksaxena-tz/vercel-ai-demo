'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';

export const Mention = ({ element, onAction }: ComponentRenderProps) => {
  const {
    username,
    userId,
    displayName,
    avatar,
    variant = 'default',
    style
  } = element.props;

  const variants = {
    default: 'bg-primary/10 text-primary hover:bg-primary/20',
    subtle: 'text-primary hover:underline',
    bold: 'bg-primary text-primary-foreground',
  };

  return (
    <button
      onClick={() => onAction?.({ name: 'viewProfile', payload: { userId, username } })}
      className={cn(
        'inline-flex items-center gap-1 px-1 py-0.5 rounded text-sm font-medium cursor-pointer transition-colors',
        variants[variant as keyof typeof variants] || variants.default
      )}
      style={style as React.CSSProperties}
    >
      {avatar && (
        <img src={avatar as string} alt="" className="w-4 h-4 rounded-full" />
      )}
      <span>@{displayName || username}</span>
    </button>
  );
};
