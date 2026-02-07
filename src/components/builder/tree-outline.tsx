'use client';

/**
 * Tree Outline Navigator - Hierarchical view of the UITree structure
 *
 * Displays the current UI tree as a collapsible outline with:
 * - Recursive tree rendering with depth indentation
 * - Color-coded type indicators by component category
 * - Selection and hover highlighting
 * - Expand/collapse with smart defaults (first 2 levels open)
 * - Search/filter by type or key
 * - Namespace prefix stripping for display
 */

import { useState, useCallback, useMemo, useRef, useEffect } from 'react';
import type { UITree, UIElement } from '@json-render/core';
import { cn } from '@/lib/utils';

// ============================================================================
// Types
// ============================================================================

interface TreeOutlineProps {
  tree: UITree | null;
  selectedKey: string | null;
  hoveredKey: string | null;
  onSelect: (key: string | null) => void;
  onHover: (key: string | null) => void;
  className?: string;
}

// ============================================================================
// Constants — Component Category Classification
// ============================================================================

const LAYOUT_TYPES = new Set([
  'Container', 'Row', 'Column', 'Grid', 'Stack', 'Spacer', 'Divider',
  'Box', 'Flex', 'Section', 'Header', 'Footer', 'Sidebar', 'Main',
  'Wrapper', 'Card', 'Panel', 'Group', 'Layout',
]);

const CONTENT_TYPES = new Set([
  'Heading', 'Text', 'Link', 'Badge', 'Icon', 'Label', 'Paragraph',
  'Title', 'Subtitle', 'Caption', 'Blockquote', 'Code', 'List',
  'ListItem', 'Table', 'TableRow', 'TableCell', 'Span',
]);

const INTERACTIVE_TYPES = new Set([
  'Button', 'Input', 'Select', 'Checkbox', 'Switch', 'Radio',
  'Toggle', 'Slider', 'Textarea', 'Form', 'DatePicker', 'TimePicker',
  'Dropdown', 'Menu', 'MenuItem', 'Tab', 'Tabs', 'Accordion',
  'Dialog', 'Modal', 'Popover', 'Tooltip',
]);

const MEDIA_TYPES = new Set([
  'Image', 'Avatar', 'Chart', 'Video', 'Audio', 'Carousel',
  'Gallery', 'Map', 'Illustration', 'Logo',
]);

// ============================================================================
// Helper Functions
// ============================================================================

/**
 * Strip namespace prefix from type for display.
 * e.g. "core::Container" -> "Container", "mcp::ShimmerButton" -> "ShimmerButton"
 */
function stripNamespace(type: string): string {
  const idx = type.lastIndexOf('::');
  return idx >= 0 ? type.slice(idx + 2) : type;
}

/**
 * Get the color dot class for a component type based on its category.
 */
function getNodeColor(type: string): string {
  const bare = stripNamespace(type);
  if (LAYOUT_TYPES.has(bare)) return 'bg-blue-500';
  if (CONTENT_TYPES.has(bare)) return 'bg-green-500';
  if (INTERACTIVE_TYPES.has(bare)) return 'bg-purple-500';
  if (MEDIA_TYPES.has(bare)) return 'bg-orange-500';
  return 'bg-gray-400';
}

/**
 * Get the category label for a component type (used in search matching).
 */
function getCategory(type: string): string {
  const bare = stripNamespace(type);
  if (LAYOUT_TYPES.has(bare)) return 'layout';
  if (CONTENT_TYPES.has(bare)) return 'content';
  if (INTERACTIVE_TYPES.has(bare)) return 'interactive';
  if (MEDIA_TYPES.has(bare)) return 'media';
  return 'other';
}

/**
 * Collect all descendant keys (including the key itself) for a given element.
 * Used for determining which nodes match a search filter.
 */
function collectDescendantKeys(
  key: string,
  elements: Record<string, UIElement>,
): Set<string> {
  const result = new Set<string>();
  const queue = [key];
  while (queue.length > 0) {
    const current = queue.pop()!;
    result.add(current);
    const el = elements[current];
    if (el?.children) {
      for (const child of el.children) {
        queue.push(child);
      }
    }
  }
  return result;
}

/**
 * Collect all ancestor keys for a given key.
 */
function collectAncestorKeys(
  key: string,
  elements: Record<string, UIElement>,
): Set<string> {
  const result = new Set<string>();
  // Build a child -> parent map
  const parentMap = new Map<string, string>();
  for (const [elKey, el] of Object.entries(elements)) {
    if (el.children) {
      for (const child of el.children) {
        parentMap.set(child, elKey);
      }
    }
  }
  let current = parentMap.get(key);
  while (current) {
    result.add(current);
    current = parentMap.get(current);
  }
  return result;
}

/**
 * Compute the set of keys that should be expanded by default (first 2 depth levels).
 */
function computeDefaultExpanded(tree: UITree): Set<string> {
  const expanded = new Set<string>();
  const queue: Array<{ key: string; depth: number }> = [{ key: tree.root, depth: 0 }];

  while (queue.length > 0) {
    const { key, depth } = queue.shift()!;
    if (depth < 2) {
      expanded.add(key);
      const el = tree.elements[key];
      if (el?.children) {
        for (const child of el.children) {
          queue.push({ key: child, depth: depth + 1 });
        }
      }
    }
  }

  return expanded;
}

// ============================================================================
// TreeNode Component
// ============================================================================

interface TreeNodeProps {
  elementKey: string;
  element: UIElement;
  tree: UITree;
  depth: number;
  expanded: Set<string>;
  selectedKey: string | null;
  hoveredKey: string | null;
  searchQuery: string;
  matchingKeys: Set<string> | null;
  onToggleExpand: (key: string) => void;
  onSelect: (key: string | null) => void;
  onHover: (key: string | null) => void;
  onDoubleClick: (key: string) => void;
}

function TreeNode({
  elementKey,
  element,
  tree,
  depth,
  expanded,
  selectedKey,
  hoveredKey,
  searchQuery,
  matchingKeys,
  onToggleExpand,
  onSelect,
  onHover,
  onDoubleClick,
}: TreeNodeProps) {
  const hasChildren = element.children && element.children.length > 0;
  const isExpanded = expanded.has(elementKey);
  const isSelected = selectedKey === elementKey;
  const isHovered = hoveredKey === elementKey;
  const displayType = stripNamespace(element.type);
  const colorClass = getNodeColor(element.type);

  // If searching and this node is not in the matching set, hide it
  if (matchingKeys && !matchingKeys.has(elementKey)) {
    return null;
  }

  const childCount = element.children?.length ?? 0;

  return (
    <div className="select-none">
      {/* Node row */}
      <div
        className={cn(
          'flex items-center gap-1.5 py-1 px-2 text-sm cursor-pointer rounded-sm transition-colors duration-75',
          isSelected && 'bg-blue-100 dark:bg-blue-900/30 border-l-2 border-blue-500',
          !isSelected && isHovered && 'bg-gray-50 dark:bg-gray-800/50',
          !isSelected && !isHovered && 'border-l-2 border-transparent',
        )}
        style={{ paddingLeft: `${depth * 16 + 8}px` }}
        onClick={() => {
          // Toggle selection: click selected node to deselect
          onSelect(isSelected ? null : elementKey);
        }}
        onDoubleClick={() => onDoubleClick(elementKey)}
        onMouseEnter={() => onHover(elementKey)}
        onMouseLeave={() => onHover(null)}
        role="treeitem"
        aria-expanded={hasChildren ? isExpanded : undefined}
        aria-selected={isSelected}
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onSelect(isSelected ? null : elementKey);
          }
        }}
      >
        {/* Expand/collapse toggle */}
        {hasChildren ? (
          <button
            className="flex-shrink-0 w-4 h-4 flex items-center justify-center text-xs text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 rounded transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              onToggleExpand(elementKey);
            }}
            aria-label={isExpanded ? 'Collapse' : 'Expand'}
          >
            {isExpanded ? '\u25BE' : '\u25B8'}
          </button>
        ) : (
          <span className="flex-shrink-0 w-4 h-4" />
        )}

        {/* Color dot indicator */}
        <span
          className={cn('flex-shrink-0 w-2 h-2 rounded-full', colorClass)}
          title={getCategory(element.type)}
        />

        {/* Type name */}
        <span className="truncate font-medium text-gray-900 dark:text-gray-100">
          {displayType}
        </span>

        {/* Collapsed children count */}
        {hasChildren && !isExpanded && (
          <span className="flex-shrink-0 text-xs text-gray-400 dark:text-gray-500">
            ({childCount})
          </span>
        )}

        {/* Element key (dimmed) */}
        <span className="flex-shrink-0 ml-auto text-xs text-gray-400 dark:text-gray-500 truncate max-w-[80px]">
          {elementKey}
        </span>
      </div>

      {/* Children (recursive) */}
      {hasChildren && isExpanded && (
        <div
          className="relative"
          role="group"
        >
          {/* Tree line connector */}
          <div
            className="absolute top-0 bottom-0 border-l border-gray-200 dark:border-gray-700"
            style={{ left: `${depth * 16 + 16}px` }}
          />
          {element.children!.map((childKey) => {
            const childElement = tree.elements[childKey];
            if (!childElement) return null;
            return (
              <TreeNode
                key={childKey}
                elementKey={childKey}
                element={childElement}
                tree={tree}
                depth={depth + 1}
                expanded={expanded}
                selectedKey={selectedKey}
                hoveredKey={hoveredKey}
                searchQuery={searchQuery}
                matchingKeys={matchingKeys}
                onToggleExpand={onToggleExpand}
                onSelect={onSelect}
                onHover={onHover}
                onDoubleClick={onDoubleClick}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}

// ============================================================================
// Main TreeOutline Component
// ============================================================================

export function TreeOutline({
  tree,
  selectedKey,
  hoveredKey,
  onSelect,
  onHover,
  className,
}: TreeOutlineProps) {
  const [expanded, setExpanded] = useState<Set<string>>(() => {
    if (!tree) return new Set<string>();
    return computeDefaultExpanded(tree);
  });

  const [searchQuery, setSearchQuery] = useState('');
  const searchInputRef = useRef<HTMLInputElement>(null);

  // When tree changes, recompute default expanded state
  const prevTreeRootRef = useRef<string | null>(null);
  useEffect(() => {
    const newRoot = tree?.root ?? null;
    if (newRoot !== prevTreeRootRef.current) {
      prevTreeRootRef.current = newRoot;
      if (tree) {
        setExpanded(computeDefaultExpanded(tree));
      } else {
        setExpanded(new Set());
      }
    }
  }, [tree]);

  // Toggle expand/collapse for a specific node
  const handleToggleExpand = useCallback((key: string) => {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(key)) {
        next.delete(key);
      } else {
        next.add(key);
      }
      return next;
    });
  }, []);

  // Compute matching keys based on search query
  const matchingKeys = useMemo<Set<string> | null>(() => {
    if (!searchQuery.trim() || !tree) return null;

    const query = searchQuery.toLowerCase().trim();
    const directMatches = new Set<string>();

    // Find all elements matching the query (by type, key, or category)
    for (const [key, el] of Object.entries(tree.elements)) {
      const displayType = stripNamespace(el.type).toLowerCase();
      const category = getCategory(el.type);
      if (
        displayType.includes(query) ||
        key.toLowerCase().includes(query) ||
        category.includes(query)
      ) {
        directMatches.add(key);
      }
    }

    // Include all ancestors of matching nodes (so the tree path is visible)
    const visible = new Set<string>();
    for (const matchKey of directMatches) {
      visible.add(matchKey);
      // Add all descendants so if a parent matches, children are shown
      const descendants = collectDescendantKeys(matchKey, tree.elements);
      for (const d of descendants) visible.add(d);
      // Add all ancestors so the path to the match is visible
      const ancestors = collectAncestorKeys(matchKey, tree.elements);
      for (const a of ancestors) visible.add(a);
    }

    return visible;
  }, [searchQuery, tree]);

  // When search is active, ensure all ancestor nodes of matches are expanded
  useEffect(() => {
    if (!matchingKeys || !tree) return;

    setExpanded((prev) => {
      const next = new Set(prev);
      // Expand ancestors of all matching nodes
      for (const key of matchingKeys) {
        const ancestors = collectAncestorKeys(key, tree.elements);
        for (const a of ancestors) next.add(a);
      }
      return next;
    });
  }, [matchingKeys, tree]);

  // Double-click handler stub (future: scroll preview to element)
  const handleDoubleClick = useCallback((_key: string) => {
    // Future implementation: scroll the preview panel to the corresponding element
  }, []);

  // Element count
  const elementCount = tree ? Object.keys(tree.elements).length : 0;

  // Empty state
  if (!tree) {
    return (
      <div className={cn('flex flex-col items-center justify-center h-full text-gray-400 dark:text-gray-500 p-4', className)}>
        <svg
          className="w-10 h-10 mb-3 opacity-50"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z"
          />
        </svg>
        <p className="text-sm font-medium">No UI tree loaded</p>
        <p className="text-xs mt-1 text-center">
          Generate or select a UI to see its structure here.
        </p>
      </div>
    );
  }

  const rootElement = tree.elements[tree.root];
  if (!rootElement) {
    return (
      <div className={cn('flex items-center justify-center h-full text-gray-400 dark:text-gray-500 p-4', className)}>
        <p className="text-sm">Invalid tree: root element not found</p>
      </div>
    );
  }

  return (
    <div className={cn('flex flex-col h-full bg-white dark:bg-gray-900', className)}>
      {/* Header with element count */}
      <div className="flex items-center justify-between px-3 py-2 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
        <div className="flex items-center gap-2">
          <svg
            className="w-4 h-4 text-gray-500 dark:text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 10h16M4 14h16M4 18h16"
            />
          </svg>
          <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">
            Outline
          </span>
        </div>
        <span className="text-xs text-gray-400 dark:text-gray-500">
          {elementCount} element{elementCount !== 1 ? 's' : ''}
        </span>
      </div>

      {/* Search field */}
      <div className="px-2 py-1.5 border-b border-gray-200 dark:border-gray-700">
        <div className="relative">
          <svg
            className="absolute left-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 dark:text-gray-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <input
            ref={searchInputRef}
            type="text"
            placeholder="Filter by type or key..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={cn(
              'w-full pl-7 pr-7 py-1 text-xs rounded border',
              'border-gray-200 dark:border-gray-700',
              'bg-white dark:bg-gray-800',
              'text-gray-900 dark:text-gray-100',
              'placeholder:text-gray-400 dark:placeholder:text-gray-500',
              'focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500',
            )}
          />
          {searchQuery && (
            <button
              onClick={() => {
                setSearchQuery('');
                searchInputRef.current?.focus();
              }}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              aria-label="Clear search"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>
      </div>

      {/* Search results count when filtering */}
      {matchingKeys && (
        <div className="px-3 py-1 text-xs text-gray-500 dark:text-gray-400 bg-blue-50 dark:bg-blue-900/20 border-b border-gray-200 dark:border-gray-700">
          {matchingKeys.size} node{matchingKeys.size !== 1 ? 's' : ''} matching &ldquo;{searchQuery}&rdquo;
        </div>
      )}

      {/* Tree content */}
      <div className="flex-1 overflow-y-auto py-1" role="tree" aria-label="UI Tree Outline">
        {matchingKeys && matchingKeys.size === 0 ? (
          <div className="flex flex-col items-center justify-center py-8 text-gray-400 dark:text-gray-500">
            <p className="text-xs">No matching elements</p>
          </div>
        ) : (
          <TreeNode
            elementKey={tree.root}
            element={rootElement}
            tree={tree}
            depth={0}
            expanded={expanded}
            selectedKey={selectedKey}
            hoveredKey={hoveredKey}
            searchQuery={searchQuery}
            matchingKeys={matchingKeys}
            onToggleExpand={handleToggleExpand}
            onSelect={onSelect}
            onHover={onHover}
            onDoubleClick={handleDoubleClick}
          />
        )}
      </div>

      {/* Category legend */}
      <div className="px-3 py-2 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
          <span className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
            <span className="w-2 h-2 rounded-full bg-blue-500" />
            Layout
          </span>
          <span className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
            <span className="w-2 h-2 rounded-full bg-green-500" />
            Content
          </span>
          <span className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
            <span className="w-2 h-2 rounded-full bg-purple-500" />
            Interactive
          </span>
          <span className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
            <span className="w-2 h-2 rounded-full bg-orange-500" />
            Media
          </span>
          <span className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
            <span className="w-2 h-2 rounded-full bg-gray-400" />
            Other
          </span>
        </div>
      </div>
    </div>
  );
}

export default TreeOutline;
