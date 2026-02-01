'use client';

/**
 * Export Panel - UI for exporting generated UI as code
 *
 * Features:
 * - Syntax highlighted code preview
 * - Framework selector
 * - Copy to clipboard
 * - Download as .tsx file
 * - Installation instructions
 * - Multi-file bundle export
 * - API integration options
 * - Design system CSS export
 */

import * as React from 'react';
import type { UITree } from '@json-render/core';
import type { UIFramework } from '@/types';
import { cn } from '@/lib/utils';
import {
  generateCode,
  getInstallationInstructions,
  getSuggestedFilename,
  generateBundleWithMetadata,
  type ExportTarget,
  type CodeGenerationOptions,
  type BundleResult,
} from '@/lib/export';
import {
  Copy,
  Check,
  Download,
  Code2,
  FileCode2,
  Terminal,
  ChevronDown,
  FolderArchive,
  Settings2,
  Files,
  FileText,
} from 'lucide-react';

// Shiki for syntax highlighting
import { createHighlighter, type Highlighter, type BundledLanguage } from 'shiki';

interface ExportPanelProps {
  tree: UITree | null;
  className?: string;
  defaultFramework?: UIFramework;
  defaultTarget?: ExportTarget;
  designCssVariables?: string;
}

// Supported frameworks for export
const FRAMEWORKS: { value: UIFramework; label: string; icon: string }[] = [
  { value: 'shadcn', label: 'shadcn/ui', icon: '/' },
  { value: 'mui', label: 'Material UI', icon: 'M' },
  { value: 'chakra', label: 'Chakra UI', icon: 'C' },
  { value: 'tailwind', label: 'Tailwind CSS', icon: 'T' },
  { value: 'flowbite', label: 'Flowbite', icon: 'F' },
  { value: 'antd', label: 'Ant Design', icon: 'A' },
  { value: 'magic-ui', label: 'Magic UI', icon: 'M' },
  { value: 'aceternity', label: 'Aceternity', icon: 'A' },
];

// Export targets
const TARGETS: { value: ExportTarget; label: string; description: string }[] = [
  { value: 'react', label: 'React Component', description: 'Standalone React component' },
  { value: 'nextjs', label: 'Next.js Page', description: 'App Router page component' },
];

// Tab options
type TabType = 'code' | 'files' | 'install';

export function ExportPanel({
  tree,
  className,
  defaultFramework = 'shadcn',
  defaultTarget = 'react',
  designCssVariables,
}: ExportPanelProps) {
  // State
  const [framework, setFramework] = React.useState<UIFramework>(defaultFramework);
  const [target, setTarget] = React.useState<ExportTarget>(defaultTarget);
  const [activeTab, setActiveTab] = React.useState<TabType>('code');
  const [copied, setCopied] = React.useState(false);
  const [highlighter, setHighlighter] = React.useState<Highlighter | null>(null);
  const [highlightedCode, setHighlightedCode] = React.useState<string>('');
  const [showFrameworkDropdown, setShowFrameworkDropdown] = React.useState(false);
  const [showOptions, setShowOptions] = React.useState(false);
  const [selectedFile, setSelectedFile] = React.useState<string | null>(null);

  // Export options
  const [includeApiClient, setIncludeApiClient] = React.useState(false);
  const [includeQueryHook, setIncludeQueryHook] = React.useState(false);
  const [includeReadme, setIncludeReadme] = React.useState(true);
  const [includeDesignCss, setIncludeDesignCss] = React.useState(true);

  // Generate code
  const generatedCode = React.useMemo(() => {
    console.log('[Export Panel] Generating code...', {
      hasTree: !!tree,
      elementCount: tree ? Object.keys(tree.elements).length : 0,
      framework,
      target
    });

    if (!tree) {
      console.warn('[Export Panel] No tree to export');
      return '// No UI tree to export';
    }

    const options: CodeGenerationOptions = {
      target,
      framework,
      componentName: target === 'nextjs' ? 'Page' : 'GeneratedComponent',
      includeTypes: true,
      includeApiComments: true,
      useClientDirective: true,
    };

    try {
      const code = generateCode(tree, options);
      console.log('[Export Panel] Code generated successfully:', code.substring(0, 200) + '...');
      return code;
    } catch (error) {
      console.error('[Export Panel] Code generation error:', error);
      return `// Error generating code: ${error instanceof Error ? error.message : 'Unknown error'}`;
    }
  }, [tree, framework, target]);

  // Generate bundle with all files
  const bundleResult = React.useMemo<BundleResult | null>(() => {
    if (!tree) return null;

    try {
      const result = generateBundleWithMetadata({
        componentCode: generatedCode,
        componentName: target === 'nextjs' ? 'Page' : 'GeneratedComponent',
        framework,
        includeApiClient,
        includeQueryHook,
        includeReadme,
        includeTypes: true,
      });

      // Add design CSS if enabled
      if (includeDesignCss && designCssVariables) {
        const cssContent = `:root {\n  ${designCssVariables}\n}\n`;
        result.files['styles/design-variables.css'] = cssContent;
        result.fileList.push({
          path: 'styles/design-variables.css',
          content: cssContent,
          description: 'Design system CSS variables',
        });
        result.fileCount += 1;
      }

      return result;
    } catch (error) {
      console.error('Bundle generation error:', error);
      return null;
    }
  }, [tree, generatedCode, framework, target, includeApiClient, includeQueryHook, includeReadme, includeDesignCss, designCssVariables]);

  // Get installation instructions
  const installInstructions = React.useMemo(() => {
    return getInstallationInstructions(framework);
  }, [framework]);

  // Get content for current view
  const currentContent = React.useMemo(() => {
    if (activeTab === 'install') return installInstructions;
    if (activeTab === 'files' && selectedFile && bundleResult) {
      return bundleResult.files[selectedFile] || '// File not found';
    }
    return generatedCode;
  }, [activeTab, selectedFile, bundleResult, generatedCode, installInstructions]);

  // Get language for syntax highlighting
  const currentLanguage = React.useMemo<BundledLanguage>(() => {
    if (activeTab === 'install') return 'bash';
    if (selectedFile?.endsWith('.css')) return 'css';
    if (selectedFile?.endsWith('.md')) return 'markdown';
    if (selectedFile?.endsWith('.json')) return 'json';
    return 'tsx';
  }, [activeTab, selectedFile]);

  // Initialize Shiki highlighter
  React.useEffect(() => {
    let mounted = true;

    async function initHighlighter() {
      try {
        const hl = await createHighlighter({
          themes: ['github-dark', 'github-light'],
          langs: ['tsx', 'bash', 'css', 'markdown', 'json', 'typescript'],
        });
        if (mounted) {
          setHighlighter(hl);
        }
      } catch (error) {
        console.error('Failed to initialize syntax highlighter:', error);
      }
    }

    initHighlighter();

    return () => {
      mounted = false;
    };
  }, []);

  // Highlight code when it changes
  React.useEffect(() => {
    if (!highlighter) {
      setHighlightedCode('');
      return;
    }

    try {
      const html = highlighter.codeToHtml(currentContent, {
        lang: currentLanguage,
        theme: 'github-dark',
      });

      setHighlightedCode(html);
    } catch (error) {
      console.error('Syntax highlighting error:', error);
      setHighlightedCode('');
    }
  }, [highlighter, currentContent, currentLanguage]);

  // Copy to clipboard
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(currentContent);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  // Download single file
  const handleDownload = () => {
    const filename = getSuggestedFilename(
      target === 'nextjs' ? 'Page' : 'GeneratedComponent',
      target,
      true
    );

    const blob = new Blob([generatedCode], { type: 'text/typescript' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Download all as zip
  const handleDownloadAll = async () => {
    if (!bundleResult) return;

    try {
      // Dynamic import of JSZip
      const JSZip = (await import('jszip')).default;
      const zip = new JSZip();

      // Add all files to zip
      for (const [path, content] of Object.entries(bundleResult.files)) {
        zip.file(path, content);
      }

      // Generate and download
      const blob = await zip.generateAsync({ type: 'blob' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${target === 'nextjs' ? 'page' : 'generated-component'}-bundle.zip`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Failed to create zip:', error);
      // Fallback: download just the main file
      handleDownload();
    }
  };

  // Format file size
  const formatSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  // Get current framework info
  const currentFramework = FRAMEWORKS.find((f) => f.value === framework);
  const currentTarget = TARGETS.find((t) => t.value === target);

  return (
    <div className={cn('flex flex-col h-full bg-background', className)}>
      {/* Header */}
      <div className="flex items-center gap-2 p-3 border-b bg-muted/30">
        <Code2 className="h-4 w-4 text-muted-foreground" />
        <span className="text-sm font-medium">Export Code</span>
        <div className="flex-1" />
        <button
          onClick={() => setShowOptions(!showOptions)}
          className={cn(
            'flex items-center gap-1.5 px-2 py-1 text-xs rounded-md',
            'hover:bg-muted transition-colors',
            showOptions && 'bg-muted'
          )}
        >
          <Settings2 className="h-3.5 w-3.5" />
          <span>Options</span>
        </button>
      </div>

      {/* Options Panel */}
      {showOptions && (
        <div className="p-3 border-b bg-card space-y-3">
          <div className="text-xs font-medium text-muted-foreground uppercase">Export Options</div>
          <div className="grid grid-cols-2 gap-2">
            <label className="flex items-center gap-2 text-sm cursor-pointer">
              <input
                type="checkbox"
                checked={includeApiClient}
                onChange={(e) => setIncludeApiClient(e.target.checked)}
                className="rounded border-input"
              />
              <span>API Client</span>
            </label>
            <label className="flex items-center gap-2 text-sm cursor-pointer">
              <input
                type="checkbox"
                checked={includeQueryHook}
                onChange={(e) => setIncludeQueryHook(e.target.checked)}
                className="rounded border-input"
              />
              <span>Query Hook</span>
            </label>
            <label className="flex items-center gap-2 text-sm cursor-pointer">
              <input
                type="checkbox"
                checked={includeReadme}
                onChange={(e) => setIncludeReadme(e.target.checked)}
                className="rounded border-input"
              />
              <span>README</span>
            </label>
            <label className="flex items-center gap-2 text-sm cursor-pointer">
              <input
                type="checkbox"
                checked={includeDesignCss}
                onChange={(e) => setIncludeDesignCss(e.target.checked)}
                disabled={!designCssVariables}
                className="rounded border-input disabled:opacity-50"
              />
              <span>Design CSS</span>
            </label>
          </div>
        </div>
      )}

      {/* Options Bar */}
      <div className="flex flex-wrap items-center gap-2 p-3 border-b bg-card">
        {/* Framework Selector */}
        <div className="relative">
          <button
            onClick={() => setShowFrameworkDropdown(!showFrameworkDropdown)}
            className={cn(
              'flex items-center gap-2 px-3 py-1.5 text-sm rounded-md border',
              'hover:bg-muted transition-colors'
            )}
          >
            <span className="w-5 h-5 flex items-center justify-center rounded bg-primary/10 text-primary text-xs font-bold">
              {currentFramework?.icon}
            </span>
            <span>{currentFramework?.label}</span>
            <ChevronDown className="h-3 w-3 text-muted-foreground" />
          </button>

          {showFrameworkDropdown && (
            <>
              <div
                className="fixed inset-0 z-10"
                onClick={() => setShowFrameworkDropdown(false)}
              />
              <div className="absolute top-full left-0 mt-1 w-48 bg-popover border rounded-md shadow-lg z-20">
                {FRAMEWORKS.map((fw) => (
                  <button
                    key={fw.value}
                    onClick={() => {
                      setFramework(fw.value);
                      setShowFrameworkDropdown(false);
                    }}
                    className={cn(
                      'w-full flex items-center gap-2 px-3 py-2 text-sm text-left',
                      'hover:bg-muted transition-colors',
                      framework === fw.value && 'bg-muted'
                    )}
                  >
                    <span className="w-5 h-5 flex items-center justify-center rounded bg-primary/10 text-primary text-xs font-bold">
                      {fw.icon}
                    </span>
                    <span>{fw.label}</span>
                  </button>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Target Selector */}
        <div className="inline-flex rounded-md border p-0.5">
          {TARGETS.map((t) => (
            <button
              key={t.value}
              onClick={() => setTarget(t.value)}
              title={t.description}
              className={cn(
                'px-3 py-1 text-sm rounded transition-colors',
                target === t.value
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:text-foreground'
              )}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Actions */}
        <button
          onClick={handleCopy}
          className={cn(
            'flex items-center gap-1.5 px-3 py-1.5 text-sm rounded-md border',
            'hover:bg-muted transition-colors',
            copied && 'text-green-600 border-green-600'
          )}
        >
          {copied ? (
            <>
              <Check className="h-3.5 w-3.5" />
              <span>Copied!</span>
            </>
          ) : (
            <>
              <Copy className="h-3.5 w-3.5" />
              <span>Copy</span>
            </>
          )}
        </button>

        <button
          onClick={handleDownload}
          disabled={!tree}
          className={cn(
            'flex items-center gap-1.5 px-3 py-1.5 text-sm rounded-md border',
            'hover:bg-muted transition-colors',
            'disabled:opacity-50 disabled:cursor-not-allowed'
          )}
        >
          <Download className="h-3.5 w-3.5" />
          <span>Download</span>
        </button>

        <button
          onClick={handleDownloadAll}
          disabled={!tree || !bundleResult}
          className={cn(
            'flex items-center gap-1.5 px-3 py-1.5 text-sm rounded-md',
            'bg-primary text-primary-foreground',
            'hover:bg-primary/90 transition-colors',
            'disabled:opacity-50 disabled:cursor-not-allowed'
          )}
        >
          <FolderArchive className="h-3.5 w-3.5" />
          <span>Download All</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="flex border-b">
        <button
          onClick={() => {
            setActiveTab('code');
            setSelectedFile(null);
          }}
          className={cn(
            'flex items-center gap-1.5 px-4 py-2 text-sm font-medium border-b-2 -mb-px transition-colors',
            activeTab === 'code'
              ? 'border-primary text-foreground'
              : 'border-transparent text-muted-foreground hover:text-foreground'
          )}
        >
          <FileCode2 className="h-4 w-4" />
          <span>Code</span>
        </button>
        <button
          onClick={() => setActiveTab('files')}
          className={cn(
            'flex items-center gap-1.5 px-4 py-2 text-sm font-medium border-b-2 -mb-px transition-colors',
            activeTab === 'files'
              ? 'border-primary text-foreground'
              : 'border-transparent text-muted-foreground hover:text-foreground'
          )}
        >
          <Files className="h-4 w-4" />
          <span>Files</span>
          {bundleResult && (
            <span className="ml-1 px-1.5 py-0.5 text-xs bg-muted rounded-full">
              {bundleResult.fileCount}
            </span>
          )}
        </button>
        <button
          onClick={() => setActiveTab('install')}
          className={cn(
            'flex items-center gap-1.5 px-4 py-2 text-sm font-medium border-b-2 -mb-px transition-colors',
            activeTab === 'install'
              ? 'border-primary text-foreground'
              : 'border-transparent text-muted-foreground hover:text-foreground'
          )}
        >
          <Terminal className="h-4 w-4" />
          <span>Installation</span>
        </button>
      </div>

      {/* Content Area */}
      <div className="flex-1 flex overflow-hidden">
        {/* Files Sidebar (when in files tab) */}
        {activeTab === 'files' && bundleResult && (
          <div className="w-48 border-r bg-card overflow-auto">
            {bundleResult.fileList.map((file) => (
              <button
                key={file.path}
                onClick={() => setSelectedFile(file.path)}
                className={cn(
                  'w-full flex items-start gap-2 px-3 py-2 text-left text-xs',
                  'hover:bg-muted transition-colors border-b',
                  selectedFile === file.path && 'bg-muted'
                )}
              >
                <FileText className="h-3.5 w-3.5 mt-0.5 flex-shrink-0 text-muted-foreground" />
                <div className="min-w-0">
                  <div className="font-medium truncate">{file.path}</div>
                  {file.description && (
                    <div className="text-muted-foreground truncate">{file.description}</div>
                  )}
                </div>
              </button>
            ))}
          </div>
        )}

        {/* Code Preview */}
        <div className="flex-1 overflow-auto bg-[#24292e]">
          {!tree ? (
            <div className="flex flex-col items-center justify-center h-full text-center p-8">
              <Code2 className="h-12 w-12 text-gray-500 mb-4" />
              <p className="text-gray-400 text-sm">
                No UI tree to export.
                <br />
                Generate or select a UI to see the code.
              </p>
            </div>
          ) : activeTab === 'files' && !selectedFile ? (
            <div className="flex flex-col items-center justify-center h-full text-center p-8">
              <Files className="h-12 w-12 text-gray-500 mb-4" />
              <p className="text-gray-400 text-sm">
                Select a file from the sidebar to preview.
              </p>
            </div>
          ) : highlightedCode ? (
            <div
              className="p-4 text-sm [&_pre]:!bg-transparent [&_code]:!bg-transparent"
              dangerouslySetInnerHTML={{ __html: highlightedCode }}
            />
          ) : (
            <pre className="p-4 text-sm text-gray-300 overflow-auto">
              <code>{currentContent}</code>
            </pre>
          )}
        </div>
      </div>

      {/* Footer Info */}
      <div className="px-4 py-2 border-t bg-muted/30 text-xs text-muted-foreground">
        <div className="flex items-center justify-between">
          <span>
            {currentTarget?.description} for {currentFramework?.label}
          </span>
          <div className="flex items-center gap-4">
            {bundleResult && (
              <span>{bundleResult.fileCount} files ({formatSize(bundleResult.totalSize)})</span>
            )}
            <span>
              {currentContent.split('\n').length} lines
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ExportPanel;
