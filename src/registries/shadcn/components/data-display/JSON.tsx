'use client';

import React, { useState } from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';
import { Copy, Check, ChevronRight, ChevronDown } from 'lucide-react';

export const JSON = ({ element }: ComponentRenderProps) => {
  const {
    data,
    collapsed = false,
    collapsedDepth = 2,
    showCopy = true,
    showTypes = false,
    maxHeight,
    style,
  } = element.props;

  const [copiedPath, setCopiedPath] = useState<string | null>(null);

  const handleCopy = async (value: any, path: string) => {
    await navigator.clipboard.writeText(typeof value === 'string' ? value : JSON.stringify(value, null, 2));
    setCopiedPath(path);
    setTimeout(() => setCopiedPath(null), 2000);
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'string':
        return 'text-green-600 dark:text-green-400';
      case 'number':
        return 'text-blue-600 dark:text-blue-400';
      case 'boolean':
        return 'text-purple-600 dark:text-purple-400';
      case 'null':
        return 'text-gray-500';
      default:
        return 'text-foreground';
    }
  };

  const JSONNode: React.FC<{
    value: any;
    path: string;
    depth: number;
    isLast: boolean;
  }> = ({ value, path, depth, isLast }) => {
    const [isExpanded, setIsExpanded] = useState(
      collapsed ? depth < (collapsedDepth as number) : true
    );

    const type = value === null ? 'null' : Array.isArray(value) ? 'array' : typeof value;
    const isExpandable = type === 'object' || type === 'array';

    if (type === 'null') {
      return (
        <span className={getTypeColor('null')}>
          null{!isLast && ','}
          {showTypes && <span className="text-muted-foreground text-xs ml-2">(null)</span>}
        </span>
      );
    }

    if (type === 'string') {
      return (
        <span className={getTypeColor('string')}>
          "{value}"{!isLast && ','}
          {showTypes && <span className="text-muted-foreground text-xs ml-2">(string)</span>}
        </span>
      );
    }

    if (type === 'number') {
      return (
        <span className={getTypeColor('number')}>
          {value}{!isLast && ','}
          {showTypes && <span className="text-muted-foreground text-xs ml-2">(number)</span>}
        </span>
      );
    }

    if (type === 'boolean') {
      return (
        <span className={getTypeColor('boolean')}>
          {value.toString()}{!isLast && ','}
          {showTypes && <span className="text-muted-foreground text-xs ml-2">(boolean)</span>}
        </span>
      );
    }

    if (!isExpandable) {
      return (
        <span className="text-foreground">
          {String(value)}{!isLast && ','}
        </span>
      );
    }

    const entries = type === 'array' ? value : Object.entries(value);
    const isEmpty = type === 'array' ? value.length === 0 : Object.keys(value).length === 0;
    const bracket = type === 'array' ? ['[', ']'] : ['{', '}'];

    if (isEmpty) {
      return (
        <span className="text-muted-foreground">
          {bracket[0]}{bracket[1]}{!isLast && ','}
        </span>
      );
    }

    return (
      <span>
        <span
          className="inline-flex items-center cursor-pointer hover:bg-muted rounded px-0.5 -mx-0.5"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? (
            <ChevronDown className="h-3 w-3 text-muted-foreground" />
          ) : (
            <ChevronRight className="h-3 w-3 text-muted-foreground" />
          )}
          <span className="text-muted-foreground">{bracket[0]}</span>
          {!isExpanded && (
            <span className="text-muted-foreground text-xs mx-1">
              {type === 'array' ? `${value.length} items` : `${Object.keys(value).length} keys`}
            </span>
          )}
        </span>
        {isExpanded && (
          <div className="pl-4 border-l border-muted ml-1">
            {type === 'array'
              ? entries.map((item: any, idx: number) => (
                  <div key={idx} className="flex items-start">
                    <span className="text-muted-foreground text-xs mr-2 mt-0.5">{idx}</span>
                    <JSONNode
                      value={item}
                      path={`${path}[${idx}]`}
                      depth={depth + 1}
                      isLast={idx === entries.length - 1}
                    />
                  </div>
                ))
              : entries.map(([key, val]: [string, any], idx: number) => (
                  <div key={key} className="flex items-start group">
                    <span className="text-purple-600 dark:text-purple-400 mr-1">"{key}"</span>
                    <span className="text-muted-foreground mr-1">:</span>
                    <JSONNode
                      value={val}
                      path={`${path}.${key}`}
                      depth={depth + 1}
                      isLast={idx === entries.length - 1}
                    />
                    {showCopy && (
                      <button
                        onClick={() => handleCopy(val, `${path}.${key}`)}
                        className="ml-2 p-0.5 opacity-0 group-hover:opacity-100 hover:bg-muted rounded transition-opacity"
                      >
                        {copiedPath === `${path}.${key}` ? (
                          <Check className="h-3 w-3 text-green-500" />
                        ) : (
                          <Copy className="h-3 w-3 text-muted-foreground" />
                        )}
                      </button>
                    )}
                  </div>
                ))}
          </div>
        )}
        <span className="text-muted-foreground">
          {bracket[1]}{!isLast && ','}
        </span>
      </span>
    );
  };

  return (
    <div
      className="border rounded-lg overflow-hidden bg-card"
      style={style as React.CSSProperties}
    >
      {showCopy && (
        <div className="flex items-center justify-between px-4 py-2 border-b bg-muted/30">
          <span className="text-sm font-medium">JSON</span>
          <button
            onClick={() => handleCopy(data, 'root')}
            className="p-1.5 hover:bg-muted rounded text-muted-foreground hover:text-foreground transition-colors"
          >
            {copiedPath === 'root' ? (
              <Check className="h-4 w-4 text-green-500" />
            ) : (
              <Copy className="h-4 w-4" />
            )}
          </button>
        </div>
      )}
      <div
        className="p-4 font-mono text-sm overflow-auto"
        style={{ maxHeight: maxHeight as number }}
      >
        <JSONNode value={data} path="root" depth={0} isLast={true} />
      </div>
    </div>
  );
};
