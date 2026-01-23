'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';
import { Check, X, Minus } from 'lucide-react';

export const PricingFeature = ({ element }: ComponentRenderProps) => {
  const {
    text,
    included = true,
    tooltip,
    highlight = false,
    variant = 'default',
    className,
    style
  } = element.props;

  const renderIcon = () => {
    if (included === 'partial') {
      return <Minus className="h-5 w-5 text-yellow-500 flex-shrink-0" />;
    }
    if (included) {
      return <Check className="h-5 w-5 text-green-500 flex-shrink-0" />;
    }
    return <X className="h-5 w-5 text-muted-foreground flex-shrink-0" />;
  };

  const variantStyles = {
    default: '',
    compact: 'py-1',
    spacious: 'py-3',
  };

  return (
    <li
      className={cn(
        'flex items-center gap-3',
        variantStyles[variant as keyof typeof variantStyles] || variantStyles.default,
        highlight && 'bg-primary/5 -mx-2 px-2 rounded',
        !included && 'opacity-60',
        className
      )}
      style={style as React.CSSProperties}
      title={tooltip as string}
    >
      {renderIcon()}
      <span className={cn('text-sm', highlight && 'font-medium')}>
        {text as string}
      </span>
      {tooltip && (
        <span className="ml-auto text-muted-foreground cursor-help">
          <svg
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </span>
      )}
    </li>
  );
};
