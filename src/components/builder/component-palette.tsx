'use client';

/**
 * Component Palette Panel
 *
 * A left sidebar panel that displays all available components grouped by category.
 * Users can search, browse by category, and click components to add them to the UI tree.
 *
 * Data sources:
 * - Core blocks (78) from core-blocks.ts
 * - Magic UI extended blocks (16) from extended-blocks.ts
 * - Aceternity UI extended blocks (15) from extended-blocks.ts
 */

import { useState, useMemo } from 'react';
import { CORE_BLOCK_DEFINITIONS } from '@/lib/registry/core-blocks';
import {
  MAGIC_UI_BLOCK_DEFINITIONS,
  ACETERNITY_BLOCK_DEFINITIONS,
} from '@/lib/registry/extended-blocks';
import type { BlockDefinition, BlockKind } from '@/lib/registry/block-registry';
import type { ComponentCategory } from '@/lib/mcp/types';

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const ALL_BLOCKS: BlockDefinition[] = [
  ...CORE_BLOCK_DEFINITIONS,
  ...MAGIC_UI_BLOCK_DEFINITIONS,
  ...ACETERNITY_BLOCK_DEFINITIONS,
];

/** Display labels for each ComponentCategory value. */
const CATEGORY_LABELS: Record<ComponentCategory, string> = {
  layout: 'Layout',
  cards: 'Cards',
  typography: 'Typography',
  forms: 'Forms',
  inputs: 'Inputs',
  'data-display': 'Data Display',
  feedback: 'Feedback',
  navigation: 'Navigation',
  overlay: 'Overlay',
  charts: 'Charts',
  marketing: 'Marketing',
  dashboard: 'Dashboard',
  media: 'Media',
  blocks: 'Blocks',
  'e-commerce': 'E-Commerce',
  authentication: 'Authentication',
  other: 'Other',
};

/** Ordered list of categories to control section rendering order. */
const CATEGORY_ORDER: ComponentCategory[] = [
  'layout',
  'cards',
  'typography',
  'forms',
  'inputs',
  'data-display',
  'feedback',
  'navigation',
  'overlay',
  'charts',
  'marketing',
  'dashboard',
  'media',
  'blocks',
  'e-commerce',
  'authentication',
  'other',
];

/** Color mapping for the BlockKind icon squares. */
const KIND_COLORS: Record<BlockKind, string> = {
  layout: 'bg-blue-500',
  content: 'bg-green-500',
  interactive: 'bg-purple-500',
  media: 'bg-orange-500',
  navigation: 'bg-cyan-500',
  data: 'bg-yellow-500',
};

/** Muted text color for kind labels. */
const KIND_TEXT_COLORS: Record<BlockKind, string> = {
  layout: 'text-blue-400',
  content: 'text-green-400',
  interactive: 'text-purple-400',
  media: 'text-orange-400',
  navigation: 'text-cyan-400',
  data: 'text-yellow-400',
};

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface ComponentPaletteProps {
  onAddComponent: (blockType: string) => void;
  className?: string;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Strip the namespace prefix for display purposes. "core::Button" -> "Button" */
function displayName(block: BlockDefinition): string {
  const parts = block.type.split('::');
  return parts.length > 1 ? parts[1] : block.type;
}

/** Determine if a search query matches a block (case-insensitive). */
function matchesSearch(block: BlockDefinition, query: string): boolean {
  const q = query.toLowerCase();
  const name = displayName(block).toLowerCase();
  const desc = block.description.toLowerCase();
  const tags = block.tags.map((t) => t.toLowerCase());
  return (
    name.includes(q) ||
    desc.includes(q) ||
    tags.some((t) => t.includes(q))
  );
}

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

function SearchIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="shrink-0"
    >
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
}

function ChevronIcon({ expanded }: { expanded: boolean }) {
  return (
    <span
      className={`inline-block transition-transform duration-150 text-xs leading-none ${
        expanded ? 'rotate-90' : ''
      }`}
    >
      {'\u25B8'}
    </span>
  );
}

function TierBadge({ tier }: { tier: BlockDefinition['tier'] }) {
  if (tier === 'core') {
    return (
      <span className="inline-flex items-center rounded px-1.5 py-0.5 text-[10px] font-medium leading-none bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300">
        Core
      </span>
    );
  }
  return (
    <span className="inline-flex items-center rounded px-1.5 py-0.5 text-[10px] font-medium leading-none bg-indigo-100 text-indigo-700 dark:bg-indigo-900/50 dark:text-indigo-300">
      Extended
    </span>
  );
}

function AnimatedBadge() {
  return (
    <span className="inline-flex items-center rounded px-1.5 py-0.5 text-[10px] font-medium leading-none bg-pink-100 text-pink-700 dark:bg-pink-900/50 dark:text-pink-300">
      Animated
    </span>
  );
}

function ComponentCard({
  block,
  onClick,
}: {
  block: BlockDefinition;
  onClick: () => void;
}) {
  const name = displayName(block);
  const hasAnimatedTag = block.tags.includes('animated');
  const isExtended = block.tier === 'extended';

  return (
    <button
      type="button"
      onClick={onClick}
      draggable
      onDragStart={(e) => {
        e.dataTransfer.setData('application/x-block-type', block.type);
        e.dataTransfer.effectAllowed = 'copy';
      }}
      className="w-full flex items-start gap-2.5 px-2.5 py-2 rounded-md text-left transition-colors hover:bg-gray-100 dark:hover:bg-gray-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 group cursor-grab active:cursor-grabbing"
    >
      {/* Kind color indicator */}
      <span
        className={`shrink-0 mt-0.5 w-5 h-5 rounded ${KIND_COLORS[block.kind]}`}
        aria-hidden="true"
      />

      <div className="min-w-0 flex-1">
        {/* Name row */}
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
            {name}
          </span>
          <TierBadge tier={block.tier} />
          {isExtended && hasAnimatedTag && <AnimatedBadge />}
        </div>

        {/* Description */}
        <p className="mt-0.5 text-xs text-gray-500 dark:text-gray-400 truncate">
          {block.description}
        </p>
      </div>
    </button>
  );
}

function CategorySection({
  category,
  blocks,
  defaultExpanded,
  onAddComponent,
}: {
  category: ComponentCategory;
  blocks: BlockDefinition[];
  defaultExpanded: boolean;
  onAddComponent: (blockType: string) => void;
}) {
  const [expanded, setExpanded] = useState(defaultExpanded);

  return (
    <div className="border-b border-gray-200 dark:border-gray-700 last:border-b-0">
      {/* Category header */}
      <button
        type="button"
        onClick={() => setExpanded((v) => !v)}
        className="w-full flex items-center gap-2 px-3 py-2.5 text-left hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
      >
        <ChevronIcon expanded={expanded} />
        <span className="text-xs font-semibold uppercase tracking-wider text-gray-600 dark:text-gray-300">
          {CATEGORY_LABELS[category]}
        </span>
        <span className="ml-auto text-[10px] font-medium text-gray-400 dark:text-gray-500 tabular-nums">
          {blocks.length}
        </span>
      </button>

      {/* Component list */}
      {expanded && (
        <div className="pb-1.5 px-1">
          {blocks.map((block) => (
            <ComponentCard
              key={block.type}
              block={block}
              onClick={() => onAddComponent(block.type)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main Component
// ---------------------------------------------------------------------------

export function ComponentPalette({
  onAddComponent,
  className = '',
}: ComponentPaletteProps) {
  const [searchQuery, setSearchQuery] = useState('');

  // Filter blocks based on search query
  const filteredBlocks = useMemo(() => {
    if (!searchQuery.trim()) return ALL_BLOCKS;
    return ALL_BLOCKS.filter((block) => matchesSearch(block, searchQuery));
  }, [searchQuery]);

  // Group filtered blocks by category, preserving defined order
  const groupedByCategory = useMemo(() => {
    const groups: { category: ComponentCategory; blocks: BlockDefinition[] }[] = [];

    for (const cat of CATEGORY_ORDER) {
      const catBlocks = filteredBlocks.filter((b) => b.category === cat);
      if (catBlocks.length > 0) {
        groups.push({ category: cat, blocks: catBlocks });
      }
    }

    return groups;
  }, [filteredBlocks]);

  const totalCount = filteredBlocks.length;
  const isSearchActive = searchQuery.trim().length > 0;
  const hasResults = groupedByCategory.length > 0;

  return (
    <div
      className={`flex flex-col h-full w-[280px] bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 ${className}`}
    >
      {/* Header */}
      <div className="shrink-0 px-3 pt-3 pb-2">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-sm font-semibold text-gray-900 dark:text-gray-100">
            Components
          </h2>
          <span className="text-[11px] font-medium text-gray-400 dark:text-gray-500 tabular-nums">
            {totalCount} total
          </span>
        </div>

        {/* Search input */}
        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-2.5 text-gray-400 dark:text-gray-500">
            <SearchIcon />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search components..."
            className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 py-1.5 pl-8 pr-3 text-sm text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
          {isSearchActive && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="absolute inset-y-0 right-0 flex items-center pr-2.5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              aria-label="Clear search"
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          )}
        </div>
      </div>

      {/* Kind legend (compact) */}
      <div className="shrink-0 px-3 pb-2 flex flex-wrap gap-x-3 gap-y-1">
        {(Object.keys(KIND_COLORS) as BlockKind[]).map((kind) => (
          <span key={kind} className="flex items-center gap-1">
            <span
              className={`inline-block w-2 h-2 rounded-sm ${KIND_COLORS[kind]}`}
            />
            <span
              className={`text-[10px] capitalize ${KIND_TEXT_COLORS[kind]}`}
            >
              {kind}
            </span>
          </span>
        ))}
      </div>

      {/* Scrollable category list */}
      <div className="flex-1 overflow-y-auto min-h-0">
        {hasResults ? (
          groupedByCategory.map(({ category, blocks }) => (
            <CategorySection
              key={category}
              category={category}
              blocks={blocks}
              defaultExpanded={
                isSearchActive ? true : category === 'layout'
              }
              onAddComponent={onAddComponent}
            />
          ))
        ) : (
          /* Empty state */
          <div className="flex flex-col items-center justify-center px-4 py-12 text-center">
            <div className="mb-3 text-3xl text-gray-300 dark:text-gray-600">
              <svg
                width="40"
                height="40"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mx-auto text-gray-300 dark:text-gray-600"
              >
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
                <line x1="8" y1="11" x2="14" y2="11" />
              </svg>
            </div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
              No components match your search
            </p>
            <p className="mt-1 text-xs text-gray-400 dark:text-gray-500">
              Try a different keyword or clear the filter
            </p>
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="mt-3 text-xs font-medium text-blue-600 dark:text-blue-400 hover:underline"
            >
              Clear search
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
