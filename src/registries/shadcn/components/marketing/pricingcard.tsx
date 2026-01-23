'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';
import { Check, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const PricingCard = ({ element, children, onAction }: ComponentRenderProps) => {
  const {
    name,
    description,
    price,
    originalPrice,
    currency = '$',
    period = 'month',
    features,
    highlighted = false,
    badge,
    cta = 'Get Started',
    ctaAction,
    variant = 'default',
    className,
    style
  } = element.props;

  const variantStyles = {
    default: 'bg-background border',
    filled: 'bg-muted',
    outlined: 'border-2',
    elevated: 'bg-background shadow-xl',
  };

  const featuresArray = features as Array<{
    text: string;
    included?: boolean;
  } | string>;

  return (
    <div
      className={cn(
        'relative rounded-2xl p-6 md:p-8 flex flex-col h-full transition-all',
        variantStyles[variant as keyof typeof variantStyles] || variantStyles.default,
        highlighted && 'border-primary shadow-lg scale-[1.02] z-10',
        className
      )}
      style={style as React.CSSProperties}
    >
      {badge && (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 text-xs font-semibold bg-primary text-primary-foreground rounded-full">
          {badge as string}
        </span>
      )}

      <div className="mb-6">
        {name && <h3 className="text-xl font-bold text-foreground">{name as string}</h3>}
        {description && (
          <p className="text-sm text-muted-foreground mt-2">{description as string}</p>
        )}
      </div>

      <div className="mb-6">
        <div className="flex items-baseline gap-1">
          <span className="text-4xl md:text-5xl font-bold text-foreground">
            {currency as string}
            {price}
          </span>
          {period && (
            <span className="text-muted-foreground">/{period as string}</span>
          )}
        </div>
        {originalPrice && (
          <span className="text-sm text-muted-foreground line-through">
            {currency as string}{originalPrice}
          </span>
        )}
      </div>

      {featuresArray && featuresArray.length > 0 && (
        <ul className="space-y-3 mb-8 flex-grow">
          {featuresArray.map((feature, idx) => {
            const isObject = typeof feature === 'object';
            const text = isObject ? feature.text : feature;
            const included = isObject ? feature.included !== false : true;

            return (
              <li key={idx} className="flex items-start gap-3">
                {included ? (
                  <Check className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                ) : (
                  <X className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                )}
                <span className={cn('text-sm', !included && 'text-muted-foreground')}>
                  {text}
                </span>
              </li>
            );
          })}
        </ul>
      )}

      {children && <div className="mb-6">{children}</div>}

      <Button
        variant={highlighted ? 'default' : 'outline'}
        className="w-full mt-auto"
        onClick={() => ctaAction && onAction?.({ name: ctaAction as string })}
      >
        {cta as string}
      </Button>
    </div>
  );
};
