'use client';

import { experimental_useObject as useObject } from '@ai-sdk/react';
import { catalog, UIElement } from '@/lib/catalog';

interface UseUIGeneratorOptions {
    currentRegistry?: string;
}

export function useUIGenerator(options: UseUIGeneratorOptions = {}) {
    const { object, submit, isLoading, error, stop } = useObject({
        api: '/api/generate',
        schema: catalog.getOutputSchema(),
    });

    // Handle potential null/undefined object during streaming
    const tree = object?.ui as UIElement | null;
    const summary = object?.summary as string | undefined;

    return {
        tree,
        summary,
        generate: (prompt: string) => submit({ prompt, currentRegistry: options.currentRegistry }),
        isLoading,
        stop,
        error: error ? error.message : null,
    };
}
