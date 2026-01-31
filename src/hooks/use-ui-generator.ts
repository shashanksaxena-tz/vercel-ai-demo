'use client';

import { experimental_useObject as useObject } from '@ai-sdk/react';
import { catalog, UIElement } from '@/lib/catalog';
import { useState, useEffect } from 'react';

// Re-export UIElement for consumers
export type { UIElement };

export interface GeneratedUI {
    ui: UIElement;
    summary: string;
}

interface UseUIGeneratorOptions {
    currentRegistry?: string;
}

export function useUIGenerator(options: UseUIGeneratorOptions = {}) {
    const { object, submit, isLoading, error, stop } = useObject({
        api: '/api/generate',
        schema: catalog.getOutputSchema(),
        // headers are handled by fetch automatically but we can pass custom ones if needed
    });

    const [summary, setSummary] = useState<string | null>(null);
    const [tree, setTree] = useState<UIElement | null>(null);

    // Sync the streamed object to local state
    useEffect(() => {
        if (object) {
            // We cast because the partial object might not fully match the strict type yet,
            // but for rendering purposes we treat it as the target type.
            if (object.ui) setTree(object.ui as unknown as UIElement);
            if (object.summary) setSummary(object.summary);
        }
    }, [object]);

    const generate = (prompt: string) => {
        setTree(null);
        setSummary(null);
        submit({ prompt, currentRegistry: options.currentRegistry || 'shadcn' });
    };

    return {
        tree,
        summary,
        generate,
        isLoading,
        stop,
        error: error ? error.message : null,
    };
}
