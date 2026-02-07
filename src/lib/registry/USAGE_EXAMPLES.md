# Framework Registry Namespace Support - Usage Examples

This document demonstrates how to use the namespace support in the framework registry.

## Overview

The framework registry now supports namespaced components:
- `core::*` - Static framework components (78 components per framework)
- `mcp::*` - Dynamically discovered MCP components
- Non-namespaced components default to `core::`

## API Reference

### parseComponentType(type: string)

Parses a component type string and returns namespace and component name.

```typescript
import { parseComponentType } from '@/lib/registry/framework-registry';

// Non-namespaced defaults to core
parseComponentType('Button');
// => { namespace: 'core', component: 'Button' }

// Explicit core namespace
parseComponentType('core::Button');
// => { namespace: 'core', component: 'Button' }

// MCP namespace
parseComponentType('mcp::ShimmerButton');
// => { namespace: 'mcp', component: 'ShimmerButton' }
```

### formatComponentType(component: string, namespace?: string)

Formats a component name with a namespace prefix.

```typescript
import { formatComponentType } from '@/lib/registry/framework-registry';

// Default to core namespace
formatComponentType('Button');
// => 'core::Button'

// Explicit namespace
formatComponentType('ShimmerButton', 'mcp');
// => 'mcp::ShimmerButton'
```

### mergeRegistry(baseRegistry: RegistryDefinition, mcpComponents: MCPComponentMetadata[])

Merges MCP components into a framework registry.

```typescript
import { mergeRegistry } from '@/lib/registry/framework-registry';
import { shadcnRegistry } from '@/components/registries/shadcn/registry';

// Example MCP components
const mcpComponents = [
  {
    name: 'ShimmerButton',
    description: 'A button with shimmer animation',
    source: 'shadcn-ui-mcp',
    renderer: ShimmerButtonComponent,
    props: {
      shimmerColor: {
        type: 'string',
        description: 'Color of the shimmer effect',
        default: '#ffffff',
      },
    },
  },
  {
    name: 'AnimatedCard',
    description: 'A card with entrance animation',
    source: 'magic-ui-mcp',
    renderer: AnimatedCardComponent,
  },
];

// Merge MCP components with base registry
const enhancedRegistry = mergeRegistry(shadcnRegistry, mcpComponents);

// Result includes:
// - All core components: Button, Card, Input, etc. (accessible as "Button" or "core::Button")
// - MCP components: mcp::ShimmerButton, mcp::AnimatedCard (accessible only with namespace)
console.log(Object.keys(enhancedRegistry.components));
// => ['Button', 'core::Button', 'Card', 'core::Card', ..., 'mcp::ShimmerButton', 'mcp::AnimatedCard']
```

### getFrameworkRegistryWithMCP(framework: UIFramework, mcpComponents?: MCPComponentMetadata[])

Gets a framework registry with optional MCP components merged.

```typescript
import { getFrameworkRegistryWithMCP } from '@/lib/registry/framework-registry';

// Get registry without MCP components (core only)
const coreRegistry = getFrameworkRegistryWithMCP('shadcn');

// Get registry with MCP components
const enhancedRegistry = getFrameworkRegistryWithMCP('shadcn', mcpComponents);
```

## Component Namespace Conflicts

The namespace system prevents conflicts between core and MCP components with the same name:

```typescript
// If both core and MCP provide a "Button" component:
const registry = mergeRegistry(shadcnRegistry, [
  {
    name: 'Button',
    description: 'MCP Button',
    source: 'custom-mcp',
    renderer: MCPButtonComponent,
  },
]);

// Core button remains accessible (no override)
registry.components['Button'] // => Core ShadCN Button
registry.components['core::Button'] // => Core ShadCN Button

// MCP button available under namespace
registry.components['mcp::Button'] // => MCP Button
```

## Integration with UITree

When generating UI trees, use namespaced component types:

```typescript
import type { UITree } from '@json-render/core';

// Using core components (namespace optional)
const coreTree: UITree = {
  root: 'root',
  elements: {
    root: {
      key: 'root',
      type: 'Button', // or 'core::Button'
      props: { variant: 'primary' },
    },
  },
};

// Using MCP components (namespace required)
const mcpTree: UITree = {
  root: 'root',
  elements: {
    root: {
      key: 'root',
      type: 'mcp::ShimmerButton', // namespace required
      props: { shimmerColor: '#00ff00' },
    },
  },
};

// Mixed usage
const mixedTree: UITree = {
  root: 'container',
  elements: {
    container: {
      key: 'container',
      type: 'core::Card',
      props: {},
      children: ['button1', 'button2'],
    },
    button1: {
      key: 'button1',
      type: 'Button', // core component (no namespace)
      props: { variant: 'primary' },
      parentKey: 'container',
    },
    button2: {
      key: 'button2',
      type: 'mcp::ShimmerButton', // MCP component (namespace required)
      props: { shimmerColor: '#00ff00' },
      parentKey: 'container',
    },
  },
};
```

## Best Practices

1. **Backward Compatibility**: Existing code using non-namespaced component names (e.g., `Button`) will continue to work, defaulting to core components.

2. **Explicit MCP Usage**: Always use the `mcp::` namespace when referencing MCP components to make it clear they are dynamically discovered.

3. **AI Prompt Integration**: When providing component references to AI, include both namespaces:
   ```
   Available components:
   - core::Button: Standard button component
   - core::Card: Card container
   - mcp::ShimmerButton: Button with shimmer animation
   - mcp::AnimatedCard: Card with entrance animation
   ```

4. **Type Safety**: Use `parseComponentType()` to safely extract namespace and component name before looking up in the registry.

5. **Logging**: The `mergeRegistry` function automatically logs merge statistics for debugging:
   ```
   [Registry Merge] shadcn: 78 core + 12 MCP = 168 total components
   ```

## Example: Dynamic MCP Discovery

```typescript
import { getFrameworkRegistryWithMCP } from '@/lib/registry/framework-registry';
import { discoverComponents } from '@/lib/mcp/smart-discovery';

async function buildEnhancedRegistry(framework: UIFramework) {
  // Discover MCP components
  const mcpComponents = await discoverComponents({
    framework,
    maxComponents: 10,
  });

  // Merge with core registry
  const registry = getFrameworkRegistryWithMCP(framework, mcpComponents);

  return registry;
}

// Usage in generate API
const registry = await buildEnhancedRegistry('shadcn');
// Pass registry.components to the UIRenderer
```

## Migration Guide

### Before (Non-namespaced)

```typescript
import { getFrameworkRegistry } from '@/lib/registry/framework-registry';

const registry = getFrameworkRegistry('shadcn');
// All components non-namespaced: { Button: ..., Card: ... }
```

### After (With Namespace Support)

```typescript
import { getFrameworkRegistryWithMCP } from '@/lib/registry/framework-registry';

// Option 1: Core only (backward compatible)
const coreRegistry = getFrameworkRegistryWithMCP('shadcn');
// Components: { Button: ..., 'core::Button': ..., Card: ..., 'core::Card': ... }

// Option 2: With MCP components
const enhancedRegistry = getFrameworkRegistryWithMCP('shadcn', mcpComponents);
// Components: { Button: ..., 'core::Button': ..., 'mcp::ShimmerButton': ... }
```

## Testing

See `src/lib/registry/__tests__/namespace-support.test.ts` for comprehensive test coverage.
