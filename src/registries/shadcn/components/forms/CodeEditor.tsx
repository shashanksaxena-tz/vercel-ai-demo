'use client';

import React, { useState } from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';
import { Copy, Check } from 'lucide-react';

export const CodeEditor = ({ element, onAction }: ComponentRenderProps) => {
  const {
    label,
    placeholder = '// Enter your code here...',
    value,
    defaultValue,
    name,
    required = false,
    disabled = false,
    readOnly = false,
    error,
    helperText,
    language = 'javascript',
    minHeight = 200,
    showLineNumbers = true,
    showCopyButton = true,
    tabSize = 2,
    style
  } = element.props;

  const [content, setContent] = useState((value || defaultValue || '') as string);
  const [copied, setCopied] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
    onAction?.({
      name: 'change',
      params: { name, value: e.target.value },
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      const target = e.target as HTMLTextAreaElement;
      const start = target.selectionStart;
      const end = target.selectionEnd;
      const spaces = ' '.repeat(tabSize as number);
      const newContent = content.substring(0, start) + spaces + content.substring(end);
      setContent(newContent);

      // Set cursor position after the inserted tab
      setTimeout(() => {
        target.selectionStart = target.selectionEnd = start + (tabSize as number);
      }, 0);
    }
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const lines = content.split('\n');

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
          'relative rounded-md border border-input bg-zinc-950 text-zinc-50 overflow-hidden',
          !!(error) && 'border-destructive',
          !!(disabled) && 'opacity-50 cursor-not-allowed'
        )}
      >
        <div className="flex items-center justify-between px-3 py-2 border-b border-zinc-800 bg-zinc-900">
          <span className="text-xs text-zinc-400">{language as string}</span>
          {showCopyButton ? (
            <button
              type="button"
              className="p-1 rounded hover:bg-zinc-800 transition-colors"
              onClick={handleCopy}
              title="Copy code"
            >
              {copied ? (
                <Check className="h-4 w-4 text-green-500" />
              ) : (
                <Copy className="h-4 w-4 text-zinc-400" />
              )}
            </button>
          ) : null}
        </div>
        <div className="flex" style={{ minHeight: minHeight as number }}>
          {showLineNumbers ? (
            <div className="flex-shrink-0 py-3 px-2 text-right select-none bg-zinc-900/50 border-r border-zinc-800">
              {lines.map((_, index) => (
                <div key={index} className="text-xs text-zinc-500 leading-5">
                  {index + 1}
                </div>
              ))}
            </div>
          ) : null}
          <textarea
            name={name as string}
            placeholder={placeholder as string}
            value={content}
            disabled={disabled as boolean}
            readOnly={readOnly as boolean}
            className={cn(
              'flex-1 w-full p-3 text-sm font-mono bg-transparent focus:outline-none resize-none',
              'placeholder:text-zinc-600 leading-5',
              'scrollbar-thin scrollbar-thumb-zinc-700 scrollbar-track-transparent'
            )}
            style={{
              minHeight: minHeight as number,
              tabSize: tabSize as number,
            }}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            spellCheck={false}
          />
        </div>
      </div>
      {(error || helperText) ? (
        <p className={cn('mt-1 text-sm', error ? 'text-destructive' : 'text-muted-foreground')}>
          {(error || helperText) as string}
        </p>
      ) : null}
    </div>
  );
};
