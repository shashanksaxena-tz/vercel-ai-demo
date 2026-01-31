'use client';
// @ts-nocheck

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const PricingTier = ({ element, children, onAction }: ComponentRenderProps) => {
  const {
    name,
    description,
    price,
    currency = '$',
    period = 'month',
    features,
    highlighted = false,
    badge,
    cta = 'Choose Plan',
    ctaAction,
    icon,
    className,
    style
  } = element.props;

  const featuresArray = features as string[];

  return (
    <div
      className={cn(
        'relative rounded-2xl border bg-background p-8 flex flex-col h-full',
        highlighted && 'border-primary ring-2 ring-primary/20',
        className
      )}
      style={style as React.CSSProperties}
    >
      {badge && (
        <div className="absolute -top-4 left-0 right-0 flex justify-center">
          <span className="px-4 py-1.5 text-xs font-semibold bg-primary text-primary-foreground rounded-full">
            {badge as string}
          </span>
        </div>
      )}

      <div className="flex items-center gap-3 mb-4">
        {icon && (
          <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
            <span className="text-xl">{icon as string}</span>
          </div>
        )}
        <div>
          {name && <h3 className="text-lg font-semibold text-foreground">{name as string}</h3>}
        </div>
      </div>

      {description && (
        <p className="text-sm text-muted-foreground mb-6">{description as string}</p>
      )}

      <div className="mb-6">
        <span className="text-4xl font-bold text-foreground">
          {currency as string}
          {price}
        </span>
        {period && (
          <span className="text-muted-foreground ml-1">/{period as string}</span>
        )}
      </div>

      <Button
        variant={highlighted ? 'default' : 'outline'}
        className="w-full mb-6"
        onClick={() => ctaAction && onAction?.({ name: ctaAction as string })}
      >
        {cta as string}
      </Button>

      {featuresArray && featuresArray.length > 0 && (
        <div className="flex-grow">
          <p className="text-sm font-medium text-foreground mb-4">What's included:</p>
          <ul className="space-y-3">
            {featuresArray.map((feature, idx) => (
              <li key={idx} className="flex items-start gap-3">
                <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-sm text-muted-foreground">{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {children}
    </div>
  );
};
