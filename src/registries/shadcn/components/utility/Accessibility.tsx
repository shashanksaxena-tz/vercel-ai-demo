'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';

export const Accessibility = ({ element, onAction }: ComponentRenderProps) => {
  const {
    fontSize = 'default',
    contrast = 'default',
    reducedMotion = false,
    style
  } = element.props;

  return (
    <div
      className={cn('space-y-4 p-4 border rounded-lg')}
      style={style as React.CSSProperties}
    >
      <h3 className="font-semibold">Accessibility Settings</h3>

      <div className="space-y-2">
        <label className="text-sm font-medium">Font Size</label>
        <div className="flex gap-2">
          {['small', 'default', 'large', 'extra-large'].map((size) => (
            <button
              key={size}
              onClick={() => onAction?.({ name: 'setFontSize', payload: { fontSize: size } })}
              className={cn(
                'px-3 py-1 text-sm rounded border',
                fontSize === size ? 'bg-primary text-primary-foreground' : 'hover:bg-muted'
              )}
            >
              {size === 'small' ? 'A' : size === 'default' ? 'A' : size === 'large' ? 'A' : 'A'}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Contrast</label>
        <div className="flex gap-2">
          {['default', 'high', 'inverted'].map((c) => (
            <button
              key={c}
              onClick={() => onAction?.({ name: 'setContrast', payload: { contrast: c } })}
              className={cn(
                'px-3 py-1 text-sm rounded border capitalize',
                contrast === c ? 'bg-primary text-primary-foreground' : 'hover:bg-muted'
              )}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium">Reduced Motion</p>
          <p className="text-xs text-muted-foreground">Minimize animations</p>
        </div>
        <button
          onClick={() => onAction?.({ name: 'toggleReducedMotion', payload: { reducedMotion: !reducedMotion } })}
          className={cn(
            'relative w-11 h-6 rounded-full transition-colors',
            reducedMotion ? 'bg-primary' : 'bg-muted'
          )}
        >
          <span
            className={cn(
              'absolute top-1 w-4 h-4 bg-white rounded-full transition-transform',
              reducedMotion ? 'left-6' : 'left-1'
            )}
          />
        </button>
      </div>
    </div>
  );
};
