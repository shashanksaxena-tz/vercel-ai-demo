'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';

export const ListGroup = ({ element, children }: ComponentRenderProps) => {
  const {
    title,
    items,
    variant = 'default',
    collapsible = false,
    defaultCollapsed = false,
    style,
  } = element.props;

  const [collapsed, setCollapsed] = React.useState(defaultCollapsed as boolean);

  const itemsArray = items as Array<{
    text: string;
    description?: string;
    icon?: React.ReactNode;
    href?: string;
    active?: boolean;
  }>;

  const variantStyles = {
    default: 'border rounded-lg',
    flush: '',
    card: 'border rounded-lg shadow-sm bg-card',
  };

  return (
    <div
      className={cn(variantStyles[(variant as keyof typeof variantStyles) || 'default'])}
      style={style as React.CSSProperties}
    >
      {title && (
        <div
          className={cn(
            'px-4 py-3 font-semibold border-b bg-muted/30',
            collapsible && 'cursor-pointer select-none flex items-center justify-between'
          )}
          onClick={() => collapsible && setCollapsed(!collapsed)}
        >
          <span>{title as string}</span>
          {collapsible && (
            <svg
              className={cn(
                'w-4 h-4 transition-transform',
                collapsed && '-rotate-90'
              )}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          )}
        </div>
      )}
      {!collapsed && (
        <ul className="divide-y">
          {itemsArray?.length ? (
            itemsArray.map((item, idx) => (
              <li key={idx}>
                {item.href ? (
                  <a
                    href={item.href}
                    className={cn(
                      'flex items-center gap-3 px-4 py-3 hover:bg-muted/50 transition-colors',
                      item.active && 'bg-primary/10 text-primary'
                    )}
                  >
                    {item.icon && <span className="flex-shrink-0">{item.icon}</span>}
                    <div className="flex-1 min-w-0">
                      <span className="block truncate">{item.text}</span>
                      {item.description && (
                        <p className="text-sm text-muted-foreground truncate">
                          {item.description}
                        </p>
                      )}
                    </div>
                  </a>
                ) : (
                  <div
                    className={cn(
                      'flex items-center gap-3 px-4 py-3',
                      item.active && 'bg-primary/10 text-primary'
                    )}
                  >
                    {item.icon && <span className="flex-shrink-0">{item.icon}</span>}
                    <div className="flex-1 min-w-0">
                      <span className="block truncate">{item.text}</span>
                      {item.description && (
                        <p className="text-sm text-muted-foreground truncate">
                          {item.description}
                        </p>
                      )}
                    </div>
                  </div>
                )}
              </li>
            ))
          ) : (
            children
          )}
        </ul>
      )}
    </div>
  );
};
