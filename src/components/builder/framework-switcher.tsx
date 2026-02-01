'use client';

/**
 * Framework Switcher - Switch between different UI frameworks
 *
 * Displays all 8 supported frameworks:
 * - Shadcn/UI
 * - Material UI
 * - Chakra UI
 * - Ant Design
 * - Tailwind CSS
 * - Flowbite
 * - Magic UI
 * - Aceternity UI
 */

import * as React from 'react';
import { useRegistry } from '@/lib/registry';
import type { UIFramework } from '@/types';
import { cn } from '@/lib/utils';
import {
  Square,
  Layers,
  Zap,
  Layout,
  Wind,
  Flower2,
  Sparkles,
  Moon,
  Check,
  Lock,
} from 'lucide-react';

interface FrameworkSwitcherProps {
  className?: string;
  /** Show all frameworks including unavailable ones */
  showAll?: boolean;
  /** Compact mode - icons only */
  compact?: boolean;
  /** Show framework descriptions */
  showDescriptions?: boolean;
}

// Framework icon components
const frameworkIcons: Record<UIFramework, React.ReactNode> = {
  shadcn: <Square className="h-4 w-4" />,
  mui: <Layers className="h-4 w-4" />,
  chakra: <Zap className="h-4 w-4" />,
  antd: <Layout className="h-4 w-4" />,
  tailwind: <Wind className="h-4 w-4" />,
  flowbite: <Flower2 className="h-4 w-4" />,
  'magic-ui': <Sparkles className="h-4 w-4" />,
  aceternity: <Moon className="h-4 w-4" />,
};

// Framework colors for accent
const frameworkColors: Record<UIFramework, string> = {
  shadcn: '#000000',
  mui: '#1976d2',
  chakra: '#319795',
  antd: '#1890ff',
  tailwind: '#38bdf8',
  flowbite: '#1d4ed8',
  'magic-ui': '#6366f1',
  aceternity: '#8b5cf6',
};

export function FrameworkSwitcher({
  className,
  showAll = true,
  compact = false,
  showDescriptions = false,
}: FrameworkSwitcherProps) {
  const {
    activeFramework,
    setActiveFramework,
    availableRegistries,
    allRegistries,
    isAvailable,
    isLoading,
  } = useRegistry();

  // Use all registries if showAll is true, otherwise only available ones
  const registries = showAll ? allRegistries : availableRegistries;

  // Handle framework selection
  const handleSelect = (framework: UIFramework) => {
    if (isAvailable(framework)) {
      setActiveFramework(framework);
    }
  };

  if (compact) {
    return (
      <div className={cn('flex items-center gap-1', className)}>
        {registries.map((registry) => {
          const available = isAvailable(registry.framework);
          const isActive = activeFramework === registry.framework;

          return (
            <button
              key={registry.framework}
              onClick={() => handleSelect(registry.framework)}
              disabled={!available || isLoading}
              title={`${registry.displayName}${!available ? ' (Coming Soon)' : ''}`}
              className={cn(
                'relative inline-flex items-center justify-center w-9 h-9 rounded-lg transition-all',
                isActive
                  ? 'bg-primary text-primary-foreground shadow-sm'
                  : available
                  ? 'text-muted-foreground hover:text-foreground hover:bg-muted'
                  : 'text-muted-foreground/50 cursor-not-allowed'
              )}
              style={
                isActive
                  ? { backgroundColor: frameworkColors[registry.framework] }
                  : undefined
              }
            >
              {frameworkIcons[registry.framework]}
              {isActive && (
                <span className="absolute -top-1 -right-1 flex h-3 w-3 items-center justify-center rounded-full bg-green-500 text-white">
                  <Check className="h-2 w-2" />
                </span>
              )}
              {!available && (
                <span className="absolute -bottom-1 -right-1 flex h-3 w-3 items-center justify-center rounded-full bg-gray-400 text-white">
                  <Lock className="h-2 w-2" />
                </span>
              )}
            </button>
          );
        })}
      </div>
    );
  }

  return (
    <div className={cn('space-y-2', className)}>
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <span>Framework:</span>
        {isLoading && (
          <span className="animate-spin">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24">
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
              />
            </svg>
          </span>
        )}
      </div>

      <div
        className={cn(
          'inline-flex flex-wrap rounded-lg border p-1 gap-1',
          showDescriptions && 'grid grid-cols-2 lg:grid-cols-4'
        )}
      >
        {registries.map((registry) => {
          const available = isAvailable(registry.framework);
          const isActive = activeFramework === registry.framework;

          return (
            <button
              key={registry.framework}
              onClick={() => handleSelect(registry.framework)}
              disabled={!available || isLoading}
              className={cn(
                'inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded-md transition-all',
                showDescriptions && 'flex-col items-start py-3 px-4',
                isActive
                  ? 'text-white shadow-sm'
                  : available
                  ? 'text-muted-foreground hover:text-foreground hover:bg-muted'
                  : 'text-muted-foreground/50 cursor-not-allowed'
              )}
              style={
                isActive
                  ? { backgroundColor: frameworkColors[registry.framework] }
                  : undefined
              }
            >
              <div className="flex items-center gap-1.5">
                <span
                  className={cn('flex-shrink-0', isActive && 'text-white')}
                  style={
                    !isActive && available
                      ? { color: frameworkColors[registry.framework] }
                      : undefined
                  }
                >
                  {frameworkIcons[registry.framework]}
                </span>
                <span>{registry.displayName}</span>
                {!available && (
                  <Lock className="h-3 w-3 opacity-50" />
                )}
                {isActive && <Check className="h-3 w-3 ml-1" />}
              </div>

              {showDescriptions && (
                <span
                  className={cn(
                    'text-xs font-normal',
                    isActive ? 'text-white/80' : 'text-muted-foreground'
                  )}
                >
                  {available ? registry.description : 'Coming Soon'}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

/**
 * Framework Dropdown - Alternative switcher using a dropdown menu
 */
export function FrameworkDropdown({ className }: { className?: string }) {
  const {
    activeFramework,
    setActiveFramework,
    allRegistries,
    frameworkInfo,
    isAvailable,
    isLoading,
  } = useRegistry();

  const [isOpen, setIsOpen] = React.useState(false);
  const dropdownRef = React.useRef<HTMLDivElement>(null);

  // Close on click outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (framework: UIFramework) => {
    if (isAvailable(framework)) {
      setActiveFramework(framework);
      setIsOpen(false);
    }
  };

  return (
    <div ref={dropdownRef} className={cn('relative', className)}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        disabled={isLoading}
        className="inline-flex items-center gap-2 px-3 py-2 text-sm font-medium border rounded-lg bg-background hover:bg-muted transition-colors"
      >
        <span style={{ color: frameworkColors[activeFramework] }}>
          {frameworkIcons[activeFramework]}
        </span>
        <span>{frameworkInfo?.displayName}</span>
        <svg
          className={cn(
            'h-4 w-4 transition-transform',
            isOpen && 'rotate-180'
          )}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute z-50 mt-1 w-64 bg-background border rounded-lg shadow-lg py-1">
          {allRegistries.map((registry) => {
            const available = isAvailable(registry.framework);
            const isActive = activeFramework === registry.framework;

            return (
              <button
                key={registry.framework}
                onClick={() => handleSelect(registry.framework)}
                disabled={!available}
                className={cn(
                  'w-full flex items-start gap-3 px-3 py-2 text-left text-sm hover:bg-muted transition-colors',
                  !available && 'opacity-50 cursor-not-allowed',
                  isActive && 'bg-muted'
                )}
              >
                <span
                  className="flex-shrink-0 mt-0.5"
                  style={{ color: frameworkColors[registry.framework] }}
                >
                  {frameworkIcons[registry.framework]}
                </span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{registry.displayName}</span>
                    {isActive && (
                      <Check
                        className="h-3 w-3"
                        style={{ color: frameworkColors[registry.framework] }}
                      />
                    )}
                    {!available && <Lock className="h-3 w-3" />}
                  </div>
                  <p className="text-xs text-muted-foreground truncate">
                    {available ? registry.description : 'Coming Soon'}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

/**
 * Framework Badge - Shows the active framework as a badge
 */
export function FrameworkBadge({ className }: { className?: string }) {
  const { activeFramework, frameworkInfo } = useRegistry();

  return (
    <div
      className={cn(
        'inline-flex items-center gap-1.5 px-2 py-1 rounded-md text-xs font-medium text-white',
        className
      )}
      style={{ backgroundColor: frameworkColors[activeFramework] }}
    >
      {frameworkIcons[activeFramework]}
      <span>{frameworkInfo?.displayName}</span>
    </div>
  );
}

export default FrameworkSwitcher;
