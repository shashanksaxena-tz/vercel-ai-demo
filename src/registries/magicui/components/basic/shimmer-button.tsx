'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';

export const ShimmerButton = ({ element, onAction, children }: ComponentRenderProps) => {
  const { variant = 'default', size = 'default', label, action, disabled, className, style } = element.props;

  const sizes = {
    sm: 'h-8 px-3 text-xs',
    default: 'h-10 px-4 py-2',
    lg: 'h-12 px-8 text-lg',
  };

  const handleClick = () => {
    if (action && onAction) {
      onAction({ name: action as string });
    }
  };

  return (
    <button
      className={cn(
        'group relative inline-flex items-center justify-center rounded-md font-medium',
        'bg-gradient-to-r from-primary via-primary/90 to-primary',
        'text-primary-foreground',
        'transition-all duration-300',
        'hover:shadow-[0_0_20px_rgba(var(--primary),0.5)]',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
        'overflow-hidden',
        sizes[(size as keyof typeof sizes)] || sizes.default,
        disabled && 'opacity-50 cursor-not-allowed',
        className as string
      )}
      onClick={handleClick}
      disabled={disabled as boolean}
      style={style as React.CSSProperties}
    >
      {/* Shimmer effect */}
      <span
        className={cn(
          'absolute inset-0 overflow-hidden rounded-md',
          'before:absolute before:inset-0',
          'before:bg-gradient-to-r before:from-transparent before:via-white/30 before:to-transparent',
          'before:translate-x-[-200%] before:skew-x-[-20deg]',
          'before:animate-[shimmer_2s_infinite]',
          'before:transition-transform'
        )}
      />
      <span className="relative z-10 flex items-center gap-2">
        {(label as string) || children}
      </span>
      <style jsx>{`
        @keyframes shimmer {
          100% {
            transform: translateX(200%) skewX(-20deg);
          }
        }
      `}</style>
    </button>
  );
};
