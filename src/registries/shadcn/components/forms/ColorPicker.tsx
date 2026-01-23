'use client';

import React, { useState } from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';
import { Palette } from 'lucide-react';

export const ColorPicker = ({ element, onAction }: ComponentRenderProps) => {
  const {
    label,
    name,
    value,
    defaultValue = '#000000',
    disabled = false,
    required = false,
    showInput = true,
    presetColors,
    error,
    helperText,
    style
  } = element.props;

  const [currentColor, setCurrentColor] = useState((value || defaultValue) as string);
  const [isOpen, setIsOpen] = useState(false);

  const defaultPresets = [
    '#ef4444', '#f97316', '#f59e0b', '#eab308', '#84cc16',
    '#22c55e', '#10b981', '#14b8a6', '#06b6d4', '#0ea5e9',
    '#3b82f6', '#6366f1', '#8b5cf6', '#a855f7', '#d946ef',
    '#ec4899', '#f43f5e', '#000000', '#71717a', '#ffffff',
  ];

  const presets = (presetColors as string[]) || defaultPresets;

  const handleColorChange = (color: string) => {
    setCurrentColor(color);
    onAction?.({
      name: 'change',
      params: { name, value: color },
    });
  };

  return (
    <div className="w-full" style={style as React.CSSProperties}>
      {label ? (
        <label className="block text-sm font-medium mb-2">
          {label as string}
          {(required as boolean) && <span className="text-destructive ml-1">*</span>}
        </label>
      ) : null}

      <div className="relative">
        <button
          type="button"
          className={cn(
            'flex h-10 w-full items-center rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background',
            'focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
            'disabled:cursor-not-allowed disabled:opacity-50',
            !!(error) && 'border-destructive focus:ring-destructive'
          )}
          disabled={disabled as boolean}
          onClick={() => setIsOpen(!isOpen)}
        >
          <div
            className="h-5 w-5 rounded border border-input mr-2"
            style={{ backgroundColor: currentColor }}
          />
          <span>{currentColor}</span>
          <Palette className="ml-auto h-4 w-4 text-muted-foreground" />
        </button>

        {isOpen && (
          <div className="absolute top-full mt-1 z-50 bg-popover border rounded-lg shadow-lg p-4 w-64">
            {/* Native color picker */}
            <div className="mb-4">
              <input
                type="color"
                value={currentColor}
                onChange={(e) => handleColorChange(e.target.value)}
                className="w-full h-32 cursor-pointer rounded border-0"
              />
            </div>

            {/* Preset colors */}
            <div className="grid grid-cols-5 gap-2">
              {presets.map((color, index) => (
                <button
                  key={`${color}-${index}`}
                  type="button"
                  className={cn(
                    'h-8 w-8 rounded border-2 transition-transform hover:scale-110',
                    currentColor === color ? 'border-primary' : 'border-transparent'
                  )}
                  style={{ backgroundColor: color }}
                  onClick={() => handleColorChange(color)}
                />
              ))}
            </div>

            {/* Manual input */}
            {showInput && (
              <div className="mt-4">
                <input
                  type="text"
                  value={currentColor}
                  onChange={(e) => handleColorChange(e.target.value)}
                  className="w-full h-8 px-2 text-sm border border-input rounded bg-background"
                  placeholder="#000000"
                />
              </div>
            )}

            <div className="mt-4 flex justify-end">
              <button
                type="button"
                className="px-3 py-1 text-sm rounded bg-primary text-primary-foreground hover:bg-primary/90"
                onClick={() => setIsOpen(false)}
              >
                Done
              </button>
            </div>
          </div>
        )}
      </div>

      {(error || helperText) ? (
        <p className={cn('mt-1 text-sm', error ? 'text-destructive' : 'text-muted-foreground')}>
          {(error || helperText) as string}
        </p>
      ) : null}
    </div>
  );
};
