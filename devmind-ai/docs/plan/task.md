# AI UI Playground - Detailed Task Tracker

> **Roadmap**: 12 Sessions (1-2 Hours each) across 7 Phases.
> **Total Est**: 40-50 Hours.

---

## Phase 1: Foundation (Specs: `01_foundation.md`)

- [ ] **Session 1.1**: Project Init & Dependencies
  - [ ] Initialize Next.js 15 (TS, Tailwind)
  - [ ] Install core AI SDK & json-render
  - [ ] Install all 6 UI Libraries (shadcn, MUI, Chakra, Ant, Magic, Aceternity)
- [ ] **Session 1.2**: Catalog & Provider
  - [ ] Config `src/lib/gemini.ts`
  - [ ] Define `src/lib/catalog.ts` (20 components)
  - [ ] Validate schema with script

---

## Phase 2: Core Registries - shadcn/ui (Specs: `02_registries_shadcn.md`)

- [ ] **Session 2.1**: Basic Components
  - [ ] Registry Setup `src/registries/shadcn/index.tsx`
  - [ ] Implement Atoms: Button, Badge, Text, Avatar, Icon
- [ ] **Session 2.2**: Complex Components
  - [ ] Implement Molecules: Card, Alert
  - [ ] Implement Forms: Input, Select, Checkbox
  - [ ] Implement Data: Table, Recharts Integration

---

## Phase 3: External Libraries A (Specs: `03_registries_external_a.md`)

- [ ] **Session 3.1**: Material UI (MUI)
  - [ ] Registry Setup `src/registries/mui/index.tsx`
  - [ ] Map all 20 catalog items to MUI equivalents
- [ ] **Session 3.2**: Chakra UI
  - [ ] Registry Setup `src/registries/chakra/index.tsx`
  - [ ] Map all 20 catalog items to Chakra equivalents

---

## Phase 4: External Libraries B (Specs: `04_registries_external_b.md`)

- [ ] **Session 4.1**: Ant Design
  - [ ] Registry Setup `src/registries/antd/index.tsx`
  - [ ] Map all 20 catalog items to AntD equivalents
- [ ] **Session 4.2**: Premium UI (Magic & Aceternity)
  - [ ] Registry Setup `src/registries/magicui/index.tsx`
  - [ ] Registry Setup `src/registries/aceternity/index.tsx`
  - [ ] Implement animated variants

---

## Phase 5: Smart AI Backend (Specs: `05_ai_chat.md`)

- [ ] **Session 5.1**: Streaming Engine
  - [ ] Create `api/generate/route.ts`
  - [ ] Implement `streamObject` with Zod
  - [ ] Design system prompt for dynamic UI generation

---

## Phase 6: Dashboard Builder (Specs: `06_dashboard_builder.md`)

- [ ] **Session 6.1**: The Canvas
  - [ ] Build Library Switcher component
  - [ ] Build JSON Tree Viewer
  - [ ] Build Device Preview (Mobile/Desktop)
- [ ] **Session 6.2**: Interactivity
  - [ ] Implement `ActionHandler` (onClick, onSubmit)
  - [ ] Build sample Dashboards (Sales, CRM)

---

## Phase 7: Polish & Ship (Specs: `07_polish_deploy.md`)

- [ ] **Session 7.1**: Verification
  - [ ] E2E Testing flow
  - [ ] Dark Mode toggle validation
  - [ ] Deploy to Vercel
  - [ ] Final Documentation
