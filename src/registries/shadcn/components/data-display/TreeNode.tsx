'use client';

import React, { useState } from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';
import { ChevronRight, ChevronDown, Folder, File, FolderOpen } from 'lucide-react';

export const TreeNode = ({ element, children }: ComponentRenderProps) => {
  const {
    label,
    icon,
    expanded: initialExpanded = false,
    selected = false,
    disabled = false,
    showIcon = true,
    indent = 0,
    style,
  } = element.props;

  const [isExpanded, setIsExpanded] = useState(initialExpanded as boolean);
  const hasChildren = React.Children.count(children) > 0;

  const getIcon = () => {
    if (icon) return icon as React.ReactNode;
    if (hasChildren) {
      return isExpanded ? (
        <FolderOpen className="h-4 w-4 text-amber-500" />
      ) : (
        <Folder className="h-4 w-4 text-amber-500" />
      );
    }
    return <File className="h-4 w-4 text-muted-foreground" />;
  };

  return (
    <div style={style as React.CSSProperties}>
      <div
        className={cn(
          'flex items-center gap-1 py-1 px-2 rounded-md cursor-pointer hover:bg-muted/50 transition-colors',
          selected && 'bg-primary/10 text-primary',
          disabled && 'opacity-50 pointer-events-none'
        )}
        style={{ paddingLeft: (indent as number) * 16 + 8 }}
        onClick={() => hasChildren && setIsExpanded(!isExpanded)}
      >
        {hasChildren ? (
          <button className="p-0.5 hover:bg-muted rounded">
            {isExpanded ? (
              <ChevronDown className="h-4 w-4" />
            ) : (
              <ChevronRight className="h-4 w-4" />
            )}
          </button>
        ) : (
          <span className="w-5" />
        )}
        {showIcon && getIcon()}
        <span className="text-sm">{label as string}</span>
      </div>
      {hasChildren && isExpanded && (
        <div>{children}</div>
      )}
    </div>
  );
};
