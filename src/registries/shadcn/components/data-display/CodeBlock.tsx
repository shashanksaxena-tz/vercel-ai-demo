'use client';

import React, { useState } from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';
import { Copy, Check, Terminal } from 'lucide-react';

export const CodeBlock = ({ element }: ComponentRenderProps) => {
  const {
    code,
    language = 'plaintext',
    title,
    showLineNumbers = true,
    showCopy = true,
    highlightLines,
    maxHeight,
    wrap = false,
    style,
  } = element.props;

  const [copied, setCopied] = useState(false);
  const codeString = code as string;
  const highlightedLines = (highlightLines as number[]) || [];

  const handleCopy = async () => {
    await navigator.clipboard.writeText(codeString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const lines = codeString?.split('\n') || [];

  // Simple syntax highlighting colors by language
  const getLanguageColor = () => {
    const colors: Record<string, string> = {
      javascript: '#f7df1e',
      typescript: '#3178c6',
      python: '#3776ab',
      rust: '#dea584',
      go: '#00add8',
      java: '#ed8b00',
      ruby: '#cc342d',
      php: '#777bb4',
      css: '#264de4',
      html: '#e34f26',
      json: '#292929',
      bash: '#4eaa25',
      shell: '#4eaa25',
    };
    return colors[language as string] || '#6b7280';
  };

  return (
    <div
      className="rounded-lg border overflow-hidden bg-[#1e1e1e]"
      style={style as React.CSSProperties}
    >
      {/* Header */}
      {(title || language || showCopy) && (
        <div className="flex items-center justify-between px-4 py-2 bg-[#2d2d2d] border-b border-[#404040]">
          <div className="flex items-center gap-2">
            <Terminal className="h-4 w-4 text-gray-400" />
            {title && <span className="text-sm font-medium text-gray-300">{title as string}</span>}
            {language && !title && (
              <span
                className="text-xs px-2 py-0.5 rounded-full"
                style={{ backgroundColor: `${getLanguageColor()}20`, color: getLanguageColor() }}
              >
                {language as string}
              </span>
            )}
          </div>
          {showCopy && (
            <button
              onClick={handleCopy}
              className="p-1.5 hover:bg-[#404040] rounded text-gray-400 hover:text-gray-200 transition-colors"
            >
              {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
            </button>
          )}
        </div>
      )}

      {/* Code */}
      <div
        className="overflow-auto"
        style={{ maxHeight: maxHeight as number }}
      >
        <pre className={cn('p-4 text-sm', wrap ? 'whitespace-pre-wrap' : 'whitespace-pre')}>
          <code className="text-gray-300 font-mono">
            {lines.map((line, idx) => {
              const lineNumber = idx + 1;
              const isHighlighted = highlightedLines.includes(lineNumber);

              return (
                <div
                  key={idx}
                  className={cn(
                    'flex',
                    isHighlighted && 'bg-yellow-500/10 -mx-4 px-4'
                  )}
                >
                  {showLineNumbers && (
                    <span
                      className={cn(
                        'select-none text-right pr-4 text-gray-600 min-w-[2.5rem]',
                        isHighlighted && 'text-yellow-500'
                      )}
                    >
                      {lineNumber}
                    </span>
                  )}
                  <span className="flex-1">{(line || ' ') as React.ReactNode}</span>
                </div>
              );
            })}
          </code>
        </pre>
      </div>
    </div>
  );
};
