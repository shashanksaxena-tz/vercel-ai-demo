'use client';

import React, { useState } from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';
import { ChevronRight, ChevronDown, Folder, File, FolderOpen } from 'lucide-react';

interface TreeNode {
  id: string;
  label: string;
  icon?: React.ReactNode;
  children?: TreeNode[];
  disabled?: boolean;
  data?: any;
}

export const Tree = ({ element }: ComponentRenderProps) => {
  const {
    data,
    defaultExpanded = [],
    expandAll = false,
    selectable = false,
    multiSelect = false,
    showIcons = true,
    showLines = false,
    style,
  } = element.props;

  const treeData = data as TreeNode[];
  const defaultExpandedIds = defaultExpanded as string[];

  const [expanded, setExpanded] = useState<Set<string>>(() => {
    if (expandAll) {
      const getAllIds = (nodes: TreeNode[]): string[] => {
        return nodes.flatMap((node) => [
          node.id,
          ...(node.children ? getAllIds(node.children) : []),
        ]);
      };
      return new Set(getAllIds(treeData || []));
    }
    return new Set(defaultExpandedIds);
  });

  const [selected, setSelected] = useState<Set<string>>(new Set());

  const toggleExpand = (id: string) => {
    setExpanded((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const toggleSelect = (id: string) => {
    if (!selectable) return;
    setSelected((prev) => {
      const newSet = multiSelect ? new Set(prev) : new Set<string>();
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const renderNode = (node: TreeNode, depth: number = 0): React.ReactNode => {
    const hasChildren = node.children && node.children.length > 0;
    const isExpanded = expanded.has(node.id);
    const isSelected = selected.has(node.id);

    return (
      <div key={node.id}>
        <div
          className={cn(
            'flex items-center gap-1 py-1 px-2 rounded-md cursor-pointer hover:bg-muted/50 transition-colors',
            isSelected && 'bg-primary/10 text-primary',
            node.disabled && 'opacity-50 pointer-events-none',
            showLines && depth > 0 && 'border-l ml-3 pl-4'
          )}
          style={{ paddingLeft: showLines ? undefined : depth * 16 + 8 }}
          onClick={() => {
            if (hasChildren) {
              toggleExpand(node.id);
            }
            toggleSelect(node.id);
          }}
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
          {showIcons && (
            node.icon || (
              hasChildren ? (
                isExpanded ? (
                  <FolderOpen className="h-4 w-4 text-amber-500" />
                ) : (
                  <Folder className="h-4 w-4 text-amber-500" />
                )
              ) : (
                <File className="h-4 w-4 text-muted-foreground" />
              )
            )
          )}
          <span className="text-sm">{node.label}</span>
        </div>
        {hasChildren && isExpanded && (
          <div className={cn(showLines && 'border-l ml-5')}>
            {node.children!.map((child) => renderNode(child, depth + 1))}
          </div>
        )}
      </div>
    );
  };

  if (!treeData?.length) {
    return (
      <div className="p-4 text-center text-muted-foreground">
        No data available
      </div>
    );
  }

  return (
    <div className="w-full" style={style as React.CSSProperties}>
      {treeData.map((node) => renderNode(node))}
    </div>
  );
};
