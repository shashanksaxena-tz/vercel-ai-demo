'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';

export const ChatWindow = ({ element, children }: ComponentRenderProps) => {
  const {
    width = 400,
    height = 600,
    position = 'bottom-right',
    isOpen = true,
    style
  } = element.props;

  const positions = {
    'bottom-right': 'fixed bottom-4 right-4',
    'bottom-left': 'fixed bottom-4 left-4',
    'center': 'fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2',
    'inline': 'relative',
  };

  if (!isOpen) return null;

  return (
    <div
      className={cn(
        'flex flex-col bg-background border rounded-xl shadow-2xl overflow-hidden z-50',
        positions[position as keyof typeof positions] || positions['bottom-right']
      )}
      style={{
        width: position === 'inline' ? '100%' : width,
        height: position === 'inline' ? '100%' : height,
        ...style as React.CSSProperties
      }}
    >
      {children}
    </div>
  );
};
