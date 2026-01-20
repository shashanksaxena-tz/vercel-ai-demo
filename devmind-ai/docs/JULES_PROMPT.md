# 🚀 Jules Agent Prompt for AI UI Playground

> Copy this prompt when creating a scheduled task in Google Jules

---

## Recommended Prompt for Jules

```
Read the handoff.md file in the root of this repository first. It contains the current project status and what has been completed.

Then read the implementation plan at devmind-ai/docs/plan/implementation_plan.md for full technical specifications.

Check for any existing branches:
- Run `git branch -a` to see all branches
- If there are feature branches, evaluate their code and merge relevant changes

Evaluate the current implementation progress by:
1. Checking task.md for completed items
2. Looking at the file structure that exists vs what's planned
3. Reading the Progress Log in handoff.md

Continue development from where the last agent left off. Focus on:
1. Completing any in-progress tasks marked with [/]
2. Starting the next uncompleted phase

When finished with your session:
1. Update task.md - mark completed tasks with [x]
2. Update handoff.md - add an entry to the Progress Log
3. Commit all changes with descriptive messages
4. Push to the remote repository

IMPORTANT: The project uses:
- Next.js 15 with App Router
- Gemini AI via @ai-sdk/google
- json-render for AI-driven UI generation
- AI Elements for chat components
- 6 UI libraries: shadcn/ui, MUI, Chakra, Ant Design, Magic UI, Aceternity

Prioritize working code over perfection. Each session should result in visible progress.
```

---

## Alternative Shorter Prompt

```
1. Read handoff.md first - it has current status
2. Read devmind-ai/docs/plan/implementation_plan.md for specs
3. Check git branches for any prior work
4. Continue from where last agent stopped
5. Update handoff.md and task.md before ending session
```

---

## Tips for Effective Jules Sessions

### Session Management
- **Break work into 2-3 hour chunks** - Jules works best with focused tasks
- **Be specific about the phase** - e.g., "Complete Phase 1: Foundation only"
- **Set clear exit criteria** - e.g., "Stop when npm run dev shows homepage"

### Example Focused Prompts

**For Phase 1 (Foundation):**
```
Read handoff.md and implementation_plan.md. Execute Phase 1 only:
- Create Next.js 15 project with TypeScript
- Install all dependencies (AI SDK, json-render, UI libraries)
- Create src/lib/gemini.ts and src/lib/catalog.ts
- Verify with npm run dev
Update handoff.md when done.
```

**For Phase 2 (Registries):**
```
Read handoff.md. Continue with Phase 2:
- Create src/registries/shadcn/index.tsx with all 20 components
- Create src/registries/mui/index.tsx with all 20 components
- Create src/registries/index.ts aggregator
Test by importing registries. Update progress docs.
```

**For Phase 3 (Chat):**
```
Read handoff.md. Implement Phase 3:
- Create src/components/chat-panel.tsx with AI Elements
- Create src/app/api/generate/route.ts with Gemini streaming
- Test chat generates valid JSON
Update handoff.md with results.
```

---

## Scheduling Strategy

| Day | Session | Focus |
|-----|---------|-------|
| Day 1 | Morning | Phase 1: Foundation (setup) |
| Day 1 | Afternoon | Phase 2a: shadcn + MUI registries |
| Day 2 | Morning | Phase 2b: Chakra + Ant registries |
| Day 2 | Afternoon | Phase 2c: Magic + Aceternity registries |
| Day 3 | Morning | Phase 3: AI Elements chat |
| Day 3 | Afternoon | Phase 4: Dashboard builder |
| Day 4 | Morning | Phase 5: Polish + testing |
| Day 4 | Afternoon | Phase 5: Vercel deployment |

---

## Environment Variables Required

Before Jules can work, ensure these are set in `.env.local`:

```bash
GOOGLE_GENERATIVE_AI_API_KEY=your-gemini-api-key
```

If the key isn't set, Jules will create the file structure but AI features won't work.
