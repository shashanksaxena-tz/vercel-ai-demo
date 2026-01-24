'use client';

import React, { useState } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { ChevronDown, ChevronRight, Copy, Check } from 'lucide-react';
import type { UIElement } from '@/lib/catalog';

interface JsonViewerProps {
    tree: UIElement | null;
}

function JsonNode({ data, name, depth = 0 }: { data: any; name?: string; depth?: number }) {
    const [isExpanded, setIsExpanded] = useState(depth < 2);

    const isObject = typeof data === 'object' && data !== null;
    const isArray = Array.isArray(data);

    if (!isObject) {
        return (
            <div className="flex items-center gap-1 text-sm" style={{ marginLeft: depth * 16 }}>
                {name && <span className="text-purple-400">&quot;{name}&quot;</span>}
                {name && <span className="text-gray-400">: </span>}
                <span className={typeof data === 'string' ? 'text-green-400' : 'text-blue-400'}>
                    {typeof data === 'string' ? `"${data}"` : String(data)}
                </span>
            </div>
        );
    }

    const keys = Object.keys(data);
    const isEmpty = keys.length === 0;

    return (
        <div style={{ marginLeft: depth * 16 }}>
            <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="flex items-center gap-1 text-sm hover:bg-muted/50 rounded px-1"
            >
                {isEmpty ? null : isExpanded ? (
                    <ChevronDown className="h-3 w-3 text-muted-foreground" />
                ) : (
                    <ChevronRight className="h-3 w-3 text-muted-foreground" />
                )}
                {name && <span className="text-purple-400">&quot;{name}&quot;</span>}
                {name && <span className="text-gray-400">: </span>}
                <span className="text-gray-400">{isArray ? '[' : '{'}</span>
                {!isExpanded && !isEmpty && (
                    <span className="text-muted-foreground">...</span>
                )}
                {(!isExpanded || isEmpty) && (
                    <span className="text-gray-400">{isArray ? ']' : '}'}</span>
                )}
            </button>
            {isExpanded && !isEmpty && (
                <>
                    {keys.map((key, i) => (
                        <JsonNode
                            key={key}
                            data={data[key]}
                            name={isArray ? undefined : key}
                            depth={depth + 1}
                        />
                    ))}
                    <div style={{ marginLeft: 16 }} className="text-gray-400 text-sm">
                        {isArray ? ']' : '}'}
                    </div>
                </>
            )}
        </div>
    );
}

export function JsonViewer({ tree }: JsonViewerProps) {
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        if (tree) {
            await navigator.clipboard.writeText(JSON.stringify(tree, null, 2));
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    if (!tree) {
        return (
            <div className="flex items-center justify-center h-full text-muted-foreground text-sm">
                No JSON to display
            </div>
        );
    }

    return (
        <div className="h-full flex flex-col">
            <div className="flex items-center justify-between p-2 border-b">
                <span className="text-sm font-medium">JSON Tree</span>
                <Button variant="ghost" size="sm" onClick={handleCopy}>
                    {copied ? (
                        <Check className="h-4 w-4 text-green-500" />
                    ) : (
                        <Copy className="h-4 w-4" />
                    )}
                </Button>
            </div>
            <ScrollArea className="flex-1 p-2">
                <div className="font-mono text-xs">
                    <JsonNode data={tree} />
                </div>
            </ScrollArea>
        </div>
    );
}
