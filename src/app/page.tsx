'use client';

/**
 * Main Page - Generative UI Builder
 */

import * as React from 'react';
import type { UITree } from '@json-render/core';
import { RegistryProvider } from '@/lib/registry';
import { UIRenderer, FrameworkSwitcher, TestCasePicker, JSONEditor } from '@/components/builder';
import { shadcnRegistry } from '@/components/registries/shadcn';
import { tailwindRegistry } from '@/components/registries/tailwind';
import { flowbiteRegistry } from '@/components/registries/flowbite';
import type { TestCase } from '@/lib/tests';
import { cn } from '@/lib/utils';

type ViewMode = 'preview' | 'json' | 'split';

export default function Home() {
  const [selectedTestCase, setSelectedTestCase] = React.useState<TestCase | null>(null);
  const [currentTree, setCurrentTree] = React.useState<UITree | null>(null);
  const [viewMode, setViewMode] = React.useState<ViewMode>('split');
  const [sidebarOpen, setSidebarOpen] = React.useState(true);

  const handleSelectTestCase = React.useCallback((testCase: TestCase) => {
    setSelectedTestCase(testCase);
    setCurrentTree(testCase.tree);
  }, []);

  const handleTreeChange = React.useCallback((tree: UITree) => {
    setCurrentTree(tree);
  }, []);

  return (
    <RegistryProvider
      defaultFramework="shadcn"
      registries={[shadcnRegistry, tailwindRegistry, flowbiteRegistry]}
    >
      <div className="h-screen flex flex-col bg-background">
        {/* Header */}
        <header className="flex items-center justify-between px-4 py-3 border-b bg-card">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 rounded-lg hover:bg-muted"
              title="Toggle sidebar"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <div>
              <h1 className="text-lg font-bold">Generative UI Builder</h1>
              <p className="text-xs text-muted-foreground">
                Powered by json-render + MCP
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* Framework Switcher */}
            <FrameworkSwitcher />

            {/* View Mode Switcher */}
            <div className="inline-flex rounded-lg border p-1">
              <button
                onClick={() => setViewMode('preview')}
                className={cn(
                  'px-3 py-1.5 text-sm font-medium rounded-md transition-colors',
                  viewMode === 'preview'
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground'
                )}
              >
                Preview
              </button>
              <button
                onClick={() => setViewMode('split')}
                className={cn(
                  'px-3 py-1.5 text-sm font-medium rounded-md transition-colors',
                  viewMode === 'split'
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground'
                )}
              >
                Split
              </button>
              <button
                onClick={() => setViewMode('json')}
                className={cn(
                  'px-3 py-1.5 text-sm font-medium rounded-md transition-colors',
                  viewMode === 'json'
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground'
                )}
              >
                JSON
              </button>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <div className="flex-1 flex overflow-hidden">
          {/* Sidebar - Test Case Picker */}
          {sidebarOpen && (
            <aside className="w-80 border-r bg-card flex flex-col">
              <div className="p-3 border-b">
                <h2 className="font-semibold text-sm">Test Cases (50+)</h2>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Select a test case to preview
                </p>
              </div>
              <TestCasePicker
                onSelect={handleSelectTestCase}
                selectedId={selectedTestCase?.id}
                className="flex-1"
              />
            </aside>
          )}

          {/* Main Panel */}
          <main className="flex-1 flex flex-col overflow-hidden">
            {/* Selected Test Case Info */}
            {selectedTestCase && (
              <div className="p-3 border-b bg-muted/50">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold">{selectedTestCase.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {selectedTestCase.description}
                    </p>
                  </div>
                  <div className="flex gap-1">
                    {selectedTestCase.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 text-xs bg-primary/10 text-primary rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Content Area */}
            <div className="flex-1 flex overflow-hidden">
              {/* Preview Panel */}
              {(viewMode === 'preview' || viewMode === 'split') && (
                <div
                  className={cn(
                    'flex-1 overflow-auto p-6 bg-muted/30',
                    viewMode === 'split' && 'border-r'
                  )}
                >
                  <div className="max-w-4xl mx-auto">
                    <UIRenderer
                      tree={currentTree}
                      onAction={(action, params) => {
                        console.log('Action:', action, params);
                      }}
                    />
                  </div>
                </div>
              )}

              {/* JSON Panel */}
              {(viewMode === 'json' || viewMode === 'split') && (
                <div className={cn('flex-1 overflow-hidden', viewMode === 'split' && 'max-w-md')}>
                  <JSONEditor
                    value={currentTree}
                    onChange={handleTreeChange}
                    className="h-full"
                  />
                </div>
              )}
            </div>
          </main>
        </div>

        {/* Footer */}
        <footer className="px-4 py-2 border-t bg-card text-xs text-muted-foreground">
          <div className="flex items-center justify-between">
            <span>
              Generative UI Builder - Combining json-render with MCP servers
            </span>
            <div className="flex items-center gap-4">
              <a
                href="https://github.com/vercel-labs/json-render"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-foreground"
              >
                json-render
              </a>
              <a
                href="https://github.com/ui-layouts/mcp"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-foreground"
              >
                ui-layouts/mcp
              </a>
            </div>
          </div>
        </footer>
      </div>
    </RegistryProvider>
  );
}
