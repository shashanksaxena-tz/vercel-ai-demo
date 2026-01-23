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
    period = 'month',
    currency = '$',
    features = [],
    highlighted = false,
    badge,
    cta = 'Get Started',
    ctaAction,
    variant = 'default',
    style
  } = element.props;

  const featuresArray = features as Array<{
    text: string;
    included?: boolean;
  } | string>;

  const variantStyles = {
    default: 'bg-background border',
    elevated: 'bg-background border shadow-lg',
    filled: 'bg-muted border-0',
    gradient: 'bg-gradient-to-br from-primary/10 to-secondary/10 border',
  };

  return (
    <div
      className={cn(
        'relative rounded-xl p-6 transition-all duration-300',
        variantStyles[(variant as keyof typeof variantStyles) || 'default'],
        !!(highlighted) && 'border-primary ring-2 ring-primary/20 scale-105 z-10'
      )}
      style={style as React.CSSProperties}
    >
      {badge ? (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 text-xs font-medium bg-primary text-primary-foreground rounded-full whitespace-nowrap">
          {badge as string}
        </span>
      ) : null}

      <div className="text-center mb-6">
        <h3 className="text-xl font-bold">{name as string}</h3>
        {description ? (
          <p className="text-sm text-muted-foreground mt-2">
            {description as string}
          </p>
        ) : null}
      </div>

      <div className="text-center mb-6">
        {originalPrice ? (
          <span className="text-lg text-muted-foreground line-through mr-2">
            {currency as string}
            {originalPrice as string}
          </span>
        ) : null}
        <span className="text-4xl font-bold">
          {currency as string}
          {price as string}
        </span>
        <span className="text-muted-foreground">/{period as string}</span>
      </div>

      {featuresArray?.length > 0 ? (
        <ul className="space-y-3 mb-6">
          {featuresArray.map((feature, idx) => {
            const isObject = typeof feature === 'object';
            const text = isObject ? feature.text : feature;
            const included = isObject ? feature.included !== false : true;

            return (
              <li
                key={idx}
                className={cn(
                  'flex items-start gap-3',
                  !included && 'text-muted-foreground'
                )}
              >
                {included ? (
                  <Check className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                ) : (
                  <X className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                )}
                <span className="text-sm">{text}</span>
              </li>
            );
          })}
        </ul>
      ) : null}

      {children}

      <Button
        variant={highlighted ? 'default' : 'outline'}
        className="w-full"
        onClick={() => ctaAction && onAction?.({ name: ctaAction as string })}
      >
        {cta as string}
      </Button>
    </div>
  );
};
