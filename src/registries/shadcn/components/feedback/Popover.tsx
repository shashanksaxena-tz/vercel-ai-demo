'use client';

import React, { useState, useRef, useEffect } from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';

export const Popover = ({ element, children }: ComponentRenderProps) => {
  const {
    trigger,
    content,
    position = 'bottom',
    align = 'center',
    triggerOn = 'click',
    offset = 8,
    className,
    style
  } = element.props;

  const [isOpen, setIsOpen] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popoverRef.current && !popoverRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleTrigger = () => {
    if (triggerOn === 'click') {
      setIsOpen(!isOpen);
    }
  };

  const handleMouseEnter = () => {
    if (triggerOn === 'hover') {
      setIsOpen(true);
    }
  };

  const handleMouseLeave = () => {
    if (triggerOn === 'hover') {
      setIsOpen(false);
    }
  };

  return (
    <div
      ref={popoverRef}
      className={cn('relative inline-block', className as string)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ ...style as React.CSSProperties, '--popover-offset': `${offset}px` } as React.CSSProperties}
    >
      <div onClick={handleTrigger} className="cursor-pointer">
        {trigger as React.ReactNode || children}
      </div>
      {isOpen && (
        <div
          className={cn(
            'absolute z-50 min-w-[200px] bg-popover text-popover-foreground rounded-md border shadow-md p-4 animate-in fade-in-0 zoom-in-95 duration-200',
            positionStyles[(position as keyof typeof positionStyles) || 'bottom'],
            alignStyles[(align as keyof typeof alignStyles) || 'center']
          )}
        >
          {content as React.ReactNode}
        </div>
      )}
    </div>
  );
};
