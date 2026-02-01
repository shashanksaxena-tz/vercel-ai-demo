'use client';

/**
 * Design Language Picker - Visual preset selector for design system
 *
 * Allows users to switch between design presets:
 * - Sharp: Clean, geometric with no rounded corners
 * - Rounded: Friendly, balanced curves
 * - Pill: Soft, playful with fully rounded corners
 */

import * as React from 'react';
import { useDesign, DESIGN_PRESETS, type DesignLanguage } from '@/lib/design';
import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';

interface DesignLanguagePickerProps {
  className?: string;
  /** Compact mode - smaller preview boxes */
  compact?: boolean;
  /** Show labels below previews */
  showLabels?: boolean;
  /** Orientation of the picker */
  orientation?: 'horizontal' | 'vertical';
}

// Preview shapes for each design language
interface PreviewShapeProps {
  borderRadius: string;
  size?: 'sm' | 'md' | 'lg';
  isActive?: boolean;
}

function PreviewShape({ borderRadius, size = 'md', isActive }: PreviewShapeProps) {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-10 h-10',
  };

  return (
    <div
      className={cn(
        sizeClasses[size],
        'border-2 transition-all duration-200',
        isActive
          ? 'border-primary bg-primary/20'
          : 'border-muted-foreground/30 bg-muted'
      )}
      style={{ borderRadius }}
    />
  );
}

// Design language option with preview
interface DesignOptionProps {
  language: Exclude<DesignLanguage, 'custom'>;
  isActive: boolean;
  onClick: () => void;
  showLabel?: boolean;
  compact?: boolean;
}

function DesignOption({
  language,
  isActive,
  onClick,
  showLabel = true,
  compact = false,
}: DesignOptionProps) {
  const preset = DESIGN_PRESETS[language];

  return (
    <button
      onClick={onClick}
      className={cn(
        'relative flex flex-col items-center gap-2 p-3 rounded-lg border-2 transition-all duration-200',
        compact && 'p-2 gap-1',
        isActive
          ? 'border-primary bg-primary/5 shadow-sm'
          : 'border-transparent hover:border-muted-foreground/20 hover:bg-muted/50'
      )}
    >
      {/* Preview shapes */}
      <div className={cn('flex items-end gap-1', compact && 'gap-0.5')}>
        <PreviewShape
          borderRadius={preset.preview.button}
          size={compact ? 'sm' : 'md'}
          isActive={isActive}
        />
        <PreviewShape
          borderRadius={preset.preview.card}
          size={compact ? 'sm' : 'md'}
          isActive={isActive}
        />
        <PreviewShape
          borderRadius={preset.preview.input}
          size={compact ? 'sm' : 'md'}
          isActive={isActive}
        />
      </div>

      {/* Label */}
      {showLabel && (
        <div className="flex items-center gap-1">
          <span
            className={cn(
              'text-xs font-medium',
              isActive ? 'text-primary' : 'text-muted-foreground'
            )}
          >
            {preset.name}
          </span>
          {isActive && <Check className="h-3 w-3 text-primary" />}
        </div>
      )}

      {/* Active indicator */}
      {isActive && (
        <div className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-primary-foreground">
          <Check className="h-2.5 w-2.5" />
        </div>
      )}
    </button>
  );
}

export function DesignLanguagePicker({
  className,
  compact = false,
  showLabels = true,
  orientation = 'horizontal',
}: DesignLanguagePickerProps) {
  const { designLanguage, setDesignLanguage } = useDesign();

  const languages: Exclude<DesignLanguage, 'custom'>[] = ['sharp', 'rounded', 'pill'];

  return (
    <div className={cn('space-y-2', className)}>
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <span>Design Language:</span>
      </div>

      <div
        className={cn(
          'inline-flex gap-1 p-1 rounded-lg border bg-muted/30',
          orientation === 'vertical' && 'flex-col'
        )}
      >
        {languages.map((lang) => (
          <DesignOption
            key={lang}
            language={lang}
            isActive={designLanguage === lang}
            onClick={() => setDesignLanguage(lang)}
            showLabel={showLabels}
            compact={compact}
          />
        ))}
      </div>

      {/* Description of current selection */}
      {!compact && designLanguage !== 'custom' && (
        <p className="text-xs text-muted-foreground">
          {DESIGN_PRESETS[designLanguage].description}
        </p>
      )}
    </div>
  );
}

/**
 * Compact Design Language Selector - Button group style
 */
export function DesignLanguageButtons({ className }: { className?: string }) {
  const { designLanguage, setDesignLanguage } = useDesign();

  const languages: Exclude<DesignLanguage, 'custom'>[] = ['sharp', 'rounded', 'pill'];

  return (
    <div className={cn('inline-flex rounded-lg border p-1', className)}>
      {languages.map((lang) => {
        const preset = DESIGN_PRESETS[lang];
        const isActive = designLanguage === lang;

        return (
          <button
            key={lang}
            onClick={() => setDesignLanguage(lang)}
            className={cn(
              'inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded-md transition-all',
              isActive
                ? 'bg-primary text-primary-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground hover:bg-muted'
            )}
          >
            <div
              className={cn(
                'w-4 h-4 border-2',
                isActive ? 'border-primary-foreground' : 'border-current'
              )}
              style={{ borderRadius: preset.preview.button }}
            />
            <span>{preset.name}</span>
          </button>
        );
      })}
    </div>
  );
}

/**
 * Design Language Badge - Shows current design language
 */
export function DesignLanguageBadge({ className }: { className?: string }) {
  const { designLanguage } = useDesign();

  if (designLanguage === 'custom') {
    return (
      <div
        className={cn(
          'inline-flex items-center gap-1.5 px-2 py-1 rounded-md text-xs font-medium bg-muted text-muted-foreground',
          className
        )}
      >
        <div className="w-3 h-3 border border-current rounded-sm" />
        <span>Custom</span>
      </div>
    );
  }

  const preset = DESIGN_PRESETS[designLanguage];

  return (
    <div
      className={cn(
        'inline-flex items-center gap-1.5 px-2 py-1 rounded-md text-xs font-medium bg-primary/10 text-primary',
        className
      )}
    >
      <div
        className="w-3 h-3 border-2 border-current"
        style={{ borderRadius: preset.preview.button }}
      />
      <span>{preset.name}</span>
    </div>
  );
}

export default DesignLanguagePicker;
