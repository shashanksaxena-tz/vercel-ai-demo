'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';

export const Print = ({ element, children, onAction }: ComponentRenderProps) => {
  const {
    title,
    style
  } = element.props;

  const handlePrint = () => {
    onAction?.({ name: 'beforePrint' });
    window.print();
    onAction?.({ name: 'afterPrint' });
  };

  return (
    <div style={style as React.CSSProperties}>
      {title && <h2 className="print:block hidden text-xl font-bold mb-4">{title as string}</h2>}
      <div className="print:block">
        {children}
      </div>
      <button
        onClick={handlePrint}
        className={cn(
          'print:hidden inline-flex items-center gap-2 px-4 py-2 mt-4 rounded border hover:bg-muted'
        )}
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
        </svg>
        Print
      </button>
    </div>
  );
};
