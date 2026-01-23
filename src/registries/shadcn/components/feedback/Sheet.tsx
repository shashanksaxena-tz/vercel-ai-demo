'use client';

import React, { useState, useEffect } from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';
import { X } from 'lucide-react';

export const Sheet = ({ element, children, onAction }: ComponentRenderProps) => {
  const {
    open = false,
    title,
    description,
    side = 'right',
    size = 'default',
    showClose = true,
    closeOnOverlay = true,
    closeOnEscape = true,
    className,
    style
  } = element.props;

  const [isOpen, setIsOpen] = useState(open as boolean);

  useEffect(() => {
    setIsOpen(open as boolean);
  }, [open]);

  useEffect(() => {
    if (!closeOnEscape || !isOpen) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, closeOnEscape]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const isHorizontal = side === 'left' || side === 'right';

  const sizeStyles = {
    sm: isHorizontal ? 'w-72' : 'h-1/4',
    default: isHorizontal ? 'w-[400px]' : 'h-1/3',
    lg: isHorizontal ? 'w-[540px]' : 'h-1/2',
    xl: isHorizontal ? 'w-[720px]' : 'h-2/3',
    full: isHorizontal ? 'w-screen' : 'h-screen',
  };

  const sideStyles = {
    left: 'inset-y-0 left-0 border-r',
    right: 'inset-y-0 right-0 border-l',
    top: 'inset-x-0 top-0 border-b',
    bottom: 'inset-x-0 bottom-0 border-t',
  };

  const animationStyles = {
    left: 'data-[state=open]:slide-in-from-left data-[state=closed]:slide-out-to-left',
    right: 'data-[state=open]:slide-in-from-right data-[state=closed]:slide-out-to-right',
    top: 'data-[state=open]:slide-in-from-top data-[state=closed]:slide-out-to-top',
    bottom: 'data-[state=open]:slide-in-from-bottom data-[state=closed]:slide-out-to-bottom',
  };

  const handleClose = () => {
    setIsOpen(false);
    onAction?.({ name: 'close' });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50">
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm animate-in fade-in-0"
        onClick={closeOnOverlay ? handleClose : undefined}
      />
      <div
        data-state={isOpen ? 'open' : 'closed'}
        className={cn(
          'fixed z-50 gap-4 bg-background p-6 shadow-lg transition ease-in-out duration-300 animate-in',
          sideStyles[(side as keyof typeof sideStyles) || 'right'],
          sizeStyles[(size as keyof typeof sizeStyles) || 'default'],
          animationStyles[(side as keyof typeof animationStyles) || 'right'],
          className as string
        )}
        style={style as React.CSSProperties}
        role="dialog"
        aria-modal="true"
      >
        {showClose ? (
          <button
            className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
            onClick={handleClose}
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </button>
        ) : null}
        {(title || description) ? (
          <div className="flex flex-col space-y-2 mb-4">
            {title ? <h2 className="text-lg font-semibold">{title as string}</h2> : null}
            {description ? (
              <p className="text-sm text-muted-foreground">{description as string}</p>
            ) : null}
          </div>
        ) : null}
        <div className="overflow-y-auto max-h-[calc(100vh-8rem)]">{children}</div>
      </div>
    </div>
  );
};
