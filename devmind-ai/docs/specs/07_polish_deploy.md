# Phase 7 Specification: Polish, Testing & Deployment

> **Objective**: Ensure production readiness, visual consistency, and successful deployment to Vercel/
> **Estimated Time**: 2 hours
> **Session**: 7.1

---

## Session 7.1: Verification & Ship

### 7.1.1 E2E Testing with Playwright
Create `tests/e2e/generator.spec.ts`.

**Scenarios to Cover:**
1.  **Generation Flow**:
    - Visit `/playground`.
    - Type "Create a button".
    - Wait for response.
    - Check if a Button element appears in the canvas.
2.  **Registry Switching**:
    - Generate a button.
    - Switch dropdown to "MUI".
    - Check if the button class/style changes.
3.  **Action Handling**:
    - Click the generated button.
    - Assert that the "Action Log" or Toast appears.

### 7.1.2 Dark Mode & Theming
- Ensure `src/app/globals.css` handles dark mode variables correctly for shadcn.
- For MUI/Chakra, ensure their contexts listen to the global theme state (or at least lock them to light mode if dynamic switching is too complex for V1).

### 7.1.3 Vercel Deployment Config
Create `vercel.json` if needed (usually Next.js just works).

**Critical Checks:**
- Environment Variables: `GOOGLE_GENERATIVE_AI_API_KEY` must be set in Vercel Project Settings.
- Build Command: `next build` must pass.
- Linting: `next lint` must pass.

### 7.1.4 Final Documentation
Update `README.md` with:
- **Features List**: "Supports 6 UI Libraries!"
- **How to Run**: `npm install && npm run dev`.
- **Architecture Diagram**: Copy from `implementation_plan.md`.
- **Credits**: Mention `json-render`, `ai-sdk`, and the UI libs.

---

## Definition of Done (Project Complete)
- [ ] All tests pass (`npm test`, `npx playwright test`).
- [ ] Production build succeeds (`npm run build`).
- [ ] Deployed URL is accessible and functional.
