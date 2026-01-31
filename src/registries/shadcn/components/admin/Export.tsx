'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';

export const Export = ({ element, onAction }: ComponentRenderProps) => {
  const {
    title = 'Export Data',
    formats,
    options,
    isExporting = false,
    style
  } = element.props;

  const formatList = formats as Array<{ id: string; label: string; description?: string }>;
  const optionList = options as Array<{ id: string; label: string; checked?: boolean }>;

  const [selectedFormat, setSelectedFormat] = React.useState(formatList?.[0]?.id || 'csv');

  return (
    <div
      className={cn('space-y-4')}
      style={style as React.CSSProperties}
    >
      <h4 className="font-medium">{title as string}</h4>

      {formatList && formatList.length > 0 && (
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">Format</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {formatList.map((format) => (
              <button
                key={format.id}
                onClick={() => setSelectedFormat(format.id)}
                className={cn(
                  'p-3 border rounded-lg text-left transition-colors',
                  selectedFormat === format.id
                    ? 'border-primary bg-primary/5'
                    : 'hover:bg-muted'
                )}
              >
                <p className="font-medium">{format.label}</p>
                {format.description && (
                  <p className="text-xs text-muted-foreground">{format.description}</p>
                )}
              </button>
            ))}
          </div>
        </div>
      )}

      {optionList && optionList.length > 0 && (
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">Options</p>
          <div className="space-y-2">
            {optionList.map((option) => (
              <label key={option.id} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  defaultChecked={option.checked}
                  className="w-4 h-4"
                  onChange={(e) => onAction?.({ name: 'toggleOption', payload: { id: option.id, checked: e.target.checked } } as never)}
                />
                <span className="text-sm">{option.label}</span>
              </label>
            ))}
          </div>
        </div>
      )}

      <button
        onClick={() => onAction?.({ name: 'export', payload: { format: selectedFormat } } as never)}
        disabled={isExporting as boolean}
        className={cn(
          'w-full px-4 py-2 bg-primary text-primary-foreground rounded hover:bg-primary/90',
          isExporting && 'opacity-50 cursor-not-allowed'
        )}
      >
        {isExporting ? 'Exporting...' : 'Export'}
      </button>
    </div>
  );
};
