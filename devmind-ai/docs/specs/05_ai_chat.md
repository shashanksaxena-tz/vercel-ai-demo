# Phase 5 Specification: Smart AI Chat Backend

> **Objective**: Implement the intelligence layer using Vercel AI SDK to stream `json-render` compatible JSON.
> **Estimated Time**: 2 hours
> **Session**: 5.1

---

## Session 5.1: Streaming AI Engine

### 5.1.1 API Route
Create `src/app/api/generate/route.ts`.

**Key Requirements:**
1.  **Strict Schema Enforcement**: Use `streamObject` with the Zod schema from `src/lib/catalog.ts`.
2.  **Prompt Engineering**: The System Prompt is crucial. It must teach the AI *how* to use our Catalog.
3.  **Context Awareness**: Pass the "Current Theme" to the AI so it knows if it's designing for "Ant Design" (denser) vs "Chakra" (spacious).

**Code Specs:**

```typescript
import { streamObject } from 'ai';
import { gemini, model } from '@/lib/gemini';
import { catalog } from '@/lib/catalog';
import { z } from 'zod';

// output is strict output schema from catalog
const OutputSchema = catalog.getOutputSchema(); 

export async function POST(req: Request) {
  const { prompt, currentRegistry } = await req.json();

  const result = streamObject({
    model: model, // defined in lib/gemini.ts
    schema: OutputSchema,
    system: `
      You are an expert UI designer and engineer.
      
      YOUR GOAL:
      Generate a valid JSON UI tree based on the user's prompt.
      
      CONSTRAINTS:
      1. Use ONLY components defined in the schema.
      2. For 'Metric' components, verify the valuePath.
      3. For 'Table' components, ensure columns match the data structure.
      4. Current design system: ${currentRegistry}. 
         ${currentRegistry === 'antd' ? 'Prefer denser layouts.' : 'Prefer spacious layouts.'}
         
      AVAILABLE ACTIONS:
      - export_report
      - refresh_data
      - navigate
      
      Always prioritize a root 'Stack' or 'Grid' container.
    `,
    prompt: prompt,
  });

  return result.toTextStreamResponse();
}
```

### 5.1.2 AI Elements Integration
In `src/components/chat-panel.tsx` (created in Phase 3/4 or here if not yet exists), ensure `useChat` or generic `useCompletion`/`useObject` hooks are wired up.

Since we are streaming an *object* (the UI tree) and not just text, we might need `useObject` on the frontend, OR we stream text and parse it on the fly. `json-render` often supports streaming directly if your renderer handles partial hydration.

*Recommendation*: Use `streamObject` backend -> `useObject` frontend hook.

```typescript
// src/hooks/use-ui-generator.ts
import { experimental_useObject as useObject } from 'ai/react';

export function useUIGenerator() {
  const { object, submit, isLoading } = useObject({
    api: '/api/generate',
    schema: catalog.getOutputSchema(),
  });
  
  return { tree: object, generate: submit, isLoading };
}
```

---

## Definition of Done (Phase 5)
- [ ] `POST /api/generate` returns a 200 stream.
- [ ] The stream contains valid JSON chunks matching the Zod schema.
- [ ] Frontend hook receives the partial object in real-time.
