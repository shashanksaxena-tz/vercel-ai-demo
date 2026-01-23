'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';
import { GitCompare, X, ArrowRight } from 'lucide-react';

export const Compare = ({ element, children, onAction }: ComponentRenderProps) => {
  const {
    items,
    maxItems = 4,
    showCompareButton = true,
    emptyMessage = 'Add products to compare',
    style,
  } = element.props;

  const compareItems = items as Array<{
    id: string;
    name: string;
    image: string;
    price: number;
  }> | undefined;

  const handleRemove = (itemId: string) => {
    if (onAction) {
      onAction({ name: 'removeFromCompare', payload: { itemId } } as never);
    }
  };

  const handleCompare = () => {
    if (onAction) {
      onAction({ name: 'viewComparison' });
    }
  };

  const handleClear = () => {
    if (onAction) {
      onAction({ name: 'clearCompare' });
    }
  };

  if (!compareItems || compareItems.length === 0) {
    return (
      <div
        className="flex flex-col items-center justify-center py-8 text-center border rounded-lg bg-muted/30"
        style={style as React.CSSProperties}
      >
        <GitCompare className="h-12 w-12 text-muted-foreground mb-3" />
        <p className="text-muted-foreground">{emptyMessage as string}</p>
        {children}
      </div>
    );
  }

  return (
    <div className="space-y-4" style={style as React.CSSProperties}>
      <div className="flex items-center justify-between">
        <h3 className="font-semibold">
          Compare ({compareItems.length}/{maxItems})
        </h3>
        <button
          onClick={handleClear}
          className="text-sm text-muted-foreground hover:text-destructive transition-colors"
        >
          Clear All
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {compareItems.map((item) => (
          <div
            key={item.id}
            className="relative group border rounded-lg p-2 bg-background"
          >
            <button
              onClick={() => handleRemove(item.id)}
              className="absolute -top-2 -right-2 p-1 bg-background border rounded-full shadow-sm opacity-0 group-hover:opacity-100 transition-opacity hover:bg-destructive hover:text-destructive-foreground"
            >
              <X className="h-3 w-3" />
            </button>
            <div className="aspect-square rounded overflow-hidden bg-muted mb-2">
              <img
                src={item.image}
                alt={item.name}
                className="h-full w-full object-cover"
              />
            </div>
            <p className="text-xs font-medium truncate">{item.name}</p>
            <p className="text-xs text-muted-foreground">${item.price.toFixed(2)}</p>
          </div>
        ))}
        {Array.from({ length: Number(maxItems) - compareItems.length }).map((_, i) => (
          <div
            key={`empty-${i}`}
            className="aspect-square border-2 border-dashed rounded-lg flex items-center justify-center"
          >
            <span className="text-xs text-muted-foreground">Add product</span>
          </div>
        ))}
      </div>

      {showCompareButton && compareItems.length >= 2 && (
        <button
          onClick={handleCompare}
          className="w-full flex items-center justify-center gap-2 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
        >
          <span>Compare Products</span>
          <ArrowRight className="h-4 w-4" />
        </button>
      )}
      {children}
    </div>
  );
};
