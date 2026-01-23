'use client';

import React, { useState, useRef, useEffect } from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';
import { ChevronDown, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const Dropdown = ({ element, children, onAction }: ComponentRenderProps) => {
  const {
    trigger,
    triggerLabel,
    items,
    align = 'start',
    width = 'auto',
    style
  } = element.props;

  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const itemsArray = items as Array<{
    label: string;
    value?: string;
    action?: string;
    icon?: string;
    disabled?: boolean;
    destructive?: boolean;
    separator?: boolean;
  }>;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const alignStyles = {
    start: 'left-0',
    center: 'left-1/2 -translate-x-1/2',
    end: 'right-0',
  };

  return (
    <div ref={dropdownRef} className="relative inline-block" style={style as React.CSSProperties}>
      <div onClick={() => setIsOpen(!isOpen)}>
        {trigger ? (
          trigger as React.ReactNode
        ) : (
          <Button variant="outline" className="flex items-center gap-2">
            {(triggerLabel as string) || 'Options'}
            <ChevronDown className={cn('h-4 w-4 transition-transform', isOpen && 'rotate-180')} />
          </Button>
        )}
      </div>

      {isOpen && (
        <div
          className={cn(
            'absolute top-full mt-1 z-50 bg-popover border rounded-lg shadow-lg py-1 animate-in fade-in-0 zoom-in-95',
            alignStyles[(align as keyof typeof alignStyles) || 'start']
          )}
          style={{ minWidth: width === 'trigger' ? '100%' : width === 'auto' ? 'auto' : width as string }}
        >
          {itemsArray?.map((item, idx) => {
            if (item.separator) {
              return <div key={idx} className="h-px bg-border my-1" />;
            }
            return (
              <button
                key={idx}
                className={cn(
                  'w-full flex items-center gap-2 px-3 py-2 text-sm transition-colors',
                  item.disabled
                    ? 'opacity-50 cursor-not-allowed'
                    : 'hover:bg-muted',
                  item.destructive && 'text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20'
                )}
                disabled={item.disabled}
                onClick={() => {
                  if (item.action) {
                    onAction?.({ name: item.action, params: { value: item.value } });
                  }
                  setIsOpen(false);
                }}
              >
                {item.label}
              </button>
            );
          })}
          {children}
        </div>
      )}
    </div>
  );
};
