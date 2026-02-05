'use client';

import { experimental_useObject as useObject } from '@ai-sdk/react';
import { catalog } from '@/lib/catalog';
import { useCallback, useState, useEffect } from 'react';

// UI Element type
export type UIElement = {
    type: string;
    key: string;
    props: Record<string, any>;
    children?: UIElement[];
};

interface UseUIGeneratorOptions {
    currentRegistry?: string;
}

export function useUIGenerator(options: UseUIGeneratorOptions = {}) {
    const [tree, setTree] = useState<UIElement | null>(null);
    const [summary, setSummary] = useState<string | null>(null);

    const { object, submit, isLoading, error, stop } = useObject({
        api: '/api/generate',
        schema: catalog.getOutputSchema(),
        onError: (err) => {
            console.error('Streaming error:', err);
        },
    });

    // Update local state when object updates
    useEffect(() => {
        if (object?.ui) {
            setTree(object.ui as UIElement);
        }
        if (object?.summary) {
            setSummary(object.summary);
        }
    }, [object]);

    const generate = useCallback((prompt: string) => {
        console.log('Generating UI for prompt:', prompt);
        submit({
            prompt,
            currentRegistry: options.currentRegistry || 'shadcn',
        });
    }, [submit, options.currentRegistry]);

    return {
        tree,
        summary,
        generate,
        isLoading,
        stop,
        error: error ? error.message : null,
    };
}
