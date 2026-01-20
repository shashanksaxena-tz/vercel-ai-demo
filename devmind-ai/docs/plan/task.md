# AI UI Playground - Task Tracker

## Project Overview
- **Total Estimated Effort**: 40-51 hours (5-7 working days)
- **AI Backend**: Gemini via @ai-sdk/google
- **UI Libraries**: shadcn/ui, MUI, Chakra UI, Ant Design, Magic UI, Aceternity UI
- **Deployment**: Vercel

---

## Phase 1: Foundation (8-10 hrs)

### Project Setup
- [ ] Create Next.js 15 project with TypeScript, Tailwind, App Router
- [ ] Install core dependencies (ai, @ai-sdk/google, zod)
- [ ] Install json-render packages (@json-render/core, @json-render/react)
- [ ] Install all 6 UI library packages
- [ ] Initialize shadcn/ui with `npx shadcn@latest init`
- [ ] Install AI Elements with `npx ai-elements@latest`
- [ ] Configure environment variables (.env.local)

### Core Integration
- [ ] Create `src/lib/gemini.ts` - Gemini provider setup
- [ ] Create `src/lib/catalog.ts` - Full component catalog (20 components)
- [ ] Create `src/lib/sample-data.ts` - Demo data for dashboards
- [ ] Test basic AI generation flow

---

## Phase 2: Component Registries (12-15 hrs)

### Registry Implementation
- [ ] Create `src/registries/shadcn/index.tsx` - 20 components
- [ ] Create `src/registries/mui/index.tsx` - 20 components
- [ ] Create `src/registries/chakra/index.tsx` - 20 components
- [ ] Create `src/registries/antd/index.tsx` - 20 components
- [ ] Create `src/registries/magicui/index.tsx` - 15 animated components
- [ ] Create `src/registries/aceternity/index.tsx` - 15 premium components
- [ ] Create `src/registries/index.ts` - Registry aggregator

### Charts Integration
- [ ] Install recharts for universal chart support
- [ ] Create chart components for each registry

---

## Phase 3: AI Elements Chat (6-8 hrs)

### Chat Interface
- [ ] Create `src/components/chat-panel.tsx` - Full AI Elements integration
- [ ] Configure Conversation, Message, Reasoning, Suggestion components
- [ ] Implement prompt suggestions
- [ ] Add streaming indicators

### API Routes
- [ ] Create `src/app/api/generate/route.ts` - Main generation endpoint
- [ ] Implement streamObject with Zod schema
- [ ] Add error handling and rate limiting

---

## Phase 4: Dashboard Builder (8-10 hrs)

### Core Components
- [ ] Create `src/components/ui-canvas.tsx` - Render canvas
- [ ] Create `src/components/library-switcher.tsx` - Library selector
- [ ] Create `src/components/device-preview.tsx` - Responsive preview
- [ ] Create `src/components/json-viewer.tsx` - JSON tree viewer
- [ ] Create `src/components/action-handler.tsx` - Action provider

### Pages
- [ ] Create `src/app/page.tsx` - Main landing/showcase
- [ ] Create `src/app/playground/page.tsx` - Interactive playground
- [ ] Create `src/app/dashboards/page.tsx` - Pre-built dashboard templates
- [ ] Create `src/app/components/page.tsx` - Component gallery

---

## Phase 5: Polish & Deploy (6-8 hrs)

### UI Polish
- [ ] Add animations and transitions
- [ ] Implement dark mode toggle
- [ ] Add loading states and skeletons
- [ ] Create impressive landing page

### Testing
- [ ] Write component registry tests
- [ ] Write API route tests
- [ ] E2E tests with Playwright
- [ ] Manual testing across all 6 libraries

### Deployment
- [ ] Configure vercel.json
- [ ] Set up environment variables in Vercel
- [ ] Deploy to Vercel
- [ ] Create README documentation

---

## Verification Checklist
- [ ] All 6 UI libraries render from same JSON
- [ ] AI generates valid JSON < 2 seconds
- [ ] Streaming updates every 100ms
- [ ] All 10 sample prompts work
- [ ] Dashboard showcases data binding + actions
- [ ] Vercel deployment < 3s cold start
