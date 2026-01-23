'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';

export const FormSection = ({ element, children }: ComponentRenderProps) => {
  const {
    title,
    description,
    collapsible = false,
    defaultCollapsed = false,
    showDivider = true,
    style
  } = element.props;

  const [isCollapsed, setIsCollapsed] = React.useState(defaultCollapsed as boolean);

  return (
    <div
      className={cn(
        'w-full',
        showDivider && 'pb-6 mb-6 border-b border-border last:border-b-0 last:pb-0 last:mb-0'
      )}
      style={style as React.CSSProperties}
    >
      {(title || description) ? (
        <div
          className={cn(
            'mb-4',
            collapsible && 'cursor-pointer select-none'
          )}
          onClick={() => collapsible && setIsCollapsed(!isCollapsed)}
        >
          <div className="flex items-center justify-between">
            {title ? (
              <h2 className="text-lg font-semibold">{title as string}</h2>
            ) : null}
            {collapsible && (
              <button
                type="button"
                className="p-1 hover:bg-muted rounded"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsCollapsed(!isCollapsed);
                }}
              >
                <svg
                  className={cn(
                    'h-4 w-4 transition-transform',
                    isCollapsed && '-rotate-90'
                  )}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
            )}
          </div>
          {description ? (
            <p className="text-sm text-muted-foreground mt-1">{description as string}</p>
          ) : null}
        </div>
      ) : null}
      {(!collapsible || !isCollapsed) && (
        <div className="space-y-4">
          {children}
        </div>
      )}
    </div>
  );
};
