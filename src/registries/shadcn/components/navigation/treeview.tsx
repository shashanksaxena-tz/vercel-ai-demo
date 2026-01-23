'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';

interface TreeNode {
  id: string;
  label: string;
  icon?: React.ReactNode;
  children?: TreeNode[];
  href?: string;
  action?: string;
  disabled?: boolean;
}

export const TreeView = ({ element, children, onAction }: ComponentRenderProps) => {
  const {
    items,
    defaultExpanded = [],
    multiSelect,
    selectable = true,
    style
  } = element.props;

  const [expanded, setExpanded] = React.useState<Set<string>>(
    new Set(defaultExpanded as string[])
  );
  const [selected, setSelected] = React.useState<Set<string>>(new Set());

  const toggleExpand = (id: string) => {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const toggleSelect = (node: TreeNode) => {
    if (!selectable || node.disabled) return;

    if (node.action) {
      onAction?.({ name: node.action, payload: { id: node.id } } as never);
    }

    setSelected((prev) => {
      const next = new Set(multiSelect ? prev : []);
      if (next.has(node.id)) {
        next.delete(node.id);
      } else {
        next.add(node.id);
      }
      return next;
    });

    onAction?.({ name: 'select', payload: { id: node.id } } as never);
  };

  const renderNode = (node: TreeNode, level: number = 0) => {
    const hasChildren = node.children && node.children.length > 0;
    const isExpanded = expanded.has(node.id);
    const isSelected = selected.has(node.id);

    return (
      <div key={node.id}>
        <div
          className={cn(
            'flex items-center gap-2 py-1.5 px-2 rounded-md text-sm cursor-pointer transition-colors',
            isSelected
              ? 'bg-primary/10 text-primary'
              : 'hover:bg-muted text-foreground',
            node.disabled && 'opacity-50 pointer-events-none'
          )}
          style={{ paddingLeft: `${level * 16 + 8}px` }}
          onClick={() => {
            if (hasChildren) {
              toggleExpand(node.id);
            }
            toggleSelect(node);
          }}
        >
          {hasChildren ? (
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleExpand(node.id);
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
          {node.icon && <span className="w-4 h-4 flex-shrink-0">{node.icon}</span>}
          {node.href ? (
            <a
              href={node.href}
              onClick={(e) => e.stopPropagation()}
              className="flex-1 hover:underline"
            >
              {node.label}
            </a>
          ) : (
            <span className="flex-1">{node.label}</span>
          )}
        </div>
        {hasChildren && isExpanded && (
          <div>
            {node.children?.map((child) => renderNode(child, level + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div
      className="w-full"
      style={style as React.CSSProperties}
      role="tree"
    >
      {(items as TreeNode[])?.map((node) => renderNode(node))}
      {children}
    </div>
  );
};
