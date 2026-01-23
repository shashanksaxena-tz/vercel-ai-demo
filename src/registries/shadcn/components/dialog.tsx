'use client';

import React, { useState, useEffect } from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const Dialog = ({ element, children, onAction }: ComponentRenderProps) => {
  const {
    open = false,
    title,
    description,
    size = 'default',
    showClose = true,
    closeOnOverlay = true,
    footer,
    style
  } = element.props;

  const [isOpen, setIsOpen] = useState(open as boolean);

  useEffect(() => {
    setIsOpen(open as boolean);
  }, [open]);

  const sizeStyles = {
    sm: 'max-w-sm',
    default: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl',
    full: 'max-w-[calc(100vw-2rem)] max-h-[calc(100vh-2rem)]',
  };

  const handleClose = () => {
    setIsOpen(false);
    onAction?.({ name: 'close' });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm animate-in fade-in-0"
        onClick={closeOnOverlay ? handleClose : undefined}
      />

      {/* Dialog */}
      <div
        className={cn(
          'relative z-50 w-full bg-background rounded-lg shadow-lg border animate-in fade-in-0 zoom-in-95 duration-200',
          sizeStyles[(size as keyof typeof sizeStyles) || 'default']
        )}
        style={style as React.CSSProperties}
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        {(title || showClose) ? (
          <div className="flex items-start justify-between p-6 pb-0">
            <div>
              {title ? (
                <h2 className="text-lg font-semibold">{title as string}</h2>
              ) : null}
              {description ? (
                <p className="text-sm text-muted-foreground mt-1">
                  {description as string}
                </p>
              ) : null}
            </div>
            {showClose ? (
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 -mr-2 -mt-2"
                onClick={handleClose}
              >
                <X className="h-4 w-4" />
              </Button>
            ) : null}
          </div>
        ) : null}

        {/* Content */}
        <div className="p-6">{children}</div>

        {/* Footer */}
        {footer ? (
          <div className="flex items-center justify-end gap-2 p-6 pt-0 border-t mt-4">
            {footer as React.ReactNode}
          </div>
        ) : null}
      </div>
    </div>
  );
};
