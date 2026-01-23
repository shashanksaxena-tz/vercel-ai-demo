'use client';

import React, { useState } from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';
import { Bold, Italic, Underline, List, ListOrdered, Link, AlignLeft, AlignCenter, AlignRight } from 'lucide-react';

export const RichTextEditor = ({ element, onAction }: ComponentRenderProps) => {
  const {
    label,
    placeholder = 'Start typing...',
    value,
    defaultValue,
    name,
    required = false,
    disabled = false,
    error,
    helperText,
    minHeight = 200,
    maxLength,
    toolbar = ['bold', 'italic', 'underline', 'list', 'orderedList', 'link', 'alignLeft', 'alignCenter', 'alignRight'],
    style
  } = element.props;

  const [content, setContent] = useState((value || defaultValue || '') as string);

  const toolbarItems = toolbar as string[];

  const toolbarButtons = {
    bold: { icon: Bold, label: 'Bold' },
    italic: { icon: Italic, label: 'Italic' },
    underline: { icon: Underline, label: 'Underline' },
    list: { icon: List, label: 'Bullet List' },
    orderedList: { icon: ListOrdered, label: 'Numbered List' },
    link: { icon: Link, label: 'Link' },
    alignLeft: { icon: AlignLeft, label: 'Align Left' },
    alignCenter: { icon: AlignCenter, label: 'Align Center' },
    alignRight: { icon: AlignRight, label: 'Align Right' },
  };

  const handleContentChange = (e: React.FormEvent<HTMLDivElement>) => {
    const newContent = e.currentTarget.innerHTML;
    setContent(newContent);
    onAction?.({
      name: 'change',
      params: { name, value: newContent },
    });
  };

  const execCommand = (command: string, value?: string) => {
    document.execCommand(command, false, value);
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
        <div className="flex flex-wrap gap-1 p-2 border-b border-input bg-muted/50">
          {toolbarItems.map((item) => {
            const button = toolbarButtons[item as keyof typeof toolbarButtons];
            if (!button) return null;
            const IconComponent = button.icon;
            return (
              <button
                key={item}
                type="button"
                className={cn(
                  'p-2 rounded hover:bg-muted transition-colors',
                  'focus:outline-none focus:ring-2 focus:ring-ring'
                )}
                title={button.label}
                disabled={disabled as boolean}
                onClick={() => {
                  if (item === 'bold') execCommand('bold');
                  else if (item === 'italic') execCommand('italic');
                  else if (item === 'underline') execCommand('underline');
                  else if (item === 'list') execCommand('insertUnorderedList');
                  else if (item === 'orderedList') execCommand('insertOrderedList');
                  else if (item === 'link') {
                    const url = prompt('Enter URL:');
                    if (url) execCommand('createLink', url);
                  }
                  else if (item === 'alignLeft') execCommand('justifyLeft');
                  else if (item === 'alignCenter') execCommand('justifyCenter');
                  else if (item === 'alignRight') execCommand('justifyRight');
                }}
              >
                <IconComponent className="h-4 w-4" />
              </button>
            );
          })}
        </div>
        <div
          contentEditable={!(disabled as boolean)}
          className={cn(
            'px-3 py-2 text-sm focus:outline-none',
            'prose prose-sm max-w-none',
            '[&:empty]:before:content-[attr(data-placeholder)] [&:empty]:before:text-muted-foreground'
          )}
          style={{ minHeight: minHeight as number }}
          data-placeholder={placeholder}
          dangerouslySetInnerHTML={{ __html: content }}
          onInput={handleContentChange}
          suppressContentEditableWarning
        />
      </div>
      {(error || helperText) ? (
        <p className={cn('mt-1 text-sm', error ? 'text-destructive' : 'text-muted-foreground')}>
          {(error || helperText) as string}
        </p>
      ) : null}
    </div>
  );
};
