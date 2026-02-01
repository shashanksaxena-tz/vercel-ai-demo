'use client';

/**
 * Image Picker - Browse and select stock images from multiple sources
 *
 * Sources:
 * - Unsplash
 * - Pexels
 *
 * Includes proper attribution display for photographer credits.
 */

import * as React from 'react';
import { cn } from '@/lib/utils';
import { Search, Loader2, User, ExternalLink } from 'lucide-react';
import type { ImageMetadata } from '@/lib/mcp/types';

type ImageSource = 'unsplash' | 'pexels';

interface ImagePickerProps {
  onSelect: (image: ImageMetadata) => void;
  className?: string;
}

interface ImageSearchResponse {
  images: ImageMetadata[];
  source: string;
  total: number;
}

const IMAGE_SOURCES: { id: ImageSource; label: string; description: string }[] = [
  { id: 'unsplash', label: 'Unsplash', description: 'Free high-res photos' },
  { id: 'pexels', label: 'Pexels', description: 'Free stock photos' },
];

export function ImagePicker({ onSelect, className }: ImagePickerProps) {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [activeSource, setActiveSource] = React.useState<ImageSource>('unsplash');
  const [images, setImages] = React.useState<ImageMetadata[]>([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [selectedImage, setSelectedImage] = React.useState<string | null>(null);

  // Debounced search
  const debouncedSearch = React.useMemo(() => {
    let timeoutId: NodeJS.Timeout;
    return (query: string, source: ImageSource) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        fetchImages(query, source);
      }, 300);
    };
  }, []);

  // Fetch images from API
  const fetchImages = React.useCallback(async (query: string, source: ImageSource) => {
    if (!query.trim()) {
      setImages([]);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/mcp/images', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query, source }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch images');
      }

      const data: ImageSearchResponse = await response.json();
      setImages(data.images || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch images');
      setImages([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Effect for search
  React.useEffect(() => {
    debouncedSearch(searchQuery, activeSource);
  }, [searchQuery, activeSource, debouncedSearch]);

  // Handle image selection
  const handleSelect = (image: ImageMetadata) => {
    setSelectedImage(image.id);
    onSelect(image);
  };

  return (
    <div className={cn('flex flex-col h-full', className)}>
      {/* Search Input */}
      <div className="p-3 border-b">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="search"
            placeholder="Search images..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-sm border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
      </div>

      {/* Source Tabs */}
      <div className="p-3 border-b">
        <div className="flex flex-wrap gap-1">
          {IMAGE_SOURCES.map((source) => (
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

      {/* Images Grid */}
      <div className="flex-1 overflow-auto p-3">
        {isLoading ? (
          <div className="flex items-center justify-center h-32">
            <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
          </div>
        ) : error ? (
          <div className="text-center py-8">
            <p className="text-sm text-red-500">{error}</p>
            <button
              onClick={() => fetchImages(searchQuery, activeSource)}
              className="mt-2 text-xs text-primary hover:underline"
            >
              Try again
            </button>
          </div>
        ) : images.length === 0 ? (
          <div className="text-center py-8 text-sm text-muted-foreground">
            {searchQuery ? 'No images found' : 'Search for images above'}
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {images.map((image) => (
              <button
                key={image.id}
                onClick={() => handleSelect(image)}
                className={cn(
                  'relative group rounded-lg overflow-hidden border transition-all',
                  selectedImage === image.id
                    ? 'ring-2 ring-primary border-primary'
                    : 'border-transparent hover:border-border'
                )}
              >
                {/* Image Thumbnail */}
                <div className="aspect-video relative bg-muted">
                  <img
                    src={image.thumbnailUrl}
                    alt={image.alt}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <ExternalLink className="h-5 w-5 text-white" />
                  </div>
                </div>

                {/* Attribution */}
                <div className="p-2 bg-background">
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <User className="h-3 w-3 flex-shrink-0" />
                    <span className="truncate">{image.photographer}</span>
                  </div>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-[10px] text-muted-foreground/70">
                      {image.width} x {image.height}
                    </span>
                    <span className="text-[10px] text-muted-foreground/70 capitalize">
                      {image.source}
                    </span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="p-3 border-t">
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>
            {images.length > 0
              ? `${images.length} images found`
              : IMAGE_SOURCES.find(s => s.id === activeSource)?.description}
          </span>
          <a
            href={activeSource === 'unsplash' ? 'https://unsplash.com' : 'https://pexels.com'}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 hover:text-foreground transition-colors"
          >
            <span>Photos by {activeSource === 'unsplash' ? 'Unsplash' : 'Pexels'}</span>
            <ExternalLink className="h-3 w-3" />
          </a>
        </div>
      </div>
    </div>
  );
}

export default ImagePicker;
