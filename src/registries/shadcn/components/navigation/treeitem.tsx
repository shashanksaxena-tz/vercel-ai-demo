'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';

export const TreeItem = ({ element, children, onAction }: ComponentRenderProps) => {
  const {
    id,
    label,
    icon,
    href,
    action,
    expanded,
    selected,
    disabled,
    hasChildren,
    level = 0,
    style
  } = element.props;

  const [isExpanded, setIsExpanded] = React.useState(expanded as boolean);

  const handleToggle = () => {
    if (hasChildren) {
      setIsExpanded(!isExpanded);
      onAction?.({ name: 'toggle', payload: { id, expanded: !isExpanded } } as never);
    }
  };

  const handleSelect = () => {
    if (!disabled) {
      if (action) {
        onAction?.({ name: action as string, payload: { id } } as never);
      } else {
        onAction?.({ name: 'select', payload: { id } } as never);
      }
    }
  };

  return (
    <div role="treeitem" aria-expanded={hasChildren ? isExpanded : undefined}>
      <div
        className={cn(
          'flex items-center gap-2 py-1.5 px-2 rounded-md text-sm cursor-pointer transition-colors',
          selected
            ? 'bg-primary/10 text-primary'
            : 'hover:bg-muted text-foreground',
          disabled && 'opacity-50 pointer-events-none'
        )}
        style={{
          paddingLeft: `${(level as number) * 16 + 8}px`,
          ...style as React.CSSProperties
        }}
        onClick={() => {
          handleToggle();
          handleSelect();
        }}
      >
        {hasChildren ? (
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleToggle();
            }}
            className="w-4 h-4 flex items-center justify-center hover:bg-muted rounded"
          >
            <svg
              className={cn('w-3 h-3 transition-transform', isExpanded && 'rotate-90')}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        ) : (
          <span className="w-4" />
        )}
        {icon && <span className="w-4 h-4 flex-shrink-0">{icon as React.ReactNode}</span>}
        {href ? (
          <a
            href={href as string}
            onClick={(e) => e.stopPropagation()}
            className="flex-1 hover:underline"
          >
            {label as string}
          </a>
        ) : (
          <span className="flex-1">{label as string}</span>
        )}
      </div>
      {hasChildren && isExpanded && (
        <div role="group">
          {children}
        </div>
      )}
    </div>
  );
};
