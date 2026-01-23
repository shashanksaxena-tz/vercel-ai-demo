'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';

export const ProductVariants = ({ element, onAction }: ComponentRenderProps) => {
  const {
    variants,
    selectedVariant,
    type = 'button',
    label,
    style,
  } = element.props;

  const variantList = variants as Array<{
    id: string;
    label: string;
    value: string;
    available?: boolean;
    color?: string;
    image?: string;
  }> | undefined;

  const handleSelect = (variant: typeof variantList extends Array<infer T> ? T : never) => {
    if (variant.available !== false && onAction) {
      onAction({ name: 'selectVariant', payload: { variant } } as never);
    }
  };

  if (!variantList || variantList.length === 0) {
    return null;
  }

  return (
    <div className="space-y-3" style={style as React.CSSProperties}>
      {label && (
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">{label as string}:</span>
          {selectedVariant && (
            <span className="text-sm text-muted-foreground">
              {(variantList.find((v) => v.id === selectedVariant) as any)?.label}
            </span>
          )}
        </div>
      )}

      <div className="flex flex-wrap gap-2">
        {type === 'color' ? (
          variantList.map((variant) => (
            <button
              key={variant.id}
              onClick={() => handleSelect(variant)}
              disabled={variant.available === false}
              className={cn(
                'relative w-10 h-10 rounded-full border-2 transition-all',
                selectedVariant === variant.id
                  ? 'border-primary ring-2 ring-primary ring-offset-2'
                  : 'border-transparent hover:border-muted-foreground/50',
                variant.available === false && 'opacity-50 cursor-not-allowed'
              )}
              style={{ backgroundColor: variant.color }}
              title={variant.label}
            >
              {selectedVariant === variant.id && (
                <Check
                  className={cn(
                    'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-5 w-5',
                    variant.color && isLightColor(variant.color) ? 'text-gray-900' : 'text-white'
                  )}
                />
              )}
              {variant.available === false && (
                <span className="absolute inset-0 flex items-center justify-center">
                  <span className="w-full h-0.5 bg-muted-foreground rotate-45" />
                </span>
              )}
            </button>
          ))
        ) : type === 'image' ? (
          variantList.map((variant) => (
            <button
              key={variant.id}
              onClick={() => handleSelect(variant)}
              disabled={variant.available === false}
              className={cn(
                'relative w-16 h-16 rounded-md overflow-hidden border-2 transition-all',
                selectedVariant === variant.id
                  ? 'border-primary'
                  : 'border-transparent hover:border-muted-foreground/50',
                variant.available === false && 'opacity-50 cursor-not-allowed'
              )}
            >
              {variant.image && (
                <img
                  src={variant.image}
                  alt={variant.label}
                  className="h-full w-full object-cover"
                />
              )}
              {variant.available === false && (
                <span className="absolute inset-0 bg-background/50 flex items-center justify-center">
                  <span className="w-full h-0.5 bg-muted-foreground rotate-45" />
                </span>
              )}
            </button>
          ))
        ) : (
          variantList.map((variant) => (
            <button
              key={variant.id}
              onClick={() => handleSelect(variant)}
              disabled={variant.available === false}
              className={cn(
                'px-4 py-2 text-sm font-medium rounded-md border transition-colors',
                selectedVariant === variant.id
                  ? 'bg-primary text-primary-foreground border-primary'
                  : 'bg-background text-foreground border-input hover:bg-muted',
                variant.available === false && 'opacity-50 cursor-not-allowed line-through'
              )}
            >
              {variant.label}
            </button>
          ))
        )}
      </div>
    </div>
  );
};

function isLightColor(color: string): boolean {
  const hex = color.replace('#', '');
  const r = parseInt(hex.substr(0, 2), 16);
  const g = parseInt(hex.substr(2, 2), 16);
  const b = parseInt(hex.substr(4, 2), 16);
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;
  return brightness > 128;
}
