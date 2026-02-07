# Interactive Visual UI Builder - Implementation Plan

> **Vision:** A Figma-like visual design tool where designers/developers build UIs with React components, get clean exportable code, and only need to integrate APIs. MCPs power design intelligence.

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development to implement this plan task-by-task.

**Goal:** Transform the current read-only preview into an interactive visual canvas where components can be selected, moved, edited inline, and configured visually - making it a production-grade design tool.

**Current State:** ~30% complete. Data layer (store, tree, export, AI) is solid. Canvas is read-only. Components drop invisible. No direct manipulation.

---

## Architecture Overview

```
                    Component Palette (drag source)
                            |
                            v
  Tree Outline <---> Interactive Canvas <---> Props Editor
       |                    |                      |
       +-----> BuilderStore (Zustand + Immer + Zundo) <----+
                            |
                     Code Generator
                            |
                    React/Next.js Export
```

**Key Architectural Decision:** Wrap each rendered element in an `EditableWrapper` overlay that provides click-to-select, hover highlights, drag handles, and resize affordances WITHOUT modifying the actual component renderers.

---

## Phase A: Make It Usable (Critical - Components Must Be Visible & Selectable)

### Task 1: Smart Default Props System

**Problem:** Dropping a Button creates `{ type: "Button", props: {} }` = invisible.

**Files:**
- Modify: `src/lib/registry/block-registry.ts`
- Modify: `src/lib/registry/core-blocks.ts`
- Modify: `src/lib/registry/extended-blocks.ts`
- Modify: `src/components/builder/builder-workspace.tsx` (handleAddComponent)

**Implementation:**

1. Add `defaultProps` field to `BlockDefinition`:
```typescript
export interface BlockDefinition {
  // ... existing fields
  defaultProps: Record<string, unknown>; // NEW
}
```

2. Update the `coreBlock()` helper to accept default props:
```typescript
function coreBlock(
  name: string,
  kind: BlockKind,
  category: ComponentCategory,
  description: string,
  props: PropDefinition[],
  tags: string[] = [],
  defaultProps: Record<string, unknown> = {} // NEW
): BlockDefinition
```

3. Add sensible defaults for ALL 78 core blocks. Examples:
```typescript
// Button
defaultProps: { label: 'Button', variant: 'solid', color: 'primary', size: 'md' }

// Heading
defaultProps: { level: '2', text: 'Heading Text', align: 'left' }

// Text
defaultProps: { content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', variant: 'body', size: 'md' }

// Input
defaultProps: { label: 'Label', placeholder: 'Enter text...', type: 'text' }

// Card
defaultProps: { variant: 'outlined', padding: 'md', rounded: 'md' }

// Image
defaultProps: { src: 'https://placehold.co/400x300', alt: 'Placeholder image', width: '100%' }

// Grid
defaultProps: { cols: 2, gap: 'md' }

// Row
defaultProps: { gap: 'md', align: 'center' }

// Column
defaultProps: { gap: 'md' }

// Container
defaultProps: { className: 'p-6', maxWidth: 'lg', centered: true }
```

4. Update `handleAddComponent` in builder-workspace.tsx to inject defaults:
```typescript
const handleAddComponent = useCallback((blockType: string) => {
  if (!tree) return;
  const parentKey = selectedKey || tree.root;
  const bare = blockType.includes('::') ? blockType.split('::')[1] : blockType;
  const key = `${bare.toLowerCase()}_${Date.now()}`;
  const blockDef = lookupBlock(blockType);
  const defaultProps = blockDef?.defaultProps ?? {};
  addElement(
    { key, type: bare, props: { ...defaultProps } },
    parentKey,
  );
  selectElement(key);
}, [tree, selectedKey, addElement, selectElement]);
```

5. Do the same for extended blocks (Magic UI, Aceternity).

**Test:** Drop a Button from palette. It should appear with "Button" text, primary color, medium size.

---

### Task 2: Canvas Element Wrapper (Click-to-Select + Hover Highlights)

**Problem:** The canvas is read-only. Cannot click elements to select them.

**Files:**
- Create: `src/components/builder/canvas-element-wrapper.tsx`
- Modify: `src/components/builder/ui-renderer.tsx`
- Modify: `src/components/builder/builder-workspace.tsx`

**Implementation:**

1. Create `CanvasElementWrapper` - a transparent overlay around each rendered element:
```typescript
interface CanvasElementWrapperProps {
  elementKey: string;
  elementType: string;
  isSelected: boolean;
  isHovered: boolean;
  children: React.ReactNode;
  onSelect: (key: string) => void;
  onHover: (key: string | null) => void;
  mode: 'preview' | 'edit' | 'code';
}
```

The wrapper renders:
- A `div` with `position: relative` wrapping the child
- In edit mode: click handler calls `onSelect(elementKey)`
- In edit mode: mouseenter/mouseleave calls `onHover`
- Selected state: 2px solid blue outline + element type label badge at top-left
- Hovered state: 1px dashed blue outline
- `data-element-key` attribute for DOM targeting
- Small type label badge (e.g., "Button", "Card") at top-left corner on hover/select

2. Modify `UIRenderer` to wrap elements. Check if `@json-render/react` Renderer supports a `wrapElement` or `elementWrapper` prop. If not, create a higher-order registry that wraps each component:
```typescript
function createEditableRegistry(
  baseRegistry: ComponentRegistry,
  wrapperProps: { onSelect, onHover, selectedKey, hoveredKey, mode }
): ComponentRegistry {
  const editableRegistry: ComponentRegistry = {};
  for (const [type, Component] of Object.entries(baseRegistry)) {
    editableRegistry[type] = (props) => (
      <CanvasElementWrapper
        elementKey={props.element.key}
        elementType={type}
        isSelected={props.element.key === wrapperProps.selectedKey}
        isHovered={props.element.key === wrapperProps.hoveredKey}
        onSelect={wrapperProps.onSelect}
        onHover={wrapperProps.onHover}
        mode={wrapperProps.mode}
      >
        <Component {...props} />
      </CanvasElementWrapper>
    );
  }
  return editableRegistry;
}
```

3. Pass select/hover callbacks from BuilderWorkspace through UIRenderer.

**Test:** Click any rendered element on canvas. It should show blue outline. Tree should highlight same element. Props editor should show its properties.

---

### Task 3: Canvas Drag-to-Reorder Elements

**Problem:** Can only reorder via tree outline. Need to drag elements within the canvas.

**Files:**
- Modify: `src/components/builder/canvas-element-wrapper.tsx`
- Modify: `src/components/builder/builder-workspace.tsx`

**Implementation:**

1. Add a drag handle (grip icon) to the CanvasElementWrapper that appears on hover/select:
```typescript
// In the wrapper, add a drag handle at top-right
<div
  draggable
  onDragStart={(e) => {
    e.dataTransfer.setData('application/x-element-key', elementKey);
    e.dataTransfer.effectAllowed = 'move';
  }}
  className="absolute -top-3 -right-3 w-6 h-6 bg-primary rounded cursor-grab"
>
  <GripVertical className="w-3 h-3 text-white" />
</div>
```

2. Add drop zones between elements. Each wrapper has a "drop before" and "drop after" zone:
```typescript
// Drop zone indicator between elements
<div
  onDragOver={(e) => { e.preventDefault(); setDropPosition('before'); }}
  onDrop={(e) => handleReorder(e, 'before')}
  className="absolute -top-1 left-0 right-0 h-2 transition-all"
  // When active: show a blue line indicator
/>
```

3. On drop, call `moveElement(draggedKey, parentKey, newIndex)` from the store.

**Test:** Drag a component's grip handle to a new position. It should reorder in the tree and re-render.

---

### Task 4: Inline Text Editing

**Problem:** Must use props panel to edit any text. Should double-click to edit directly.

**Files:**
- Modify: `src/components/builder/canvas-element-wrapper.tsx`

**Implementation:**

1. Detect if the element type is text-editable (Heading, Text, Button, Link, Badge, etc.)
2. On double-click, switch to inline edit mode:
   - Overlay a contentEditable span or input
   - Pre-fill with current text content
   - On blur/Enter, update the prop via `updateElement`
3. Map element types to their text prop:
```typescript
const TEXT_PROP_MAP: Record<string, string> = {
  Heading: 'text',
  Text: 'content',
  Button: 'label',
  Link: 'text',
  Badge: 'text',
  CardHeader: 'title',
};
```

**Test:** Double-click a Heading element. Type new text. It should update live.

---

## Phase B: Design Tool Features (Make It Powerful)

### Task 5: Component Drop Zones with Visual Feedback

**Problem:** Dropping components has no visual indication of WHERE they'll be inserted.

**Files:**
- Modify: `src/components/builder/canvas-element-wrapper.tsx`
- Modify: `src/components/builder/builder-workspace.tsx`

**Implementation:**

1. When dragging from palette, show drop zones on container elements (Container, Row, Column, Grid, Card, Stack)
2. Drop zones appear as colored dashed outlines with "Drop here" labels
3. Between existing children, show thin horizontal/vertical insertion lines
4. Support dropping INTO a container (append) or BETWEEN siblings (insert at index)

**Test:** Drag Button from palette. Container elements should light up as valid drop targets. Dropping between two existing elements inserts at that position.

---

### Task 6: Selection Toolbar (Quick Actions)

**Problem:** Context menu requires right-click. Need quick access to common actions.

**Files:**
- Create: `src/components/builder/selection-toolbar.tsx`
- Modify: `src/components/builder/builder-workspace.tsx`

**Implementation:**

Floating toolbar appears above selected element with:
- Duplicate (copy icon)
- Delete (trash icon)
- Move Up / Move Down (arrows)
- Wrap in Container (box icon)
- Type label (e.g., "Button")
- Parent breadcrumb (clickable to select parent)

Position: anchored above the selected element using getBoundingClientRect().

**Test:** Select an element. Toolbar appears above it with action buttons.

---

### Task 7: Resize Handles for Layout Components

**Problem:** Can't visually resize columns, containers, grids.

**Files:**
- Modify: `src/components/builder/canvas-element-wrapper.tsx`

**Implementation:**

1. For layout components (Container, Column, Row, Grid), show resize handles on edges
2. Dragging right edge adjusts width (via className or style prop)
3. Map drag delta to Tailwind width classes (w-1/2, w-1/3, w-full, etc.)
4. Show dimension tooltip while resizing

**Test:** Select a Container. Drag right edge. Width changes and prop updates.

---

### Task 8: Multi-Select and Group Operations

**Files:**
- Modify: `src/lib/store/builder-store.ts`
- Modify: `src/components/builder/canvas-element-wrapper.tsx`
- Modify: `src/components/builder/builder-workspace.tsx`

**Implementation:**

1. Add `selectedKeys: Set<string>` to store (currently single `selectedKey`)
2. Shift+click to add to selection
3. Cmd+A to select all children of current container
4. Group actions: delete all, wrap in container, align, distribute spacing

---

## Phase C: Professional Design Features

### Task 9: Layout Guides and Snapping

- Grid overlay toggle (8px, 16px grid)
- Alignment guides (red lines when elements align)
- Spacing indicators between elements
- Center guides (horizontal/vertical center of canvas)

### Task 10: Design Tokens Panel

- Extract all colors, fonts, spacing from current design
- Edit tokens and see live updates
- Export as CSS variables or Tailwind config

### Task 11: Component Variants

- Save component configurations as variants
- Variant picker in the props editor
- e.g., Button has "Primary", "Secondary", "Ghost" variants pre-configured

### Task 12: Responsive Editing

- Edit different viewport breakpoints
- See/set responsive props (show on mobile, hide on desktop)
- Per-breakpoint layout configuration

### Task 13: Asset Manager

- Upload and manage images
- Icon picker with search (from lucide-react or custom)
- Color palette manager
- Image crop/resize

### Task 14: Collaboration & History

- Named save points (beyond undo/redo)
- Version comparison (diff two states)
- Export/import project as JSON

---

## Phase D: Code & API Integration

### Task 15: Live Code Split View

- Side-by-side code and visual
- Edit code, see visual update
- Edit visual, see code update
- Syntax-highlighted React/TypeScript

### Task 16: API Binding Panel

- Visual interface to bind props to API endpoints
- Define data sources (REST, GraphQL)
- Map API response fields to component props
- Mock data for preview

### Task 17: Component Code Customization

- Eject a component to custom code
- Edit the React source directly
- Re-import as a custom component

---

## Priority & Effort Matrix

| Task | Priority | Effort | Impact |
|------|----------|--------|--------|
| 1. Smart Default Props | P0 | Small (2h) | Critical - components visible |
| 2. Canvas Click-to-Select | P0 | Medium (4h) | Critical - basic interaction |
| 3. Canvas Drag-to-Reorder | P1 | Medium (4h) | High - spatial editing |
| 4. Inline Text Editing | P1 | Medium (3h) | High - direct manipulation |
| 5. Component Drop Zones | P1 | Medium (3h) | High - intuitive adding |
| 6. Selection Toolbar | P1 | Small (2h) | High - quick actions |
| 7. Resize Handles | P2 | Large (6h) | Medium - layout control |
| 8. Multi-Select | P2 | Medium (4h) | Medium - bulk operations |
| 9. Layout Guides | P2 | Large (6h) | Medium - precision |
| 10. Design Tokens | P3 | Medium (4h) | Low - advanced users |
| 11. Component Variants | P3 | Medium (4h) | Medium - reusability |
| 12. Responsive Editing | P3 | Large (8h) | High - but complex |
| 13. Asset Manager | P3 | Large (6h) | Medium |
| 14. History/Versions | P3 | Medium (4h) | Medium |
| 15. Live Code Split | P2 | Large (6h) | High - dev workflow |
| 16. API Binding | P3 | XL (10h) | High - ultimate goal |
| 17. Code Customization | P3 | Large (6h) | Medium |

---

## Recommended Execution Order

**Sprint 1 (Make It Usable):** Tasks 1, 2, 4, 6 - Components visible + select + edit + toolbar
**Sprint 2 (Make It Good):** Tasks 3, 5, 7 - Drag reorder + drop zones + resize
**Sprint 3 (Make It Professional):** Tasks 8, 9, 15 - Multi-select + guides + code view
**Sprint 4 (Make It Complete):** Tasks 10, 11, 12, 13 - Design system features
**Sprint 5 (API Integration):** Tasks 14, 16, 17 - Collaboration + API binding

---

## Key Files Reference

| File | Purpose | Lines |
|------|---------|-------|
| `src/lib/store/builder-store.ts` | Zustand state (tree, selection, operations) | ~384 |
| `src/components/builder/builder-workspace.tsx` | Main orchestrator (3-panel layout) | ~510 |
| `src/components/builder/ui-renderer.tsx` | Tree → React rendering via @json-render | ~79 |
| `src/components/builder/preview-wrapper.tsx` | Theme scoping for canvas | ~70 |
| `src/components/builder/component-palette.tsx` | Component list with drag | ~428 |
| `src/components/builder/props-editor.tsx` | Property editing panel | ~798 |
| `src/components/builder/tree-outline.tsx` | Hierarchical tree view | ~601 |
| `src/lib/registry/core-blocks.ts` | 78 core component definitions | ~564 |
| `src/lib/registry/extended-blocks.ts` | Magic UI + Aceternity blocks | ~varies |
| `src/lib/registry/block-registry.ts` | BlockDefinition type + registry | ~76 |
| `src/lib/export/code-generator.ts` | React code export | ~1177 |

---

## Verification

After each task:
1. `npx tsc --noEmit` - TypeScript compiles
2. `npm run dev` - Dev server starts
3. Manual browser test:
   - Drop component from palette → appears with defaults (Task 1)
   - Click component on canvas → blue outline + props panel updates (Task 2)
   - Drag component to new position → tree and canvas update (Task 3)
   - Double-click text → edit inline (Task 4)
   - Switch framework → visual theme changes (already done)
   - Export → clean React code generated
