'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';

export const ProductOptions = ({ element, children, onAction }: ComponentRenderProps) => {
  const {
    options,
    selectedOptions,
    layout = 'vertical',
    style,
  } = element.props;

  const optionGroups = options as Array<{
    id: string;
    name: string;
    type: 'select' | 'radio' | 'color' | 'size';
    values: Array<{
      id: string;
      label: string;
      value: string;
      available?: boolean;
      color?: string;
      priceModifier?: number;
    }>;
  }> | undefined;

  const selected = (selectedOptions as Record<string, string>) || {};

  const handleOptionChange = (optionId: string, valueId: string) => {
    if (onAction) {
      onAction({ name: 'selectOption', payload: { optionId, valueId } } as never);
    }
  };

  if (!optionGroups || optionGroups.length === 0) {
    return <>{children}</>;
  }

  return (
    <div
      className={cn(
        layout === 'horizontal' ? 'flex flex-wrap gap-6' : 'space-y-6'
      )}
      style={style as React.CSSProperties}
    >
      {optionGroups.map((option) => (
        <div key={option.id} className="space-y-3">
          <label className="text-sm font-medium">
            {option.name}
            {selected[option.id] && (
              <span className="ml-2 font-normal text-muted-foreground">
                {option.values.find((v) => v.id === selected[option.id])?.label}
              </span>
            )}
          </label>

          {option.type === 'select' ? (
            <select
              value={selected[option.id] || ''}
              onChange={(e) => handleOptionChange(option.id, e.target.value)}
              className="w-full px-3 py-2 border rounded-md bg-background"
            >
              <option value="">Select {option.name}</option>
              {option.values.map((value) => (
                <option
                  key={value.id}
                  value={value.id}
                  disabled={value.available === false}
                >
                  {value.label}
                  {value.priceModifier && value.priceModifier > 0
                    ? ` (+$${value.priceModifier.toFixed(2)})`
                    : ''}
                  {value.available === false ? ' (Out of Stock)' : ''}
                </option>
              ))}
            </select>
          ) : option.type === 'color' ? (
            <div className="flex flex-wrap gap-2">
              {option.values.map((value) => (
                <button
                  key={value.id}
                  onClick={() => handleOptionChange(option.id, value.id)}
                  disabled={value.available === false}
                  className={cn(
                    'w-8 h-8 rounded-full border-2 transition-all',
                    selected[option.id] === value.id
                      ? 'border-primary ring-2 ring-primary ring-offset-2'
                      : 'border-gray-200 hover:border-gray-400',
                    value.available === false && 'opacity-50 cursor-not-allowed'
                  )}
                  style={{ backgroundColor: value.color }}
                  title={value.label}
                />
              ))}
            </div>
          ) : option.type === 'size' ? (
            <div className="flex flex-wrap gap-2">
              {option.values.map((value) => (
                <button
                  key={value.id}
                  onClick={() => handleOptionChange(option.id, value.id)}
                  disabled={value.available === false}
                  className={cn(
                    'min-w-[3rem] px-3 py-2 text-sm font-medium rounded-md border transition-colors',
                    selected[option.id] === value.id
                      ? 'bg-primary text-primary-foreground border-primary'
                      : 'bg-background text-foreground border-input hover:bg-muted',
                    value.available === false && 'opacity-50 cursor-not-allowed line-through'
                  )}
                >
                  {value.label}
                </button>
              ))}
            </div>
          ) : (
            <div className="flex flex-wrap gap-2">
              {option.values.map((value) => (
                <label
                  key={value.id}
                  className={cn(
                    'flex items-center gap-2 px-3 py-2 border rounded-md cursor-pointer transition-colors',
                    selected[option.id] === value.id
                      ? 'border-primary bg-primary/5'
                      : 'border-input hover:bg-muted',
                    value.available === false && 'opacity-50 cursor-not-allowed'
                  )}
                >
                  <input
                    type="radio"
                    name={option.id}
                    value={value.id}
                    checked={selected[option.id] === value.id}
                    onChange={() => handleOptionChange(option.id, value.id)}
                    disabled={value.available === false}
                    className="sr-only"
                  />
                  <span className={cn(value.available === false && 'line-through')}>
                    {value.label}
                  </span>
                  {value.priceModifier && value.priceModifier > 0 && (
                    <span className="text-xs text-muted-foreground">
                      +${value.priceModifier.toFixed(2)}
                    </span>
                  )}
                </label>
              ))}
            </div>
          )}
        </div>
      ))}
      {children}
    </div>
  );
};
