'use client';

import React, { useState, useEffect } from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';
import { X } from 'lucide-react';

export const Modal = ({ element, children, onAction }: ComponentRenderProps) => {
  const {
    open = false,
    title,
    description,
    size = 'default',
    showClose = true,
    closeOnOverlay = true,
    closeOnEscape = true,
    centered = true,
    scrollBehavior = 'inside',
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

  const sizeStyles = {
    xs: 'max-w-xs',
    sm: 'max-w-sm',
    default: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl',
    '2xl': 'max-w-6xl',
    full: 'max-w-[calc(100vw-2rem)] max-h-[calc(100vh-2rem)]',
  };

  const handleClose = () => {
    setIsOpen(false);
    onAction?.({ name: 'close' });
  };

  if (!isOpen) return null;

  return (
    <div
      className={cn(
        'fixed inset-0 z-50 flex',
        centered ? 'items-center justify-center' : 'items-start justify-center pt-16',
        scrollBehavior === 'outside' && 'overflow-y-auto'
      )}
    >
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm animate-in fade-in-0"
        onClick={closeOnOverlay ? handleClose : undefined}
      />
      <div
        className={cn(
          'relative z-50 w-full bg-background rounded-lg shadow-lg border animate-in fade-in-0 zoom-in-95 duration-200 m-4',
          sizeStyles[(size as keyof typeof sizeStyles) || 'default'],
          scrollBehavior === 'inside' && 'max-h-[calc(100vh-2rem)] flex flex-col',
          className as string
        )}
        style={style as React.CSSProperties}
        role="dialog"
        aria-modal="true"
      >
        {(title || description || showClose) ? (
          <div className="flex items-start justify-between p-6 pb-0 flex-shrink-0">
            <div>
              {title ? <h2 className="text-lg font-semibold">{title as string}</h2> : null}
              {description ? (
                <p className="text-sm text-muted-foreground mt-1">
                  {description as string}
                </p>
              ) : null}
            </div>
            {showClose ? (
              <button
                className="h-8 w-8 flex items-center justify-center rounded-md hover:bg-muted transition-colors -mr-2 -mt-2"
                onClick={handleClose}
                aria-label="Close"
              >
                <X className="h-4 w-4" />
              </button>
            ) : null}
          </div>
        ) : null}
        <div
          className={cn(
            'p-6',
            scrollBehavior === 'inside' && 'overflow-y-auto flex-1'
          )}
        >
          {children}
        </div>
      </div>
    </div>
  );
};
