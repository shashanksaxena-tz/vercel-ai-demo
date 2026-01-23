'use client';

import React, { useState } from 'react';
import { Toaster } from 'sonner';
import { ChakraProvider, defaultSystem } from '@chakra-ui/react';
import { RegistrySwitcher } from '@/components/playground/registry-switcher';
import { ActionProvider } from '@/components/playground/action-provider';
import { RendererCanvas } from '@/components/playground/renderer-canvas';
import { JsonViewer } from '@/components/playground/json-viewer';
import { ChatPanel } from '@/components/playground/chat-panel';
import { useUIGenerator } from '@/hooks/use-ui-generator';
import { RegistryKey, getComponentList } from '@/registries';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card } from '@/components/ui/card';
import { Monitor, Smartphone, Code2, PanelLeftClose, PanelLeftOpen, PanelRightClose, PanelRightOpen } from 'lucide-react';

// Wrapper for Chakra UI when selected
function ChakraWrapper({ children, enabled }: { children: React.ReactNode; enabled: boolean }) {
    if (enabled) {
        return <ChakraProvider value={defaultSystem}>{children}</ChakraProvider>;
    }
    return <>{children}</>;
}

export default function PlaygroundPage() {
    const [currentRegistry, setCurrentRegistry] = useState<RegistryKey>('shadcn');
    const [devicePreview, setDevicePreview] = useState<'desktop' | 'mobile'>('desktop');
    const [leftSidebarOpen, setLeftSidebarOpen] = useState(true);
    const [rightSidebarOpen, setRightSidebarOpen] = useState(true);

    const { tree, summary, generate, isLoading, error } = useUIGenerator({
        currentRegistry,
    });

    return (
        <div className="h-screen flex flex-col bg-background">
            <Toaster position="top-right" />

            {/* Header */}
            <header className="border-b px-6 py-4 flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold">AI UI Playground</h1>
                    <p className="text-sm text-muted-foreground">
                        Generate dynamic UIs with 6 different component libraries
                    </p>
                </div>
                <div className="flex items-center gap-4">
                    <RegistrySwitcher value={currentRegistry} onChange={setCurrentRegistry} />

                    {/* Device Preview Toggle */}
                    <div className="flex items-center gap-1 border rounded-lg p-1">
                        <button
                            onClick={() => setDevicePreview('desktop')}
                            className={`p-2 rounded ${devicePreview === 'desktop' ? 'bg-muted' : ''}`}
                            title="Desktop Preview"
                        >
                            <Monitor className="h-4 w-4" />
                        </button>
                        <button
                            onClick={() => setDevicePreview('mobile')}
                            className={`p-2 rounded ${devicePreview === 'mobile' ? 'bg-muted' : ''}`}
                            title="Mobile Preview"
                        >
                            <Smartphone className="h-4 w-4" />
                        </button>
                    </div>
                </div>
            </header>

            {/* Main Content - 3 Column Layout */}
            <div className="flex-1 flex overflow-hidden">
                {/* Left Sidebar - Chat Panel (25%) */}
                <aside className="w-1/4 border-r bg-muted/20 overflow-hidden">
                    <ChatPanel
                        onSubmit={generate}
                        isLoading={isLoading}
                        summary={summary}
                    />
                </aside>

                {/* Main Canvas (50%) */}
                <main className="flex-1 overflow-auto p-4">
                    <Card className={`h-full overflow-auto ${devicePreview === 'mobile' ? 'max-w-sm mx-auto' : ''
                        }`}>
                        <ActionProvider>
                            <ChakraWrapper enabled={currentRegistry === 'chakra'}>
                                <RendererCanvas
                                    tree={tree}
                                    currentRegistry={currentRegistry}
                                    isLoading={isLoading}
                                />
                            </ChakraWrapper>
                        </ActionProvider>

                        {error && (
                            <div className="p-4 text-red-500 text-sm">
                                Error: {error}
                            </div>
                        )}
                    </Card>
                </main>

                {/* Right Sidebar - JSON & Config (25%) */}
                <aside className="w-1/4 border-l overflow-hidden">
                    <Tabs defaultValue="json" className="h-full flex flex-col">
                        <TabsList className="w-full justify-start rounded-none border-b">
                            <TabsTrigger value="json" className="gap-2">
                                <Code2 className="h-4 w-4" />
                                JSON
                            </TabsTrigger>
                            <TabsTrigger value="info">Info</TabsTrigger>
                        </TabsList>
                        <TabsContent value="json" className="flex-1 overflow-hidden m-0">
                            <JsonViewer tree={tree} />
                        </TabsContent>
                        <TabsContent value="info" className="flex-1 overflow-auto p-4 m-0">
                            <div className="space-y-4 text-sm">
                                <div>
                                    <h3 className="font-medium mb-2">Current Library</h3>
                                    <p className="text-muted-foreground">{currentRegistry}</p>
                                </div>
                                <div>
                                    <h3 className="font-medium mb-2">Available Components ({getComponentList(currentRegistry).length})</h3>
                                    <div className="text-muted-foreground text-xs max-h-64 overflow-y-auto">
                                        <div className="flex flex-wrap gap-1">
                                            {getComponentList(currentRegistry).slice(0, 50).map((name) => (
                                                <span key={name} className="bg-muted px-1.5 py-0.5 rounded">{name}</span>
                                            ))}
                                            {getComponentList(currentRegistry).length > 50 && (
                                                <span className="text-muted-foreground">+{getComponentList(currentRegistry).length - 50} more...</span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <h3 className="font-medium mb-2">Available Actions</h3>
                                    <ul className="text-muted-foreground space-y-1">
                                        <li>• export_report</li>
                                        <li>• refresh_data</li>
                                        <li>• submit_form</li>
                                        <li>• navigate</li>
                                    </ul>
                                </div>
                            </div>
                        </TabsContent>
                    </Tabs>
                </aside>
            </div>
        </div>
    );
}
