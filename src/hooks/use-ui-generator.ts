'use client';

import { experimental_useObject as useObject } from '@ai-sdk/react';
import { catalog } from '@/lib/catalog';

// UI Element type matching the Zod schema roughly
export interface UIElement {
    type: string;
    key: string;
    props: Record<string, any>;
    children?: UIElement[];
}

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
    });

    const generate = (prompt: string) => {
        submit({
            prompt,
            currentRegistry: options.currentRegistry || 'shadcn'
        });
    };

    // The object might be partial during streaming
    const tree = object?.ui ? (object.ui as UIElement) : null;
    const summary = object?.summary || null;

    return {
        tree,
        summary,
        generate,
        isLoading,
        stop,
        error: error ? error.message : null,
    };
}
