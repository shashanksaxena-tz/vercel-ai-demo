import React, { useState } from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';

export const Slider = ({ element, onAction }: ComponentRenderProps) => {
  const {
    label,
    name,
    value,
    defaultValue = 50,
    min = 0,
    max = 100,
    step = 1,
    showValue = true,
    disabled = false,
    marks,
    style
  } = element.props;

  const [currentValue, setCurrentValue] = useState(
    (value ?? defaultValue) as number
  );

  const marksArray = marks as Array<{ value: number; label?: string }>;
  const percentage = ((currentValue - (min as number)) / ((max as number) - (min as number))) * 100;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseFloat(e.target.value);
    setCurrentValue(newValue);
    onAction?.({
      name: 'change',
      params: { name, value: newValue },
    });
  };

  return (
    <div className="w-full" style={style as React.CSSProperties}>
      {(label || showValue) ? (
        <div className="flex justify-between items-center mb-3">
          {label ? (
            <label className="text-sm font-medium">{label as string}</label>
          ) : null}
          {showValue ? (
            <span className="text-sm text-muted-foreground">{currentValue}</span>
          ) : null}
        </div>
      ) : null}
      <div className="relative">
        <div className="relative h-2 bg-muted rounded-full overflow-hidden">
          <div
            className="absolute h-full bg-primary rounded-full transition-all"
            style={{ width: `${percentage}%` }}
          />
        </div>
        <input
          type="range"
          name={name as string}
          value={currentValue}
          min={min as number}
          max={max as number}
          step={step as number}
          disabled={disabled as boolean}
          onChange={handleChange}
          className={cn(
            'absolute inset-0 w-full h-2 opacity-0 cursor-pointer',
            !!(disabled) && 'cursor-not-allowed'
          )}
        />
        <div
          className="absolute top-1/2 -translate-y-1/2 h-4 w-4 rounded-full bg-primary border-2 border-background shadow-sm pointer-events-none"
          style={{ left: `calc(${percentage}% - 8px)` }}
        />
      </div>
      {marksArray && (
        <div className="relative mt-2">
          {marksArray.map((mark) => {
            const markPercentage =
              ((mark.value - (min as number)) / ((max as number) - (min as number))) * 100;
            return (
              <div
                key={mark.value}
                className="absolute text-xs text-muted-foreground transform -translate-x-1/2"
                style={{ left: `${markPercentage}%` }}
              >
                {mark.label || mark.value}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
