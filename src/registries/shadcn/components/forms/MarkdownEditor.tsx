'use client';

import React, { useState } from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';
import { Eye, Edit, Bold, Italic, Code, Link, List, ListOrdered, Quote, Heading } from 'lucide-react';

export const MarkdownEditor = ({ element, onAction }: ComponentRenderProps) => {
  const {
    label,
    placeholder = 'Write your markdown here...',
    value,
    defaultValue,
    name,
    required = false,
    disabled = false,
    error,
    helperText,
    minHeight = 200,
    maxLength,
    showPreview = true,
    style
  } = element.props;

  const [content, setContent] = useState((value || defaultValue || '') as string);
  const [mode, setMode] = useState<'edit' | 'preview'>('edit');

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
    onAction?.({
      name: 'change',
      params: { name, value: e.target.value },
    });
  };

  const insertMarkdown = (prefix: string, suffix: string = '') => {
    const textarea = document.querySelector(`textarea[name="${name}"]`) as HTMLTextAreaElement;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = content.substring(start, end);
    const newContent = content.substring(0, start) + prefix + selectedText + suffix + content.substring(end);

    setContent(newContent);
    onAction?.({
      name: 'change',
      params: { name, value: newContent },
    });
  };

  const renderPreview = () => {
    // Basic markdown to HTML conversion
    let html = content
      .replace(/^### (.*$)/gim, '<h3 class="text-lg font-semibold mt-4 mb-2">$1</h3>')
      .replace(/^## (.*$)/gim, '<h2 class="text-xl font-semibold mt-4 mb-2">$1</h2>')
      .replace(/^# (.*$)/gim, '<h1 class="text-2xl font-bold mt-4 mb-2">$1</h1>')
      .replace(/\*\*(.*)\*\*/gim, '<strong>$1</strong>')
      .replace(/\*(.*)\*/gim, '<em>$1</em>')
      .replace(/`([^`]+)`/gim, '<code class="bg-muted px-1 rounded">$1</code>')
      .replace(/^\> (.*$)/gim, '<blockquote class="border-l-4 border-muted pl-4 italic">$1</blockquote>')
      .replace(/^\- (.*$)/gim, '<li class="ml-4">$1</li>')
      .replace(/^\d+\. (.*$)/gim, '<li class="ml-4 list-decimal">$1</li>')
      .replace(/\[([^\]]+)\]\(([^)]+)\)/gim, '<a href="$2" class="text-primary underline">$1</a>')
      .replace(/\n/gim, '<br />');

    return html;
  };

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
          'rounded-md border border-input bg-background',
          !!(error) && 'border-destructive',
          !!(disabled) && 'opacity-50 cursor-not-allowed'
        )}
      >
        <div className="flex items-center justify-between p-2 border-b border-input bg-muted/50">
          <div className="flex gap-1">
            <button
              type="button"
              className="p-2 rounded hover:bg-muted"
              onClick={() => insertMarkdown('**', '**')}
              disabled={disabled as boolean}
              title="Bold"
            >
              <Bold className="h-4 w-4" />
            </button>
            <button
              type="button"
              className="p-2 rounded hover:bg-muted"
              onClick={() => insertMarkdown('*', '*')}
              disabled={disabled as boolean}
              title="Italic"
            >
              <Italic className="h-4 w-4" />
            </button>
            <button
              type="button"
              className="p-2 rounded hover:bg-muted"
              onClick={() => insertMarkdown('`', '`')}
              disabled={disabled as boolean}
              title="Code"
            >
              <Code className="h-4 w-4" />
            </button>
            <button
              type="button"
              className="p-2 rounded hover:bg-muted"
              onClick={() => insertMarkdown('[', '](url)')}
              disabled={disabled as boolean}
              title="Link"
            >
              <Link className="h-4 w-4" />
            </button>
            <button
              type="button"
              className="p-2 rounded hover:bg-muted"
              onClick={() => insertMarkdown('- ')}
              disabled={disabled as boolean}
              title="List"
            >
              <List className="h-4 w-4" />
            </button>
            <button
              type="button"
              className="p-2 rounded hover:bg-muted"
              onClick={() => insertMarkdown('1. ')}
              disabled={disabled as boolean}
              title="Ordered List"
            >
              <ListOrdered className="h-4 w-4" />
            </button>
            <button
              type="button"
              className="p-2 rounded hover:bg-muted"
              onClick={() => insertMarkdown('> ')}
              disabled={disabled as boolean}
              title="Quote"
            >
              <Quote className="h-4 w-4" />
            </button>
            <button
              type="button"
              className="p-2 rounded hover:bg-muted"
              onClick={() => insertMarkdown('## ')}
              disabled={disabled as boolean}
              title="Heading"
            >
              <Heading className="h-4 w-4" />
            </button>
          </div>
          {showPreview ? (
            <div className="flex rounded-md border border-input overflow-hidden">
              <button
                type="button"
                className={cn(
                  'px-3 py-1 text-sm',
                  mode === 'edit' ? 'bg-primary text-primary-foreground' : 'hover:bg-muted'
                )}
                onClick={() => setMode('edit')}
              >
                <Edit className="h-4 w-4" />
              </button>
              <button
                type="button"
                className={cn(
                  'px-3 py-1 text-sm',
                  mode === 'preview' ? 'bg-primary text-primary-foreground' : 'hover:bg-muted'
                )}
                onClick={() => setMode('preview')}
              >
                <Eye className="h-4 w-4" />
              </button>
            </div>
          ) : null}
        </div>
        {mode === 'edit' ? (
          <textarea
            name={name as string}
            placeholder={placeholder as string}
            value={content}
            maxLength={maxLength as number}
            disabled={disabled as boolean}
            className={cn(
              'w-full px-3 py-2 text-sm font-mono focus:outline-none resize-y bg-transparent',
              'placeholder:text-muted-foreground'
            )}
            style={{ minHeight: minHeight as number }}
            onChange={handleChange}
          />
        ) : (
          <div
            className="px-3 py-2 text-sm prose prose-sm max-w-none"
            style={{ minHeight: minHeight as number }}
            dangerouslySetInnerHTML={{ __html: renderPreview() }}
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
