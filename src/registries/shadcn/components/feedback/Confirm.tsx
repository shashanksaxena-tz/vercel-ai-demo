'use client';
// @ts-nocheck

import React, { useState, useEffect } from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';
import { AlertTriangle, Info, AlertCircle } from 'lucide-react';

export const Confirm = ({ element, onAction }: ComponentRenderProps) => {
  const {
    open = false,
    title = 'Are you sure?',
    description,
    variant = 'default',
    confirmLabel = 'Confirm',
    cancelLabel = 'Cancel',
    confirmVariant = 'primary',
    showIcon = true,
    closeOnOverlay = true,
    className,
    style
  } = element.props;

  const [isOpen, setIsOpen] = useState(open as boolean);

  useEffect(() => {
    setIsOpen(open as boolean);
  }, [open]);

  const variantStyles = {
    default: 'border-l-primary',
    warning: 'border-l-yellow-500',
    danger: 'border-l-destructive',
    info: 'border-l-blue-500',
  };

  const icons = {
    default: null,
    warning: <AlertTriangle className="h-6 w-6 text-yellow-500" />,
    danger: <AlertCircle className="h-6 w-6 text-destructive" />,
    info: <Info className="h-6 w-6 text-blue-500" />,
  };

  const confirmButtonStyles = {
    primary: 'bg-primary text-primary-foreground hover:bg-primary/90',
    danger: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
    warning: 'bg-yellow-500 text-black hover:bg-yellow-600',
  };

  const Icon = icons[(variant as keyof typeof icons) || 'default'];

  const handleConfirm = () => {
    setIsOpen(false);
    onAction?.({ name: 'confirm' });
  };

  const handleCancel = () => {
    setIsOpen(false);
    onAction?.({ name: 'cancel' });
  };

  const handleOverlayClick = () => {
    if (closeOnOverlay) {
      handleCancel();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm animate-in fade-in-0"
        onClick={handleOverlayClick}
      />
      <div
        className={cn(
          'relative z-50 w-full max-w-md bg-background rounded-lg shadow-lg border border-l-4 animate-in fade-in-0 zoom-in-95 duration-200',
          variantStyles[(variant as keyof typeof variantStyles) || 'default'],
          className as string
        )}
        style={style as React.CSSProperties}
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="confirm-title"
        aria-describedby={description ? 'confirm-description' : undefined}
      >
        <div className="p-6">
          <div className="flex gap-4">
            {showIcon && Icon ? (
              <div className="flex-shrink-0 mt-0.5">{Icon}</div>
            ) : null}
            <div className="flex-1">
              <h2 id="confirm-title" className="text-lg font-semibold">
                {title as string}
              </h2>
              {description ? (
                <p id="confirm-description" className="text-sm text-muted-foreground mt-2">
                  {description as string}
                </p>
              ) : null}
            </div>
          </div>
          <div className="flex justify-end gap-3 mt-6">
            <button
              className="inline-flex items-center justify-center rounded-md border bg-background px-4 py-2 text-sm font-medium hover:bg-muted transition-colors"
              onClick={handleCancel}
            >
              {cancelLabel as string}
            </button>
            <button
              className={cn(
                'inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors',
                confirmButtonStyles[(confirmVariant as keyof typeof confirmButtonStyles) || 'primary']
              )}
              onClick={handleConfirm}
            >
              {confirmLabel as string}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
