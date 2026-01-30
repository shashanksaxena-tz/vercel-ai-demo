'use client';

/**
 * Framework Switcher - Switch between different UI frameworks
 */

import * as React from 'react';
import { useRegistry } from '@/lib/registry';
import type { UIFramework } from '@/types';
import { cn } from '@/lib/utils';

interface FrameworkSwitcherProps {
  className?: string;
}

const frameworkIcons: Record<UIFramework, string> = {
  shadcn: '⬛',
  tailwind: '🌊',
  flowbite: '🌸',
  mui: '🟦',
  antd: '🐜',
};

export function FrameworkSwitcher({ className }: FrameworkSwitcherProps) {
  const { activeFramework, setActiveFramework, availableRegistries } = useRegistry();

  return (
    <div className={cn('flex items-center gap-2', className)}>
      <span className="text-sm text-muted-foreground">Framework:</span>
      <div className="inline-flex rounded-lg border p-1 gap-1">
        {availableRegistries.map((registry) => (
          <button
            key={registry.framework}
            onClick={() => setActiveFramework(registry.framework)}
            className={cn(
              'inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded-md transition-colors',
              activeFramework === registry.framework
                ? 'bg-primary text-primary-foreground'
                : 'text-muted-foreground hover:text-foreground hover:bg-muted'
            )}
          >
            <span>{frameworkIcons[registry.framework]}</span>
            <span>{registry.displayName}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

export default FrameworkSwitcher;
