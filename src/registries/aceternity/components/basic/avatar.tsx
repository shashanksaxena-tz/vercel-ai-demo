'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';

export const Avatar = ({ element }: ComponentRenderProps) => {
  const {
    src,
    alt,
    name,
    fallback,
    size = 'default',
    variant = 'default',
    status,
    statusPosition = 'bottom-right',
    bordered,
    borderColor,
    glow,
    ring,
    style
  } = element.props;

  const altText = (alt || name || 'Avatar') as string;
  const initials = (fallback as string) || altText.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();

  const sizeStyles = {
    xs: 'w-6 h-6 text-xs',
    sm: 'w-8 h-8 text-xs',
    default: 'w-10 h-10 text-sm',
    lg: 'w-12 h-12 text-base',
    xl: 'w-16 h-16 text-lg',
    '2xl': 'w-20 h-20 text-xl',
    '3xl': 'w-24 h-24 text-2xl',
  };

  const variantStyles = {
    default: 'rounded-full',
    square: 'rounded-lg',
    rounded: 'rounded-xl',
  };

  const statusColors = {
    online: 'bg-emerald-500',
    offline: 'bg-neutral-500',
    away: 'bg-amber-500',
    busy: 'bg-rose-500',
    dnd: 'bg-red-500',
  };

  const statusPositions = {
    'top-left': 'top-0 left-0',
    'top-right': 'top-0 right-0',
    'bottom-left': 'bottom-0 left-0',
    'bottom-right': 'bottom-0 right-0',
  };

  const glowStyles = {
    cyan: 'shadow-[0_0_15px_rgba(6,182,212,0.5)]',
    purple: 'shadow-[0_0_15px_rgba(168,85,247,0.5)]',
    emerald: 'shadow-[0_0_15px_rgba(52,211,153,0.5)]',
    amber: 'shadow-[0_0_15px_rgba(251,191,36,0.5)]',
    pink: 'shadow-[0_0_15px_rgba(236,72,153,0.5)]',
  };

  const ringStyles = {
    cyan: 'ring-2 ring-cyan-500 ring-offset-2 ring-offset-neutral-900',
    purple: 'ring-2 ring-purple-500 ring-offset-2 ring-offset-neutral-900',
    emerald: 'ring-2 ring-emerald-500 ring-offset-2 ring-offset-neutral-900',
    gradient: 'ring-2 ring-offset-2 ring-offset-neutral-900 ring-transparent bg-gradient-to-r from-cyan-500 to-purple-500',
  };

  const borderStyles = {
    white: 'border-2 border-white',
    neutral: 'border-2 border-neutral-700',
    cyan: 'border-2 border-cyan-500',
    purple: 'border-2 border-purple-500',
    gradient: 'border-2 border-transparent bg-clip-padding',
  };

  return (
    <div
      className={cn(
        'relative inline-flex items-center justify-center overflow-hidden bg-neutral-800',
        sizeStyles[(size as keyof typeof sizeStyles) || 'default'],
        variantStyles[(variant as keyof typeof variantStyles) || 'default'],
        bordered ? borderStyles[(borderColor as keyof typeof borderStyles) || 'neutral'] : '',
        glow ? glowStyles[(glow as keyof typeof glowStyles) || 'cyan'] : '',
        ring ? ringStyles[(ring as keyof typeof ringStyles) || 'cyan'] : ''
      )}
      style={style as React.CSSProperties}
    >
      {src ? (
        <img
          src={src as string}
          alt={altText}
          className={cn(
            'w-full h-full object-cover',
            variantStyles[(variant as keyof typeof variantStyles) || 'default']
          )}
        />
      ) : (
        <span className="font-medium text-neutral-300">{initials}</span>
      )}
      {Boolean(status) && (
        <span
          className={cn(
            'absolute w-3 h-3 rounded-full border-2 border-neutral-900',
            statusColors[(status as keyof typeof statusColors) || 'offline'],
            statusPositions[(statusPosition as keyof typeof statusPositions) || 'bottom-right']
          )}
        />
      )}
    </div>
  );
};

export const AvatarGroup = ({ element, children }: ComponentRenderProps) => {
  const { max = 5, size = 'default', overlap = true } = element.props;
  const items = React.Children.toArray(children);
  const visible = items.slice(0, max as number);
  const remaining = items.length - (max as number);

  return (
    <div className={cn('flex', overlap ? '-space-x-3' : 'space-x-1')}>
      {visible}
      {remaining > 0 && (
        <div
          className={cn(
            'inline-flex items-center justify-center rounded-full bg-neutral-800 text-neutral-300 font-medium border-2 border-neutral-900',
            size === 'sm' && 'w-8 h-8 text-xs',
            size === 'default' && 'w-10 h-10 text-sm',
            size === 'lg' && 'w-12 h-12 text-base'
          )}
        >
          +{remaining}
        </div>
      )}
    </div>
  );
};

export const AvatarWithBadge = ({ element }: ComponentRenderProps) => {
  const { badge, badgePosition = 'bottom-right', badgeColor = 'cyan', ...rest } = element.props;

  const badgePositions = {
    'top-left': '-top-1 -left-1',
    'top-right': '-top-1 -right-1',
    'bottom-left': '-bottom-1 -left-1',
    'bottom-right': '-bottom-1 -right-1',
  };

  const badgeColors = {
    cyan: 'bg-cyan-500 text-white',
    purple: 'bg-purple-500 text-white',
    emerald: 'bg-emerald-500 text-white',
    amber: 'bg-amber-500 text-white',
    rose: 'bg-rose-500 text-white',
  };

  return (
    <div className="relative inline-block">
      <Avatar element={{ ...element, props: rest }} />
      {Boolean(badge) && (
        <span
          className={cn(
            'absolute min-w-[18px] h-[18px] px-1 rounded-full text-xs font-medium flex items-center justify-center',
            badgePositions[(badgePosition as keyof typeof badgePositions) || 'bottom-right'],
            badgeColors[(badgeColor as keyof typeof badgeColors) || 'cyan']
          )}
        >
          {badge as React.ReactNode}
        </span>
      )}
    </div>
  );
};
