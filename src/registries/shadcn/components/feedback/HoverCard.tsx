'use client';

import React, { useState, useRef, useEffect } from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';

export const HoverCard = ({ element, children }: ComponentRenderProps) => {
  const {
    trigger,
    content,
    position = 'bottom',
    align = 'center',
    openDelay = 200,
    closeDelay = 150,
    className,
    style
  } = element.props;

  const [isOpen, setIsOpen] = useState(false);
  const openTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  const positionStyles = {
    top: 'bottom-full mb-2',
    bottom: 'top-full mt-2',
    left: 'right-full mr-2',
    right: 'left-full ml-2',
  };

  const alignStyles = {
    start: position === 'top' || position === 'bottom' ? 'left-0' : 'top-0',
    center: position === 'top' || position === 'bottom'
      ? 'left-1/2 -translate-x-1/2'
      : 'top-1/2 -translate-y-1/2',
    end: position === 'top' || position === 'bottom' ? 'right-0' : 'bottom-0',
  };

  const clearTimeouts = () => {
    if (openTimeoutRef.current) clearTimeout(openTimeoutRef.current);
    if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
  };

  const handleMouseEnter = () => {
    clearTimeouts();
    openTimeoutRef.current = setTimeout(() => {
      setIsOpen(true);
    }, openDelay as number);
  };

  const handleMouseLeave = () => {
    clearTimeouts();
    closeTimeoutRef.current = setTimeout(() => {
      setIsOpen(false);
    }, closeDelay as number);
  };

  useEffect(() => {
    return () => clearTimeouts();
  }, []);

  return (
    <div
      ref={cardRef}
      className={cn('relative inline-block', className as string)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={style as React.CSSProperties}
    >
      <div className="cursor-pointer">
        {trigger as React.ReactNode || children}
      </div>
      {isOpen && (
        <div
          className={cn(
            'absolute z-50 w-64 bg-popover text-popover-foreground rounded-md border shadow-md p-4 animate-in fade-in-0 zoom-in-95 duration-200',
            positionStyles[(position as keyof typeof positionStyles) || 'bottom'],
            alignStyles[(align as keyof typeof alignStyles) || 'center']
          )}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {content as React.ReactNode}
        </div>
      )}
    </div>
  );
};
