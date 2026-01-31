'use client';

/**
 * Main Page - Generative UI Builder
 *
 * Demonstrates two modes:
 * 1. Test Cases - Pre-built examples with static registries
 * 2. Generate - Dynamic MCP-driven component discovery and rendering
 */

import * as React from 'react';
import type { UITree, UIElement } from '@json-render/core';
import { RegistryProvider } from '@/lib/registry';
import { UIRenderer, FrameworkSwitcher, TestCasePicker, JSONEditor } from '@/components/builder';
import { shadcnRegistry } from '@/components/registries/shadcn';
import { tailwindRegistry } from '@/components/registries/tailwind';
import { flowbiteRegistry } from '@/components/registries/flowbite';
import type { TestCase } from '@/lib/tests';
import type { ComponentMetadata, UIAnalysis, MCPServerType } from '@/lib/mcp/types';
import { cn } from '@/lib/utils';

type ViewMode = 'preview' | 'json' | 'split';
type TabMode = 'test-cases' | 'generate' | 'mcp-status';

interface MCPStatus {
  servers: Array<{
    serverId: MCPServerType;
    displayName: string;
    description: string;
    enabled: boolean;
    status: 'connected' | 'disconnected' | 'error';
    toolCount: number;
  }>;
  summary: {
    total: number;
    connected: number;
    enabled: number;
    totalTools: number;
  };
}

interface AnalysisResult {
  analysis: UIAnalysis;
  suggestedComponents: ComponentMetadata[];
  sources: MCPServerType[];
  timing: number;
}

export default function Home() {
  // Tab and view state
  const [tabMode, setTabMode] = React.useState<TabMode>('test-cases');
  const [viewMode, setViewMode] = React.useState<ViewMode>('split');
  const [sidebarOpen, setSidebarOpen] = React.useState(true);

  // Test case mode state
  const [selectedTestCase, setSelectedTestCase] = React.useState<TestCase | null>(null);
  const [currentTree, setCurrentTree] = React.useState<UITree | null>(null);

  // Generate mode state
  const [userRequest, setUserRequest] = React.useState('');
  const [isAnalyzing, setIsAnalyzing] = React.useState(false);
  const [analysisResult, setAnalysisResult] = React.useState<AnalysisResult | null>(null);
  const [generatedTree, setGeneratedTree] = React.useState<UITree | null>(null);

  // MCP status state
  const [mcpStatus, setMcpStatus] = React.useState<MCPStatus | null>(null);

  // Handlers
  const handleSelectTestCase = React.useCallback((testCase: TestCase) => {
    setSelectedTestCase(testCase);
    setCurrentTree(testCase.tree);
  }, []);

  const handleTreeChange = React.useCallback((tree: UITree) => {
    setCurrentTree(tree);
  }, []);

  // Analyze user request via MCP
  const handleAnalyze = async () => {
    if (!userRequest.trim()) return;

    setIsAnalyzing(true);
    setAnalysisResult(null);
    setGeneratedTree(null);

    try {
      const response = await fetch('/api/mcp/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userRequest }),
      });

      if (!response.ok) {
        throw new Error('Analysis failed');
      }

      const result: AnalysisResult = await response.json();
      setAnalysisResult(result);

      // Generate a tree from the analysis
      const tree = generateTreeFromAnalysis(result);
      setGeneratedTree(tree);
    } catch (error) {
      console.error('Analysis error:', error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  // Fetch MCP status
  const fetchMCPStatus = async () => {
    try {
      const response = await fetch('/api/mcp/status');
      if (response.ok) {
        const status: MCPStatus = await response.json();
        setMcpStatus(status);
      }
    } catch (error) {
      console.error('Failed to fetch MCP status:', error);
    }
  };

  // Load MCP status when switching to status tab
  React.useEffect(() => {
    if (tabMode === 'mcp-status') {
      fetchMCPStatus();
    }
  }, [tabMode]);

  // Generate a UI tree from analysis result
  function generateTreeFromAnalysis(result: AnalysisResult): UITree {
    const elements: Record<string, UIElement> = {};
    let keyCounter = 0;

    const el = (key: string, type: string, props: Record<string, unknown>, children?: string[]): UIElement => ({
      key,
      type,
      props,
      children,
    });

    const childKeys: string[] = [];

    // Add components based on requirements
    for (const req of result.analysis.requirements) {
      if (req.priority === 'required') {
        for (const compType of req.suggestedComponents.slice(0, 2)) {
          const key = `comp-${keyCounter++}`;
          childKeys.push(key);
          elements[key] = el(key, compType, {
            title: compType,
            description: req.purpose,
          });
        }
      }
    }

    // Add optional components
    for (const req of result.analysis.requirements) {
      if (req.priority === 'optional') {
        for (const compType of req.suggestedComponents.slice(0, 1)) {
          const key = `comp-${keyCounter++}`;
          childKeys.push(key);
          elements[key] = el(key, compType, {
            title: compType,
            description: req.purpose,
          });
        }
      }
    }

    // Create stack container
    const stackKey = 'stack';
    elements[stackKey] = el(stackKey, 'Stack', { direction: 'vertical', gap: '6' }, childKeys);

    // Create main container
    const containerKey = 'container';
    elements[containerKey] = el(containerKey, 'Container', {
      maxWidth: 'lg',
      className: 'mx-auto p-6',
    }, [stackKey]);

    return {
      root: containerKey,
      elements,
    };
  }

  const activeTree = tabMode === 'generate' ? generatedTree : currentTree;

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
                Dynamic component discovery via MCP + json-render
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* Tab Switcher */}
            <div className="inline-flex rounded-lg border p-1 bg-muted/50">
              <button
                onClick={() => setTabMode('test-cases')}
                className={cn(
                  'px-3 py-1.5 text-sm font-medium rounded-md transition-colors',
                  tabMode === 'test-cases'
                    ? 'bg-background shadow-sm'
                    : 'text-muted-foreground hover:text-foreground'
                )}
              >
                Test Cases
              </button>
              <button
                onClick={() => setTabMode('generate')}
                className={cn(
                  'px-3 py-1.5 text-sm font-medium rounded-md transition-colors',
                  tabMode === 'generate'
                    ? 'bg-background shadow-sm'
                    : 'text-muted-foreground hover:text-foreground'
                )}
              >
                Generate (MCP)
              </button>
              <button
                onClick={() => setTabMode('mcp-status')}
                className={cn(
                  'px-3 py-1.5 text-sm font-medium rounded-md transition-colors',
                  tabMode === 'mcp-status'
                    ? 'bg-background shadow-sm'
                    : 'text-muted-foreground hover:text-foreground'
                )}
              >
                MCP Status
              </button>
            </div>

            {/* Framework Switcher */}
            <FrameworkSwitcher />

            {/* View Mode Switcher */}
            {tabMode !== 'mcp-status' && (
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
            )}
          </div>
        </header>

        {/* Main Content */}
        <div className="flex-1 flex overflow-hidden">
          {/* Sidebar */}
          {sidebarOpen && tabMode === 'test-cases' && (
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

          {/* Generate Mode Sidebar */}
          {sidebarOpen && tabMode === 'generate' && (
            <aside className="w-96 border-r bg-card flex flex-col">
              <div className="p-4 border-b">
                <h2 className="font-semibold text-sm mb-3">Generate UI from Request</h2>
                <textarea
                  value={userRequest}
                  onChange={(e) => setUserRequest(e.target.value)}
                  placeholder="Describe the UI you want to create...&#10;&#10;Examples:&#10;- Create a dashboard with metrics and a data table&#10;- Build a landing page with hero section and pricing&#10;- Design a login form with social auth buttons"
                  className="w-full h-32 p-3 text-sm border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <button
                  onClick={handleAnalyze}
                  disabled={isAnalyzing || !userRequest.trim()}
                  className={cn(
                    'w-full mt-3 py-2 px-4 rounded-lg font-medium text-sm transition-colors',
                    isAnalyzing || !userRequest.trim()
                      ? 'bg-muted text-muted-foreground cursor-not-allowed'
                      : 'bg-primary text-primary-foreground hover:bg-primary/90'
                  )}
                >
                  {isAnalyzing ? 'Analyzing...' : 'Analyze & Generate'}
                </button>
              </div>

              {/* Analysis Results */}
              {analysisResult && (
                <div className="flex-1 overflow-auto p-4 space-y-4">
                  {/* Intent */}
                  <div>
                    <h3 className="text-xs font-semibold text-muted-foreground uppercase mb-2">
                      Intent
                    </h3>
                    <p className="text-sm font-medium">{analysisResult.analysis.intent}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Complexity: {analysisResult.analysis.complexity}
                    </p>
                  </div>

                  {/* Layout */}
                  <div>
                    <h3 className="text-xs font-semibold text-muted-foreground uppercase mb-2">
                      Suggested Layout
                    </h3>
                    <p className="text-sm">{analysisResult.analysis.suggestedLayout}</p>
                  </div>

                  {/* Requirements */}
                  <div>
                    <h3 className="text-xs font-semibold text-muted-foreground uppercase mb-2">
                      Component Requirements
                    </h3>
                    <div className="space-y-2">
                      {analysisResult.analysis.requirements.map((req, i) => (
                        <div key={i} className="p-2 bg-muted/50 rounded-lg">
                          <div className="flex items-center gap-2 mb-1">
                            <span className={cn(
                              'px-1.5 py-0.5 text-xs rounded',
                              req.priority === 'required' ? 'bg-red-100 text-red-700' :
                              req.priority === 'optional' ? 'bg-yellow-100 text-yellow-700' :
                              'bg-gray-100 text-gray-700'
                            )}>
                              {req.priority}
                            </span>
                            <span className="text-xs font-medium">{req.type}</span>
                          </div>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {req.suggestedComponents.map((comp) => (
                              <span
                                key={comp}
                                className="px-1.5 py-0.5 text-xs bg-primary/10 text-primary rounded"
                              >
                                {comp}
                              </span>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Discovered Components */}
                  <div>
                    <h3 className="text-xs font-semibold text-muted-foreground uppercase mb-2">
                      Discovered Components ({analysisResult.suggestedComponents.length})
                    </h3>
                    <div className="space-y-1 max-h-48 overflow-auto">
                      {analysisResult.suggestedComponents.map((comp) => (
                        <div
                          key={comp.id}
                          className="p-2 bg-muted/30 rounded text-xs"
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-medium">{comp.displayName}</span>
                            <span className="text-muted-foreground">{comp.source}</span>
                          </div>
                          {comp.description && (
                            <p className="text-muted-foreground mt-0.5 line-clamp-1">
                              {comp.description}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Sources & Timing */}
                  <div className="text-xs text-muted-foreground">
                    Sources: {analysisResult.sources.join(', ')} | Time: {analysisResult.timing}ms
                  </div>
                </div>
              )}
            </aside>
          )}

          {/* MCP Status View */}
          {tabMode === 'mcp-status' && (
            <main className="flex-1 overflow-auto p-6">
              <div className="max-w-4xl mx-auto space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold">MCP Server Status</h2>
                  <button
                    onClick={fetchMCPStatus}
                    className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90"
                  >
                    Refresh
                  </button>
                </div>

                {mcpStatus ? (
                  <>
                    {/* Summary */}
                    <div className="grid grid-cols-4 gap-4">
                      <div className="p-4 bg-card border rounded-lg">
                        <div className="text-2xl font-bold">{mcpStatus.summary.total}</div>
                        <div className="text-sm text-muted-foreground">Total Servers</div>
                      </div>
                      <div className="p-4 bg-card border rounded-lg">
                        <div className="text-2xl font-bold text-green-600">{mcpStatus.summary.connected}</div>
                        <div className="text-sm text-muted-foreground">Connected</div>
                      </div>
                      <div className="p-4 bg-card border rounded-lg">
                        <div className="text-2xl font-bold">{mcpStatus.summary.enabled}</div>
                        <div className="text-sm text-muted-foreground">Enabled</div>
                      </div>
                      <div className="p-4 bg-card border rounded-lg">
                        <div className="text-2xl font-bold">{mcpStatus.summary.totalTools}</div>
                        <div className="text-sm text-muted-foreground">Total Tools</div>
                      </div>
                    </div>

                    {/* Server List */}
                    <div className="space-y-4">
                      {mcpStatus.servers.map((server) => (
                        <div
                          key={server.serverId}
                          className="p-4 bg-card border rounded-lg"
                        >
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-3">
                              <div
                                className={cn(
                                  'w-3 h-3 rounded-full',
                                  server.status === 'connected' ? 'bg-green-500' :
                                  server.status === 'error' ? 'bg-red-500' :
                                  'bg-gray-400'
                                )}
                              />
                              <h3 className="font-semibold">{server.displayName}</h3>
                              <span className="text-xs text-muted-foreground">
                                ({server.serverId})
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className={cn(
                                'px-2 py-0.5 text-xs rounded',
                                server.enabled ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                              )}>
                                {server.enabled ? 'Enabled' : 'Disabled'}
                              </span>
                              <span className="text-xs text-muted-foreground">
                                {server.toolCount} tools
                              </span>
                            </div>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {server.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  </>
                ) : (
                  <div className="text-center py-12 text-muted-foreground">
                    Loading MCP status...
                  </div>
                )}
              </div>
            </main>
          )}

          {/* Main Panel (for test-cases and generate modes) */}
          {tabMode !== 'mcp-status' && (
            <main className="flex-1 flex flex-col overflow-hidden">
              {/* Selected Test Case Info */}
              {tabMode === 'test-cases' && selectedTestCase && (
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

              {/* Generated UI Info */}
              {tabMode === 'generate' && generatedTree && (
                <div className="p-3 border-b bg-muted/50">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold">Generated UI</h3>
                      <p className="text-sm text-muted-foreground">
                        Based on: &quot;{userRequest.slice(0, 50)}{userRequest.length > 50 ? '...' : ''}&quot;
                      </p>
                    </div>
                    <span className="px-2 py-0.5 text-xs bg-green-100 text-green-700 rounded-full">
                      MCP Generated
                    </span>
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
                        tree={activeTree}
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
                      value={activeTree}
                      onChange={tabMode === 'test-cases' ? handleTreeChange : undefined}
                      className="h-full"
                    />
                  </div>
                )}
              </div>
            </main>
          )}
        </div>

        {/* Footer */}
        <footer className="px-4 py-2 border-t bg-card text-xs text-muted-foreground">
          <div className="flex items-center justify-between">
            <span>
              Generative UI Builder - Dynamic component discovery via MCP + json-render rendering
            </span>
            <div className="flex items-center gap-4">
              <span>
                MCP Servers: ui-layouts, shadcn-ui, tailwindcss, flowbite, figma
              </span>
              <a
                href="https://github.com/vercel-labs/json-render"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-foreground"
              >
                json-render
              </a>
            </div>
          </div>
        </footer>
      </div>
    </RegistryProvider>
  );
}
