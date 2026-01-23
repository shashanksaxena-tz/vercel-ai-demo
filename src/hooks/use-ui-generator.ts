'use client';

import { useCallback } from 'react';
import { experimental_useObject as useObject } from 'ai/react';
import { z } from 'zod';

// UI Element type
export interface UIElement {
    type: string;
    key: string;
    props: Record<string, unknown>;
    children?: UIElement[];
}

interface GeneratedUI {
    ui: UIElement;
    summary: string;
}

interface UseUIGeneratorOptions {
    currentRegistry?: string;
}

// We define a loose schema for the client-side consumption to avoid
// strict validation errors during partial streaming of recursive structures.
const clientSchema = z.object({
    ui: z.custom<UIElement>(),
    summary: z.string().optional(),
});

export function useUIGenerator(options: UseUIGeneratorOptions = {}) {
    const { object, submit, isLoading, error, stop } = useObject({
        api: '/api/generate',
        schema: clientSchema,
    });

    const generate = useCallback((prompt: string) => {
        submit({
            prompt,
            currentRegistry: options.currentRegistry || 'shadcn'
        });
    }, [submit, options.currentRegistry]);

    return {
        tree: object?.ui as UIElement | null,
        summary: object?.summary || null,
        generate,
        isLoading,
        stop,
        error: error ? error.message : null,
    };
}
