'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';

export const PrintButton = ({ element, onAction }: ComponentRenderProps) => {
  const {
    label = 'Print',
    variant = 'default',
    size = 'md',
    style
  } = element.props;

  const handlePrint = () => {
    onAction?.({ name: 'beforePrint' });
    window.print();
    onAction?.({ name: 'afterPrint' });
  };

  const sizes = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1.5 text-sm',
    lg: 'px-4 py-2 text-base',
  };

  const variants = {
    default: 'bg-primary text-primary-foreground hover:bg-primary/90',
    outline: 'border hover:bg-muted',
    ghost: 'hover:bg-muted',
  };

  return (
    <button
      onClick={handlePrint}
      className={cn(
        'print:hidden inline-flex items-center gap-2 rounded font-medium',
        sizes[size as keyof typeof sizes] || sizes.md,
        variants[variant as keyof typeof variants] || variants.default
      )}
      style={style as React.CSSProperties}
    >
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
      </svg>
      {label as string}
    </button>
  );
};
