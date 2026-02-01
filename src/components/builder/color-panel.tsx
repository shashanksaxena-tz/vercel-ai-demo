'use client';

/**
 * Color Panel - Color scheme customization for the design system
 *
 * Provides:
 * - Preset color scheme selection (Slate, Blue, Rose, Green, Orange, Violet)
 * - Live preview of color changes
 * - Optional custom color picker for primary color
 */

import * as React from 'react';
import {
  useDesign,
  COLOR_SCHEMES,
  type ColorScheme,
  createPaletteFromPrimary,
} from '@/lib/design';
import { cn } from '@/lib/utils';
import { Check, Palette, Pipette } from 'lucide-react';

interface ColorPanelProps {
  className?: string;
  /** Show custom color picker */
  showCustomPicker?: boolean;
  /** Compact mode */
  compact?: boolean;
  /** Layout orientation */
  orientation?: 'horizontal' | 'vertical';
}

// Color scheme metadata
const COLOR_SCHEME_META: Record<
  Exclude<ColorScheme, 'custom'>,
  { name: string; description: string }
> = {
  slate: {
    name: 'Slate',
    description: 'Professional and neutral',
  },
  blue: {
    name: 'Blue',
    description: 'Trust and reliability',
  },
  rose: {
    name: 'Rose',
    description: 'Warm and inviting',
  },
  green: {
    name: 'Green',
    description: 'Growth and nature',
  },
  orange: {
    name: 'Orange',
    description: 'Energy and enthusiasm',
  },
  violet: {
    name: 'Violet',
    description: 'Creative and premium',
  },
};

interface ColorSwatchProps {
  scheme: Exclude<ColorScheme, 'custom'>;
  isActive: boolean;
  onClick: () => void;
  showLabel?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

function ColorSwatch({
  scheme,
  isActive,
  onClick,
  showLabel = true,
  size = 'md',
}: ColorSwatchProps) {
  const palette = COLOR_SCHEMES[scheme];
  const meta = COLOR_SCHEME_META[scheme];

  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-10 h-10',
  };

  return (
    <button
      onClick={onClick}
      className={cn(
        'relative flex flex-col items-center gap-1.5 p-2 rounded-lg border-2 transition-all duration-200',
        isActive
          ? 'border-primary bg-primary/5 shadow-sm'
          : 'border-transparent hover:border-muted-foreground/20 hover:bg-muted/50'
      )}
      title={meta.description}
    >
      {/* Color preview circle */}
      <div
        className={cn(
          sizeClasses[size],
          'rounded-full shadow-inner ring-2 ring-inset ring-black/5 transition-transform',
          isActive && 'scale-110'
        )}
        style={{ backgroundColor: palette.primary }}
      />

      {/* Check mark overlay */}
      {isActive && (
        <div
          className={cn(
            'absolute flex items-center justify-center rounded-full',
            size === 'sm' ? 'w-6 h-6 top-1.5' : 'w-8 h-8 top-2'
          )}
          style={{ color: palette.primaryForeground }}
        >
          <Check className={size === 'sm' ? 'h-3 w-3' : 'h-4 w-4'} />
        </div>
      )}

      {/* Label */}
      {showLabel && (
        <span
          className={cn(
            'text-xs font-medium',
            isActive ? 'text-primary' : 'text-muted-foreground'
          )}
        >
          {meta.name}
        </span>
      )}
    </button>
  );
}

export function ColorPanel({
  className,
  showCustomPicker = false,
  compact = false,
  orientation = 'horizontal',
}: ColorPanelProps) {
  const { colorScheme, setColorScheme, setColorPalette, colorPalette } =
    useDesign();
  const [customColor, setCustomColor] = React.useState('#6366f1');
  const [isPickerOpen, setIsPickerOpen] = React.useState(false);

  const schemes: Exclude<ColorScheme, 'custom'>[] = [
    'slate',
    'blue',
    'rose',
    'green',
    'orange',
    'violet',
  ];

  const handleCustomColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const hex = e.target.value;
    setCustomColor(hex);

    // Convert hex to HSL
    const hsl = hexToHsl(hex);
    if (hsl) {
      const customPalette = createPaletteFromPrimary(hsl);
      setColorPalette(customPalette);
    }
  };

  return (
    <div className={cn('space-y-3', className)}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Palette className="h-4 w-4" />
          <span>Color Scheme:</span>
        </div>

        {/* Custom picker toggle */}
        {showCustomPicker && (
          <button
            onClick={() => setIsPickerOpen(!isPickerOpen)}
            className={cn(
              'inline-flex items-center gap-1 px-2 py-1 text-xs rounded-md transition-colors',
              isPickerOpen
                ? 'bg-primary text-primary-foreground'
                : 'text-muted-foreground hover:text-foreground hover:bg-muted'
            )}
          >
            <Pipette className="h-3 w-3" />
            <span>Custom</span>
          </button>
        )}
      </div>

      {/* Preset color schemes */}
      <div
        className={cn(
          'inline-flex flex-wrap gap-1 p-1 rounded-lg border bg-muted/30',
          orientation === 'vertical' && 'flex-col',
          compact && 'p-0.5'
        )}
      >
        {schemes.map((scheme) => (
          <ColorSwatch
            key={scheme}
            scheme={scheme}
            isActive={colorScheme === scheme}
            onClick={() => setColorScheme(scheme)}
            showLabel={!compact}
            size={compact ? 'sm' : 'md'}
          />
        ))}
      </div>

      {/* Custom color picker */}
      {showCustomPicker && isPickerOpen && (
        <div className="p-3 rounded-lg border bg-muted/30 space-y-3">
          <div className="flex items-center gap-3">
            <label className="text-sm font-medium">Primary Color:</label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={customColor}
                onChange={handleCustomColorChange}
                className="w-8 h-8 rounded cursor-pointer border-0 p-0"
              />
              <input
                type="text"
                value={customColor}
                onChange={(e) => {
                  if (/^#[0-9A-Fa-f]{0,6}$/.test(e.target.value)) {
                    setCustomColor(e.target.value);
                    if (e.target.value.length === 7) {
                      const hsl = hexToHsl(e.target.value);
                      if (hsl) {
                        const customPalette = createPaletteFromPrimary(hsl);
                        setColorPalette(customPalette);
                      }
                    }
                  }
                }}
                className="w-20 px-2 py-1 text-xs font-mono border rounded bg-background"
                placeholder="#000000"
              />
            </div>
          </div>

          {/* Preview */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground">Preview:</span>
            <div className="flex items-center gap-1">
              <div
                className="w-6 h-6 rounded"
                style={{ backgroundColor: colorPalette.primary }}
                title="Primary"
              />
              <div
                className="w-6 h-6 rounded"
                style={{ backgroundColor: colorPalette.secondary }}
                title="Secondary"
              />
              <div
                className="w-6 h-6 rounded"
                style={{ backgroundColor: colorPalette.accent }}
                title="Accent"
              />
              <div
                className="w-6 h-6 rounded"
                style={{ backgroundColor: colorPalette.muted }}
                title="Muted"
              />
            </div>
          </div>
        </div>
      )}

      {/* Current scheme description */}
      {!compact && colorScheme !== 'custom' && (
        <p className="text-xs text-muted-foreground">
          {COLOR_SCHEME_META[colorScheme].description}
        </p>
      )}
    </div>
  );
}

/**
 * Compact Color Buttons - Inline color scheme selector
 */
export function ColorSchemeButtons({ className }: { className?: string }) {
  const { colorScheme, setColorScheme } = useDesign();

  const schemes: Exclude<ColorScheme, 'custom'>[] = [
    'slate',
    'blue',
    'rose',
    'green',
    'orange',
    'violet',
  ];

  return (
    <div className={cn('inline-flex gap-1', className)}>
      {schemes.map((scheme) => {
        const palette = COLOR_SCHEMES[scheme];
        const isActive = colorScheme === scheme;

        return (
          <button
            key={scheme}
            onClick={() => setColorScheme(scheme)}
            className={cn(
              'relative w-6 h-6 rounded-full ring-2 ring-offset-2 ring-offset-background transition-all',
              isActive ? 'ring-primary scale-110' : 'ring-transparent hover:scale-105'
            )}
            style={{ backgroundColor: palette.primary }}
            title={COLOR_SCHEME_META[scheme].name}
          >
            {isActive && (
              <Check
                className="absolute inset-0 m-auto h-3 w-3"
                style={{ color: palette.primaryForeground }}
              />
            )}
          </button>
        );
      })}
    </div>
  );
}

/**
 * Color Scheme Badge - Shows current color scheme
 */
export function ColorSchemeBadge({ className }: { className?: string }) {
  const { colorScheme, colorPalette } = useDesign();

  const name = colorScheme === 'custom' ? 'Custom' : COLOR_SCHEME_META[colorScheme].name;

  return (
    <div
      className={cn(
        'inline-flex items-center gap-1.5 px-2 py-1 rounded-md text-xs font-medium',
        className
      )}
      style={{
        backgroundColor: `color-mix(in srgb, ${colorPalette.primary} 15%, transparent)`,
        color: colorPalette.primary,
      }}
    >
      <div
        className="w-3 h-3 rounded-full"
        style={{ backgroundColor: colorPalette.primary }}
      />
      <span>{name}</span>
    </div>
  );
}

/**
 * Convert hex color to HSL string
 */
function hexToHsl(hex: string): string | null {
  // Remove the hash
  hex = hex.replace(/^#/, '');

  if (hex.length !== 6) return null;

  // Parse hex values
  const r = parseInt(hex.slice(0, 2), 16) / 255;
  const g = parseInt(hex.slice(2, 4), 16) / 255;
  const b = parseInt(hex.slice(4, 6), 16) / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

    switch (max) {
      case r:
        h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
        break;
      case g:
        h = ((b - r) / d + 2) / 6;
        break;
      case b:
        h = ((r - g) / d + 4) / 6;
        break;
    }
  }

  return `hsl(${Math.round(h * 360)}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%)`;
}

export default ColorPanel;
