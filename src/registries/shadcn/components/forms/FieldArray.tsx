'use client';

import React, { useState } from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';
import { Plus, Trash2, GripVertical } from 'lucide-react';

export const FieldArray = ({ element, children, onAction }: ComponentRenderProps) => {
  const {
    label,
    name,
    value,
    defaultValue = [],
    minItems = 0,
    maxItems,
    disabled = false,
    addLabel = 'Add Item',
    showIndex = false,
    sortable = false,
    error,
    helperText,
    style
  } = element.props;

  const [items, setItems] = useState<any[]>((value || defaultValue) as any[]);

  const canAdd = !maxItems || items.length < (maxItems as number);
  const canRemove = items.length > (minItems as number);

  const handleAdd = () => {
    if (!canAdd || disabled) return;
    const newItems = [...items, {}];
    setItems(newItems);
    onAction?.({
      name: 'add',
      params: { name, value: newItems, index: newItems.length - 1 },
    });
  };

  const handleRemove = (index: number) => {
    if (!canRemove || disabled) return;
    const newItems = items.filter((_, i) => i !== index);
    setItems(newItems);
    onAction?.({
      name: 'remove',
      params: { name, value: newItems, index },
    });
  };

  const handleMove = (fromIndex: number, toIndex: number) => {
    if (!sortable || disabled) return;
    const newItems = [...items];
    const [removed] = newItems.splice(fromIndex, 1);
    newItems.splice(toIndex, 0, removed);
    setItems(newItems);
    onAction?.({
      name: 'reorder',
      params: { name, value: newItems, fromIndex, toIndex },
    });
  };

  return (
    <div className="w-full" style={style as React.CSSProperties}>
      {label ? (
        <label className="block text-sm font-medium mb-3">
          {label as string}
        </label>
      ) : null}

      <div className="space-y-3">
        {items.map((item, index) => (
          <div
            key={index}
            className={cn(
              'flex items-start gap-3 p-4 rounded-md border border-input bg-background',
              !!(disabled) && 'opacity-50'
            )}
          >
            {sortable && (
              <button
                type="button"
                className="p-1 cursor-grab text-muted-foreground hover:text-foreground"
                disabled={disabled as boolean}
              >
                <GripVertical className="h-5 w-5" />
              </button>
            )}

            {showIndex && (
              <span className="flex items-center justify-center h-6 w-6 rounded-full bg-muted text-sm font-medium">
                {index + 1}
              </span>
            )}

            <div className="flex-1">
              {children}
            </div>

            {canRemove && (
              <button
                type="button"
                className={cn(
                  'p-2 text-muted-foreground hover:text-destructive rounded transition-colors',
                  !!(disabled) && 'cursor-not-allowed'
                )}
                onClick={() => handleRemove(index)}
                disabled={disabled as boolean}
              >
                <Trash2 className="h-4 w-4" />
              </button>
            )}
          </div>
        ))}
      </div>

      {canAdd && (
        <button
          type="button"
          className={cn(
            'mt-3 flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md border border-dashed border-input',
            'hover:bg-muted transition-colors',
            !!(disabled) && 'cursor-not-allowed opacity-50'
          )}
          onClick={handleAdd}
          disabled={disabled as boolean}
        >
          <Plus className="h-4 w-4" />
          {addLabel as string}
        </button>
      )}

      {(error || helperText) ? (
        <p className={cn('mt-2 text-sm', error ? 'text-destructive' : 'text-muted-foreground')}>
          {(error || helperText) as string}
        </p>
      ) : null}
    </div>
  );
};
