'use client';

/**
 * Icon Picker - Browse and select icons from multiple sources
 *
 * Sources:
 * - Lucide Icons (default)
 * - Heroicons
 * - Iconify
 */

import * as React from 'react';
import { cn } from '@/lib/utils';
import { Search, Loader2 } from 'lucide-react';
import type { IconMetadata } from '@/lib/mcp/types';

type IconSource = 'lucide' | 'heroicons' | 'iconify';

interface IconPickerProps {
  onSelect: (icon: IconMetadata) => void;
  className?: string;
}

interface IconSearchResponse {
  icons: IconMetadata[];
  source: string;
  total: number;
}

const ICON_SOURCES: { id: IconSource; label: string; description: string }[] = [
  { id: 'lucide', label: 'Lucide', description: '1500+ icons' },
  { id: 'heroicons', label: 'Heroicons', description: 'By Tailwind' },
  { id: 'iconify', label: 'Iconify', description: '100k+ icons' },
];

export function IconPicker({ onSelect, className }: IconPickerProps) {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [activeSource, setActiveSource] = React.useState<IconSource>('lucide');
  const [icons, setIcons] = React.useState<IconMetadata[]>([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [selectedIcon, setSelectedIcon] = React.useState<string | null>(null);

  // Debounced search
  const debouncedSearch = React.useMemo(() => {
    let timeoutId: NodeJS.Timeout;
    return (query: string, source: IconSource) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        fetchIcons(query, source);
      }, 300);
    };
  }, []);

  // Fetch icons from API
  const fetchIcons = React.useCallback(async (query: string, source: IconSource) => {
    if (!query.trim()) {
      setIcons([]);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/mcp/icons', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query, source }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch icons');
      }

      const data: IconSearchResponse = await response.json();
      setIcons(data.icons || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch icons');
      setIcons([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Effect for search
  React.useEffect(() => {
    debouncedSearch(searchQuery, activeSource);
  }, [searchQuery, activeSource, debouncedSearch]);

  // Handle icon selection
  const handleSelect = (icon: IconMetadata) => {
    setSelectedIcon(icon.name);
    onSelect(icon);
  };

  return (
    <div className={cn('flex flex-col h-full', className)}>
      {/* Search Input */}
      <div className="p-3 border-b">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="search"
            placeholder="Search icons..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-sm border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
      </div>

      {/* Source Tabs */}
      <div className="p-3 border-b">
        <div className="flex flex-wrap gap-1">
          {ICON_SOURCES.map((source) => (
            <button
              key={source.id}
              onClick={() => setActiveSource(source.id)}
              className={cn(
                'px-3 py-1.5 text-xs font-medium rounded-full transition-colors',
                activeSource === source.id
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground hover:bg-muted/80'
              )}
              title={source.description}
            >
              {source.label}
            </button>
          ))}
        </div>
      </div>

      {/* Icons Grid */}
      <div className="flex-1 overflow-auto p-3">
        {isLoading ? (
          <div className="flex items-center justify-center h-32">
            <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
          </div>
        ) : error ? (
          <div className="text-center py-8">
            <p className="text-sm text-red-500">{error}</p>
            <button
              onClick={() => fetchIcons(searchQuery, activeSource)}
              className="mt-2 text-xs text-primary hover:underline"
            >
              Try again
            </button>
          </div>
        ) : icons.length === 0 ? (
          <div className="text-center py-8 text-sm text-muted-foreground">
            {searchQuery ? 'No icons found' : 'Search for icons above'}
          </div>
        ) : (
          <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 gap-2">
            {icons.map((icon) => (
              <button
                key={`${icon.source}-${icon.name}`}
                onClick={() => handleSelect(icon)}
                className={cn(
                  'flex flex-col items-center justify-center p-3 rounded-lg border transition-all hover:bg-muted group',
                  selectedIcon === icon.name
                    ? 'border-primary bg-primary/5'
                    : 'border-transparent hover:border-border'
                )}
                title={icon.name}
              >
                {/* Icon Preview */}
                <div
                  className="w-6 h-6 text-foreground"
                  dangerouslySetInnerHTML={{ __html: icon.svg }}
                />
                {/* Icon Name */}
                <span className="mt-1.5 text-[10px] text-muted-foreground truncate w-full text-center group-hover:text-foreground">
                  {icon.name}
                </span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="p-3 border-t text-xs text-muted-foreground text-center">
        {icons.length > 0 ? (
          <span>{icons.length} icons found</span>
        ) : (
          <span>Source: {ICON_SOURCES.find(s => s.id === activeSource)?.description}</span>
        )}
      </div>
    </div>
  );
}

export default IconPicker;
