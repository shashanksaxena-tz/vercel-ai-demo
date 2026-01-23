'use client';

import React, { useState, useEffect } from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';
import { X } from 'lucide-react';

export const Drawer = ({ element, children, onAction }: ComponentRenderProps) => {
  const {
    open = false,
    title,
    description,
    position = 'right',
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

  const isHorizontal = position === 'left' || position === 'right';

  const sizeStyles = {
    sm: isHorizontal ? 'w-64' : 'h-48',
    default: isHorizontal ? 'w-80' : 'h-64',
    lg: isHorizontal ? 'w-96' : 'h-96',
    xl: isHorizontal ? 'w-[32rem]' : 'h-[32rem]',
    full: isHorizontal ? 'w-screen' : 'h-screen',
  };

  const positionStyles = {
    left: 'left-0 top-0 h-full',
    right: 'right-0 top-0 h-full',
    top: 'top-0 left-0 w-full',
    bottom: 'bottom-0 left-0 w-full',
  };

  const animationStyles = {
    left: isOpen ? 'translate-x-0' : '-translate-x-full',
    right: isOpen ? 'translate-x-0' : 'translate-x-full',
    top: isOpen ? 'translate-y-0' : '-translate-y-full',
    bottom: isOpen ? 'translate-y-0' : 'translate-y-full',
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
        className={cn(
          'fixed bg-background shadow-lg border transition-transform duration-300 ease-in-out flex flex-col',
          positionStyles[(position as keyof typeof positionStyles) || 'right'],
          sizeStyles[(size as keyof typeof sizeStyles) || 'default'],
          animationStyles[(position as keyof typeof animationStyles) || 'right'],
          className as string
        )}
        style={style as React.CSSProperties}
        role="dialog"
        aria-modal="true"
      >
        {(title || description || showClose) ? (
          <div className="flex items-start justify-between p-6 border-b flex-shrink-0">
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
                className="h-8 w-8 flex items-center justify-center rounded-md hover:bg-muted transition-colors"
                onClick={handleClose}
                aria-label="Close"
              >
                <X className="h-4 w-4" />
              </button>
            ) : null}
          </div>
        ) : null}
        <div className="p-6 overflow-y-auto flex-1">{children}</div>
      </div>
    </div>
  );
};
