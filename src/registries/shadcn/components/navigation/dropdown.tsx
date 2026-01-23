'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';

export const Dropdown = ({ element, children, onAction }: ComponentRenderProps) => {
  const {
    trigger,
    triggerLabel,
    items,
    align = 'start',
    side = 'bottom',
    variant = 'default',
    style
  } = element.props;

  const [open, setOpen] = React.useState(false);
  const dropdownRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const alignClasses = {
    start: 'left-0',
    center: 'left-1/2 -translate-x-1/2',
    end: 'right-0',
  };

  const sideClasses = {
    top: 'bottom-full mb-1',
    bottom: 'top-full mt-1',
  };

  const variants = {
    default: 'bg-background border rounded-md shadow-md',
    ghost: 'bg-background/95 backdrop-blur-sm border rounded-md shadow-lg',
  };

  return (
    <div className="relative inline-block" ref={dropdownRef} style={style as React.CSSProperties}>
      <button
        onClick={() => setOpen(!open)}
        className={cn(
          'inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium rounded-md transition-colors',
          'bg-background border hover:bg-muted'
        )}
        aria-expanded={open}
        aria-haspopup="menu"
      >
        {trigger || triggerLabel || 'Menu'}
        <svg
          className={cn('w-4 h-4 transition-transform', open && 'rotate-180')}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {open && (
        <div
          className={cn(
            'absolute z-50 min-w-[200px] p-1',
            variants[variant as keyof typeof variants] || variants.default,
            alignClasses[align as keyof typeof alignClasses] || alignClasses.start,
            sideClasses[side as keyof typeof sideClasses] || sideClasses.bottom
          )}
          role="menu"
        >
          {(items as Array<{ label: string; href?: string; action?: string; icon?: React.ReactNode; disabled?: boolean; divider?: boolean }>)?.map((item, i) =>
            item.divider ? (
              <div key={i} className="h-px bg-border my-1" role="separator" />
            ) : (
              <a
                key={i}
                href={item.href || '#'}
                onClick={(e) => {
                  if (item.action) {
                    e.preventDefault();
                    onAction?.({ name: item.action });
                  }
                  setOpen(false);
                }}
                className={cn(
                  'flex items-center gap-2 px-3 py-2 text-sm rounded-sm transition-colors',
                  'text-foreground hover:bg-muted',
                  item.disabled && 'opacity-50 pointer-events-none'
                )}
                role="menuitem"
                aria-disabled={item.disabled}
              >
                {item.icon && <span className="w-4 h-4">{item.icon}</span>}
                {item.label}
              </a>
            )
          )}
          {children}
        </div>
      )}
    </div>
  );
};
