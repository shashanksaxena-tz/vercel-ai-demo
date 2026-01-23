'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';

interface OrgNode {
  id: string;
  name: string;
  title?: string;
  avatar?: string;
  children?: OrgNode[];
}

export const OrgChart = ({ element }: ComponentRenderProps) => {
  const {
    data,
    variant = 'default',
    compact = false,
    horizontal = false,
    style,
  } = element.props;

  const orgData = data as OrgNode;

  const renderNode = (node: OrgNode, isRoot = false): React.ReactNode => {
    const hasChildren = node.children && node.children.length > 0;

    const nodeContent = (
      <div
        className={cn(
          'border rounded-lg bg-card shadow-sm transition-shadow hover:shadow-md',
          compact ? 'p-2' : 'p-4',
          variant === 'card' && 'border-0 shadow-lg',
          isRoot && 'border-primary border-2'
        )}
      >
        <div className="flex items-center gap-3">
          {node.avatar ? (
            <img
              src={node.avatar}
              alt={node.name}
              className={cn('rounded-full object-cover', compact ? 'w-8 h-8' : 'w-12 h-12')}
            />
          ) : (
            <div
              className={cn(
                'rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold',
                compact ? 'w-8 h-8 text-sm' : 'w-12 h-12'
              )}
            >
              {node.name.charAt(0)}
            </div>
          )}
          <div className="min-w-0">
            <p className={cn('font-semibold truncate', compact && 'text-sm')}>{node.name}</p>
            {node.title && (
              <p className={cn('text-muted-foreground truncate', compact ? 'text-xs' : 'text-sm')}>
                {node.title}
              </p>
            )}
          </div>
        </div>
      </div>
    );

    if (!hasChildren) {
      return nodeContent;
    }

    if (horizontal) {
      return (
        <div className="flex items-center gap-4">
          {nodeContent}
          <div className="flex flex-col gap-2">
            {node.children!.map((child) => (
              <div key={child.id} className="flex items-center gap-4">
                <div className="w-8 border-t border-muted" />
                {renderNode(child)}
              </div>
            ))}
          </div>
        </div>
      );
    }

    return (
      <div className="flex flex-col items-center">
        {nodeContent}
        <div className={cn('w-px bg-muted', compact ? 'h-4' : 'h-8')} />
        <div className="relative flex justify-center">
          {node.children!.length > 1 && (
            <div
              className="absolute top-0 h-px bg-muted"
              style={{
                left: `calc(50% / ${node.children!.length})`,
                right: `calc(50% / ${node.children!.length})`,
              }}
            />
          )}
          <div className={cn('flex', compact ? 'gap-4' : 'gap-8')}>
            {node.children!.map((child, idx) => (
              <div key={child.id} className="flex flex-col items-center">
                <div className={cn('w-px bg-muted', compact ? 'h-4' : 'h-8')} />
                {renderNode(child)}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  if (!orgData) {
    return (
      <div className="p-8 text-center text-muted-foreground">
        No organization data available
      </div>
    );
  }

  return (
    <div className="w-full overflow-auto" style={style as React.CSSProperties}>
      <div className="inline-flex min-w-full justify-center p-4">
        {renderNode(orgData, true)}
      </div>
    </div>
  );
};
