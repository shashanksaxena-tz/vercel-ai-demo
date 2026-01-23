'use client';

import React from 'react';
import { registries, RegistryKey } from '@/registries';
import { useAction } from './action-provider';
import { RegistryProvider } from './registry-provider';
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
                <div key={element.key} className="p-4 rounded-lg border border-dashed border-red-200 bg-red-50 text-red-600 text-xs font-mono flex items-center gap-2">
                    <span className="font-bold">⚠️ Missing Component:</span> {element.type}
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
            <div className="flex flex-col items-center justify-center h-full min-h-[400px] gap-6 animate-pulse">
                <div className="w-full max-w-md space-y-4">
                    <div className="h-8 bg-muted rounded w-3/4 mx-auto" />
                    <div className="h-64 bg-muted rounded-xl w-full opacity-60" />
                    <div className="grid grid-cols-3 gap-4">
                        <div className="h-20 bg-muted rounded-lg col-span-1" />
                        <div className="h-20 bg-muted rounded-lg col-span-2" />
                    </div>
                </div>
                <p className="text-sm font-medium text-muted-foreground animate-pulse">
                    Generating interface...
                </p>
            </div>
        );
    }

    if (!tree) {
        return (
            <div className="flex flex-col items-center justify-center h-full min-h-[400px] text-muted-foreground p-8 text-center">
                <div className="w-24 h-24 bg-muted/40 rounded-full flex items-center justify-center mb-6 ring-4 ring-muted/20">
                    <div className="w-12 h-12 rounded bg-primary/20 backdrop-blur-sm" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">Ready to Build</h3>
                <p className="max-w-sm text-sm mb-6">
                    Enter a prompt in the sidebar to generate a UI. Try "Create a sales dashboard" or "Design a settings page".
                </p>
                <div className="flex gap-2 text-xs font-mono text-muted-foreground/60">
                    <span>shadcn</span>
                    <span>•</span>
                    <span>mui</span>
                    <span>•</span>
                    <span>chakra</span>
                    <span>•</span>
                    <span>antd</span>
                </div>
            </div>
        );
    }

    return (
        <RegistryProvider registry={currentRegistry}>
            <div className="p-6 min-h-[400px]">
                {renderElement(tree)}
            </div>
        </RegistryProvider>
    );
}
