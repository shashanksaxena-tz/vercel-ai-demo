'use client';

/**
 * BuilderWorkspace - Unified three-panel visual builder
 *
 * Orchestrates the full builder experience:
 * - Left panel: Tree Outline / Component Palette / AI Chat (tabbed)
 * - Center: Live preview canvas or Welcome screen
 * - Right panel: Props Editor for selected element
 * - Top: Viewport toolbar with undo/redo, design controls, export
 * - Modals: Template Gallery, Export Panel
 */

import { useCallback, useEffect, useState } from 'react';
import type { UITree } from '@json-render/core';
import { useBuilderStore } from '@/lib/store/builder-store';
import { PAGE_TEMPLATES } from '@/lib/templates/page-templates';
import type { PageTemplate } from '@/lib/templates/page-templates';
import { CORE_BLOCK_DEFINITIONS } from '@/lib/registry/core-blocks';
import { MAGIC_UI_BLOCK_DEFINITIONS, ACETERNITY_BLOCK_DEFINITIONS } from '@/lib/registry/extended-blocks';
import type { BlockDefinition } from '@/lib/registry/block-registry';
import {
  UIRenderer,
  FrameworkSwitcher,
  FrameworkBadge,
  JSONEditor,
  ChatInterface,
  DesignLanguageButtons,
  ColorSchemeButtons,
  ExportPanel,
  PreviewWrapper,
  TreeOutline,
  ComponentPalette,
  PropsEditor,
  ViewportToolbar,
  TemplateGallery,
  NodeContextMenu,
  WelcomeScreen,
} from '@/components/builder';
import type { ContextMenuAction } from '@/components/builder';
import { useDesign } from '@/lib/design';
import { cn } from '@/lib/utils';
import {
  ListTree,
  LayoutGrid,
  Sparkles,
  PanelLeftClose,
  PanelRightClose,
  Download,
  Palette,
  Shapes,
  X,
} from 'lucide-react';

// ---------------------------------------------------------------------------
// Block Definition Lookup
// ---------------------------------------------------------------------------

const ALL_BLOCKS: BlockDefinition[] = [
  ...CORE_BLOCK_DEFINITIONS,
  ...MAGIC_UI_BLOCK_DEFINITIONS,
  ...ACETERNITY_BLOCK_DEFINITIONS,
];

const BLOCK_MAP = new Map<string, BlockDefinition>();
for (const b of ALL_BLOCKS) {
  BLOCK_MAP.set(b.type, b);
  // Also register without namespace prefix for lookup
  const bare = b.type.includes('::') ? b.type.split('::')[1] : b.type;
  if (!BLOCK_MAP.has(bare)) BLOCK_MAP.set(bare, b);
}

function lookupBlock(type: string): BlockDefinition | null {
  return BLOCK_MAP.get(type) ?? BLOCK_MAP.get(`core::${type}`) ?? null;
}

// Types that accept children (beyond layout-kind blocks)
const CONTAINER_TYPES = new Set([
  'Container', 'Row', 'Column', 'Grid', 'Stack',
  'Card', 'CardHeader', 'CardBody', 'CardFooter',
  'Table', 'TableHeader', 'TableBody', 'TableRow', 'TableCell',
  'Tabs', 'TabList', 'TabPanel',
  'Accordion', 'AccordionItem', 'Collapsible',
  'Modal', 'Drawer', 'Popover', 'Dropdown',
  'List', 'ListItem', 'NavMenu',
  'RadioGroup', 'ButtonGroup',
  'BentoGrid', 'Tooltip',
  'Hero', 'Section',
]);

// Viewport width map
const VIEWPORT_WIDTHS = {
  desktop: '100%',
  tablet: '768px',
  mobile: '375px',
} as const;

// ---------------------------------------------------------------------------
// Left Panel Tab Config
// ---------------------------------------------------------------------------

const LEFT_TABS = [
  { id: 'outline' as const, icon: ListTree, label: 'Tree' },
  { id: 'palette' as const, icon: LayoutGrid, label: 'Components' },
  { id: 'ai' as const, icon: Sparkles, label: 'AI' },
];

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function BuilderWorkspace() {
  // ---- Store selectors ----
  const tree = useBuilderStore((s) => s.tree);
  const setTree = useBuilderStore((s) => s.setTree);
  const selectedKey = useBuilderStore((s) => s.selectedKey);
  const hoveredKey = useBuilderStore((s) => s.hoveredKey);
  const selectElement = useBuilderStore((s) => s.selectElement);
  const hoverElement = useBuilderStore((s) => s.hoverElement);
  const mode = useBuilderStore((s) => s.mode);
  const viewport = useBuilderStore((s) => s.viewport);
  const leftPanel = useBuilderStore((s) => s.leftPanel);
  const rightPanel = useBuilderStore((s) => s.rightPanel);
  const setMode = useBuilderStore((s) => s.setMode);
  const setViewport = useBuilderStore((s) => s.setViewport);
  const setLeftPanel = useBuilderStore((s) => s.setLeftPanel);
  const setRightPanel = useBuilderStore((s) => s.setRightPanel);
  const updateElement = useBuilderStore((s) => s.updateElement);
  const addElement = useBuilderStore((s) => s.addElement);
  const removeElement = useBuilderStore((s) => s.removeElement);
  const moveElement = useBuilderStore((s) => s.moveElement);
  const duplicateElement = useBuilderStore((s) => s.duplicateElement);
  const getParent = useBuilderStore((s) => s.getParent);

  // ---- Undo/Redo ----
  // We read from temporal store reactively via state
  const [canUndo, setCanUndo] = useState(false);
  const [canRedo, setCanRedo] = useState(false);

  useEffect(() => {
    // Subscribe to temporal store changes
    const unsubscribe = useBuilderStore.temporal.subscribe((state) => {
      setCanUndo(state.pastStates.length > 0);
      setCanRedo(state.futureStates.length > 0);
    });
    return unsubscribe;
  }, []);

  const handleUndo = useCallback(() => {
    useBuilderStore.temporal.getState().undo();
  }, []);

  const handleRedo = useCallback(() => {
    useBuilderStore.temporal.getState().redo();
  }, []);

  // ---- Local UI state ----
  const [showTemplateGallery, setShowTemplateGallery] = useState(false);
  const [showExport, setShowExport] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [contextMenu, setContextMenu] = useState<{
    element: { key: string; type: string; props: Record<string, unknown>; children?: string[] } | null;
    position: { x: number; y: number } | null;
  }>({ element: null, position: null });

  const { cssVariables } = useDesign();

  // ---- Derived ----
  const elementCount = tree ? Object.keys(tree.elements).length : 0;
  const selectedElement = selectedKey && tree ? tree.elements[selectedKey] ?? null : null;
  const selectedBlockDef = selectedElement ? lookupBlock(selectedElement.type) : null;

  // ---- Keyboard shortcuts ----
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      // Undo: Cmd/Ctrl+Z
      if ((e.metaKey || e.ctrlKey) && e.key === 'z' && !e.shiftKey) {
        e.preventDefault();
        handleUndo();
      }
      // Redo: Cmd/Ctrl+Shift+Z
      if ((e.metaKey || e.ctrlKey) && e.key === 'z' && e.shiftKey) {
        e.preventDefault();
        handleRedo();
      }
      // Delete selected element
      if (e.key === 'Delete' || e.key === 'Backspace') {
        if (selectedKey && tree && selectedKey !== tree.root) {
          const target = e.target as HTMLElement;
          if (target.tagName !== 'INPUT' && target.tagName !== 'TEXTAREA' && !target.isContentEditable) {
            e.preventDefault();
            removeElement(selectedKey);
          }
        }
      }
      // Escape to deselect
      if (e.key === 'Escape') {
        selectElement(null);
        setContextMenu({ element: null, position: null });
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [selectedKey, tree, handleUndo, handleRedo, removeElement, selectElement]);

  // ---- Handlers ----

  const handleSelectTemplate = useCallback((template: PageTemplate) => {
    setTree(template.tree);
    setShowTemplateGallery(false);
    setLeftPanel('outline');
  }, [setTree, setLeftPanel]);

  const handleCustomizeTemplate = useCallback((template: PageTemplate, _prompt: string) => {
    setTree(template.tree);
    setShowTemplateGallery(false);
    setLeftPanel('ai');
  }, [setTree, setLeftPanel]);

  const handleStartBlank = useCallback(() => {
    const blankTree: UITree = {
      root: 'root',
      elements: {
        root: { key: 'root', type: 'Container', props: { className: 'min-h-screen p-6' } },
      },
    };
    setTree(blankTree);
    setLeftPanel('palette');
  }, [setTree, setLeftPanel]);

  const handleAddComponent = useCallback((blockType: string) => {
    if (!tree) return;
    const bare = blockType.includes('::') ? blockType.split('::')[1] : blockType;
    const key = `${bare.toLowerCase()}_${Date.now()}`;
    const blockDef = lookupBlock(blockType);
    const defaults = blockDef?.defaultProps ?? {};

    // Determine the correct parent: if the selected element is a container type,
    // add as child; otherwise add as a sibling (to the selected element's parent).
    let parentKey = tree.root;
    if (selectedKey && selectedKey !== tree.root) {
      const selectedEl = tree.elements[selectedKey];
      if (selectedEl) {
        const selectedDef = lookupBlock(selectedEl.type);
        const isContainer = selectedDef?.kind === 'layout'
          || CONTAINER_TYPES.has(selectedEl.type);
        if (isContainer) {
          parentKey = selectedKey;
        } else {
          // Find the parent of the selected element and add as sibling
          const parent = getParent(selectedKey);
          parentKey = parent?.key ?? tree.root;
        }
      }
    }

    addElement(
      { key, type: bare, props: { ...defaults } },
      parentKey,
    );
    selectElement(key);
  }, [tree, selectedKey, addElement, selectElement, getParent]);

  const handleUpdateProps = useCallback((key: string, props: Record<string, unknown>) => {
    updateElement(key, { props });
  }, [updateElement]);

  const handleChatTreeUpdate = useCallback((newTree: UITree) => {
    setTree(newTree);
  }, [setTree]);

  const handleCanvasDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const blockType = e.dataTransfer.getData('application/x-block-type');
    if (!blockType) return;

    // If no tree exists, create a blank tree first, then add the component
    if (!tree) {
      const blankTree: UITree = {
        root: 'root',
        elements: {
          root: { key: 'root', type: 'Container', props: { className: 'min-h-screen p-6' } },
        },
      };
      setTree(blankTree);
      // Add the dropped component to root after setting tree
      setTimeout(() => {
        handleAddComponent(blockType);
      }, 0);
      return;
    }

    handleAddComponent(blockType);
  }, [tree, setTree, handleAddComponent]);

  const handleCanvasDragOver = useCallback((e: React.DragEvent) => {
    if (e.dataTransfer.types.includes('application/x-block-type')) {
      e.preventDefault();
      e.dataTransfer.dropEffect = 'copy';
      setDragOver(true);
    }
  }, []);

  const handleCanvasDragLeave = useCallback(() => {
    setDragOver(false);
  }, []);

  const handleContextMenuAction = useCallback((action: ContextMenuAction) => {
    if (!selectedKey || !tree) return;

    switch (action.type) {
      case 'duplicate':
        duplicateElement(selectedKey);
        break;
      case 'delete':
        removeElement(selectedKey);
        break;
      case 'move-up':
      case 'move-down': {
        const parent = getParent(selectedKey);
        if (parent?.children) {
          const idx = parent.children.indexOf(selectedKey);
          const newIdx = action.type === 'move-up' ? idx - 1 : idx + 1;
          if (newIdx >= 0 && newIdx < parent.children.length) {
            moveElement(selectedKey, parent.key, newIdx);
          }
        }
        break;
      }
      case 'add-child': {
        const childKey = `${action.childType.toLowerCase()}_${Date.now()}`;
        addElement(
          { key: childKey, type: action.childType, props: {} },
          selectedKey,
        );
        break;
      }
      case 'select-parent': {
        const parent = getParent(selectedKey);
        if (parent) selectElement(parent.key);
        break;
      }
      default:
        break;
    }
    setContextMenu({ element: null, position: null });
  }, [selectedKey, tree, duplicateElement, removeElement, moveElement, addElement, getParent, selectElement]);

  // ---- Render ----

  return (
    <div className="h-screen flex flex-col bg-background">
      {/* ===== TOP BAR ===== */}
      <header className="flex items-center justify-between h-12 px-3 border-b bg-card shrink-0">
        {/* Left: panel toggle + branding */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setLeftPanel(leftPanel ? null : 'outline')}
            className="p-1.5 rounded-md hover:bg-muted transition-colors"
            title={leftPanel ? 'Hide left panel' : 'Show left panel'}
          >
            <PanelLeftClose className="w-4 h-4 text-muted-foreground" />
          </button>
          <div className="text-sm font-semibold text-foreground">UI Builder</div>
        </div>

        {/* Center: viewport toolbar */}
        <ViewportToolbar
          viewport={viewport}
          mode={mode}
          onViewportChange={setViewport}
          onModeChange={setMode}
          onUndo={handleUndo}
          onRedo={handleRedo}
          canUndo={canUndo}
          canRedo={canRedo}
          elementCount={elementCount}
          className="border-none bg-transparent"
        />

        {/* Right: design controls + export + panel toggle */}
        <div className="flex items-center gap-2">
          <div className="hidden md:flex items-center gap-1.5 px-2 py-1 bg-muted/50 rounded-md">
            <Shapes className="h-3.5 w-3.5 text-muted-foreground" />
            <DesignLanguageButtons />
            <div className="w-px h-3.5 bg-border" />
            <Palette className="h-3.5 w-3.5 text-muted-foreground" />
            <ColorSchemeButtons />
          </div>
          <FrameworkSwitcher compact />
          <button
            onClick={() => setShowExport(!showExport)}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            Export
          </button>
          <button
            onClick={() => setRightPanel(rightPanel ? null : 'props')}
            className="p-1.5 rounded-md hover:bg-muted transition-colors"
            title={rightPanel ? 'Hide right panel' : 'Show right panel'}
          >
            <PanelRightClose className="w-4 h-4 text-muted-foreground" />
          </button>
        </div>
      </header>

      {/* ===== MAIN CONTENT ===== */}
      <div className="flex-1 flex overflow-hidden">
        {/* ===== LEFT PANEL ===== */}
        {leftPanel && (
          <aside className="w-[280px] shrink-0 border-r bg-card flex flex-col">
            {/* Tab bar */}
            <div className="flex border-b shrink-0">
              {LEFT_TABS.map((tab) => {
                const Icon = tab.icon;
                const isActive = leftPanel === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setLeftPanel(isActive ? null : tab.id)}
                    className={cn(
                      'flex-1 flex items-center justify-center gap-1.5 py-2.5 text-xs font-medium transition-colors border-b-2',
                      isActive
                        ? 'border-primary text-foreground'
                        : 'border-transparent text-muted-foreground hover:text-foreground hover:bg-muted/50',
                    )}
                    title={tab.label}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    {tab.label}
                  </button>
                );
              })}
            </div>

            {/* Tab content */}
            <div className="flex-1 overflow-hidden">
              {leftPanel === 'outline' && (
                <TreeOutline
                  tree={tree}
                  selectedKey={selectedKey}
                  hoveredKey={hoveredKey}
                  onSelect={selectElement}
                  onHover={hoverElement}
                  className="h-full"
                />
              )}
              {leftPanel === 'palette' && (
                <ComponentPalette
                  onAddComponent={handleAddComponent}
                  className="h-full border-r-0 w-full"
                />
              )}
              {leftPanel === 'ai' && (
                <ChatInterface
                  currentTree={tree}
                  onTreeUpdate={handleChatTreeUpdate}
                  showTreeIndicator={true}
                  className="h-full"
                />
              )}
            </div>
          </aside>
        )}

        {/* ===== CENTER CANVAS ===== */}
        <main
          className="flex-1 flex flex-col overflow-hidden"
          onDrop={handleCanvasDrop}
          onDragOver={handleCanvasDragOver}
          onDragLeave={handleCanvasDragLeave}
        >
          {!tree ? (
            <div className={cn('flex-1 relative', dragOver && 'ring-2 ring-primary ring-inset bg-primary/5')}>
              {dragOver && (
                <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
                  <div className="bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-medium shadow-lg">
                    Drop to add component
                  </div>
                </div>
              )}
              <WelcomeScreen
                onPickTemplate={() => setShowTemplateGallery(true)}
                onStartBlank={handleStartBlank}
                onOpenAI={() => setLeftPanel('ai')}
              />
            </div>
          ) : mode === 'code' ? (
            <JSONEditor
              value={tree}
              onChange={setTree}
              className="h-full"
            />
          ) : (
            <div className={cn('flex-1 overflow-auto bg-muted/30 relative', dragOver && 'ring-2 ring-primary ring-inset')}>
              {dragOver && (
                <div className="absolute top-3 left-1/2 -translate-x-1/2 z-10 pointer-events-none">
                  <div className="bg-primary text-primary-foreground px-3 py-1.5 rounded-md text-xs font-medium shadow-lg">
                    Drop to add component
                  </div>
                </div>
              )}
              <div
                className="mx-auto transition-all duration-300"
                style={{ maxWidth: VIEWPORT_WIDTHS[viewport] }}
              >
                <PreviewWrapper className="min-h-full p-6">
                  <UIRenderer
                    tree={tree}
                    onAction={(action, params) => {
                      console.log('Action:', action, params);
                    }}
                  />
                </PreviewWrapper>
              </div>
            </div>
          )}
        </main>

        {/* ===== RIGHT PANEL ===== */}
        {rightPanel === 'props' && tree && (
          <aside className="w-[320px] shrink-0 border-l bg-card overflow-hidden">
            <PropsEditor
              element={selectedElement}
              blockDefinition={selectedBlockDef}
              onUpdateProps={handleUpdateProps}
              className="h-full"
            />
          </aside>
        )}
      </div>

      {/* ===== STATUS BAR ===== */}
      <footer className="flex items-center justify-between h-7 px-3 border-t bg-card text-xs text-muted-foreground shrink-0">
        <div className="flex items-center gap-3">
          <FrameworkBadge className="py-0 px-1.5 text-[10px] h-5" />
          <span>{elementCount} elements</span>
          {selectedKey && (
            <span className="text-primary font-mono text-[11px]">{selectedKey}</span>
          )}
        </div>
        <span>Universal UI Builder &mdash; AI + Visual Editing</span>
      </footer>

      {/* ===== TEMPLATE GALLERY MODAL ===== */}
      {showTemplateGallery && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-8">
          <div className="bg-card rounded-2xl shadow-2xl max-w-4xl w-full max-h-[80vh] overflow-auto p-6 relative">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold">Choose a Template</h2>
              <button
                onClick={() => setShowTemplateGallery(false)}
                className="p-1.5 rounded-md hover:bg-muted text-muted-foreground"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <TemplateGallery
              templates={PAGE_TEMPLATES}
              onSelect={handleSelectTemplate}
              onCustomize={handleCustomizeTemplate}
            />
          </div>
        </div>
      )}

      {/* ===== EXPORT MODAL ===== */}
      {showExport && tree && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-8">
          <div className="bg-card rounded-2xl shadow-2xl max-w-4xl w-full max-h-[80vh] overflow-hidden flex flex-col">
            <div className="flex items-center justify-between px-6 py-4 border-b">
              <h2 className="text-lg font-bold">Export Code</h2>
              <button
                onClick={() => setShowExport(false)}
                className="p-1.5 rounded-md hover:bg-muted text-muted-foreground"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="flex-1 overflow-auto">
              <ExportPanel tree={tree} designCssVariables={cssVariables} className="h-full" />
            </div>
          </div>
        </div>
      )}

      {/* ===== CONTEXT MENU ===== */}
      <NodeContextMenu
        element={contextMenu.element}
        position={contextMenu.position}
        onClose={() => setContextMenu({ element: null, position: null })}
        onAction={handleContextMenuAction}
      />
    </div>
  );
}
