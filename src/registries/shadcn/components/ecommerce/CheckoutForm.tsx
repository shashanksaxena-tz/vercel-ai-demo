'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

export const CheckoutForm = ({ element, children, onAction }: ComponentRenderProps) => {
  const {
    title,
    description,
    submitLabel = 'Continue',
    backLabel = 'Back',
    showBack = false,
    isLoading = false,
    isLastStep = false,
    style,
  } = element.props;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onAction) {
      onAction({ name: 'submitCheckoutStep' });
    }
  };

  const handleBack = () => {
    if (onAction) {
      onAction({ name: 'previousCheckoutStep' });
    }
  };

  return (
    <form onSubmit={handleSubmit} style={style as React.CSSProperties}>
      {(title || description) && (
        <div className="mb-6">
          {title && <h2 className="text-xl font-semibold">{title as string}</h2>}
          {description && (
            <p className="text-muted-foreground mt-1">{description as string}</p>
          )}
        </div>
      )}

      <div className="space-y-4">{children}</div>

      <div className={cn('flex gap-4 mt-8', showBack ? 'justify-between' : 'justify-end')}>
        {showBack && (
          <button
            type="button"
            onClick={handleBack}
            disabled={isLoading}
            className="px-6 py-2 border rounded-md hover:bg-muted transition-colors disabled:opacity-50"
          >
            {backLabel as string}
          </button>
        )}
        <button
          type="submit"
          disabled={isLoading}
          className={cn(
            'px-6 py-2 bg-primary text-primary-foreground rounded-md font-medium hover:bg-primary/90 transition-colors disabled:opacity-50 flex items-center gap-2',
            isLastStep && 'bg-green-600 hover:bg-green-700'
          )}
        >
          {isLoading && <Loader2 className="h-4 w-4 animate-spin" />}
          {isLastStep ? 'Place Order' : (submitLabel as string)}
        </button>
      </div>
    </form>
  );
};
