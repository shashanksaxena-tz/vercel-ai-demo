'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';
import { X } from 'lucide-react';

export const CTABanner = ({ element, children, onAction }: ComponentRenderProps) => {
  const {
    text,
    dismissible = false,
    position = 'top',
    variant = 'default',
    className,
    style
  } = element.props;

  const [isDismissed, setIsDismissed] = React.useState(false);

  if (isDismissed) return null;

  const variantStyles = {
    default: 'bg-primary text-primary-foreground',
    dark: 'bg-zinc-900 text-white',
    gradient: 'bg-gradient-to-r from-primary via-primary/90 to-secondary text-white',
    muted: 'bg-muted text-foreground border-y',
    warning: 'bg-yellow-500 text-black',
    success: 'bg-green-600 text-white',
  };

  const positionStyles = {
    top: 'fixed top-0 left-0 right-0 z-50',
    bottom: 'fixed bottom-0 left-0 right-0 z-50',
    inline: 'relative',
  };

  const handleDismiss = () => {
    setIsDismissed(true);
    onAction?.({ name: 'dismiss' });
  };

  return (
    <div
      className={cn(
        'py-3 px-4',
        variantStyles[variant as keyof typeof variantStyles] || variantStyles.default,
        positionStyles[position as keyof typeof positionStyles] || positionStyles.inline,
        className
      )}
      style={style as React.CSSProperties}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-center gap-4 flex-wrap">
        {text && (
          <p className="text-sm font-medium text-center">{text as string}</p>
        )}
        {children && (
          <div className="flex items-center gap-2">{children}</div>
        )}
        {dismissible && (
          <button
            onClick={handleDismiss}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-white/10 transition-colors"
            aria-label="Dismiss banner"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  );
};
