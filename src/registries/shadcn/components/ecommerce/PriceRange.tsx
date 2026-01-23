'use client';

import React, { useState, useEffect } from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';

export const PriceRange = ({ element, onAction }: ComponentRenderProps) => {
  const {
    min = 0,
    max = 1000,
    minValue,
    maxValue,
    currency = '$',
    step = 1,
    showInputs = true,
    showHistogram = false,
    histogram,
    style,
  } = element.props;

  const [localMin, setLocalMin] = useState(Number(minValue) || Number(min));
  const [localMax, setLocalMax] = useState(Number(maxValue) || Number(max));

  const minNum = Number(min);
  const maxNum = Number(max);
  const stepNum = Number(step);

  useEffect(() => {
    if (minValue !== undefined) setLocalMin(Number(minValue));
    if (maxValue !== undefined) setLocalMax(Number(maxValue));
  }, [minValue, maxValue]);

  const handleMinChange = (value: number) => {
    const newMin = Math.min(value, localMax - stepNum);
    setLocalMin(Math.max(minNum, newMin));
  };

  const handleMaxChange = (value: number) => {
    const newMax = Math.max(value, localMin + stepNum);
    setLocalMax(Math.min(maxNum, newMax));
  };

  const handleApply = () => {
    if (onAction) {
      onAction({
        name: 'setPriceRange',
        payload: { min: localMin, max: localMax },
      });
    }
  };

  const minPercent = ((localMin - minNum) / (maxNum - minNum)) * 100;
  const maxPercent = ((localMax - minNum) / (maxNum - minNum)) * 100;

  const histogramData = histogram as number[] | undefined;

  return (
    <div className="space-y-4" style={style as React.CSSProperties}>
      {showHistogram && histogramData && histogramData.length > 0 && (
        <div className="h-16 flex items-end gap-0.5">
          {histogramData.map((value, index) => {
            const barMin = minNum + (index / histogramData.length) * (maxNum - minNum);
            const barMax = minNum + ((index + 1) / histogramData.length) * (maxNum - minNum);
            const isInRange = barMax >= localMin && barMin <= localMax;
            const maxVal = Math.max(...histogramData);
            const height = (value / maxVal) * 100;
            return (
              <div
                key={index}
                className={cn(
                  'flex-1 rounded-t transition-colors',
                  isInRange ? 'bg-primary' : 'bg-muted'
                )}
                style={{ height: `${height}%` }}
              />
            );
          })}
        </div>
      )}

      <div className="relative h-2 bg-muted rounded-full">
        <div
          className="absolute h-full bg-primary rounded-full"
          style={{
            left: `${minPercent}%`,
            width: `${maxPercent - minPercent}%`,
          }}
        />
        <input
          type="range"
          min={minNum}
          max={maxNum}
          step={stepNum}
          value={localMin}
          onChange={(e) => handleMinChange(Number(e.target.value))}
          onMouseUp={handleApply}
          onTouchEnd={handleApply}
          className="absolute w-full h-full opacity-0 cursor-pointer"
        />
        <input
          type="range"
          min={minNum}
          max={maxNum}
          step={stepNum}
          value={localMax}
          onChange={(e) => handleMaxChange(Number(e.target.value))}
          onMouseUp={handleApply}
          onTouchEnd={handleApply}
          className="absolute w-full h-full opacity-0 cursor-pointer"
        />
        <div
          className="absolute w-4 h-4 bg-background border-2 border-primary rounded-full -top-1 -translate-x-1/2 cursor-pointer"
          style={{ left: `${minPercent}%` }}
        />
        <div
          className="absolute w-4 h-4 bg-background border-2 border-primary rounded-full -top-1 -translate-x-1/2 cursor-pointer"
          style={{ left: `${maxPercent}%` }}
        />
      </div>

      {showInputs ? (
        <div className="flex items-center gap-3">
          <div className="flex-1">
            <label className="text-xs text-muted-foreground">Min</label>
            <div className="relative">
              <span className="absolute left-2 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                {currency}
              </span>
              <input
                type="number"
                value={localMin}
                onChange={(e) => handleMinChange(Number(e.target.value))}
                onBlur={handleApply}
                min={minNum}
                max={localMax - stepNum}
                className="w-full pl-6 pr-2 py-1.5 text-sm border rounded-md bg-background"
              />
            </div>
          </div>
          <span className="text-muted-foreground mt-5">-</span>
          <div className="flex-1">
            <label className="text-xs text-muted-foreground">Max</label>
            <div className="relative">
              <span className="absolute left-2 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                {currency}
              </span>
              <input
                type="number"
                value={localMax}
                onChange={(e) => handleMaxChange(Number(e.target.value))}
                onBlur={handleApply}
                min={localMin + stepNum}
                max={maxNum}
                className="w-full pl-6 pr-2 py-1.5 text-sm border rounded-md bg-background"
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-between text-sm">
          <span>{currency}{localMin.toFixed(0)}</span>
          <span>{currency}{localMax.toFixed(0)}</span>
        </div>
      )}
    </div>
  );
};
