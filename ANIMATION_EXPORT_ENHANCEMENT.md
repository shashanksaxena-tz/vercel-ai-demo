# Animation Export Enhancement - Task #8 Complete

**Date:** February 3, 2026
**Task:** Enhance Export Code with Animation Dependencies
**Status:** ✅ **COMPLETE**

---

## Overview

Enhanced the code export functionality to automatically detect and include animation dependencies (Framer Motion) when exporting UI components that use animations from Magic UI or Aceternity UI frameworks.

## Problem Statement

Components with animations (e.g., `ShimmerButton`, `MovingBorderButton`) have metadata with animation dependencies:

```typescript
{
  dependencies: {
    npm: ['framer-motion@^11.0.0'],
    imports: ['motion', 'AnimatePresence']
  }
}
```

Previously, when users exported generated UI code, these animation dependencies were **not automatically included**, resulting in incomplete/broken code.

## Solution

Implemented a comprehensive animation dependency tracking and injection system in the code generation pipeline.

---

## Files Modified

### 1. `/src/lib/export/code-generator.ts`

**New Functions Added:**

- `collectDependencies(tree, framework)` - Traverses UITree to collect all component and animation dependencies
- `getAnimationDependencies(componentType)` - Returns animation deps for a specific component type
- `hasAnimationDependencies(componentType)` - Checks if a component requires animations
- `generatePackageJsonDependencies(tree, framework)` - Generates package.json dependencies section
- `getAnimationDependenciesFromTree(tree, framework)` - Extracts animation deps from tree
- `hasAnimatedComponents(tree, framework)` - Checks if tree contains any animated components

**Modified Functions:**

- `generateImports()` - Now accepts `animationDeps` parameter and adds Framer Motion imports
- `generateReactCode()` - Auto-detects animations and includes `'use client'` directive
- `generateNextJSCode()` - Includes animation imports automatically
- `getInstallationInstructions()` - Adds Framer Motion installation when `includeAnimations=true`

**New Constants:**

```typescript
const ANIMATION_COMPONENT_DEPENDENCIES: Record<string, { npm: string[]; imports: string[] }> = {
  // Magic UI components
  'ShimmerButton': { npm: ['framer-motion@^11.0.0'], imports: ['motion', 'AnimatePresence'] },
  'MagicCard': { npm: ['framer-motion@^11.0.0'], imports: ['motion'] },
  'AnimatedProgress': { npm: ['framer-motion@^11.0.0'], imports: ['motion'] },
  'AnimatedHeading': { npm: ['framer-motion@^11.0.0'], imports: ['motion'] },
  'AnimatedText': { npm: ['framer-motion@^11.0.0'], imports: ['motion'] },
  'WarpBackground': { npm: ['framer-motion@^11.0.0'], imports: ['motion'] },

  // Aceternity UI components
  'MovingBorderButton': { npm: ['framer-motion@^11.0.0', 'clsx', 'tailwind-merge'], imports: ['motion', 'AnimatePresence'] },
  'HoverCard': { npm: ['framer-motion@^11.0.0', 'clsx', 'tailwind-merge'], imports: ['motion'] },
  'FloatingInput': { npm: ['framer-motion@^11.0.0', 'clsx', 'tailwind-merge'], imports: ['motion'] },
  'TextReveal': { npm: ['framer-motion@^11.0.0', 'clsx', 'tailwind-merge'], imports: ['motion'] },
  'TypewriterEffect': { npm: ['framer-motion@^11.0.0', 'clsx', 'tailwind-merge'], imports: ['motion'] },
  'BlurFade': { npm: ['framer-motion@^11.0.0', 'clsx', 'tailwind-merge'], imports: ['motion'] },
  'ParallaxScroll': { npm: ['framer-motion@^11.0.0', 'clsx', 'tailwind-merge'], imports: ['motion', 'useScroll', 'useTransform'] },
};
```

### 2. `/src/lib/export/index.ts`

**New Exports:**

```typescript
export {
  generatePackageJsonDependencies,
  getAnimationDependenciesFromTree,
  hasAnimatedComponents,
} from './code-generator';
```

### 3. `/src/components/builder/export-panel.tsx`

**Modified:**

- Installation instructions now detect animated components and include Framer Motion setup
- Calls `hasAnimatedComponents()` to determine if animation instructions should be shown

---

## Implementation Details

### Dependency Detection Algorithm

1. **Tree Traversal**: Recursively traverse the UITree starting from root
2. **Component Mapping**: Map element types to framework-specific component names
3. **Animation Check**: Check each component against `ANIMATION_COMPONENT_DEPENDENCIES`
4. **MCP Namespace Support**: Handle both direct types (`ShimmerButton`) and MCP-namespaced types (`mcp::ShimmerButton`)
5. **Deduplication**: Use Sets to avoid duplicate dependencies

### Code Generation Flow

```typescript
// Before (missing dependencies)
export function Component() {
  return <ShimmerButton>Click Me</ShimmerButton>;
}

// After (complete with dependencies)
'use client';

import { ShimmerButton } from '@/components/magicui';
import { motion, AnimatePresence } from 'framer-motion';

export function Component() {
  return <ShimmerButton>Click Me</ShimmerButton>;
}
```

### Package.json Generation

```typescript
const packageDeps = generatePackageJsonDependencies(tree, 'magic-ui');
// Returns:
{
  "framer-motion": "^11.0.0"
}

// For Aceternity UI:
{
  "framer-motion": "^11.0.0",
  "clsx": "latest",
  "tailwind-merge": "latest"
}
```

---

## Supported Components

### Magic UI Components (6)

- `ShimmerButton` - Animated button with shimmer effect
- `MagicCard` - Card with hover animations
- `AnimatedProgress` - Progress bar with animations
- `AnimatedHeading` - Heading with text animations
- `AnimatedText` - Text with reveal animations
- `WarpBackground` - Background with warp effect

**Dependencies:** `framer-motion@^11.0.0`

### Aceternity UI Components (7)

- `MovingBorderButton` - Button with moving border effect
- `HoverCard` - Card with hover animations
- `FloatingInput` - Input with floating label
- `TextReveal` - Text reveal animation
- `TypewriterEffect` - Typewriter text effect
- `BlurFade` - Blur fade transition
- `ParallaxScroll` - Parallax scrolling effect

**Dependencies:** `framer-motion@^11.0.0`, `clsx`, `tailwind-merge`

---

## Features

### ✅ Automatic Dependency Detection

- Scans UITree for animated components
- Extracts required NPM packages and imports
- Supports both core and MCP-namespaced components

### ✅ Smart Import Generation

- Automatically adds Framer Motion imports when needed
- Deduplicates imports (e.g., single `motion` import even if multiple components use it)
- Maintains proper import order

### ✅ Client Directive Injection

- Automatically adds `'use client'` directive for React components with animations
- Works for both standalone React components and Next.js pages
- Ensures components work in Next.js App Router

### ✅ Installation Instructions

- Dynamically includes Framer Motion setup in installation guide
- Only shows animation dependencies when actually needed
- Provides both npm and yarn commands

### ✅ Package.json Generation

- Generates complete package.json dependencies section
- Includes version numbers (e.g., `^11.0.0`)
- Falls back to `latest` for unversioned packages

---

## Testing Guide

### Manual Test 1: Magic UI ShimmerButton

```bash
# 1. Generate UI
POST /api/generate
{
  "prompt": "Create a shimmer button that says 'Get Started'",
  "framework": "magic-ui"
}

# 2. Export the code

# 3. Verify exported code includes:
✅ 'use client';
✅ import { motion, AnimatePresence } from 'framer-motion';
✅ Installation instructions mention: npm install framer-motion
```

### Manual Test 2: Aceternity UI Blur Component

```bash
# 1. Generate UI
POST /api/generate
{
  "prompt": "Create a card with blur fade animation",
  "framework": "aceternity"
}

# 2. Export the code

# 3. Verify exported code includes:
✅ 'use client';
✅ import { motion } from 'framer-motion';
✅ package.json includes: framer-motion, clsx, tailwind-merge
```

### Manual Test 3: Static Component (No Animations)

```bash
# 1. Generate UI
POST /api/generate
{
  "prompt": "Create a simple button",
  "framework": "shadcn"
}

# 2. Export the code

# 3. Verify exported code DOES NOT include:
❌ framer-motion imports
❌ Animation-specific dependencies
✅ Installation instructions without animation section
```

### Test Suite

Created comprehensive test file: `/src/lib/export/__tests__/animation-export.test.ts`

**Test Coverage:**
- Magic UI component detection
- Aceternity UI component detection
- MCP namespaced component handling
- Static component filtering
- Package.json generation
- Import statement generation
- Next.js export with animations
- Mixed component trees

---

## Example Generated Code

### Input UITree

```typescript
{
  root: 'root',
  elements: {
    root: {
      type: 'Container',
      children: ['button1']
    },
    button1: {
      type: 'ShimmerButton',
      props: { label: 'Click Me' }
    }
  }
}
```

### Generated React Component

```typescript
'use client';

import { Container, ShimmerButton } from '@/components/magicui';
import { motion, AnimatePresence } from 'framer-motion';

interface GeneratedComponentProps {
  className?: string;
}

/**
 * GeneratedComponent
 * Generated by Generative UI Builder
 */
export function GeneratedComponent({ className }: GeneratedComponentProps) {
  return (
    <Container maxWidth="md" padding="lg">
      <ShimmerButton label="Click Me" />
    </Container>
  );
}

export default GeneratedComponent;
```

### Generated package.json

```json
{
  "dependencies": {
    "framer-motion": "^11.0.0"
  }
}
```

### Installation Instructions

```bash
# Install Magic UI components
npx magicui-cli@latest init
npx magicui-cli@latest add shimmer-button magic-card

# Requires Tailwind CSS and Framer Motion
npm install framer-motion

# Animation Dependencies (Framer Motion)
npm install framer-motion
# or
yarn add framer-motion
```

---

## Edge Cases Handled

### 1. MCP Namespaced Components

```typescript
// Component type: "mcp::ShimmerButton"
// ✅ Correctly extracts "ShimmerButton" and adds dependencies
```

### 2. Mixed Component Trees

```typescript
// Tree with both static and animated components
// ✅ Only includes animation dependencies, not duplicates
```

### 3. Multiple Animated Components

```typescript
// ShimmerButton + MagicCard in same tree
// ✅ Deduplicates framer-motion (only imported once)
```

### 4. Framework-Specific Dependencies

```typescript
// Aceternity: framer-motion + clsx + tailwind-merge
// Magic UI: framer-motion only
// ✅ Correctly includes all framework-specific deps
```

---

## Future Enhancements

### Potential Improvements

1. **Dynamic Discovery Integration**
   - Fetch animation metadata from MCP servers at runtime
   - Support custom/unknown animation components

2. **Version Pinning**
   - Allow users to specify Framer Motion version
   - Support multiple animation library versions

3. **Animation Complexity Metadata**
   - Include animation complexity in exports
   - Generate performance warnings for heavy animations

4. **CSS-based Animations**
   - Support for Tailwind animate-* utilities
   - CSS @keyframes generation

5. **Bundle Size Analysis**
   - Show estimated bundle size impact of animations
   - Tree-shaking recommendations

---

## Success Criteria

| Criterion | Status | Notes |
|-----------|--------|-------|
| Export includes framer-motion dependency | ✅ | Via `generatePackageJsonDependencies()` |
| Export includes proper import statements | ✅ | Via enhanced `generateImports()` |
| Generated code is valid and runnable | ✅ | Includes 'use client' directive |
| Supports Magic UI components | ✅ | 6 components defined |
| Supports Aceternity UI components | ✅ | 7 components defined |
| Handles MCP namespaced components | ✅ | Tested with `mcp::ShimmerButton` |
| No false positives for static components | ✅ | Verified with Button test |
| Installation instructions updated | ✅ | Dynamic based on component usage |

---

## Integration Points

### UI Generator Flow

```
User Prompt
    ↓
AI generates UITree (may include mcp::ShimmerButton)
    ↓
User clicks "Export Code"
    ↓
collectDependencies(tree) analyzes components
    ↓
generateImports() adds Framer Motion imports
    ↓
generateReactCode() includes 'use client'
    ↓
getInstallationInstructions() shows Framer setup
    ↓
User gets complete, runnable code ✅
```

---

## Conclusion

The animation export enhancement successfully addresses Task #8 by:

1. ✅ Automatically detecting animated components in the UITree
2. ✅ Extracting animation dependencies (npm packages + imports)
3. ✅ Including dependencies in generated code exports
4. ✅ Generating package.json with correct versions
5. ✅ Adding installation instructions with Framer Motion setup
6. ✅ Supporting both Magic UI and Aceternity UI frameworks
7. ✅ Handling MCP-namespaced components correctly
8. ✅ Providing complete, runnable code to users

Users can now export generated UIs with animations and immediately use them in their projects without manual dependency management.

---

**Task Status:** ✅ **COMPLETE**
**Next Task:** #9 - Create Animation Tests and Performance Scoring
