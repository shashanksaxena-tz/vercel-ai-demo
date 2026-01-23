import React, { useState, useEffect } from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const Drawer = ({ element, children, onAction }: ComponentRenderProps) => {
  const {
    open = false,
    title,
    description,
    position = 'right',
    size = 'default',
    showClose = true,
    closeOnOverlay = true,
    style
  } = element.props;

  const [isOpen, setIsOpen] = useState(open as boolean);

  useEffect(() => {
    setIsOpen(open as boolean);
  }, [open]);

  const sizeStyles = {
    sm: position === 'left' || position === 'right' ? 'w-64' : 'h-48',
    default: position === 'left' || position === 'right' ? 'w-80' : 'h-64',
    lg: position === 'left' || position === 'right' ? 'w-96' : 'h-96',
    xl: position === 'left' || position === 'right' ? 'w-[32rem]' : 'h-[32rem]',
    full: position === 'left' || position === 'right' ? 'w-screen' : 'h-screen',
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
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm"
        onClick={closeOnOverlay ? handleClose : undefined}
      />

      {/* Drawer */}
      <div
        className={cn(
          'fixed bg-background shadow-lg border transition-transform duration-300 ease-in-out',
          positionStyles[(position as keyof typeof positionStyles) || 'right'],
          sizeStyles[(size as keyof typeof sizeStyles) || 'default'],
          animationStyles[(position as keyof typeof animationStyles) || 'right']
        )}
        style={style as React.CSSProperties}
      >
        {/* Header */}
        {(title || showClose) ? (
          <div className="flex items-start justify-between p-6 border-b">
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
                className="h-8 w-8"
                onClick={handleClose}
              >
                <X className="h-4 w-4" />
              </Button>
            ) : null}
          </div>
        ) : null}

        {/* Content */}
        <div className="p-6 overflow-y-auto flex-1">{children}</div>
      </div>
    </div>
  );
};
