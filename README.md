# Generative UI Builder

A powerful, AI-ready UI rendering system that combines **json-render** with dynamic component discovery via **MCP (Model Context Protocol)** servers. Generate UIs from natural language by discovering components across 9+ component libraries.

**New to MCP?** Start here: [Quick Start Guide](./docs/QUICK_START.md)

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

- **15 MCP Servers**: Integrated with major component library MCP servers
- **Real-time discovery**: Search components across all servers in parallel
- **Lazy loading**: Fetch component source code on-demand
- **Icon & Image Integration**: 4 icon/image providers (Lucide, Heroicons, Iconify, Unsplash, Pexels)
- **Context7 integration**: Fetch up-to-date documentation for any library

**Quick Start**: See [MCP Setup Guide](./docs/MCP_SETUP.md) for installation and configuration.

### Switchable UI Frameworks

- **Shadcn/UI**: Radix UI primitives with Tailwind styling
- **Tailwind CSS**: Pure utility-class components
- **Flowbite**: Pre-built Tailwind components

### Pre-built Test Cases

- **50+ Examples**: Layout, cards, forms, dashboards, marketing pages
- **Live preview**: Real-time rendering with JSON editor
- **Framework switching**: See same UI in different frameworks

## MCP Servers

### Component Libraries (9 servers)

| Server | Package | Components | Status |
|--------|---------|------------|--------|
| **UI Layouts** | `@ui-layouts/mcp` | 50+ | ✅ Working |
| **Shadcn/UI** | `@jpisnice/shadcn-ui-mcp-server` | 40+ | ✅ Working |
| **Tailwind CSS** | `tailwindcss-mcp-server` | Templates | ✅ Working |
| **Flowbite** | `flowbite-mcp` | 60+ | ✅ Working |
| **Chakra UI** | `@chakra-ui/react-mcp` | 50+ | ✅ Working |
| **Magic UI** | `@magicuidesign/mcp` | 50+ | ✅ Working |
| **Aceternity UI** | `aceternityui-mcp` | 40+ | ✅ Working |
| **Material UI** | `@mui/mcp` | 50+ | ✅ Working |
| **Context7** | `@upstash/context7-mcp` | Docs | ⚠️ Requires API Key |

### Icons & Images (5 servers)

| Server | Package | Assets | Status |
|--------|---------|--------|--------|
| **Lucide Icons** | `lucide-icons-mcp` | 1,500+ icons | ✅ Working |
| **Heroicons** | `heroicons-mcp` | 200+ icons | ✅ Working |
| **Iconify** | HTTP API | 200,000+ icons | ✅ Working |
| **Unsplash** | `@drumnation/unsplash-smart-mcp-server` | Stock photos | ⚠️ Requires API Key |
| **Pexels** | HTTP API | Stock photos | ⚠️ Requires API Key |

### Design Tools (1 server)

| Server | Package | Features | Status |
|--------|---------|----------|--------|
| **Figma** | Figma Desktop | Design tokens | ⚙️ Optional |

**Documentation**: See [MCP Setup Guide](./docs/MCP_SETUP.md) for detailed installation and configuration instructions.

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

## Documentation

| Guide | Description |
|-------|-------------|
| [Quick Start](./docs/QUICK_START.md) | Get started in 5 minutes |
| [MCP Setup](./docs/MCP_SETUP.md) | Detailed MCP server configuration |
| [Troubleshooting](./docs/MCP_TROUBLESHOOTING.md) | Common issues and solutions |
| [Test Report](./docs/TEST-REPORT.md) | Comprehensive testing results |

## Getting Started

### Prerequisites

- Node.js 18+ (20+ recommended)
- npm or pnpm
- API Keys (optional, for image search):
  - [Unsplash Access Key](https://unsplash.com/developers)
  - [Pexels API Key](https://www.pexels.com/api/)

### Installation

```bash
# Install dependencies
npm install

# Configure environment variables
cp .env.example .env.local

# Edit .env.local and add your API keys (optional)
# GOOGLE_GENERATIVE_AI_API_KEY=your_key_here
# UNSPLASH_ACCESS_KEY=your_key_here (optional)
# PEXELS_API_KEY=your_key_here (optional)
```

### Verify MCP Setup

```bash
# Test all MCP servers
./scripts/verify-mcp.sh

# Test specific server
./scripts/verify-mcp.sh shadcn-ui
```

See [MCP Setup Guide](./docs/MCP_SETUP.md) for detailed configuration.

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

## Troubleshooting

### MCP Server Issues

If you encounter issues with MCP servers:

1. **Run the verification script**:
   ```bash
   ./scripts/verify-mcp.sh
   ```

2. **Check server status**:
   - Visit http://localhost:3000
   - Navigate to "MCP Status" section
   - Verify servers are "Connected"

3. **Common issues**:
   - Server shows "0 tools" → Clear npx cache: `rm -rf ~/.npm/_npx`
   - Connection timeout → Pre-cache packages (see verification script)
   - API errors → Verify environment variables in `.env.local`

4. **Detailed troubleshooting**:
   - See [MCP Troubleshooting Guide](./docs/MCP_TROUBLESHOOTING.md)

### Development Server

```bash
# Clear cache and restart
rm -rf .next
npm run dev

# Check for errors in console
# Visit http://localhost:3000 and open browser DevTools
```

## Documentation

- [MCP Setup Guide](./docs/MCP_SETUP.md) - Installation and configuration
- [MCP Troubleshooting](./docs/MCP_TROUBLESHOOTING.md) - Common issues and solutions
- [Test Report](./docs/TEST-REPORT.md) - Comprehensive testing results
- [Issues Report](./docs/ISSUES-REPORT.md) - Known issues and workarounds

## License

MIT

## Links

### Project
- [json-render](https://github.com/vercel-labs/json-render)
- [MCP Protocol](https://modelcontextprotocol.io/)
- [MCP TypeScript SDK](https://github.com/modelcontextprotocol/typescript-sdk)

### Component Libraries
- [UI Layouts MCP](https://github.com/ui-layouts/mcp)
- [Shadcn UI MCP](https://github.com/Jpisnice/shadcn-ui-mcp-server)
- [Magic UI MCP](https://github.com/magicuidesign/mcp)
- [Chakra UI MCP](https://chakra-ui.com/docs/get-started/ai/mcp-server)
- [Material UI MCP](https://mui.com/material-ui/getting-started/mcp/)
- [Flowbite MCP](https://github.com/themesberg/flowbite-mcp)
- [Aceternity UI](https://ui.aceternity.com/)

### Documentation & Assets
- [Context7](https://github.com/upstash/context7)
- [Lucide Icons](https://lucide.dev/)
- [Heroicons](https://heroicons.com/)
- [Iconify](https://iconify.design/)
- [Unsplash](https://unsplash.com/developers)
- [Pexels](https://www.pexels.com/api/)
