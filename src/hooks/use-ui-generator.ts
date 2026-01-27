'use client';

import { experimental_useObject } from 'ai/react';
import { getOutputSchema } from '@/lib/catalog';
import { z } from 'zod';

// UI Element type matching the catalog schema
export interface UIElement {
    type: string;
    key: string;
    props: Record<string, unknown>;
    children?: UIElement[];
}

interface UseUIGeneratorOptions {
    currentRegistry?: string;
}

export function useUIGenerator(options: UseUIGeneratorOptions = {}) {
    const { object, submit, isLoading, error, stop } = experimental_useObject({
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
