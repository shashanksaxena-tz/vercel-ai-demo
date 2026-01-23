'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';
import { X, SlidersHorizontal, RotateCcw } from 'lucide-react';

export const FilterPanel = ({ element, children, onAction }: ComponentRenderProps) => {
  const {
    title = 'Filters',
    activeFiltersCount = 0,
    showClear = true,
    showApply = false,
    variant = 'sidebar',
    isOpen = true,
    style,
  } = element.props;

  const handleClear = () => {
    if (onAction) {
      onAction({ name: 'clearAllFilters' });
    }
  };

  const handleApply = () => {
    if (onAction) {
      onAction({ name: 'applyFilters' });
    }
  };

  const handleClose = () => {
    if (onAction) {
      onAction({ name: 'closeFilters' });
    }
  };

  if (variant === 'drawer' && !isOpen) {
    return null;
  }

  if (variant === 'drawer') {
    return (
      <>
        <div className="fixed inset-0 bg-black/50 z-40" onClick={handleClose} />
        <div
          className="fixed left-0 top-0 h-full w-full max-w-sm bg-background shadow-xl z-50 flex flex-col"
          style={style as React.CSSProperties}
        >
          <div className="flex items-center justify-between p-4 border-b">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <SlidersHorizontal className="h-5 w-5" />
              {title as string}
              {Number(activeFiltersCount) > 0 && (
                <span className="px-2 py-0.5 text-xs rounded-full bg-primary text-primary-foreground">
                  {activeFiltersCount}
                </span>
              )}
            </h2>
            <button onClick={handleClose} className="p-2 hover:bg-muted rounded-md">
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-6">{children}</div>

          <div className="p-4 border-t flex gap-3">
            {showClear && Number(activeFiltersCount) > 0 && (
              <button
                onClick={handleClear}
                className="flex-1 flex items-center justify-center gap-2 py-2 border rounded-md hover:bg-muted transition-colors"
              >
                <RotateCcw className="h-4 w-4" />
                Clear All
              </button>
            )}
            {showApply ? (
              <button
                onClick={handleApply}
                className="flex-1 py-2 bg-primary text-primary-foreground rounded-md font-medium hover:bg-primary/90 transition-colors"
              >
                Apply Filters
              </button>
            ) : (
              <button
                onClick={handleClose}
                className="flex-1 py-2 bg-primary text-primary-foreground rounded-md font-medium hover:bg-primary/90 transition-colors"
              >
                View Results
              </button>
            )}
          </div>
        </div>
      </>
    );
  }

  // Sidebar variant (default)
  return (
    <div className="space-y-6" style={style as React.CSSProperties}>
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold flex items-center gap-2">
          <SlidersHorizontal className="h-5 w-5" />
          {title as string}
          {Number(activeFiltersCount) > 0 && (
            <span className="px-2 py-0.5 text-xs rounded-full bg-primary text-primary-foreground">
              {activeFiltersCount}
            </span>
          )}
        </h2>
        {showClear && Number(activeFiltersCount) > 0 && (
          <button
            onClick={handleClear}
            className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1"
          >
            <RotateCcw className="h-3 w-3" />
            Clear
          </button>
        )}
      </div>

      <div className="space-y-6">{children}</div>

      {showApply && (
        <button
          onClick={handleApply}
          className="w-full py-2 bg-primary text-primary-foreground rounded-md font-medium hover:bg-primary/90 transition-colors"
        >
          Apply Filters
        </button>
      )}
    </div>
  );
};
