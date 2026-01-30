# Generative UI Builder

A powerful, AI-ready UI rendering system that combines **json-render** with multiple UI framework registries and **MCP (Model Context Protocol)** integration for component discovery.

## Overview

This project demonstrates a complete "Generative UI" pattern where:

1. **AI generates JSON** - A language model produces a structured UI tree (JSON)
2. **json-render validates** - The tree is validated against Zod schemas with guardrails
3. **Registry renders** - Framework-specific components render the validated tree
4. **MCP discovers** - Component metadata is discoverable via MCP servers

```
AI Model → JSON UITree → json-render → Registry → React Components → UI
```

## Features

- **Switchable UI Frameworks**: Runtime switching between Shadcn/UI, Tailwind CSS, and Flowbite
- **70+ Components**: Comprehensive component catalog with type-safe props
- **50 Test Cases**: Pre-built UI examples across 5 categories
- **MCP Integration**: Simulated MCP client for component discovery
- **Type-Safe**: Full TypeScript support with Zod validation
- **Live Preview**: Real-time rendering with JSON editor

## Project Structure

```
src/
├── app/                          # Next.js App Router
│   ├── layout.tsx                # Root layout
│   ├── page.tsx                  # Main builder interface
│   └── globals.css               # Global styles & CSS variables
│
├── components/
│   ├── builder/                  # Builder UI components
│   │   ├── ui-renderer.tsx       # Renders UITree with active registry
│   │   ├── framework-switcher.tsx # Switch between UI frameworks
│   │   ├── test-case-picker.tsx  # Browse and select test cases
│   │   ├── json-editor.tsx       # View/edit JSON trees
│   │   └── index.ts
│   │
│   ├── registries/               # Framework-specific implementations
│   │   ├── shadcn/               # Shadcn/UI registry
│   │   │   ├── registry.tsx      # Component mappings + theme
│   │   │   └── index.ts
│   │   ├── tailwind/             # Pure Tailwind registry
│   │   │   ├── registry.tsx
│   │   │   └── index.ts
│   │   ├── flowbite/             # Flowbite registry
│   │   │   ├── registry.tsx
│   │   │   └── index.ts
│   │   └── index.ts
│   │
│   └── ui/                       # Base UI components (CVA-based)
│       ├── button.tsx
│       ├── card.tsx
│       ├── typography.tsx
│       ├── layout.tsx
│       ├── input.tsx
│       ├── badge.tsx
│       ├── avatar.tsx
│       ├── alert.tsx
│       ├── progress.tsx
│       ├── table.tsx
│       ├── tabs.tsx
│       ├── metric.tsx
│       ├── navigation.tsx
│       ├── accordion.tsx
│       ├── list.tsx
│       ├── media.tsx
│       └── index.ts
│
├── lib/
│   ├── catalogs/                 # Component catalogs (Zod schemas)
│   │   ├── base-catalog.ts       # Main catalog with 70+ components
│   │   └── index.ts
│   │
│   ├── registry/                 # Registry management
│   │   ├── registry-context.tsx  # React context for registry switching
│   │   └── index.ts
│   │
│   ├── mcp/                      # MCP integration layer
│   │   ├── types.ts              # MCP type definitions
│   │   ├── mcp-client.ts         # Simulated MCP client
│   │   └── index.ts
│   │
│   ├── tests/                    # Test cases
│   │   ├── test-cases.ts         # 50 UI test cases
│   │   └── index.ts
│   │
│   └── utils.ts                  # Utility functions (cn, etc.)
│
├── hooks/                        # Custom React hooks
│   └── index.ts
│
└── types/                        # TypeScript definitions
    └── index.ts
```

## How It Works

### 1. Component Catalog

The catalog defines all available components with Zod schemas:

```typescript
import { createCatalog } from '@json-render/core';
import { z } from 'zod';

export const baseCatalog = createCatalog({
  Button: {
    props: z.object({
      children: z.string(),
      variant: z.enum(['default', 'secondary', 'outline', 'ghost', 'destructive']).optional(),
      size: z.enum(['sm', 'md', 'lg']).optional(),
      disabled: z.boolean().optional(),
    }),
  },
  Card: {
    props: z.object({
      title: z.string().optional(),
      description: z.string().optional(),
      children: z.any().optional(),
    }),
  },
  // ... 70+ more components
});
```

### 2. UI Tree Structure

The AI generates a JSON tree representing the UI:

```typescript
const uiTree: UITree = {
  root: 'card-1',
  elements: {
    'card-1': {
      type: 'Card',
      props: {
        title: 'Welcome',
        description: 'Get started with the builder'
      },
      children: ['button-1']
    },
    'button-1': {
      type: 'Button',
      props: {
        children: 'Click Me',
        variant: 'default'
      }
    }
  }
};
```

### 3. Registry Implementation

Each framework provides its own component implementations:

```typescript
// Shadcn Registry
export const shadcnRegistry: Registry = {
  name: 'shadcn',
  displayName: 'Shadcn/UI',
  description: 'Beautiful components built with Radix UI and Tailwind CSS',
  components: {
    Button: ({ children, variant, size, ...props }) => (
      <button className={cn(buttonVariants({ variant, size }))} {...props}>
        {children}
      </button>
    ),
    Card: ({ title, description, children }) => (
      <div className="rounded-lg border bg-card p-6">
        {title && <h3 className="text-lg font-semibold">{title}</h3>}
        {description && <p className="text-muted-foreground">{description}</p>}
        {children}
      </div>
    ),
    // ... more components
  },
  theme: {
    colors: { primary: 'hsl(222.2 47.4% 11.2%)', ... },
    fonts: { sans: 'var(--font-geist-sans)', ... },
  }
};
```

### 4. Rendering

The UIRenderer uses json-render to render the tree:

```tsx
import { Renderer, DataProvider, ActionProvider } from '@json-render/react';

export function UIRenderer({ tree, data, onAction }) {
  const { activeRegistry } = useRegistry();

  return (
    <DataProvider data={data}>
      <ActionProvider onAction={onAction}>
        <Renderer
          tree={tree}
          components={activeRegistry.components}
        />
      </ActionProvider>
    </DataProvider>
  );
}
```

## Test Cases

50 pre-built test cases across 5 categories:

### Layout (10 cases)
- Basic Container
- Two Column Grid
- Three Column Grid
- Responsive Grid
- Vertical Stack
- Horizontal Stack
- Card Grid Layout
- Sidebar Layout
- Header Layout
- Full Page Layout

### Cards (10 cases)
- Basic Card
- Card with Actions
- Profile Card
- Stats Card
- Image Card
- Hoverable Card
- Gradient Card
- Nested Cards
- Card List
- Product Card

### Forms (10 cases)
- Login Form
- Registration Form
- Contact Form
- Search Form
- Settings Form
- Checkout Form
- Filter Form
- Multi-step Form
- Feedback Form
- Profile Edit Form

### Dashboards (10 cases)
- Stats Overview
- Activity Feed
- Data Table
- Progress Dashboard
- Metric Cards
- Charts Dashboard
- User Dashboard
- Analytics Overview
- Task Management
- Notification Center

### Marketing (10 cases)
- Hero Section
- Feature Grid
- Pricing Cards
- Testimonial Section
- CTA Section
- Newsletter Signup
- FAQ Section
- Team Section
- Footer Section
- Full Landing Page

## MCP Integration

The project includes a simulated MCP client for component discovery:

```typescript
import { MCPClient } from '@/lib/mcp';

const client = new MCPClient();

// Search for components
const results = await client.searchComponents('button');

// Get component details
const details = await client.getComponentDetails('ui-layouts', 'animated-button');

// Get Tailwind utilities
const utilities = await client.getTailwindUtilities('flexbox');
```

### Supported MCP Servers

| Server | Purpose | Status |
|--------|---------|--------|
| `ui-layouts` | Animated component library | Simulated |
| `shadcn-ui` | Shadcn component discovery | Simulated |
| `tailwindcss` | Tailwind CSS utilities | Simulated |
| `flowbite` | Flowbite components | Planned |
| `figma` | Figma to code conversion | Planned |

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd vercel-ai-demo

# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the builder.

### Usage

1. **Select a Framework**: Use the framework switcher to choose between Shadcn, Tailwind, or Flowbite
2. **Browse Test Cases**: Click on test cases in the sidebar to load pre-built UIs
3. **Edit JSON**: Modify the JSON tree in the editor to see live changes
4. **Switch Views**: Toggle between preview, JSON, and split views

## Architecture Decisions

### Why json-render?

- **Type Safety**: Zod schemas provide compile-time and runtime validation
- **AI-Friendly**: Simple JSON format is easy for LLMs to generate
- **Guardrails**: Built-in validation prevents rendering invalid components
- **Framework Agnostic**: Same JSON works with any UI framework

### Why Multiple Registries?

- **Flexibility**: Switch frameworks without changing the UI tree
- **Comparison**: Side-by-side comparison of different designs
- **Migration**: Easy migration path between frameworks
- **Customization**: Each registry can have its own theme

### Why MCP?

- **Discovery**: AI can discover available components dynamically
- **Documentation**: Rich metadata about component props and usage
- **Extensibility**: Add new component libraries via MCP servers

## Component Reference

### Layout Components

| Component | Props | Description |
|-----------|-------|-------------|
| `Container` | `maxWidth`, `padding`, `centered` | Content container |
| `Row` | `gap`, `align`, `justify`, `wrap` | Horizontal flex row |
| `Column` | `gap`, `align`, `span` | Vertical flex column |
| `Grid` | `columns`, `gap`, `minChildWidth` | CSS grid layout |
| `Stack` | `direction`, `gap`, `align`, `justify` | Flexible stack layout |
| `Spacer` | `size` | Visual spacing |
| `Divider` | `orientation`, `decorative` | Visual separator |

### Typography Components

| Component | Props | Description |
|-----------|-------|-------------|
| `Heading` | `level`, `children` | h1-h6 headings |
| `Text` | `variant`, `size`, `weight`, `align` | Paragraph text |
| `Label` | `htmlFor`, `required` | Form labels |

### Form Components

| Component | Props | Description |
|-----------|-------|-------------|
| `Input` | `type`, `placeholder`, `label`, `error` | Text input |
| `Button` | `variant`, `size`, `disabled`, `loading` | Click button |
| `Checkbox` | `label`, `checked`, `disabled` | Checkbox input |
| `Select` | `options`, `placeholder`, `label` | Dropdown select |
| `Textarea` | `placeholder`, `rows`, `label` | Multi-line input |

### Display Components

| Component | Props | Description |
|-----------|-------|-------------|
| `Card` | `title`, `description`, `footer` | Content card |
| `Badge` | `variant`, `size` | Status badge |
| `Avatar` | `src`, `alt`, `size`, `fallback` | User avatar |
| `Alert` | `variant`, `title`, `description` | Alert message |
| `Progress` | `value`, `max`, `showLabel` | Progress bar |

### Data Components

| Component | Props | Description |
|-----------|-------|-------------|
| `Table` | `headers`, `rows`, `striped` | Data table |
| `List` | `items`, `ordered`, `icon` | List display |
| `Metric` | `label`, `value`, `change`, `trend` | KPI metric |

### Navigation Components

| Component | Props | Description |
|-----------|-------|-------------|
| `Tabs` | `tabs`, `defaultTab` | Tab navigation |
| `Accordion` | `items`, `allowMultiple` | Collapsible sections |
| `Breadcrumb` | `items` | Breadcrumb navigation |
| `Link` | `href`, `external` | Anchor link |

### Media Components

| Component | Props | Description |
|-----------|-------|-------------|
| `Image` | `src`, `alt`, `width`, `height` | Image display |
| `Icon` | `name`, `size`, `color` | Icon display |

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

MIT License - see LICENSE for details

## References

- [json-render](https://github.com/vercel-labs/json-render) - Vercel's AI → JSON → UI library
- [ui-layouts](https://github.com/ui-layouts/ui-layouts) - Animated component library
- [Shadcn/UI](https://ui.shadcn.com/) - Beautiful component library
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Flowbite](https://flowbite.com/) - Tailwind component library
- [MCP](https://modelcontextprotocol.io/) - Model Context Protocol
