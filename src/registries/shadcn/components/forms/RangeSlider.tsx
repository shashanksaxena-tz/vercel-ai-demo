'use client';

import React, { useState } from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';

export const RangeSlider = ({ element, onAction }: ComponentRenderProps) => {
  const {
    label,
    name,
    value,
    defaultValue = [25, 75],
    min = 0,
    max = 100,
    step = 1,
    disabled = false,
    showValue = true,
    minDistance = 0,
    error,
    helperText,
    style
  } = element.props;

  const defaultRange = (value || defaultValue) as [number, number];
  const [range, setRange] = useState<[number, number]>(defaultRange);

  const minPercent = ((range[0] - (min as number)) / ((max as number) - (min as number))) * 100;
  const maxPercent = ((range[1] - (min as number)) / ((max as number) - (min as number))) * 100;

  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newMin = parseFloat(e.target.value);
    const maxAllowed = range[1] - (minDistance as number);
    const clampedMin = Math.min(newMin, maxAllowed);
    const newRange: [number, number] = [clampedMin, range[1]];
    setRange(newRange);
    onAction?.({
      name: 'change',
      params: { name, value: newRange },
    });
  };

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newMax = parseFloat(e.target.value);
    const minAllowed = range[0] + (minDistance as number);
    const clampedMax = Math.max(newMax, minAllowed);
    const newRange: [number, number] = [range[0], clampedMax];
    setRange(newRange);
    onAction?.({
      name: 'change',
      params: { name, value: newRange },
    });
  };

  return (
    <div className="w-full" style={style as React.CSSProperties}>
      {(label || showValue) ? (
        <div className="flex justify-between items-center mb-3">
          {label ? (
            <label className="text-sm font-medium">{label as string}</label>
          ) : <span />}
          {showValue ? (
            <span className="text-sm text-muted-foreground">
              {range[0]} - {range[1]}
            </span>
          ) : null}
        </div>
      ) : null}
      <div className="relative h-2">
        {/* Track background */}
        <div className="absolute inset-0 bg-muted rounded-full" />

        {/* Active track */}
        <div
          className="absolute h-full bg-primary rounded-full"
          style={{
            left: `${minPercent}%`,
            width: `${maxPercent - minPercent}%`,
          }}
        />

        {/* Min thumb */}
        <input
          type="range"
          value={range[0]}
          min={min as number}
          max={max as number}
          step={step as number}
          disabled={disabled as boolean}
          onChange={handleMinChange}
          className={cn(
            'absolute inset-0 w-full h-2 opacity-0 cursor-pointer pointer-events-auto',
            !!(disabled) && 'cursor-not-allowed'
          )}
          style={{ zIndex: range[0] > (max as number) - 10 ? 5 : 3 }}
        />

        {/* Max thumb */}
        <input
          type="range"
          value={range[1]}
          min={min as number}
          max={max as number}
          step={step as number}
          disabled={disabled as boolean}
          onChange={handleMaxChange}
          className={cn(
            'absolute inset-0 w-full h-2 opacity-0 cursor-pointer pointer-events-auto',
            !!(disabled) && 'cursor-not-allowed'
          )}
          style={{ zIndex: range[1] < (min as number) + 10 ? 5 : 4 }}
        />

        {/* Min thumb visual */}
        <div
          className="absolute top-1/2 -translate-y-1/2 h-4 w-4 rounded-full bg-primary border-2 border-background shadow-sm pointer-events-none"
          style={{ left: `calc(${minPercent}% - 8px)` }}
        />

        {/* Max thumb visual */}
        <div
          className="absolute top-1/2 -translate-y-1/2 h-4 w-4 rounded-full bg-primary border-2 border-background shadow-sm pointer-events-none"
          style={{ left: `calc(${maxPercent}% - 8px)` }}
        />
      </div>
      <div className="flex justify-between mt-2">
        <span className="text-xs text-muted-foreground">{min as number}</span>
        <span className="text-xs text-muted-foreground">{max as number}</span>
      </div>
      {(error || helperText) ? (
        <p className={cn('mt-2 text-sm', error ? 'text-destructive' : 'text-muted-foreground')}>
          {(error || helperText) as string}
        </p>
      ) : null}
    </div>
  );
};
