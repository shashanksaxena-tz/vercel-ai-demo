'use client';

import React from 'react';
import { registries, RegistryKey } from '@/registries';
import { useAction } from './action-provider';
import type { UIElement } from '@/hooks/use-ui-generator';

interface RendererCanvasProps {
    tree: UIElement | null;
    currentRegistry: RegistryKey;
    isLoading?: boolean;
}

export function RendererCanvas({ tree, currentRegistry, isLoading }: RendererCanvasProps) {
    const { onAction } = useAction();
    const registry = registries[currentRegistry]?.registry;

    // Recursive renderer
    const renderElement = (element: UIElement): React.ReactNode => {
        if (!element || !element.type) return null;

        const Component = registry?.[element.type] as React.ComponentType<any>;

        if (!Component) {
            console.warn(`Component "${element.type}" not found in ${currentRegistry} registry`);
            return (
                <div key={element.key} className="p-2 border border-dashed border-yellow-400 text-yellow-600 text-sm">
                    Unknown: {element.type}
                </div>
            );
        }

        // Render children recursively
        const children = element.children?.map(renderElement);

        // Use 'as any' to bypass json-render type incompatibility
        return (
            <Component
                key={element.key}
                element={element as any}
                onAction={onAction}
            >
                {children}
            </Component>
        );
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-full min-h-[400px]">
                <div className="flex flex-col items-center gap-4">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary" />
                    <p className="text-muted-foreground">Generating UI...</p>
                </div>
            </div>
        );
    }

    if (!tree) {
        return (
            <div className="flex items-center justify-center h-full min-h-[400px] text-muted-foreground">
                <div className="text-center">
                    <p className="text-lg mb-2">No UI Generated Yet</p>
                    <p className="text-sm">Enter a prompt to generate a dynamic UI.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="p-6 min-h-[400px]">
            {renderElement(tree)}
        </div>
    );
}
