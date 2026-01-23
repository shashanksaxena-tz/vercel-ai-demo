'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';
import { Plus, Minus, GitCompare } from 'lucide-react';

interface DiffLine {
  type: 'added' | 'removed' | 'unchanged' | 'header';
  content: string;
  oldLineNumber?: number;
  newLineNumber?: number;
}

export const Diff = ({ element }: ComponentRenderProps) => {
  const {
    oldText,
    newText,
    oldTitle = 'Original',
    newTitle = 'Modified',
    unified = true,
    showLineNumbers = true,
    maxHeight,
    style,
  } = element.props;

  // Simple diff algorithm
  const computeDiff = (): DiffLine[] => {
    const oldLines = (oldText as string)?.split('\n') || [];
    const newLines = (newText as string)?.split('\n') || [];
    const diff: DiffLine[] = [];

    // Header
    diff.push({ type: 'header', content: `--- ${oldTitle}` });
    diff.push({ type: 'header', content: `+++ ${newTitle}` });

    let oldIdx = 0;
    let newIdx = 0;

    while (oldIdx < oldLines.length || newIdx < newLines.length) {
      if (oldIdx >= oldLines.length) {
        // Remaining new lines are additions
        diff.push({
          type: 'added',
          content: newLines[newIdx],
          newLineNumber: newIdx + 1,
        });
        newIdx++;
      } else if (newIdx >= newLines.length) {
        // Remaining old lines are deletions
        diff.push({
          type: 'removed',
          content: oldLines[oldIdx],
          oldLineNumber: oldIdx + 1,
        });
        oldIdx++;
      } else if (oldLines[oldIdx] === newLines[newIdx]) {
        // Lines match
        diff.push({
          type: 'unchanged',
          content: oldLines[oldIdx],
          oldLineNumber: oldIdx + 1,
          newLineNumber: newIdx + 1,
        });
        oldIdx++;
        newIdx++;
      } else {
        // Lines differ - show as remove then add
        diff.push({
          type: 'removed',
          content: oldLines[oldIdx],
          oldLineNumber: oldIdx + 1,
        });
        oldIdx++;
        diff.push({
          type: 'added',
          content: newLines[newIdx],
          newLineNumber: newIdx + 1,
        });
        newIdx++;
      }
    }

    return diff;
  };

  const diffLines = computeDiff();
  const addedCount = diffLines.filter((l) => l.type === 'added').length;
  const removedCount = diffLines.filter((l) => l.type === 'removed').length;

  const getLineClass = (type: DiffLine['type']) => {
    switch (type) {
      case 'added':
        return 'bg-green-500/10 text-green-700 dark:text-green-400';
      case 'removed':
        return 'bg-red-500/10 text-red-700 dark:text-red-400';
      case 'header':
        return 'bg-muted text-muted-foreground font-bold';
      default:
        return '';
    }
  };

  const getLinePrefix = (type: DiffLine['type']) => {
    switch (type) {
      case 'added':
        return '+';
      case 'removed':
        return '-';
      case 'header':
        return '';
      default:
        return ' ';
    }
  };

  return (
    <div
      className="border rounded-lg overflow-hidden bg-card"
      style={style as React.CSSProperties}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2 border-b bg-muted/30">
        <div className="flex items-center gap-2">
          <GitCompare className="h-4 w-4" />
          <span className="text-sm font-medium">Diff</span>
        </div>
        <div className="flex items-center gap-3 text-sm">
          <span className="flex items-center gap-1 text-green-600">
            <Plus className="h-3 w-3" />
            {addedCount}
          </span>
          <span className="flex items-center gap-1 text-red-600">
            <Minus className="h-3 w-3" />
            {removedCount}
          </span>
        </div>
      </div>

      {/* Diff Content */}
      <div
        className="overflow-auto font-mono text-sm"
        style={{ maxHeight: maxHeight as number }}
      >
        {diffLines.map((line, idx) => (
          <div
            key={idx}
            className={cn('flex', getLineClass(line.type))}
          >
            {showLineNumbers && line.type !== 'header' && (
              <div className="flex text-muted-foreground text-xs py-0.5 border-r bg-muted/30">
                <span className="w-10 text-right px-2">
                  {line.oldLineNumber || ''}
                </span>
                <span className="w-10 text-right px-2 border-l">
                  {line.newLineNumber || ''}
                </span>
              </div>
            )}
            {line.type === 'header' && showLineNumbers && (
              <div className="w-[5rem] bg-muted border-r" />
            )}
            <div className="flex-1 py-0.5">
              <span className="inline-block w-5 text-center opacity-70">
                {getLinePrefix(line.type)}
              </span>
              <span>{line.content}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
