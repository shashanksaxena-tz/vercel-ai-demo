'use client';

import React, { useState } from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';

export const CopyToClipboard = ({ element, children, onAction }: ComponentRenderProps) => {
  const {
    text,
    successMessage = 'Copied to clipboard!',
    showToast = true,
    style
  } = element.props;

  const [showSuccess, setShowSuccess] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text as string);
      onAction?.({ name: 'copied', payload: { text } } as never);
      if (showToast) {
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 2000);
      }
    } catch (err) {
      onAction?.({ name: 'error', payload: { error: err } } as never);
    }
  };

  return (
    <div className="relative inline-block" style={style as React.CSSProperties}>
      <div onClick={handleCopy} className="cursor-pointer">
        {children}
      </div>
      {showSuccess && (
        <div className={cn(
          'absolute top-full left-1/2 -translate-x-1/2 mt-2 px-3 py-1 bg-green-500 text-white text-sm rounded shadow-lg whitespace-nowrap z-50',
          'animate-in fade-in-0 zoom-in-95'
        )}>
          {successMessage as string}
        </div>
      )}
    </div>
  );
};
