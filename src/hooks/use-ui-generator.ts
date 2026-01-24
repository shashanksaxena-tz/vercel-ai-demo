'use client';

import { experimental_useObject as useObject } from '@ai-sdk/react';
import { catalog, UIElement } from '@/lib/catalog';

export type { UIElement };

interface UseUIGeneratorOptions {
    currentRegistry?: string;
}

export function useUIGenerator(options: UseUIGeneratorOptions = {}) {
    const { object, submit, isLoading, error, stop } = useObject({
        api: '/api/generate',
        schema: catalog.getOutputSchema(),
    });

    const generate = (prompt: string) => {
        submit({ prompt, currentRegistry: options.currentRegistry || 'shadcn' });
    };

    return {
        tree: (object?.ui as UIElement | undefined) ?? null,
        summary: (object?.summary as string | undefined) ?? null,
        generate,
        isLoading,
        stop,
        error: error ? error.message : null,
    };
}
