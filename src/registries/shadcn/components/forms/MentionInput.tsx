'use client';

import React, { useState, useRef, useEffect } from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';
import { AtSign } from 'lucide-react';

interface MentionOption {
  id: string;
  name: string;
  avatar?: string;
  description?: string;
}

export const MentionInput = ({ element, onAction }: ComponentRenderProps) => {
  const {
    label,
    name,
    value,
    defaultValue,
    placeholder = 'Type @ to mention someone...',
    disabled = false,
    required = false,
    options = [],
    trigger = '@',
    error,
    helperText,
    style
  } = element.props;

  const [inputValue, setInputValue] = useState((value || defaultValue || '') as string);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [cursorPosition, setCursorPosition] = useState(0);
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);

  const mentionOptions = options as MentionOption[];

  const filteredOptions = mentionOptions.filter((option) =>
    option.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    const cursor = e.target.selectionStart;

    setInputValue(newValue);
    setCursorPosition(cursor);

    // Check if we're in a mention context
    const textBeforeCursor = newValue.slice(0, cursor);
    const triggerIndex = textBeforeCursor.lastIndexOf(trigger as string);

    if (triggerIndex !== -1) {
      const textAfterTrigger = textBeforeCursor.slice(triggerIndex + 1);
      const hasSpace = /\s/.test(textAfterTrigger);

      if (!hasSpace && triggerIndex === textBeforeCursor.length - 1 - textAfterTrigger.length) {
        setSearchTerm(textAfterTrigger);
        setShowSuggestions(true);
        setHighlightedIndex(0);
      } else {
        setShowSuggestions(false);
      }
    } else {
      setShowSuggestions(false);
    }

    onAction?.({
      name: 'change',
      params: { name, value: newValue },
    });
  };

  const handleSelectMention = (option: MentionOption) => {
    const textBeforeCursor = inputValue.slice(0, cursorPosition);
    const triggerIndex = textBeforeCursor.lastIndexOf(trigger as string);
    const textAfterCursor = inputValue.slice(cursorPosition);

    const newValue =
      inputValue.slice(0, triggerIndex) +
      `${trigger}${option.name} ` +
      textAfterCursor;

    setInputValue(newValue);
    setShowSuggestions(false);
    setSearchTerm('');

    onAction?.({
      name: 'mention',
      params: { name, value: newValue, mentioned: option },
    });

    inputRef.current?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (!showSuggestions) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setHighlightedIndex((prev) =>
        prev < filteredOptions.length - 1 ? prev + 1 : 0
      );
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setHighlightedIndex((prev) =>
        prev > 0 ? prev - 1 : filteredOptions.length - 1
      );
    } else if (e.key === 'Enter' && filteredOptions.length > 0) {
      e.preventDefault();
      handleSelectMention(filteredOptions[highlightedIndex]);
    } else if (e.key === 'Escape') {
      setShowSuggestions(false);
    }
  };

  useEffect(() => {
    if (highlightedIndex >= 0 && suggestionsRef.current) {
      const highlightedElement = suggestionsRef.current.children[highlightedIndex] as HTMLElement;
      highlightedElement?.scrollIntoView({ block: 'nearest' });
    }
  }, [highlightedIndex]);

  return (
    <div className="relative w-full" style={style as React.CSSProperties}>
      {label ? (
        <label className="block text-sm font-medium mb-2">
          {label as string}
          {(required as boolean) && <span className="text-destructive ml-1">*</span>}
        </label>
      ) : null}
      <div className="relative">
        <AtSign className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
        <textarea
          ref={inputRef}
          name={name as string}
          value={inputValue}
          placeholder={placeholder as string}
          disabled={disabled as boolean}
          className={cn(
            'flex min-h-[100px] w-full rounded-md border border-input bg-background pl-10 pr-3 py-2 text-sm ring-offset-background',
            'placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
            'disabled:cursor-not-allowed disabled:opacity-50 resize-y',
            !!(error) && 'border-destructive focus-visible:ring-destructive'
          )}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
        />
      </div>

      {showSuggestions && filteredOptions.length > 0 && (
        <div
          ref={suggestionsRef}
          className="absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-md border border-input bg-popover shadow-lg"
        >
          {filteredOptions.map((option, index) => (
            <button
              key={option.id}
              type="button"
              className={cn(
                'flex w-full items-center gap-3 px-3 py-2 text-sm hover:bg-muted',
                highlightedIndex === index && 'bg-muted'
              )}
              onClick={() => handleSelectMention(option)}
            >
              {option.avatar ? (
                <img
                  src={option.avatar}
                  alt={option.name}
                  className="h-8 w-8 rounded-full"
                />
              ) : (
                <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium">
                  {option.name[0]}
                </div>
              )}
              <div className="flex-1 text-left">
                <p className="font-medium">{option.name}</p>
                {option.description && (
                  <p className="text-xs text-muted-foreground">{option.description}</p>
                )}
              </div>
            </button>
          ))}
        </div>
      )}

      {(error || helperText) ? (
        <p className={cn('mt-1 text-sm', error ? 'text-destructive' : 'text-muted-foreground')}>
          {(error || helperText) as string}
        </p>
      ) : null}
    </div>
  );
};
