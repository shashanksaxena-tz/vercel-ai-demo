import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const Pricing = ({ element, onAction }: ComponentRenderProps) => {
  const {
    plans,
    columns = 3,
    style
  } = element.props;

  const plansArray = plans as Array<{
    name: string;
    description?: string;
    price: string | number;
    period?: string;
    currency?: string;
    features: string[];
    highlighted?: boolean;
    badge?: string;
    cta?: string;
    ctaAction?: string;
  }>;

  return (
    <div
      className={cn('grid gap-6')}
      style={{
        gridTemplateColumns: `repeat(${Math.min(columns as number, plansArray?.length || 1)}, minmax(0, 1fr))`,
        ...(style as React.CSSProperties),
      }}
    >
      {plansArray?.map((plan, idx) => (
        <div
          key={idx}
          className={cn(
            'relative rounded-xl border bg-background p-6 shadow-sm transition-shadow hover:shadow-md',
            plan.highlighted && 'border-primary shadow-lg scale-105 z-10'
          )}
        >
          {plan.badge && (
            <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 text-xs font-medium bg-primary text-primary-foreground rounded-full">
              {plan.badge}
            </span>
          )}
          <div className="text-center mb-6">
            <h3 className="text-xl font-bold">{plan.name}</h3>
            {plan.description && (
              <p className="text-sm text-muted-foreground mt-2">
                {plan.description}
              </p>
            )}
          </div>
          <div className="text-center mb-6">
            <span className="text-4xl font-bold">
              {plan.currency || '$'}
              {plan.price}
            </span>
            {plan.period && (
              <span className="text-muted-foreground">/{plan.period}</span>
            )}
          </div>
          <ul className="space-y-3 mb-6">
            {plan.features.map((feature, featureIdx) => (
              <li key={featureIdx} className="flex items-start gap-3">
                <Check className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span className="text-sm">{feature}</span>
              </li>
            ))}
          </ul>
          <Button
            variant={plan.highlighted ? 'default' : 'outline'}
            className="w-full"
            onClick={() =>
              plan.ctaAction && onAction?.({ name: plan.ctaAction })
            }
          >
            {plan.cta || 'Get Started'}
          </Button>
        </div>
      ))}
    </div>
  );
};
