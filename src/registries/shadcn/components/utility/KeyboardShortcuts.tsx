'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';

export const KeyboardShortcuts = ({ element }: ComponentRenderProps) => {
  const {
    shortcuts,
    title = 'Keyboard Shortcuts',
    style
  } = element.props;

  const shortcutList = shortcuts as Array<{ key: string; description: string; category?: string }>;

  // Group by category
  const grouped = shortcutList?.reduce((acc, shortcut) => {
    const category = shortcut.category || 'General';
    if (!acc[category]) acc[category] = [];
    acc[category].push(shortcut);
    return acc;
  }, {} as Record<string, typeof shortcutList>);

  return (
    <div
      className={cn('space-y-6')}
      style={style as React.CSSProperties}
    >
      <h3 className="text-lg font-semibold">{title as string}</h3>

      {grouped && Object.entries(grouped).map(([category, items]) => (
        <div key={category}>
          <h4 className="text-sm font-medium text-muted-foreground mb-2">{category}</h4>
          <div className="space-y-2">
            {items.map((shortcut, i) => (
              <div key={i} className="flex items-center justify-between py-2 border-b last:border-0">
                <span className="text-sm">{shortcut.description}</span>
                <kbd className="px-2 py-1 bg-muted rounded text-sm font-mono">{shortcut.key}</kbd>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
