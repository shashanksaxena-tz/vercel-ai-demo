'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';

export const SettingsSection = ({ element, children }: ComponentRenderProps) => {
  const {
    title,
    description,
    icon,
    collapsible = false,
    defaultOpen = true,
    style
  } = element.props;

  const [isOpen, setIsOpen] = React.useState(defaultOpen as boolean);

  return (
    <div
      className={cn('border rounded-lg bg-card')}
      style={style as React.CSSProperties}
    >
      <div
        className={cn(
          'flex items-start gap-4 p-6',
          collapsible && 'cursor-pointer'
        )}
        onClick={() => collapsible && setIsOpen(!isOpen)}
      >
        {icon && (
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
            {icon as React.ReactNode}
          </div>
        )}
        <div className="flex-1">
          <h2 className="text-lg font-semibold">{title as string}</h2>
          {description && (
            <p className="text-sm text-muted-foreground mt-1">{description as string}</p>
          )}
        </div>
        {collapsible && (
          <svg
            className={cn('w-5 h-5 transition-transform', isOpen && 'rotate-180')}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        )}
      </div>
      {(!collapsible || isOpen) && (
        <div className="px-6 pb-6 pt-0 border-t">
          <div className="pt-6">
            {children}
          </div>
        </div>
      )}
    </div>
  );
};
