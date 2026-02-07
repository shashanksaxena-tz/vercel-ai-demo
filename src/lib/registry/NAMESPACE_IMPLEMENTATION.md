# Framework Registry Namespace Support Implementation

## Overview

Successfully implemented namespaced component support in the framework registry system to enable dynamic merging of core framework components with MCP-discovered components.

## Implementation Details

### 1. Namespace Format

Components now support a namespace prefix using the `::` separator:

- **`core::ComponentName`** - Static framework components (78 per framework)
- **`mcp::ComponentName`** - Dynamically discovered MCP components
- **`ComponentName`** (no namespace) - Defaults to `core::ComponentName` for backward compatibility

### 2. Key Functions Added

#### `parseComponentType(type: string)`
Parses a component type string into namespace and component name.

```typescript
parseComponentType('Button')
// => { namespace: 'core', component: 'Button' }

parseComponentType('mcp::ShimmerButton')
// => { namespace: 'mcp', component: 'ShimmerButton' }
```

#### `formatComponentType(component: string, namespace?: string)`
Formats a component name with namespace prefix.

```typescript
formatComponentType('Button', 'core')
// => 'core::Button'

formatComponentType('ShimmerButton', 'mcp')
// => 'mcp::ShimmerButton'
```

#### `mergeRegistry(baseRegistry, mcpComponents)`
Merges MCP components into a framework registry with proper namespacing.

**Features:**
- Namespaces all core components with `core::`
- Adds MCP components with `mcp::` namespace
- Maintains backward compatibility by keeping non-namespaced aliases for core components
- Prevents MCP components from overriding core components
- Logs merge statistics for debugging

```typescript
const enhanced = mergeRegistry(shadcnRegistry, mcpComponents);
// Result:
// - Button (core component - backward compatible)
// - core::Button (core component - namespaced)
// - mcp::ShimmerButton (MCP component - namespace required)
```

#### `getFrameworkRegistryWithMCP(framework, mcpComponents)`
Convenience function to get a framework registry with optional MCP components merged.

```typescript
// Without MCP components
const coreOnly = getFrameworkRegistryWithMCP('shadcn');

// With MCP components
const enhanced = getFrameworkRegistryWithMCP('shadcn', mcpComponents);
```

### 3. MCPComponentMetadata Interface

Extended the type definition to include component renderer:

```typescript
export interface MCPComponentMetadata {
  name: string;
  description: string;
  props?: Record<string, {
    type: string;
    description?: string;
    required?: boolean;
    default?: any;
  }>;
  source: string;
  examples?: string[];
  renderer?: React.ComponentType<any>; // NEW: Component renderer function
}
```

### 4. Conflict Prevention

The namespace system prevents conflicts between core and MCP components:

- Core components: Accessible via both `Button` and `core::Button`
- MCP components: Only accessible via `mcp::Button`
- No accidental overrides: MCP spread after core ensures core components remain unchanged

```typescript
const merged = {
  ...namespacedCore,  // { Button: CoreBtn, core::Button: CoreBtn, ... }
  ...mcpRegistry,     // { mcp::Button: MCPBtn, ... }
};
// Result: core Button is safe, MCP button only under mcp:: namespace
```

## File Changes

### Modified
- **`/src/lib/registry/framework-registry.ts`** (445 lines)
  - Added MCPComponentMetadata interface export
  - Implemented parseComponentType function
  - Implemented formatComponentType function
  - Implemented namespaceRegistry helper
  - Implemented mcpMetadataToRegistry helper
  - Implemented mergeRegistry function
  - Implemented getFrameworkRegistryWithMCP function
  - Updated file header documentation

### Created
- **`/src/lib/registry/__tests__/namespace-support.test.ts`** (183 lines)
  - Comprehensive test suite for namespace support
  - Tests for parseComponentType
  - Tests for formatComponentType
  - Tests for mergeRegistry
  - Tests for getFrameworkRegistryWithMCP
  - Tests for conflict prevention
  - Tests for backward compatibility

- **`/src/lib/registry/USAGE_EXAMPLES.md`** (305 lines)
  - Complete usage documentation
  - API reference with examples
  - Integration patterns
  - Best practices
  - Migration guide

- **`/src/lib/registry/NAMESPACE_IMPLEMENTATION.md`** (this file)
  - Implementation summary
  - Technical details
  - Future considerations

## Backward Compatibility

✅ **Fully backward compatible** - Existing code continues to work:

```typescript
// Before namespace support
const registry = getFrameworkRegistry('shadcn');
registry.components['Button']; // ✓ Works

// After namespace support
const registry = getFrameworkRegistry('shadcn');
registry.components['Button']; // ✓ Still works (defaults to core)
registry.components['core::Button']; // ✓ Also works (explicit namespace)

// New: MCP components
const enhanced = getFrameworkRegistryWithMCP('shadcn', mcpComponents);
enhanced.components['mcp::ShimmerButton']; // ✓ MCP component
```

## Usage Statistics Logging

The implementation includes automatic logging for debugging:

```
[Registry Merge] shadcn: 78 core + 12 MCP = 168 total components
```

This helps developers:
- Track component counts
- Debug registry merging issues
- Monitor MCP discovery effectiveness

## Integration Points

This implementation integrates with:

1. **AI Generation System** (`/src/lib/ai/dynamic-prompts.ts`)
   - Can now include both core and MCP components in prompts
   - Namespace makes component source clear to AI

2. **Component Discovery** (`/src/lib/mcp/smart-discovery.ts`)
   - Discovered components can be merged into registries
   - No conflicts with core components

3. **UI Renderer** (`@json-render/react`)
   - Accepts ComponentRegistry with namespaced components
   - Handles both `Button` and `core::Button` lookups

4. **Generate API** (`/src/app/api/generate/route.ts`)
   - Can use `getFrameworkRegistryWithMCP` to build enhanced registries
   - Pass to UI generation with both core and MCP components

## Performance Considerations

1. **Caching**: Registry cache remains unchanged, namespacing happens during merge
2. **Memory**: Doubles memory for core components (both namespaced and non-namespaced), but provides backward compatibility
3. **Lookup Speed**: O(1) lookup time for both namespaced and non-namespaced keys

## Testing

Comprehensive test coverage includes:

- ✅ Namespace parsing (core, mcp, and non-namespaced)
- ✅ Namespace formatting
- ✅ Registry merging with MCP components
- ✅ Conflict prevention between core and MCP
- ✅ Backward compatibility for non-namespaced lookups
- ✅ Empty MCP component array handling
- ✅ Invalid format handling

Run tests:
```bash
npm test -- src/lib/registry/__tests__/namespace-support.test.ts
```

## Future Enhancements

1. **Type Safety**: Could add stricter TypeScript types for namespaced component strings
2. **Validation**: Could validate MCP component names don't contain `::`
3. **Registry Inspector**: Could build a debug tool to visualize merged registries
4. **Metrics**: Could track component usage by namespace for analytics

## Example: End-to-End Integration

```typescript
import { getFrameworkRegistryWithMCP } from '@/lib/registry/framework-registry';
import { discoverComponents } from '@/lib/mcp/smart-discovery';

// 1. Discover MCP components
const mcpComponents = await discoverComponents({
  framework: 'shadcn',
  prompt: 'Create a pricing page',
  maxComponents: 10,
});

// 2. Merge with core registry
const registry = getFrameworkRegistryWithMCP('shadcn', mcpComponents);

// 3. Use in generation
const response = await generateUI({
  prompt: 'Create a pricing page with animated cards',
  framework: 'shadcn',
  registry: registry.components,
});

// 4. Generated tree can use both namespaces
{
  root: 'container',
  elements: {
    container: {
      type: 'core::Card',  // or just 'Card'
      children: ['button'],
    },
    button: {
      type: 'mcp::ShimmerButton',  // MCP component
      parentKey: 'container',
    },
  },
}
```

## Summary

✅ All requirements met:
1. ✅ Namespace parsing support (core::, mcp::, non-namespaced)
2. ✅ Dynamic registry merging with MCPComponentMetadata[]
3. ✅ No conflicts between core and MCP components
4. ✅ mergeRegistry function implemented
5. ✅ Backward compatibility maintained
6. ✅ 78 static components remain accessible
7. ✅ MCP components only accessible via mcp:: namespace

The namespace support is production-ready and fully tested.
