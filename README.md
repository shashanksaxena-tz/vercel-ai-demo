# Generative UI Builder

A powerful, AI-ready UI rendering system that combines **json-render** with dynamic component discovery via **MCP (Model Context Protocol)** servers. Generate UIs from natural language by discovering components across 9+ component libraries.

## Overview

This project demonstrates a complete "Generative UI" pattern where:

1. **User describes UI** - Natural language request (e.g., "Create a dashboard with metrics")
2. **AI analyzes request** - Identifies required component types and patterns
3. **MCP discovers components** - Searches across 9+ component libraries via MCP servers
4. **Dynamic registry builds** - Creates json-render compatible registry on-the-fly
5. **json-render renders** - Validates and renders the UI tree

```
User Request → Analyze → MCP Discovery → Build Registry → json-render → UI
     ↓                         ↓                              ↓
"Create a      "Needs: charts,  [shadcn, mui,    { Button,    Rendered
 dashboard"     tables, cards"   magic-ui, ...]   Card, ... }   React UI
```

## Features

### Dynamic MCP Component Discovery

- **9 MCP Servers**: Integrated with major component library MCP servers
- **Real-time discovery**: Search components across all servers in parallel
- **Lazy loading**: Fetch component source code on-demand
- **Context7 integration**: Fetch up-to-date documentation for any library

### Switchable UI Frameworks

- **Shadcn/UI**: Radix UI primitives with Tailwind styling
- **Tailwind CSS**: Pure utility-class components
- **Flowbite**: Pre-built Tailwind components

### Pre-built Test Cases

- **50+ Examples**: Layout, cards, forms, dashboards, marketing pages
- **Live preview**: Real-time rendering with JSON editor
- **Framework switching**: See same UI in different frameworks

## MCP Servers

| Server | Package | Components | Description |
|--------|---------|------------|-------------|
| **UI Layouts** | `@ui-layouts/mcp` | 50+ | Searchable UI components from ui-layouts.com |
| **Shadcn/UI** | `@jpisnice/shadcn-ui-mcp-server` | 40+ | Shadcn components with blocks & demos |
| **Tailwind CSS** | `tailwindcss-mcp-server` | Templates | Utilities, docs, and component templates |
| **Flowbite** | `flowbite-mcp` | 60+ | Tailwind CSS component library |
| **Chakra UI** | `@chakra-ui/react-mcp` | 50+ | Accessible components with theming |
| **Magic UI** | `@magicuidesign/mcp` | 50+ | Animated components (motion, effects) |
| **Aceternity UI** | `aceternityui-mcp` | 40+ | Modern animated components |
| **Material UI** | `@mui/mcp` | 50+ | Google Material Design components |
| **Context7** | `@upstash/context7-mcp` | Docs | Up-to-date documentation for any library |
| **Figma** | Figma Desktop | Design | Extract designs and tokens (optional) |

### Available MCP Tools

Each server exposes different tools:

```typescript
// UI Layouts
'search_components' | 'get_docs' | 'get_component_meta' | 'get_source_code'

// Shadcn
'list_components' | 'get_component' | 'get_component_source' | 'get_blocks'

// Chakra UI
'list_components' | 'get_component_example' | 'get_component_props' | 'get_theme'

// Magic UI (by category)
'getUIComponents' | 'getMotion' | 'getTextReveal' | 'getButtons' | 'getEffects'

// Aceternity UI
'search_components' | 'get_component_info' | 'get_all_components'

// Material UI
'list_components' | 'search_components' | 'get_component_info'

// Context7
'resolve-library-id' | 'query-docs'
```

## API Routes

### Component Discovery

```bash
POST /api/mcp/discover
{
  "query": "button",
  "sources": ["shadcn-ui", "mui", "chakra-ui"],
  "limit": 20
}
```

### Request Analysis

```bash
POST /api/mcp/analyze
{
  "userRequest": "Create a dashboard with user metrics, charts, and a data table"
}
```

Returns:
- Intent classification
- Component requirements (with priority)
- Suggested layout
- Discovered components from MCP servers

### Component Source Fetching

```bash
POST /api/mcp/fetch
{
  "componentId": "shadcn:button",
  "source": "shadcn-ui"
}
```

### Documentation (Context7)

```bash
POST /api/mcp/docs
{
  "library": "react",
  "query": "useEffect cleanup"
}
```

### MCP Server Status

```bash
GET /api/mcp/status
```

Returns connection status for all MCP servers.

## Project Structure

```
src/
├── app/
│   ├── page.tsx                    # Main builder interface
│   ├── api/mcp/                    # MCP API routes
│   │   ├── analyze/route.ts        # Request analysis
│   │   ├── discover/route.ts       # Component discovery
│   │   ├── fetch/route.ts          # Source code fetching
│   │   ├── build-registry/route.ts # Dynamic registry building
│   │   ├── docs/route.ts           # Context7 documentation
│   │   └── status/route.ts         # Server status
│   ├── layout.tsx
│   └── globals.css
│
├── components/
│   ├── builder/                    # Builder UI components
│   │   ├── ui-renderer.tsx         # Renders UITree with registry
│   │   ├── framework-switcher.tsx  # Switch between frameworks
│   │   ├── test-case-picker.tsx    # Browse test cases
│   │   └── json-editor.tsx         # View/edit JSON trees
│   │
│   ├── registries/                 # Static framework registries
│   │   ├── shadcn/registry.tsx
│   │   ├── tailwind/registry.tsx
│   │   └── flowbite/registry.tsx
│   │
│   └── ui/                         # Reusable UI components
│
├── lib/
│   ├── mcp/                        # MCP integration layer
│   │   ├── types.ts                # Type definitions & server configs
│   │   ├── mcp-client.ts           # MCP client (connects to servers)
│   │   ├── component-analyzer.ts   # Request analysis
│   │   ├── dynamic-registry.ts     # Dynamic registry builder
│   │   └── index.ts
│   │
│   ├── registry/                   # Registry context & provider
│   ├── catalogs/                   # Component catalogs with Zod schemas
│   └── tests/                      # Test case definitions
│
└── types/
```

## Getting Started

### Prerequisites

- Node.js 20+
- npm or pnpm

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Visit http://localhost:3000

### Build

```bash
npm run build
npm start
```

## Usage

### Test Cases Mode

1. Select a test case from the sidebar
2. See the rendered UI in the preview panel
3. View/edit the JSON structure
4. Switch between UI frameworks (Shadcn, Tailwind, Flowbite)

### Generate Mode (MCP)

1. Switch to "Generate (MCP)" tab
2. Enter a natural language description:
   - "Create a dashboard with user metrics and a data table"
   - "Build a landing page with hero section and pricing"
   - "Design a login form with social auth buttons"
3. Click "Analyze & Generate"
4. View:
   - Intent classification
   - Component requirements
   - Discovered components from MCP servers
   - Generated UI preview

### MCP Status

Check which MCP servers are connected and available.

## How It Works

### 1. Request Analysis

```typescript
// src/lib/mcp/component-analyzer.ts
const analysis = analyzeRequest("Create a dashboard with metrics");
// {
//   intent: "create a dashboard",
//   complexity: "complex",
//   requirements: [
//     { type: "dashboard", priority: "required", suggestedComponents: ["DashboardStats", "MetricCard"] },
//     { type: "charts", priority: "required", suggestedComponents: ["LineChart", "BarChart"] }
//   ],
//   searchQueries: ["dashboard", "stats", "chart", "metrics"]
// }
```

### 2. MCP Discovery

```typescript
// src/lib/mcp/mcp-client.ts
const components = await searchAllServers("dashboard", [
  "ui-layouts",
  "shadcn-ui",
  "magic-ui",
  "mui"
]);
// Returns ComponentMetadata[] from all servers
```

### 3. Dynamic Registry Building

```typescript
// src/lib/mcp/dynamic-registry.ts
const registry = buildDynamicRegistry(components, {
  fetchSource: fetchComponentSource
});
// Returns json-render compatible ComponentRegistry
```

### 4. Rendering with json-render

```typescript
// src/components/builder/ui-renderer.tsx
<Renderer tree={tree} registry={registry} />
```

## Component Catalog

The system includes 70+ component types organized by category:

### Layout
Container, Stack, Grid, Box, Flex, Center, Divider, Spacer, AspectRatio, BentoGrid, Dock

### Typography
Text, Heading, Paragraph, Link, Highlight, GradientText, MorphingText, FlipText

### Data Display
Card, Badge, Avatar, Table, List, Timeline, Stepper, Progress, Metric, StatCard

### Forms
Input, Button, Checkbox, Select, Switch, Textarea, FormField, ShimmerButton

### Feedback
Alert, Skeleton, Spinner, Toast, Confetti, AnimatedBeam

### Navigation
Tabs, Breadcrumb, Menu, Navbar, Sidebar, Pagination, Footer

### Media
Image, Icon, Code, Quote, Rating, Terminal, Globe, Marquee

### Animated (Magic UI / Aceternity)
BlurFade, OrbitingCircles, TextAnimate, TypingAnimation, Spotlight, Particles

## Architecture

### json-render Integration

Uses `@json-render/core` and `@json-render/react`:

```typescript
interface UITree {
  root: string;
  elements: Record<string, UIElement>;
}

interface UIElement {
  key: string;
  type: string;
  props: Record<string, unknown>;
  children?: string[];
}
```

### MCP Client

Connects to MCP servers via `@modelcontextprotocol/sdk`:

```typescript
const client = new Client({
  name: "generative-ui-builder",
  version: "1.0.0"
});

const transport = new StdioClientTransport({
  command: "npx",
  args: ["-y", "@ui-layouts/mcp"]
});

await client.connect(transport);
```

### Dynamic Registry

Creates lazy-loading React components from MCP metadata:

```typescript
function createDynamicComponent(metadata, fetchSource) {
  return function DynamicMCPComponent({ element, children }) {
    // Lazy loads source code from MCP on render
  };
}
```

## License

MIT

## Links

- [json-render](https://github.com/vercel-labs/json-render)
- [MCP Protocol](https://modelcontextprotocol.io/)
- [UI Layouts MCP](https://github.com/ui-layouts/mcp)
- [Shadcn UI MCP](https://github.com/Jpisnice/shadcn-ui-mcp-server)
- [Magic UI MCP](https://github.com/magicuidesign/mcp)
- [Chakra UI MCP](https://chakra-ui.com/docs/get-started/ai/mcp-server)
- [Material UI MCP](https://mui.com/material-ui/getting-started/mcp/)
- [Flowbite MCP](https://github.com/themesberg/flowbite-mcp)
- [Context7](https://github.com/upstash/context7)
