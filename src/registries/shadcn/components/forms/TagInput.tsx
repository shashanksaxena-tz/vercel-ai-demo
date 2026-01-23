'use client';

import React, { useState, useRef } from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';
import { X } from 'lucide-react';

export const TagInput = ({ element, onAction }: ComponentRenderProps) => {
  const {
    label,
    name,
    value,
    defaultValue = [],
    placeholder = 'Add tag...',
    disabled = false,
    required = false,
    maxTags,
    allowDuplicates = false,
    tagVariant = 'default',
    delimiter = ',',
    error,
    helperText,
    style
  } = element.props;

  const [tags, setTags] = useState<string[]>((value || defaultValue) as string[]);
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const variantStyles = {
    default: 'bg-muted text-foreground',
    primary: 'bg-primary text-primary-foreground',
    secondary: 'bg-secondary text-secondary-foreground',
    outline: 'border border-input bg-transparent',
  };

  const addTag = (tagValue: string) => {
    const trimmedValue = tagValue.trim();
    if (!trimmedValue) return;
    if (!allowDuplicates && tags.includes(trimmedValue)) return;
    if (maxTags && tags.length >= (maxTags as number)) return;

    const newTags = [...tags, trimmedValue];
    setTags(newTags);
    setInputValue('');
    onAction?.({
      name: 'change',
      params: { name, value: newTags },
    });
    onAction?.({
      name: 'addTag',
      params: { name, tag: trimmedValue },
    });
  };

  const removeTag = (index: number) => {
    const removedTag = tags[index];
    const newTags = tags.filter((_, i) => i !== index);
    setTags(newTags);
    onAction?.({
      name: 'change',
      params: { name, value: newTags },
    });
    onAction?.({
      name: 'removeTag',
      params: { name, tag: removedTag, index },
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.includes(delimiter as string)) {
      const parts = value.split(delimiter as string);
      parts.forEach((part) => addTag(part));
    } else {
      setInputValue(value);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === delimiter) {
      e.preventDefault();
      addTag(inputValue);
    } else if (e.key === 'Backspace' && !inputValue && tags.length > 0) {
      removeTag(tags.length - 1);
    }
  };

  const canAddMore = !maxTags || tags.length < (maxTags as number);

  return (
    <div className="w-full" style={style as React.CSSProperties}>
      {label ? (
        <label className="block text-sm font-medium mb-2">
          {label as string}
          {(required as boolean) && <span className="text-destructive ml-1">*</span>}
        </label>
      ) : null}
      <div
        className={cn(
          'flex flex-wrap gap-2 min-h-10 p-2 rounded-md border border-input bg-background',
          'focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2',
          !!(disabled) && 'opacity-50 cursor-not-allowed',
          !!(error) && 'border-destructive focus-within:ring-destructive'
        )}
        onClick={() => inputRef.current?.focus()}
      >
        {tags.map((tag, index) => (
          <span
            key={`${tag}-${index}`}
            className={cn(
              'inline-flex items-center gap-1 px-2 py-1 rounded text-sm',
              variantStyles[(tagVariant as keyof typeof variantStyles) || 'default']
            )}
          >
            {tag}
            {!disabled && (
              <button
                type="button"
                className="hover:text-destructive"
                onClick={(e) => {
                  e.stopPropagation();
                  removeTag(index);
                }}
              >
                <X className="h-3 w-3" />
              </button>
            )}
          </span>
        ))}
        {canAddMore && (
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            placeholder={tags.length === 0 ? (placeholder as string) : ''}
            disabled={disabled as boolean}
            className={cn(
              'flex-1 min-w-[100px] bg-transparent text-sm outline-none',
              'placeholder:text-muted-foreground disabled:cursor-not-allowed'
            )}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            onBlur={() => inputValue && addTag(inputValue)}
          />
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
