'use client';

import React, { useState, useRef, useEffect } from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';

interface MenuItem {
  label: string;
  action?: string;
  icon?: React.ReactNode;
  disabled?: boolean;
  separator?: boolean;
  shortcut?: string;
}

export const ContextMenu = ({ element, children, onAction }: ComponentRenderProps) => {
  const {
    items = [],
    className,
    style
  } = element.props;

  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const menuRef = useRef<HTMLDivElement>(null);

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    const x = e.clientX;
    const y = e.clientY;
    setPosition({ x, y });
    setIsOpen(true);
  };

  const handleItemClick = (item: MenuItem) => {
    if (item.disabled || item.separator) return;
    setIsOpen(false);
    if (item.action) {
      onAction?.({ name: item.action });
    }
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen]);

  useEffect(() => {
    if (isOpen && menuRef.current) {
      const menu = menuRef.current;
      const rect = menu.getBoundingClientRect();
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;

      let adjustedX = position.x;
      let adjustedY = position.y;

      if (position.x + rect.width > viewportWidth) {
        adjustedX = position.x - rect.width;
      }
      if (position.y + rect.height > viewportHeight) {
        adjustedY = position.y - rect.height;
      }

      if (adjustedX !== position.x || adjustedY !== position.y) {
        setPosition({ x: adjustedX, y: adjustedY });
      }
    }
  }, [isOpen, position]);

  return (
    <div
      className={cn('inline-block', className as string)}
      onContextMenu={handleContextMenu}
      style={style as React.CSSProperties}
    >
      {children}
      {isOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
          <div
            ref={menuRef}
            className="fixed z-50 min-w-[8rem] bg-popover text-popover-foreground rounded-md border shadow-md py-1 animate-in fade-in-0 zoom-in-95 duration-200"
            style={{ left: position.x, top: position.y }}
            role="menu"
          >
            {(items as MenuItem[]).map((item, index) => {
              if (item.separator) {
                return <div key={index} className="my-1 h-px bg-muted" role="separator" />;
              }

              return (
                <button
                  key={index}
                  className={cn(
                    'w-full flex items-center justify-between px-3 py-1.5 text-sm outline-none transition-colors',
                    item.disabled
                      ? 'text-muted-foreground cursor-not-allowed'
                      : 'hover:bg-accent hover:text-accent-foreground cursor-pointer'
                  )}
                  onClick={() => handleItemClick(item)}
                  disabled={item.disabled}
                  role="menuitem"
                >
                  <span className="flex items-center gap-2">
                    {item.icon && <span className="h-4 w-4">{item.icon}</span>}
                    {item.label}
                  </span>
                  {item.shortcut && (
                    <span className="ml-4 text-xs text-muted-foreground">{item.shortcut}</span>
                  )}
                </button>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};
