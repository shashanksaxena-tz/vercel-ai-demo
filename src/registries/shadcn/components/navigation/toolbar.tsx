'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';

interface ToolbarItem {
  id: string;
  icon?: React.ReactNode;
  label?: string;
  action?: string;
  active?: boolean;
  disabled?: boolean;
  type?: 'button' | 'separator' | 'group';
  items?: ToolbarItem[];
}

export const Toolbar = ({ element, children, onAction }: ComponentRenderProps) => {
  const {
    items,
    variant = 'default',
    size = 'default',
    orientation = 'horizontal',
    style
  } = element.props;

  const toolbarItems = items as ToolbarItem[];

  const variants = {
    default: 'bg-background border rounded-lg',
    ghost: 'bg-transparent',
    filled: 'bg-muted rounded-lg',
  };

  const sizes = {
    sm: 'p-1 gap-0.5',
    default: 'p-1 gap-1',
    lg: 'p-2 gap-2',
  };

  const buttonSizes = {
    sm: 'w-7 h-7 text-xs',
    default: 'w-8 h-8 text-sm',
    lg: 'w-10 h-10 text-base',
  };

  const renderItem = (item: ToolbarItem, index: number) => {
    if (item.type === 'separator') {
      return (
        <div
          key={`sep-${index}`}
          className={cn(
            'bg-border',
            orientation === 'horizontal' ? 'w-px h-6 mx-1' : 'h-px w-6 my-1'
          )}
        />
      );
    }

    if (item.type === 'group' && item.items) {
      return (
        <div
          key={item.id}
          className={cn(
            'flex bg-muted rounded-md',
            orientation === 'horizontal' ? 'flex-row' : 'flex-col'
          )}
        >
          {item.items.map((subItem, subIndex) => renderItem(subItem, subIndex))}
        </div>
      );
    }

    return (
      <button
        key={item.id}
        onClick={() => {
          if (item.action) {
            onAction?.({ name: item.action, payload: { id: item.id } } as never);
          }
        }}
        disabled={item.disabled}
        className={cn(
          'flex items-center justify-center rounded-md transition-colors',
          buttonSizes[size as keyof typeof buttonSizes] || buttonSizes.default,
          item.active
            ? 'bg-primary text-primary-foreground'
            : 'text-muted-foreground hover:text-foreground hover:bg-muted',
          item.disabled && 'opacity-50 pointer-events-none'
        )}
        title={item.label}
      >
        {item.icon && <span className="w-4 h-4">{item.icon}</span>}
        {!item.icon && item.label && (
          <span className="px-2">{item.label}</span>
        )}
      </button>
    );
  };

  return (
    <div
      className={cn(
        'flex items-center',
        orientation === 'vertical' && 'flex-col',
        variants[variant as keyof typeof variants] || variants.default,
        sizes[size as keyof typeof sizes] || sizes.default
      )}
      style={style as React.CSSProperties}
      role="toolbar"
      aria-orientation={orientation as 'horizontal' | 'vertical'}
    >
      {toolbarItems?.map((item, index) => renderItem(item, index))}
      {children}
    </div>
  );
};
