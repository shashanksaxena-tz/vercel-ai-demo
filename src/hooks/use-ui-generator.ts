'use client';

import { useState, useCallback } from 'react';

// UI Element type
export interface UIElement {
    type: string;
    key: string;
    props: Record<string, unknown>;
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
    const [tree, setTree] = useState<UIElement | null>(null);
    const [summary, setSummary] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const generate = useCallback(async (prompt: string) => {
        setIsLoading(true);
        setError(null);
        console.log('Generating UI for prompt:', prompt);

        try {
            const response = await fetch('/api/generate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    prompt,
                    currentRegistry: options.currentRegistry || 'shadcn',
                }),
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                console.error('API Error:', response.status, errorData);
                throw new Error(errorData.error || `Failed to generate UI: ${response.status}`);
            }

            const data = await response.json() as GeneratedUI;
            console.log('Generated Data:', data);

            if (data && data.ui) {
                setTree(data.ui);
                setSummary(data.summary || 'UI Generated');
            } else {
                throw new Error('Invalid response format: Missing UI tree');
            }

        } catch (err) {
            console.error('UI Generation Error:', err);
            setError(err instanceof Error ? err.message : 'Failed to generate UI');
        } finally {
            setIsLoading(false);
        }
    }, [options.currentRegistry]);

    const stop = useCallback(() => {
        // No-op for now as we switched to blocking generation
    }, []);

    return {
        tree,
        summary,
        generate,
        isLoading,
        stop,
        error,
    };
}
