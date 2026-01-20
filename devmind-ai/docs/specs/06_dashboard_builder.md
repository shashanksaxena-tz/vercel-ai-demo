# Phase 6 Specification: Dashboard Builder

> **Objective**: Create the interactive "Playground" canvas where users generate, view, and interact with the AI-created UIs.
> **Estimated Time**: 4 hours
> **Sessions**: 6.1 (Canvas), 6.2 (Interactivity)

---

## Session 6.1: The Canvas & Layout

### 6.1.1 Main Page Structure
**File**: `src/app/playground/page.tsx`

**Layout Concept**:
- **Left Sidebar (25%)**: Chat Panel (AI Elements).
- **Main Area (50%)**: The Renderer Canvas (Where UI appears).
- **Right Sidebar (25%)**: Configuration (Registry Switcher, JSON Viewer, Device Toggle).

### 6.1.2 Registry Switcher
Create `src/components/registry-switcher.tsx`.
- A simple dropdown or tab list to switch between `shadcn`, `mui`, `chakra`, etc.
- **State**: Needs to lift state up to `page.tsx` or use a Context (`RegistryContext`) so the Renderer knows which registry to use.

### 6.1.3 The Renderer Canvas
**File**: `src/components/renderer-canvas.tsx`

```typescript
import { Renderer } from '@json-render/react';
import { registries } from '@/registries';

export function RendererCanvas({ tree, currentRegistryName }) {
  const currentRegistry = registries[currentRegistryName].registry;

  return (
    <div className="p-8 border rounded-lg bg-gray-50 min-h-[500px]">
      <Renderer tree={tree} components={currentRegistry} />
    </div>
  );
}
```

---

## Session 6.2: Interactivity & Actions

### 6.2.1 Action Handling
`json-render` emits actions (e.g., when a button with `action: 'export'` is clicked). We need to catch these.

**File**: `src/components/action-handler.tsx`

```typescript
import { ActionProvider } from '@json-render/react';
import { toast } from 'sonner';

export function AppActionProvider({ children }) {
  const handleAction = async (actionName, params) => {
    console.log('Action triggered:', actionName, params);
    
    if (actionName === 'export_report') {
        toast.info('Exporting PDF report...');
        // simulate async work
        await new Promise(r => setTimeout(r, 1000));
        toast.success('Export complete!');
    }
    
    if (actionName === 'toggle_theme') {
        // toggle context theme
    }
  };

  return (
    <ActionProvider onAction={handleAction}>
      {children}
    </ActionProvider>
  );
}
```

### 6.2.2 Data Provision
The dashboards need data!
Create `src/components/demo-data-provider.tsx`.
Wrap the Renderer in a `DataProvider` (from `@json-render/react`) and pass the `src/lib/sample-data.ts` object.

---

## Definition of Done (Phase 6)
- [ ] Playground page layout is responsive (3-column).
- [ ] Switching values in "Registry Switcher" instantly re-renders the UI with the new library styles.
- [ ] Clicking "Export" (or any mocked action) shows a toast notification.
- [ ] JSON Viewer shows the live tree (useful for debugging).
