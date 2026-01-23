import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

export const CTA = ({ element, children, onAction }: ComponentRenderProps) => {
  const {
    title,
    description,
    primaryAction,
    primaryLabel,
    secondaryAction,
    secondaryLabel,
    variant = 'default',
    align = 'center',
    style
  } = element.props;

  const variantStyles = {
    default: 'bg-muted rounded-2xl p-8 md:p-12',
    filled: 'bg-primary text-primary-foreground rounded-2xl p-8 md:p-12',
    gradient: 'bg-gradient-to-r from-primary to-secondary text-white rounded-2xl p-8 md:p-12',
    outline: 'border-2 rounded-2xl p-8 md:p-12',
    minimal: 'py-8',
  };

  const alignStyles = {
    left: 'text-left items-start',
    center: 'text-center items-center',
    right: 'text-right items-end',
  };

  const isFilled = variant === 'filled' || variant === 'gradient';

  return (
    <div
      className={cn(
        'flex flex-col gap-6',
        variantStyles[(variant as keyof typeof variantStyles) || 'default'],
        alignStyles[(align as keyof typeof alignStyles) || 'center']
      )}
      style={style as React.CSSProperties}
    >
      <div className={cn('space-y-4 max-w-2xl', align === 'center' && 'mx-auto')}>
        {title ? (
          <h2 className="text-2xl md:text-3xl font-bold">{title as string}</h2>
        ) : null}
        {description ? (
          <p className={cn('text-lg', isFilled ? 'opacity-90' : 'text-muted-foreground')}>
            {description as string}
          </p>
        ) : null}
      </div>

      {children}

      {(primaryLabel || secondaryLabel) ? (
        <div className={cn('flex flex-wrap gap-4', align === 'center' && 'justify-center')}>
          {primaryLabel ? (
            <Button
              size="lg"
              variant={isFilled ? 'secondary' : 'default'}
              onClick={() => primaryAction && onAction?.({ name: primaryAction as string })}
            >
              {primaryLabel as string}
            </Button>
          ) : null}
          {secondaryLabel ? (
            <Button
              size="lg"
              variant={isFilled ? 'outline' : 'outline'}
              className={isFilled ? 'border-white/30 text-white hover:bg-white/10' : ''}
              onClick={() => secondaryAction && onAction?.({ name: secondaryAction as string })}
            >
              {secondaryLabel as string}
            </Button>
          ) : null}
        </div>
      ) : null}
    </div>
  );
};
