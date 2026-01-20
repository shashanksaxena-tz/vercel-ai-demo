# AI UI Playground - Master Implementation Plan

> **Goal**: Build a dynamic AI UI generator showcasing `json-render` with 6 UI libraries.
> **Approach**: Granular 1-2 hour development sessions with separate detailed specifications.

---

## 📚 Detailed Specifications (The "How-To")

Each phase has a dedicated specification file with exact coding instructions. **Agents must read the specific spec file before starting a session.**

| Phase | Spec File | Focus | Session Est. |
|-------|-----------|-------|--------------|
| **1. Foundation** | [`specs/01_foundation.md`](./specs/01_foundation.md) | Project setup, AI SDK, Base Catalog | 2 sessions |
| **2. shadcn/ui** | [`specs/02_registries_shadcn.md`](./specs/02_registries_shadcn.md) | Component mapping for shadcn | 2 sessions |
| **3. UI Libraries A** | [`specs/03_registries_external_a.md`](./specs/03_registries_external_a.md) | MUI & Chakra Integration | 2 sessions |
| **4. UI Libraries B** | [`specs/04_registries_external_b.md`](./specs/04_registries_external_b.md) | Ant Design, Magic, Aceternity | 2 sessions |
| **5. AI Chat** | [`specs/05_ai_chat.md`](./specs/05_ai_chat.md) | AI Elements, Streaming API | 1 session |
| **6. Dashboard** | [`specs/06_dashboard_builder.md`](./specs/06_dashboard_builder.md) | Dynamic Canvas, Action Handling | 2 sessions |
| **7. Final Polish** | [`specs/07_polish_deploy.md`](./specs/07_polish_deploy.md) | Theming, Testing, Vercel | 1 session |

---

## ⏱️ Session Roadmap (1-2 Hour Blocks)

### Phase 1: Foundation (3 Hours)
- **Session 1.1**: Initialize Next.js 15, install all dependencies, setup Tailwind/TS.
- **Session 1.2**: Configure Gemini AI provider and define the Core `json-render` Catalog (Schema).

### Phase 2: Core Registries (4 Hours)
- **Session 2.1**: Implement `shadcn/ui` registry (Atoms: Button, Badge, Text, Avatar).
- **Session 2.2**: Implement `shadcn/ui` registry (Complex: Card, Table, Form, Charts).

### Phase 3: External Libraries A (4 Hours)
- **Session 3.1**: Implement `Material UI` registry (Full mapping).
- **Session 3.2**: Implement `Chakra UI` registry (Full mapping).

### Phase 4: External Libraries B (4 Hours)
- **Session 4.1**: Implement `Ant Design` registry (Full mapping).
- **Session 4.2**: Implement `Magic UI` & `Aceternity` registries (Animated components).

### Phase 5: Smart AI Backend (2 Hours)
- **Session 5.1**: Build `api/generate` with `streamObject`. Implement complex prompt engineering for dynamic layouts.

### Phase 6: Dynamic Dashboard Builder (4 Hours)
- **Session 6.1**: Build the "Canvas" - Library switcher, JSON viewer, Responsive toggle.
- **Session 6.2**: Implement Action Handling (clicks, navigation, data refresh) to make UIs interactive.

### Phase 7: Polish & Ship (2 Hours)
- **Session 7.1**: E2E Testing, Dark Mode polish, Deployment to Vercel.

---

## 🏗️ Architecture: How Dynamic Generation Works

1. **The Schema (Catalog)**: We define *what* can be built (e.g., "A Card with a Title").
2. **The Registry (Theme)**: We define *how* it looks for each library.
   - `Schema: Card` -> `shadcn: <Card>`
   - `Schema: Card` -> `MUI: <MuiCard>`
3. **The AI**: It generates pure JSON based on the Schema.
4. **The Renderer**: Swaps the JSON for the correct Registry components at runtime.
5. **The Actions**: JSON events (`onClick: "refresh"`) are caught by our `ActionHandler` and executed.

This separation allows us to switch libraries instantly without regenerating the JSON.
