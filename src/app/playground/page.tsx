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
import { RegistryKey } from '@/registries';
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
        <div className="h-screen flex flex-col bg-background relative overflow-hidden font-sans">
            <Toaster position="top-right" theme="dark" />

            {/* Background Pattern */}
            <div className="absolute inset-0 -z-10 h-full w-full bg-white dark:bg-zinc-950 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>

            {/* Header */}
            <header className="border-b bg-background/70 backdrop-blur-xl px-6 py-3 flex items-center justify-between sticky top-0 z-50">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                        <div className="h-6 w-6 rounded-md bg-gradient-to-br from-indigo-500 to-purple-600 shadow-lg shadow-indigo-500/20" />
                    </div>
                    <div>
                        <h1 className="text-xl font-semibold tracking-tight">AI UI Playground</h1>
                        <p className="text-xs text-muted-foreground font-medium">
                            Powered by <span className="text-foreground">json-render</span>
                        </p>
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <RegistrySwitcher value={currentRegistry} onChange={setCurrentRegistry} />

                    {/* Device Preview Toggle */}
                    <div className="flex items-center gap-1 bg-secondary/50 p-1 rounded-lg border">
                        <button
                            onClick={() => setDevicePreview('desktop')}
                            className={`p-1.5 rounded-md transition-all ${devicePreview === 'desktop' ? 'bg-background shadow-sm text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
                            title="Desktop Preview"
                        >
                            <Monitor className="h-4 w-4" />
                        </button>
                        <button
                            onClick={() => setDevicePreview('mobile')}
                            className={`p-1.5 rounded-md transition-all ${devicePreview === 'mobile' ? 'bg-background shadow-sm text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
                            title="Mobile Preview"
                        >
                            <Smartphone className="h-4 w-4" />
                        </button>
                    </div>
                </div>
            </header>

            {/* Main Content - 3 Column Layout */}
            <div className="flex-1 flex overflow-hidden">
                {/* Left Sidebar - Chat Panel */}
                <aside className={`
                    border-r bg-background/50 backdrop-blur-sm z-10 flex flex-col relative
                    transition-all duration-300 ease-in-out
                    ${leftSidebarOpen ? 'w-[30%] min-w-[320px] max-w-[400px]' : 'w-0 min-w-0'}
                `}>
                    {/* Collapse Button */}
                    <button
                        onClick={() => setLeftSidebarOpen(!leftSidebarOpen)}
                        className="absolute -right-3 top-4 z-20 p-1.5 bg-background border rounded-full shadow-md hover:bg-muted transition-colors"
                        title={leftSidebarOpen ? 'Collapse sidebar' : 'Expand sidebar'}
                    >
                        {leftSidebarOpen ? (
                            <PanelLeftClose className="h-3.5 w-3.5 text-muted-foreground" />
                        ) : (
                            <PanelLeftOpen className="h-3.5 w-3.5 text-muted-foreground" />
                        )}
                    </button>

                    <div className={`flex-1 overflow-hidden ${leftSidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'} transition-opacity duration-200`}>
                        <ChatPanel
                            onSubmit={generate}
                            isLoading={isLoading}
                            summary={summary}
                        />
                    </div>
                </aside>

                {/* Collapsed Left Sidebar Toggle */}
                {!leftSidebarOpen && (
                    <button
                        onClick={() => setLeftSidebarOpen(true)}
                        className="absolute left-2 top-20 z-20 p-2 bg-background border rounded-lg shadow-md hover:bg-muted transition-colors"
                        title="Open chat panel"
                    >
                        <PanelLeftOpen className="h-4 w-4 text-muted-foreground" />
                    </button>
                )}

                {/* Main Canvas (Center) */}
                <main className="flex-1 overflow-hidden relative bg-muted/5 p-8 flex items-center justify-center">
                    {/* Device Frame */}
                    <div className={`
                         relative bg-background rounded-xl border shadow-2xl transition-all duration-500 ease-in-out flex flex-col overflow-hidden
                         ${devicePreview === 'mobile'
                            ? 'w-[375px] h-[812px] ring-8 ring-zinc-900 rounded-[2.5rem]'
                            : 'w-full h-full max-w-6xl max-h-[90vh] ring-1 ring-border/50'
                        }
                    `}>
                        {/* Browser Header (Desktop only) */}
                        {devicePreview === 'desktop' && (
                            <div className="h-8 bg-muted/30 border-b flex items-center px-4 gap-2">
                                <div className="flex gap-1.5">
                                    <div className="w-2.5 h-2.5 rounded-full bg-red-400/80" />
                                    <div className="w-2.5 h-2.5 rounded-full bg-amber-400/80" />
                                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-400/80" />
                                </div>
                                <div className="flex-1 flex justify-center">
                                    <div className="h-5 w-48 bg-muted/50 rounded flex items-center justify-center text-[10px] text-muted-foreground">
                                        generated-ui.preview
                                    </div>
                                </div>
                            </div>
                        )}

                        <div className="flex-1 overflow-auto bg-white dark:bg-zinc-950 scrollbar-hide">
                            <ActionProvider>
                                <ChakraWrapper enabled={currentRegistry === 'chakra'}>
                                    <RendererCanvas
                                        tree={tree}
                                        currentRegistry={currentRegistry}
                                        isLoading={isLoading}
                                    />
                                </ChakraWrapper>
                            </ActionProvider>
                        </div>
                    </div>

                    {error && (
                        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-50 px-4 py-2 bg-red-500/10 border border-red-500/20 text-red-600 rounded-full text-sm backdrop-blur-md font-medium animate-in slide-in-from-bottom-5 fade-in">
                            Error: {error}
                        </div>
                    )}
                </main>

                {/* Right Sidebar - JSON & Config */}
                <aside className={`
                    border-l bg-background/50 backdrop-blur-sm z-10 flex-col relative
                    transition-all duration-300 ease-in-out hidden xl:flex
                    ${rightSidebarOpen ? 'w-[20%] min-w-[300px]' : 'w-0 min-w-0'}
                `}>
                    {/* Collapse Button */}
                    <button
                        onClick={() => setRightSidebarOpen(!rightSidebarOpen)}
                        className="absolute -left-3 top-4 z-20 p-1.5 bg-background border rounded-full shadow-md hover:bg-muted transition-colors"
                        title={rightSidebarOpen ? 'Collapse sidebar' : 'Expand sidebar'}
                    >
                        {rightSidebarOpen ? (
                            <PanelRightClose className="h-3.5 w-3.5 text-muted-foreground" />
                        ) : (
                            <PanelRightOpen className="h-3.5 w-3.5 text-muted-foreground" />
                        )}
                    </button>

                    <div className={`flex-1 overflow-hidden flex flex-col ${rightSidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'} transition-opacity duration-200`}>
                        <Tabs defaultValue="json" className="h-full flex flex-col">
                            <TabsList className="w-full justify-start rounded-none border-b bg-transparent p-0 h-10">
                                <TabsTrigger value="json" className="h-full data-[state=active]:bg-muted/50 rounded-none border-b-2 border-transparent data-[state=active]:border-primary gap-2 text-xs">
                                    <Code2 className="h-3.5 w-3.5" />
                                    JSON Tree
                                </TabsTrigger>
                                <TabsTrigger value="info" className="h-full data-[state=active]:bg-muted/50 rounded-none border-b-2 border-transparent data-[state=active]:border-primary text-xs">
                                    Component Info
                                </TabsTrigger>
                            </TabsList>
                            <TabsContent value="json" className="flex-1 overflow-hidden m-0 relative">
                                <div className="absolute inset-0 overflow-auto">
                                    <JsonViewer tree={tree} />
                                </div>
                            </TabsContent>
                            <TabsContent value="info" className="flex-1 overflow-auto p-6 m-0">
                                <div className="space-y-6 text-sm">
                                    <div>
                                        <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">Active Registry</h3>
                                        <div className="p-3 bg-card border rounded-lg shadow-sm">
                                            <div className="font-medium capitalize">{currentRegistry}</div>
                                            <div className="text-xs text-muted-foreground mt-1">Version 1.0.0</div>
                                        </div>
                                    </div>
                                    <div>
                                        <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">Available Components</h3>
                                        <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground">
                                            <div className="p-2 bg-muted/30 rounded">Button</div>
                                            <div className="p-2 bg-muted/30 rounded">Card</div>
                                            <div className="p-2 bg-muted/30 rounded">Table</div>
                                            <div className="p-2 bg-muted/30 rounded">Chart</div>
                                            <div className="p-2 bg-muted/30 rounded">Form</div>
                                            <div className="p-2 bg-muted/30 rounded">Layout</div>
                                        </div>
                                    </div>
                                </div>
                            </TabsContent>
                        </Tabs>
                    </div>
                </aside>

                {/* Collapsed Right Sidebar Toggle */}
                {!rightSidebarOpen && (
                    <button
                        onClick={() => setRightSidebarOpen(true)}
                        className="absolute right-2 top-20 z-20 p-2 bg-background border rounded-lg shadow-md hover:bg-muted transition-colors hidden xl:block"
                        title="Open JSON panel"
                    >
                        <PanelRightOpen className="h-4 w-4 text-muted-foreground" />
                    </button>
                )}
            </div>
        </div>
    );
}
