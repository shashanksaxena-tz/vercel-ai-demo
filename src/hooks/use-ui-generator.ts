'use client';

import { experimental_useObject as useObject } from 'ai/react';
import { getOutputSchema, type UIElement } from '@/lib/catalog';

interface UseUIGeneratorOptions {
    currentRegistry?: string;
}

export function useUIGenerator(options: UseUIGeneratorOptions = {}) {
    const { object, submit, isLoading, error, stop } = useObject({
        api: '/api/generate',
        schema: getOutputSchema(),
    });

    return {
        tree: (object?.ui as UIElement) || null,
        summary: object?.summary || null,
        generate: (prompt: string) => submit({ prompt, currentRegistry: options.currentRegistry }),
        isLoading,
        stop,
        error: error ? error.message : null,
    };
}
