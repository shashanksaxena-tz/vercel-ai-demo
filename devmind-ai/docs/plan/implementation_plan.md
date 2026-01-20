# AI UI Playground - Complete Implementation Plan

> **A showcase application demonstrating json-render with 6 UI libraries, Gemini AI backend, full AI Elements chat experience, and Vercel deployment.**

---

## Executive Summary

| Aspect | Details |
|--------|---------|
| **Project** | AI UI Playground - Showcase for Vercel's json-render |
| **AI Backend** | Google Gemini via @ai-sdk/google |
| **UI Libraries** | shadcn/ui, MUI, Chakra UI, Ant Design, Magic UI, Aceternity UI |
| **Deployment** | Vercel |
| **Framework** | Next.js 15 (App Router) |
| **Total Effort** | ~40-50 hours (5-7 working days) |

---

## Effort Breakdown

| Phase | Effort | Description |
|-------|--------|-------------|
| Phase 1: Foundation | 8-10 hrs | Project setup, AI SDK, core json-render integration |
| Phase 2: Component Catalogs | 12-15 hrs | 6 UI library registries (basic + advanced) |
| Phase 3: AI Elements Chat | 6-8 hrs | Full chat experience with reasoning, streaming |
| Phase 4: Dashboard Builder | 8-10 hrs | Dynamic dashboard generation showcase |
| Phase 5: Polish & Deploy | 6-8 hrs | UI polish, Vercel deployment, documentation |
| **Total** | **40-51 hrs** | **5-7 working days** |

---

## User Review Required

> [!IMPORTANT]
> **API Keys Required**: You'll need to provide a `GOOGLE_GENERATIVE_AI_API_KEY` for Gemini integration.

> [!WARNING]
> **Scope Decision**: Building 6 complete UI library registries is substantial. Consider starting with 3 libraries (shadcn, MUI, Chakra) and adding others iteratively.

> [!CAUTION]
> **Aceternity UI & Magic UI** require licensing for commercial use. Confirm if this is for demo/portfolio purposes only.

---

## Technical Architecture

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         AI UI Playground                                     │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  ┌─────────────────────────────────────────────────────────────────────────┐│
│  │                        FRONTEND (Next.js 15)                            ││
│  │  ┌───────────────┐  ┌───────────────┐  ┌───────────────────────────┐   ││
│  │  │ AI Elements   │  │ Library       │  │ Rendered Output           │   ││
│  │  │ Chat Panel    │  │ Switcher      │  │ (json-render + Registry)  │   ││
│  │  │               │  │               │  │                           │   ││
│  │  │ • Conversation│  │ • shadcn/ui   │  │ • Cards, Buttons          │   ││
│  │  │ • Reasoning   │  │ • MUI         │  │ • Forms, Tables           │   ││
│  │  │ • Streaming   │  │ • Chakra UI   │  │ • Charts, Dashboards      │   ││
│  │  │ • Suggestions │  │ • Ant Design  │  │ • Modals, Alerts          │   ││
│  │  │               │  │ • Magic UI    │  │ • Data Binding            │   ││
│  │  │               │  │ • Aceternity  │  │ • Actions                 │   ││
│  │  └───────────────┘  └───────────────┘  └───────────────────────────┘   ││
│  └─────────────────────────────────────────────────────────────────────────┘│
│                                                                              │
│  ┌─────────────────────────────────────────────────────────────────────────┐│
│  │                        BACKEND (API Routes)                              ││
│  │  ┌───────────────┐  ┌───────────────┐  ┌───────────────────────────┐   ││
│  │  │ /api/generate │  │ /api/stream   │  │ /api/actions              │   ││
│  │  │               │  │               │  │                           │   ││
│  │  │ Gemini AI     │  │ streamObject  │  │ export_report             │   ││
│  │  │ @ai-sdk/google│  │ partialStream │  │ refresh_data              │   ││
│  │  │               │  │               │  │ navigate                  │   ││
│  │  └───────────────┘  └───────────────┘  └───────────────────────────┘   ││
│  └─────────────────────────────────────────────────────────────────────────┘│
│                                                                              │
│  ┌─────────────────────────────────────────────────────────────────────────┐│
│  │                     json-render CORE                                     ││
│  │  ┌───────────────────────────────────────────────────────────────────┐  ││
│  │  │                       Component Catalog                            │  ││
│  │  │  ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────────┐  │  ││
│  │  │  │ Card    │ │ Button  │ │ Form    │ │ Table   │ │ Chart       │  │  ││
│  │  │  │ Alert   │ │ Modal   │ │ Badge   │ │ Metric  │ │ Dashboard   │  │  ││
│  │  │  │ Tabs    │ │ Select  │ │ Input   │ │ Avatar  │ │ Grid        │  │  ││
│  │  │  └─────────┘ └─────────┘ └─────────┘ └─────────┘ └─────────────┘  │  ││
│  │  └───────────────────────────────────────────────────────────────────┘  ││
│  │                                                                          ││
│  │  ┌───────────────────────────────────────────────────────────────────┐  ││
│  │  │                     Component Registries                           │  ││
│  │  │  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐ │  ││
│  │  │  │ shadcn   │ │ MUI      │ │ Chakra   │ │ Ant      │ │ Magic    │ │  ││
│  │  │  │ Registry │ │ Registry │ │ Registry │ │ Registry │ │ Registry │ │  ││
│  │  │  └──────────┘ └──────────┘ └──────────┘ └──────────┘ └──────────┘ │  ││
│  │  └───────────────────────────────────────────────────────────────────┘  ││
│  └─────────────────────────────────────────────────────────────────────────┘│
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## Proposed Changes

### Phase 1: Project Foundation (8-10 hours)

---

#### [NEW] Project Initialization

**Files to create:**

| File | Purpose |
|------|---------|
| `package.json` | Dependencies for Next.js, AI SDK, json-render, all UI libs |
| `next.config.ts` | Next.js 15 configuration |
| `tailwind.config.ts` | Tailwind with all library prefixes |
| `tsconfig.json` | TypeScript strict mode |
| `.env.local` | API keys (GOOGLE_GENERATIVE_AI_API_KEY) |

**Commands:**
```bash
npx create-next-app@latest ai-ui-playground --typescript --tailwind --eslint --app --src-dir
cd ai-ui-playground
npm install ai @ai-sdk/google @json-render/core @json-render/react zod
npm install @mui/material @emotion/react @emotion/styled
npm install @chakra-ui/react @emotion/react @emotion/styled framer-motion
npm install antd @ant-design/icons
npx ai-elements@latest  # Install AI Elements components
npx shadcn@latest init  # Initialize shadcn/ui
```

---

#### [NEW] [src/lib/gemini.ts](file:///Users/shashanksaxena/Documents/Personal/Code/vercel-ai-demo/src/lib/gemini.ts)

Gemini AI provider configuration:

```typescript
import { createGoogleGenerativeAI } from '@ai-sdk/google';

export const gemini = createGoogleGenerativeAI({
  apiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY,
});

export const model = gemini('gemini-2.0-flash');
```

---

#### [NEW] [src/lib/catalog.ts](file:///Users/shashanksaxena/Documents/Personal/Code/vercel-ai-demo/src/lib/catalog.ts)

json-render component catalog (what AI can use):

```typescript
import { createCatalog } from '@json-render/core';
import { z } from 'zod';

// Shared action schema for all interactive components
const ActionSchema = z.object({
  name: z.string(),
  params: z.record(z.unknown()).optional(),
  confirm: z.object({
    title: z.string(),
    message: z.string(),
    variant: z.enum(['default', 'danger', 'warning']),
  }).optional(),
});

export const catalog = createCatalog({
  components: {
    // === BASIC COMPONENTS ===
    Card: {
      props: z.object({
        title: z.string(),
        description: z.string().optional(),
        variant: z.enum(['default', 'outlined', 'elevated']).optional(),
      }),
      hasChildren: true,
    },
    Button: {
      props: z.object({
        label: z.string(),
        variant: z.enum(['primary', 'secondary', 'danger', 'ghost']).optional(),
        size: z.enum(['sm', 'md', 'lg']).optional(),
        action: ActionSchema.optional(),
      }),
    },
    Text: {
      props: z.object({
        content: z.string(),
        variant: z.enum(['h1', 'h2', 'h3', 'body', 'caption']).optional(),
      }),
    },
    Badge: {
      props: z.object({
        label: z.string(),
        variant: z.enum(['default', 'success', 'warning', 'error', 'info']).optional(),
      }),
    },
    Alert: {
      props: z.object({
        title: z.string(),
        message: z.string(),
        variant: z.enum(['info', 'success', 'warning', 'error']).optional(),
      }),
    },
    Avatar: {
      props: z.object({
        src: z.string().optional(),
        name: z.string(),
        size: z.enum(['sm', 'md', 'lg']).optional(),
      }),
    },
    
    // === FORM COMPONENTS ===
    Input: {
      props: z.object({
        label: z.string(),
        placeholder: z.string().optional(),
        valuePath: z.string(),
        type: z.enum(['text', 'email', 'password', 'number']).optional(),
      }),
    },
    Select: {
      props: z.object({
        label: z.string(),
        valuePath: z.string(),
        options: z.array(z.object({
          label: z.string(),
          value: z.string(),
        })),
      }),
    },
    Checkbox: {
      props: z.object({
        label: z.string(),
        valuePath: z.string(),
      }),
    },
    
    // === ADVANCED COMPONENTS ===
    Metric: {
      props: z.object({
        label: z.string(),
        valuePath: z.string(),
        format: z.enum(['currency', 'percent', 'number', 'compact']).optional(),
        trend: z.enum(['up', 'down', 'neutral']).optional(),
        trendValue: z.string().optional(),
      }),
    },
    Chart: {
      props: z.object({
        type: z.enum(['line', 'bar', 'pie', 'area', 'donut']),
        title: z.string().optional(),
        dataPath: z.string(),
        xKey: z.string(),
        yKey: z.string(),
        height: z.number().optional(),
      }),
    },
    Table: {
      props: z.object({
        dataPath: z.string(),
        columns: z.array(z.object({
          key: z.string(),
          header: z.string(),
          sortable: z.boolean().optional(),
        })),
        pagination: z.boolean().optional(),
      }),
    },
    Tabs: {
      props: z.object({
        defaultValue: z.string(),
        tabs: z.array(z.object({
          value: z.string(),
          label: z.string(),
        })),
      }),
      hasChildren: true,
    },
    TabPanel: {
      props: z.object({
        value: z.string(),
      }),
      hasChildren: true,
    },
    Modal: {
      props: z.object({
        title: z.string(),
        trigger: z.string(),
      }),
      hasChildren: true,
    },
    Grid: {
      props: z.object({
        columns: z.number().optional(),
        gap: z.enum(['sm', 'md', 'lg']).optional(),
      }),
      hasChildren: true,
    },
    Stack: {
      props: z.object({
        direction: z.enum(['horizontal', 'vertical']).optional(),
        gap: z.enum(['sm', 'md', 'lg']).optional(),
        align: z.enum(['start', 'center', 'end', 'stretch']).optional(),
      }),
      hasChildren: true,
    },
  },
  
  actions: {
    export_report: { description: 'Export current dashboard/view to PDF' },
    refresh_data: { description: 'Refresh all data metrics and charts' },
    navigate: { description: 'Navigate to a different page or section' },
    add_item: { description: 'Add a new item to a list or collection' },
    edit_item: { description: 'Edit an existing item' },
    delete_item: { description: 'Delete an item with confirmation' },
    submit_form: { description: 'Submit form data' },
    toggle_theme: { description: 'Toggle between light and dark mode' },
  },
});
```

---

### Phase 2: Component Registries (12-15 hours)

---

#### [NEW] [src/registries/shadcn/index.tsx](file:///Users/shashanksaxena/Documents/Personal/Code/vercel-ai-demo/src/registries/shadcn/index.tsx)

shadcn/ui component registry:

```typescript
import { ComponentRegistry } from '@json-render/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
// ... all shadcn components

export const shadcnRegistry: ComponentRegistry = {
  Card: ({ element, children }) => (
    <Card className={element.props.variant === 'outlined' ? 'border-2' : ''}>
      <CardHeader>
        <CardTitle>{element.props.title}</CardTitle>
        {element.props.description && <p>{element.props.description}</p>}
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  ),
  Button: ({ element, onAction }) => (
    <Button 
      variant={mapVariant(element.props.variant)}
      size={element.props.size}
      onClick={() => element.props.action && onAction(element.props.action)}
    >
      {element.props.label}
    </Button>
  ),
  // ... 15+ more component mappings
};
```

---

#### [NEW] [src/registries/mui/index.tsx](file:///Users/shashanksaxena/Documents/Personal/Code/vercel-ai-demo/src/registries/mui/index.tsx)

Material UI component registry:

```typescript
import { ComponentRegistry } from '@json-render/react';
import { Card, CardContent, Typography, Button, TextField } from '@mui/material';

export const muiRegistry: ComponentRegistry = {
  Card: ({ element, children }) => (
    <Card variant={element.props.variant === 'outlined' ? 'outlined' : 'elevation'}>
      <CardContent>
        <Typography variant="h5">{element.props.title}</Typography>
        {element.props.description && (
          <Typography color="text.secondary">{element.props.description}</Typography>
        )}
        {children}
      </CardContent>
    </Card>
  ),
  // ... all MUI mappings
};
```

---

#### [NEW] [src/registries/chakra/index.tsx](file:///Users/shashanksaxena/Documents/Personal/Code/vercel-ai-demo/src/registries/chakra/index.tsx)

Chakra UI component registry.

---

#### [NEW] [src/registries/antd/index.tsx](file:///Users/shashanksaxena/Documents/Personal/Code/vercel-ai-demo/src/registries/antd/index.tsx)

Ant Design component registry.

---

#### [NEW] [src/registries/magicui/index.tsx](file:///Users/shashanksaxena/Documents/Personal/Code/vercel-ai-demo/src/registries/magicui/index.tsx)

Magic UI registry (animated variants).

---

#### [NEW] [src/registries/aceternity/index.tsx](file:///Users/shashanksaxena/Documents/Personal/Code/vercel-ai-demo/src/registries/aceternity/index.tsx)

Aceternity UI registry (premium effects).

---

#### [NEW] [src/registries/index.ts](file:///Users/shashanksaxena/Documents/Personal/Code/vercel-ai-demo/src/registries/index.ts)

Registry aggregator:

```typescript
import { shadcnRegistry } from './shadcn';
import { muiRegistry } from './mui';
import { chakraRegistry } from './chakra';
import { antdRegistry } from './antd';
import { magicuiRegistry } from './magicui';
import { aceternityRegistry } from './aceternity';

export const registries = {
  shadcn: { name: 'shadcn/ui', registry: shadcnRegistry },
  mui: { name: 'Material UI', registry: muiRegistry },
  chakra: { name: 'Chakra UI', registry: chakraRegistry },
  antd: { name: 'Ant Design', registry: antdRegistry },
  magicui: { name: 'Magic UI', registry: magicuiRegistry },
  aceternity: { name: 'Aceternity UI', registry: aceternityRegistry },
} as const;

export type RegistryKey = keyof typeof registries;
```

---

### Phase 3: AI Elements Chat Experience (6-8 hours)

---

#### [NEW] [src/app/page.tsx](file:///Users/shashanksaxena/Documents/Personal/Code/vercel-ai-demo/src/app/page.tsx)

Main showcase page with split layout.

---

#### [NEW] [src/components/chat-panel.tsx](file:///Users/shashanksaxena/Documents/Personal/Code/vercel-ai-demo/src/components/chat-panel.tsx)

Full AI Elements chat integration:

```typescript
'use client';

import { useChat } from '@ai-sdk/react';
import { 
  Conversation, 
  ConversationContent,
  Message,
  MessageContent,
  MessageResponse,
  Reasoning,
  Suggestion,
  PromptInput,
  Loader,
} from '@/components/ai-elements';

export function ChatPanel({ onGenerate }: { onGenerate: (tree: UITree) => void }) {
  const { messages, input, handleSubmit, isLoading, setInput } = useChat({
    api: '/api/generate',
    onResponse: (response) => {
      // Handle streaming UI response
    },
  });

  return (
    <div className="flex flex-col h-full">
      <Conversation>
        <ConversationContent>
          {messages.map((message, i) => (
            <Message key={i} from={message.role}>
              <MessageContent>
                {message.role === 'assistant' && message.reasoning && (
                  <Reasoning>{message.reasoning}</Reasoning>
                )}
                <MessageResponse>{message.content}</MessageResponse>
              </MessageContent>
            </Message>
          ))}
          {isLoading && <Loader />}
        </ConversationContent>
      </Conversation>
      
      <div className="mt-4 space-y-2">
        <div className="flex gap-2 flex-wrap">
          <Suggestion onClick={() => setInput('Create a sales dashboard with metrics')}>
            Sales Dashboard
          </Suggestion>
          <Suggestion onClick={() => setInput('Build a user profile card')}>
            Profile Card
          </Suggestion>
          <Suggestion onClick={() => setInput('Generate a pricing table')}>
            Pricing Table
          </Suggestion>
        </div>
        
        <PromptInput 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onSubmit={handleSubmit}
          placeholder="Describe the UI you want to generate..."
        />
      </div>
    </div>
  );
}
```

---

#### [NEW] [src/app/api/generate/route.ts](file:///Users/shashanksaxena/Documents/Personal/Code/vercel-ai-demo/src/app/api/generate/route.ts)

Streaming API endpoint:

```typescript
import { streamObject } from 'ai';
import { gemini, model } from '@/lib/gemini';
import { catalog } from '@/lib/catalog';
import { z } from 'zod';

export async function POST(req: Request) {
  const { prompt, currentRegistry } = await req.json();

  const result = streamObject({
    model,
    system: `You are a UI generator. Generate UI components using ONLY the following catalog:
${JSON.stringify(catalog.getSchema(), null, 2)}

The user is viewing with ${currentRegistry} theme. Generate appropriate UI structures.
Always respond with valid JSON matching the schema.`,
    prompt,
    schema: catalog.getOutputSchema(),
  });

  return result.toTextStreamResponse();
}
```

---

### Phase 4: Dashboard Builder Showcase (8-10 hours)

---

#### [NEW] [src/app/dashboards/page.tsx](file:///Users/shashanksaxena/Documents/Personal/Code/vercel-ai-demo/src/app/dashboards/page.tsx)

Pre-built dashboard templates showcasing json-render capabilities:

- Sales Dashboard (metrics, charts, tables)
- Analytics Dashboard (data visualization)
- Admin Panel (forms, tables, actions)
- User Management (CRUD operations)

---

#### [NEW] [src/lib/sample-data.ts](file:///Users/shashanksaxena/Documents/Personal/Code/vercel-ai-demo/src/lib/sample-data.ts)

Sample data for dashboards:

```typescript
export const sampleData = {
  metrics: {
    revenue: 125000,
    growth: 0.15,
    customers: 1234,
    orders: 567,
  },
  salesHistory: [
    { month: 'Jan', revenue: 12000, orders: 45 },
    { month: 'Feb', revenue: 15000, orders: 52 },
    // ... more data
  ],
  topProducts: [
    { name: 'Product A', sales: 234, revenue: 45000 },
    // ... more products
  ],
};
```

---

#### [NEW] [src/components/ui-canvas.tsx](file:///Users/shashanksaxena/Documents/Personal/Code/vercel-ai-demo/src/components/ui-canvas.tsx)

Render canvas with:
- Library selector
- Device preview (mobile/tablet/desktop)
- JSON viewer toggle
- Export options

---

#### [NEW] [src/components/action-handler.tsx](file:///Users/shashanksaxena/Documents/Personal/Code/vercel-ai-demo/src/components/action-handler.tsx)

Action provider for json-render:

```typescript
import { ActionProvider } from '@json-render/react';

export function ActionHandler({ children }: { children: React.ReactNode }) {
  const handleAction = async (action: Action) => {
    switch (action.name) {
      case 'export_report':
        await exportToPDF();
        toast.success('Report exported!');
        break;
      case 'refresh_data':
        await refetchData();
        toast.success('Data refreshed!');
        break;
      case 'navigate':
        router.push(action.params?.path);
        break;
      // ... more action handlers
    }
  };

  return (
    <ActionProvider actions={handleAction}>
      {children}
    </ActionProvider>
  );
}
```

---

### Phase 5: Polish & Deployment (6-8 hours)

---

#### [NEW] [src/app/layout.tsx](file:///Users/shashanksaxena/Documents/Personal/Code/vercel-ai-demo/src/app/layout.tsx)

Root layout with theme providers for all UI libraries.

---

#### [MODIFY] [vercel.json](file:///Users/shashanksaxena/Documents/Personal/Code/vercel-ai-demo/vercel.json)

Vercel deployment configuration.

---

#### [NEW] [README.md](file:///Users/shashanksaxena/Documents/Personal/Code/vercel-ai-demo/README.md)

Comprehensive documentation.

---

## Complete File Structure

```
ai-ui-playground/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── generate/
│   │   │   │   └── route.ts          # Main AI generation endpoint
│   │   │   └── actions/
│   │   │       └── route.ts          # Action handlers
│   │   ├── dashboards/
│   │   │   └── page.tsx              # Dashboard templates showcase
│   │   ├── playground/
│   │   │   └── page.tsx              # Interactive playground
│   │   ├── components/
│   │   │   └── page.tsx              # Component gallery
│   │   ├── layout.tsx                # Root layout
│   │   ├── page.tsx                  # Main showcase landing
│   │   └── globals.css               # Global styles
│   │
│   ├── components/
│   │   ├── ai-elements/              # AI Elements (installed via CLI)
│   │   │   ├── conversation.tsx
│   │   │   ├── message.tsx
│   │   │   ├── reasoning.tsx
│   │   │   ├── suggestion.tsx
│   │   │   ├── prompt-input.tsx
│   │   │   └── loader.tsx
│   │   │
│   │   ├── ui/                       # shadcn/ui base components
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── input.tsx
│   │   │   └── ...
│   │   │
│   │   ├── chat-panel.tsx            # AI chat interface
│   │   ├── ui-canvas.tsx             # Render canvas
│   │   ├── library-switcher.tsx      # UI library selector
│   │   ├── device-preview.tsx        # Responsive preview
│   │   ├── json-viewer.tsx           # JSON tree viewer
│   │   └── action-handler.tsx        # Action provider
│   │
│   ├── registries/
│   │   ├── shadcn/
│   │   │   └── index.tsx             # ~20 component mappings
│   │   ├── mui/
│   │   │   └── index.tsx             # ~20 component mappings
│   │   ├── chakra/
│   │   │   └── index.tsx             # ~20 component mappings
│   │   ├── antd/
│   │   │   └── index.tsx             # ~20 component mappings
│   │   ├── magicui/
│   │   │   └── index.tsx             # ~15 animated components
│   │   ├── aceternity/
│   │   │   └── index.tsx             # ~15 premium components
│   │   └── index.ts                  # Registry aggregator
│   │
│   ├── lib/
│   │   ├── gemini.ts                 # AI provider config
│   │   ├── catalog.ts                # json-render catalog
│   │   ├── sample-data.ts            # Demo data
│   │   └── utils.ts                  # Utilities
│   │
│   └── hooks/
│       ├── use-ui-stream.ts          # json-render streaming hook
│       └── use-registry.ts           # Registry context hook
│
├── public/
│   └── images/                       # Demo assets
│
├── .env.local                        # API keys
├── next.config.ts
├── tailwind.config.ts
├── components.json                   # shadcn config
├── vercel.json
├── package.json
└── README.md
```

---

## Component Mapping by Library (20 components each)

| Component | shadcn | MUI | Chakra | Ant | Magic | Aceternity |
|-----------|--------|-----|--------|-----|-------|------------|
| Card | ✓ | ✓ | ✓ | ✓ | ✓ (animated) | ✓ (3D) |
| Button | ✓ | ✓ | ✓ | ✓ | ✓ (magnetic) | ✓ (spotlight) |
| Text | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ (gradient) |
| Badge | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| Alert | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| Avatar | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| Input | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| Select | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| Checkbox | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| Metric | custom | custom | custom | custom | ✓ (animated) | ✓ (glowing) |
| Chart | recharts | recharts | recharts | @ant-design/charts | ✓ | ✓ |
| Table | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| Tabs | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| Modal | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| Grid | ✓ | ✓ | ✓ | ✓ | ✓ (bento) | ✓ (bento) |
| Stack | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| Progress | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| Skeleton | ✓ | ✓ | ✓ | ✓ | ✓ (shimmer) | ✓ |
| Tooltip | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| Dropdown | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |

---

## Sample Prompts for Demo

| Prompt | Expected Output |
|--------|-----------------|
| "Create a sales dashboard with revenue metrics" | Dashboard with Metric cards, Charts, Table |
| "Build a user profile card with avatar and stats" | Card with Avatar, Text, Badge components |
| "Generate a pricing table with 3 tiers" | Grid with Cards, Buttons, Badges |
| "Create a settings form with toggles" | Form with Input, Select, Checkbox, Button |
| "Build an order management table with actions" | Table with status badges, action buttons |
| "Create a notification center with alerts" | Stack of Alert components with dismiss |

---

## Verification Plan

### Automated Tests

#### 1. Component Registry Tests
```bash
# Run after Phase 2 completion
npm test -- --testPathPattern="registries"
```

Each registry will have snapshot tests ensuring all components render correctly.

#### 2. json-render Integration Tests
```bash
# Test catalog validation and rendering pipeline
npm test -- --testPathPattern="json-render"
```

#### 3. API Route Tests
```bash
# Test Gemini integration and streaming
npm test -- --testPathPattern="api"
```

#### 4. E2E Browser Tests
```bash
# Full flow testing with Playwright
npx playwright test
```

**Test scenarios:**
1. User enters prompt → AI generates JSON → UI renders in selected library
2. User switches library → Same JSON renders differently
3. User clicks action → Toast/confirmation appears
4. Streaming renders progressively

---

### Manual Verification

#### 1. Visual Regression Check
- [ ] Open app in browser at http://localhost:3000
- [ ] For each UI library, verify:
  - Card components match library's design language
  - Buttons have correct variants
  - Colors/typography are native to the library
- [ ] Screenshot each library for comparison

#### 2. AI Generation Quality Check
- [ ] Test 5 different prompts
- [ ] Verify generated JSON is valid
- [ ] Verify components render without errors
- [ ] Confirm streaming shows progressive rendering

#### 3. Action Handlers Check
- [ ] Click export button → PDF downloads or toast appears
- [ ] Click refresh → Data updates
- [ ] Submit form → Validation runs

#### 4. Responsive Preview
- [ ] Test mobile/tablet/desktop toggle
- [ ] Verify layout adapts correctly

#### 5. Vercel Deployment
- [ ] Deploy to Vercel
- [ ] Verify environment variables work
- [ ] Test API routes in production

---

## Risk Mitigation

| Risk | Mitigation |
|------|------------|
| Gemini rate limiting | Add retry logic, show fallback UI |
| Library style conflicts | CSS isolation per registry |
| Large bundle size | Dynamic imports, tree shaking |
| Component compatibility | Fallback to basic HTML if registry fails |

---

## Success Criteria

- [ ] All 6 UI libraries render identically from same JSON
- [ ] AI generates valid JSON in <2 seconds
- [ ] Streaming UI updates every 100ms during generation
- [ ] All 10 sample prompts produce usable UIs
- [ ] Dashboard demo showcases data binding + actions
- [ ] Deployed to Vercel with <3s cold start
