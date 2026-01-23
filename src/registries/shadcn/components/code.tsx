'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';
import { Copy, Check } from 'lucide-react';

export const Code = ({ element }: ComponentRenderProps) => {
  const {
    code,
    language,
    showLineNumbers = false,
    showCopy = true,
    filename,
    variant = 'default',
    style
  } = element.props;

  const [copied, setCopied] = React.useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code as string);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const codeString = code as string;
  const lines = codeString?.split('\n') || [];

  const variantStyles = {
    default: 'bg-zinc-950 text-zinc-50',
    light: 'bg-muted text-foreground',
  };

  return (
    <div
      className={cn(
        'relative rounded-lg overflow-hidden',
        variantStyles[(variant as keyof typeof variantStyles) || 'default']
      )}
      style={style as React.CSSProperties}
    >
      {(filename || showCopy) ? (
        <div className="flex items-center justify-between px-4 py-2 border-b border-zinc-800 bg-zinc-900">
          <div className="flex items-center gap-2">
            {filename ? (
              <span className="text-xs text-zinc-400">{filename as string}</span>
            ) : null}
            {language && !filename ? (
              <span className="text-xs text-zinc-400">{language as string}</span>
            ) : null}
          </div>
          {(showCopy as boolean) && (
            <button
              onClick={handleCopy}
              className="text-zinc-400 hover:text-zinc-200 transition-colors"
              aria-label="Copy code"
            >
              {copied ? (
                <Check className="h-4 w-4 text-green-500" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
            </button>
          )}
        </div>
      ) : null}
      <div className="overflow-x-auto">
        <pre className="p-4 text-sm">
          <code>
            {showLineNumbers ? (
              lines.map((line, idx) => (
                <div key={idx} className="flex">
                  <span className="select-none text-zinc-500 w-8 text-right mr-4">
                    {idx + 1}
                  </span>
                  <span>{line}</span>
                </div>
              ))
            ) : (
              codeString
            )}
          </code>
        </pre>
      </div>
    </div>
  );
};
