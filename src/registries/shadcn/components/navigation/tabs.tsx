'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';

export const Tabs = ({ element, children, onAction }: ComponentRenderProps) => {
  const {
    items,
    defaultValue,
    value,
    variant = 'default',
    orientation = 'horizontal',
    style
  } = element.props;

  const tabItems = items as Array<{ label: string; value: string; disabled?: boolean; icon?: React.ReactNode }>;
  const [activeTab, setActiveTab] = React.useState(
    (value as string) || (defaultValue as string) || tabItems?.[0]?.value || ''
  );

  const variants = {
    default: {
      list: 'bg-muted p-1 rounded-lg',
      trigger: 'px-3 py-1.5 text-sm font-medium rounded-md transition-colors',
      active: 'bg-background text-foreground shadow-sm',
      inactive: 'text-muted-foreground hover:text-foreground',
    },
    underline: {
      list: 'border-b',
      trigger: 'px-4 py-2 text-sm font-medium border-b-2 -mb-px transition-colors',
      active: 'border-primary text-foreground',
      inactive: 'border-transparent text-muted-foreground hover:text-foreground hover:border-muted',
    },
    pills: {
      list: 'gap-2',
      trigger: 'px-4 py-2 text-sm font-medium rounded-full transition-colors',
      active: 'bg-primary text-primary-foreground',
      inactive: 'text-muted-foreground hover:bg-muted hover:text-foreground',
    },
    boxed: {
      list: 'border rounded-lg p-1',
      trigger: 'px-4 py-2 text-sm font-medium rounded-md transition-colors',
      active: 'bg-primary text-primary-foreground',
      inactive: 'text-muted-foreground hover:bg-muted',
    },
  };

  const variantStyles = variants[variant as keyof typeof variants] || variants.default;

  const handleTabChange = (tabValue: string) => {
    setActiveTab(tabValue);
    onAction?.({ name: 'tabChange', payload: { value: tabValue } } as never);
  };

  return (
    <div
      className={cn('w-full', orientation === 'vertical' && 'flex gap-4')}
      style={style as React.CSSProperties}
    >
      <div
        className={cn(
          'flex',
          orientation === 'vertical' ? 'flex-col' : 'flex-row',
          variantStyles.list
        )}
        role="tablist"
        aria-orientation={orientation as 'horizontal' | 'vertical'}
      >
        {tabItems?.map((item) => (
          <button
            key={item.value}
            onClick={() => !item.disabled && handleTabChange(item.value)}
            className={cn(
              variantStyles.trigger,
              activeTab === item.value ? variantStyles.active : variantStyles.inactive,
              item.disabled && 'opacity-50 pointer-events-none'
            )}
            role="tab"
            aria-selected={activeTab === item.value}
            aria-disabled={item.disabled}
          >
            <span className="flex items-center gap-2">
              {item.icon && <span className="w-4 h-4">{item.icon}</span>}
              {item.label}
            </span>
          </button>
        ))}
      </div>
      {children}
    </div>
  );
};
