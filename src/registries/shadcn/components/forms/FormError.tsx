'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';
import { AlertCircle, XCircle } from 'lucide-react';

export const FormError = ({ element }: ComponentRenderProps) => {
  const {
    message,
    errors = [],
    variant = 'inline',
    showIcon = true,
    dismissible = false,
    style
  } = element.props;

  const [dismissed, setDismissed] = React.useState(false);

  const errorsArray = (errors as string[]) || [];
  const hasErrors = message || errorsArray.length > 0;

  if (dismissed || !hasErrors) return null;

  if (variant === 'banner') {
    return (
      <div
        className={cn(
          'w-full p-4 rounded-md bg-destructive/10 border border-destructive',
          'flex items-start gap-3'
        )}
        style={style as React.CSSProperties}
      >
        {showIcon && (
          <AlertCircle className="h-5 w-5 text-destructive flex-shrink-0 mt-0.5" />
        )}
        <div className="flex-1">
          {message ? (
            <p className="text-sm font-medium text-destructive">{message as string}</p>
          ) : null}
          {errorsArray.length > 0 && (
            <ul className={cn('text-sm text-destructive', message && 'mt-2')}>
              {errorsArray.map((error, index) => (
                <li key={index} className="list-disc ml-4">{error}</li>
              ))}
            </ul>
          )}
        </div>
        {dismissible && (
          <button
            type="button"
            className="text-destructive hover:text-destructive/80"
            onClick={() => setDismissed(true)}
          >
            <XCircle className="h-5 w-5" />
          </button>
        )}
      </div>
    );
  }

  // Inline variant
  return (
    <div
      className="flex items-start gap-2"
      style={style as React.CSSProperties}
    >
      {showIcon && (
        <AlertCircle className="h-4 w-4 text-destructive flex-shrink-0 mt-0.5" />
      )}
      <div className="flex-1">
        {message ? (
          <p className="text-sm text-destructive">{message as string}</p>
        ) : null}
        {errorsArray.length > 0 && (
          <ul className={cn('text-sm text-destructive', message && 'mt-1')}>
            {errorsArray.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};
