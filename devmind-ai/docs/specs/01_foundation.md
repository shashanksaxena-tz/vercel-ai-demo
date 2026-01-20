# Phase 1 Specification: Foundation Setup

> **Objective**: Initialize the Next.js project, install all dependencies, and configure the core AI & UI infrastructure.
> **Estimated Time**: 2-3 hours
> **Sessions**: 1.1, 1.2

---

## Session 1.1: Project Initialization & Dependencies

### 1.1.1 Initialize Project
Run these commands to create a clean slate Next.js 15 app.

```bash
# Initialize Next.js 15
npx create-next-app@latest ai-ui-playground \
  --typescript \
  --tailwind \
  --eslint \
  --app \
  --src-dir \
  --import-alias "@/*" \
  --use-npm

cd ai-ui-playground
```

### 1.1.2 Install Dependencies
Install all required packages for AI, Rendering, and UI Libraries.

**Core & AI:**
```bash
npm install ai @ai-sdk/google zod
npm install @json-render/core @json-render/react
```

**UI Libraries (The Big 6):**
```bash
# 1. shadcn/ui & Utils
npx shadcn@latest init -y
npm install clsx tailwind-merge luide-react

# 2. Material UI (MUI)
npm install @mui/material @emotion/react @emotion/styled

# 3. Chakra UI
npm install @chakra-ui/react @emotion/react @emotion/styled framer-motion

# 4. Ant Design
npm install antd @ant-design/icons

# 5. Magic UI & Aceternity (simulated via Framer Motion for now if no package)
# Note: These are often copy-paste components. We will structure the folders for them.
```

**AI Elements:**
```bash
npx ai-elements@latest
```

### 1.1.3 Configure Environment
Create `.env.local`:

```
GOOGLE_GENERATIVE_AI_API_KEY=your_api_key_here
```

---

## Session 1.2: Core Catalog Definition

### 1.2.1 Gemini Provider Setup
Create `src/lib/gemini.ts`:

```typescript
import { createGoogleGenerativeAI } from '@ai-sdk/google';

export const gemini = createGoogleGenerativeAI({
  apiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY,
});

export const model = gemini('gemini-2.0-flash');
```

### 1.2.2 The Master Catalog (Schema)
This is the **critical** contract between AI and UI. Create `src/lib/catalog.ts`.

**Requirements:**
- Define schemas for 20 components.
- Use Zod for strict typing.
- Include an `actions` section for dynamic behavior.

**Code to Write:** (See `implementation_plan.md` "Phase 1" section for the full code block, but expand it to include:)

- **Atoms**: `Button`, `Text`, `Badge`, `Avatar`, `Icon`
- **Molecules**: `Card`, `Alert`, `Metric` (with value/trend)
- **Forms**: `Input`, `Select`, `Checkbox`, `Switch`
- **Layouts**: `Stack`, `Grid`, `Container`
- **Complex**: `Table` (with columns), `Chart` (with data points), `Tabs`

**Validation Step:**
Create a test script `scripts/test-catalog.ts` that prints the JSON schema:
```typescript
import { catalog } from '../src/lib/catalog';
console.log(JSON.stringify(catalog.getSchema(), null, 2));
```
Run `npx tsx scripts/test-catalog.ts` to verify it works.

---

## Definition of Done (Phase 1)
- [ ] `npm run dev` starts without errors.
- [ ] All 6 UI libraries are installed (check `package.json`).
- [ ] `src/lib/gemini.ts` exports a valid model.
- [ ] `src/lib/catalog.ts` exports a valid `json-render` catalog.
- [ ] `npx tsx scripts/test-catalog.ts` outputs a valid JSON schema.
