'use client';

import { useEffect, useRef, useState, useCallback } from 'react';

export interface UIElement {
  key: string;
  type: string;
  props: Record<string, unknown>;
  children?: string[];
}

export type ContextMenuAction =
  | { type: 'duplicate' }
  | { type: 'delete' }
  | { type: 'move-up' }
  | { type: 'move-down' }
  | { type: 'wrap-in'; wrapperType: string }
  | { type: 'add-child'; childType: string }
  | { type: 'ai-redesign' }
  | { type: 'ai-enhance' }
  | { type: 'ai-fill-content' }
  | { type: 'ai-add-section'; position: 'before' | 'after' }
  | { type: 'copy-json' }
  | { type: 'select-parent' };

interface NodeContextMenuProps {
  element: UIElement | null;
  position: { x: number; y: number } | null;
  onClose: () => void;
  onAction: (action: ContextMenuAction) => void;
  className?: string;
}

const ADD_CHILD_OPTIONS = [
  'Container',
  'Row',
  'Column',
  'Card',
  'Heading',
  'Text',
  'Button',
  'Image',
];

export function NodeContextMenu({
  element,
  position,
  onClose,
  onAction,
  className = '',
}: NodeContextMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null);
  const [showAddChild, setShowAddChild] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(0);
  const [adjustedPosition, setAdjustedPosition] = useState(position);

  // Adjust position to prevent off-screen rendering
  useEffect(() => {
    if (!position || !menuRef.current) return;

    const menu = menuRef.current;
    const rect = menu.getBoundingClientRect();
    const viewport = {
      width: window.innerWidth,
      height: window.innerHeight,
    };

    let { x, y } = position;

    // Clamp to viewport edges
    if (x + rect.width > viewport.width) {
      x = viewport.width - rect.width - 10;
    }
    if (y + rect.height > viewport.height) {
      y = viewport.height - rect.height - 10;
    }
    if (x < 10) x = 10;
    if (y < 10) y = 10;

    setAdjustedPosition({ x, y });
  }, [position]);

  // Close on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        onClose();
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [onClose]);

  // Close on Escape, handle keyboard navigation
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setFocusedIndex((prev) => Math.min(prev + 1, menuItems.length - 1));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setFocusedIndex((prev) => Math.max(prev - 1, 0));
      } else if (e.key === 'Enter') {
        e.preventDefault();
        const item = menuItems[focusedIndex];
        if (item && !item.disabled) {
          item.onClick();
        }
      }
    }
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [onClose, focusedIndex]);

  const handleAction = useCallback(
    (action: ContextMenuAction) => {
      onAction(action);
      onClose();
    },
    [onAction, onClose]
  );

  if (!element || !position) return null;

  interface MenuItem {
    label: string;
    icon: string;
    onClick: () => void;
    disabled?: boolean;
    isAI?: boolean;
    isDivider?: boolean;
    isSubMenu?: boolean;
  }

  const menuItems: MenuItem[] = [
    {
      label: 'Move Up',
      icon: '⬆',
      onClick: () => handleAction({ type: 'move-up' }),
      disabled: false, // Parent component should handle actual disabled state
    },
    {
      label: 'Move Down',
      icon: '⬇',
      onClick: () => handleAction({ type: 'move-down' }),
      disabled: false,
    },
    {
      label: 'Duplicate',
      icon: '⎘',
      onClick: () => handleAction({ type: 'duplicate' }),
    },
    {
      label: 'Delete',
      icon: '✕',
      onClick: () => handleAction({ type: 'delete' }),
    },
    { label: '', icon: '', onClick: () => {}, isDivider: true },
    {
      label: 'Wrap in Container',
      icon: '📦',
      onClick: () => handleAction({ type: 'wrap-in', wrapperType: 'Container' }),
    },
    {
      label: 'Wrap in Card',
      icon: '📦',
      onClick: () => handleAction({ type: 'wrap-in', wrapperType: 'Card' }),
    },
    {
      label: 'Add Child...',
      icon: '➕',
      onClick: () => setShowAddChild(!showAddChild),
      isSubMenu: true,
    },
    {
      label: 'Select Parent',
      icon: '↑',
      onClick: () => handleAction({ type: 'select-parent' }),
    },
    { label: '', icon: '', onClick: () => {}, isDivider: true },
    {
      label: 'AI: Redesign',
      icon: '✨',
      onClick: () => handleAction({ type: 'ai-redesign' }),
      isAI: true,
    },
    {
      label: 'AI: Enhance',
      icon: '✨',
      onClick: () => handleAction({ type: 'ai-enhance' }),
      isAI: true,
    },
    {
      label: 'AI: Fill Content',
      icon: '✨',
      onClick: () => handleAction({ type: 'ai-fill-content' }),
      isAI: true,
    },
    {
      label: 'AI: Add Before',
      icon: '✨',
      onClick: () => handleAction({ type: 'ai-add-section', position: 'before' }),
      isAI: true,
    },
    {
      label: 'AI: Add After',
      icon: '✨',
      onClick: () => handleAction({ type: 'ai-add-section', position: 'after' }),
      isAI: true,
    },
    { label: '', icon: '', onClick: () => {}, isDivider: true },
    {
      label: 'Copy as JSON',
      icon: '📋',
      onClick: () => handleAction({ type: 'copy-json' }),
    },
  ];

  return (
    <div
      ref={menuRef}
      className={`fixed z-50 min-w-[220px] bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 shadow-lg rounded-lg overflow-hidden ${className}`}
      style={{
        left: `${adjustedPosition?.x ?? position.x}px`,
        top: `${adjustedPosition?.y ?? position.y}px`,
      }}
    >
      {/* Header */}
      <div className="px-3 py-2 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
        <div className="text-xs font-semibold text-gray-900 dark:text-gray-100">
          {element.type}
        </div>
        <div className="text-xs text-gray-500 dark:text-gray-400 truncate">
          {element.key}
        </div>
      </div>

      {/* Menu Items */}
      <div className="py-1">
        {menuItems.map((item, index) => {
          if (item.isDivider) {
            return (
              <div
                key={`divider-${index}`}
                className="h-px bg-gray-200 dark:bg-gray-700 my-1"
              />
            );
          }

          const isFocused = index === focusedIndex;
          const baseClasses =
            'px-3 py-2 text-sm flex items-center gap-2 transition-colors';
          const hoverClasses = item.disabled
            ? 'opacity-40 cursor-not-allowed'
            : item.isAI
            ? 'cursor-pointer hover:bg-indigo-50 dark:hover:bg-indigo-900/20'
            : 'cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800';
          const focusClasses = isFocused && !item.disabled
            ? item.isAI
              ? 'bg-indigo-50 dark:bg-indigo-900/20'
              : 'bg-gray-100 dark:bg-gray-800'
            : '';
          const textClasses = item.isAI
            ? 'text-indigo-600 dark:text-indigo-400'
            : 'text-gray-700 dark:text-gray-200';

          return (
            <div key={index}>
              <button
                className={`${baseClasses} ${hoverClasses} ${focusClasses} ${textClasses} w-full text-left`}
                onClick={(e) => {
                  e.preventDefault();
                  if (!item.disabled) {
                    item.onClick();
                  }
                }}
                disabled={item.disabled}
                onMouseEnter={() => setFocusedIndex(index)}
              >
                <span className="w-4 text-center">{item.icon}</span>
                <span className="flex-1">{item.label}</span>
                {item.isSubMenu && (
                  <span className="text-gray-400">▸</span>
                )}
              </button>

              {/* Add Child Submenu */}
              {item.isSubMenu && showAddChild && (
                <div className="ml-6 pl-2 border-l-2 border-gray-200 dark:border-gray-700">
                  {ADD_CHILD_OPTIONS.map((childType) => (
                    <button
                      key={childType}
                      className="w-full text-left px-3 py-1.5 text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer transition-colors"
                      onClick={(e) => {
                        e.preventDefault();
                        handleAction({ type: 'add-child', childType });
                      }}
                    >
                      {childType}
                    </button>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
