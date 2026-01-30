'use client';

/**
 * JSON Editor - View and edit the UI tree JSON
 */

import * as React from 'react';
import type { UITree } from '@json-render/core';
import { cn } from '@/lib/utils';

interface JSONEditorProps {
  value: UITree | null;
  onChange?: (tree: UITree) => void;
  readOnly?: boolean;
  className?: string;
}

export function JSONEditor({ value, onChange, readOnly, className }: JSONEditorProps) {
  const [jsonText, setJsonText] = React.useState('');
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (value) {
      setJsonText(JSON.stringify(value, null, 2));
      setError(null);
    } else {
      setJsonText('');
    }
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value;
    setJsonText(text);

    if (!onChange) return;

    try {
      const parsed = JSON.parse(text);
      setError(null);
      onChange(parsed);
    } catch {
      setError('Invalid JSON');
    }
  };

  const handleFormat = () => {
    try {
      const parsed = JSON.parse(jsonText);
      setJsonText(JSON.stringify(parsed, null, 2));
      setError(null);
    } catch {
      setError('Cannot format: Invalid JSON');
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(jsonText);
  };

  return (
    <div className={cn('flex flex-col h-full', className)}>
      {/* Toolbar */}
      <div className="flex items-center justify-between p-2 border-b bg-muted/50">
        <span className="text-sm font-medium">JSON Tree</span>
        <div className="flex gap-1">
          <button
            onClick={handleCopy}
            className="px-2 py-1 text-xs font-medium rounded hover:bg-muted"
            title="Copy to clipboard"
          >
            Copy
          </button>
          {!readOnly && (
            <button
              onClick={handleFormat}
              className="px-2 py-1 text-xs font-medium rounded hover:bg-muted"
              title="Format JSON"
            >
              Format
            </button>
          )}
        </div>
      </div>

      {/* Editor */}
      <div className="flex-1 relative">
        <textarea
          value={jsonText}
          onChange={handleChange}
          readOnly={readOnly}
          spellCheck={false}
          className={cn(
            'w-full h-full p-4 font-mono text-sm resize-none bg-slate-950 text-slate-50 focus:outline-none',
            error && 'border-red-500'
          )}
          placeholder="Select a test case to see the JSON tree..."
        />
      </div>

      {/* Error */}
      {error && (
        <div className="p-2 bg-red-50 border-t border-red-200 text-red-600 text-xs">
          {error}
        </div>
      )}
    </div>
  );
}

export default JSONEditor;
